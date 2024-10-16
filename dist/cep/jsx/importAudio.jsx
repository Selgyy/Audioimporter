function importAudioToTrack(filePath, initialTrackIndex, volume, pitch, debugMode) {
    var debugLog = "Debug Log:\n";

    function addDebugMessage(message) {
        debugLog += message + "\n";
        if (debugMode) {
            $.writeln(message);
        }
    }

    try {
        app.enableQE();
        addDebugMessage("Debug 1: QE enabled");

        var project = app.project;
        if (!project) {
            throw new Error("No active project");
        }
        addDebugMessage("Debug 2: Project found");

        var sequence = project.activeSequence;
        if (!sequence) {
            throw new Error("No active sequence");
        }
        addDebugMessage("Debug 3: Sequence found");

        var frameRate = sequence.getSettings().videoFrameRate.seconds;
        var framesPerSecond = Math.round(1 / frameRate);
        addDebugMessage("Debug 4: Frame rate: " + framesPerSecond + " fps");

        // Find existing audio item
        var existingItem = findExistingAudioItem(project, filePath);
        var audioItem;

        if (existingItem) {
            addDebugMessage("Debug 5: Existing audio item found: " + existingItem.name);
            audioItem = existingItem;
        } else {
            addDebugMessage("Debug 5: Importing new audio file");
            var importArray = [filePath];
            var importSuccessful = project.importFiles(importArray, 1, project.rootItem, 0);
            if (!importSuccessful) {
                throw new Error("Import failed");
            }
            audioItem = project.rootItem.children[project.rootItem.children.numItems - 1];
        }

        if (!audioItem) {
            throw new Error("Audio item not found");
        }
        addDebugMessage("Debug 6: Audio item to use - Name: " + audioItem.name + ", Type: " + audioItem.type);

        var metadata = audioItem.getProjectMetadata();
        addDebugMessage("Debug 7: Metadata retrieved");

        // Extract duration from metadata
        var durationMatch = metadata.match(/<premierePrivateProjectMetaData:Column\.Intrinsic\.MediaDuration>(.*?)<\/premierePrivateProjectMetaData:Column\.Intrinsic\.MediaDuration>/);
        var audioDuration = 0;
        if (durationMatch && durationMatch[1]) {
            var durationString = durationMatch[1];
            var durationParts = durationString.split(':');
            if (durationParts.length === 4) {
                var hours = parseInt(durationParts[0]);
                var minutes = parseInt(durationParts[1]);
                var seconds = parseInt(durationParts[2]);
                var ticks = parseInt(durationParts[3]);

                var ticksPerFrame = 1602;
                var frames = ticks / ticksPerFrame;
                audioDuration = (hours * 3600) + (minutes * 60) + seconds + (frames / framesPerSecond);
            }
            addDebugMessage("Debug 8: Duration found: " + audioDuration + " seconds");
        } else {
            debugLog += "Duration not found in metadata. Full metadata:\n" + metadata + "\n";
            throw new Error("Unable to determine audio duration from metadata");
        }

        var time = sequence.getPlayerPosition();
        if (!time) {
            throw new Error("Could not get player position");
        }
        addDebugMessage("Debug 9: Player position: " + time.seconds + " seconds");

        initialTrackIndex = parseInt(initialTrackIndex);
        if (isNaN(initialTrackIndex) || initialTrackIndex < 1) {
            initialTrackIndex = 1;
        }
        addDebugMessage("Debug 10: Initial track index: " + initialTrackIndex + ", Total audio tracks: " + sequence.audioTracks.numTracks);

        // Find a suitable track for the audio clip
        var placementResult;
        try {
            placementResult = findPlacementLocation(sequence, initialTrackIndex - 1, time, { seconds: audioDuration });
            debugLog += placementResult.debugLog;
            addDebugMessage("Debug 11: Placement location search completed");
            addDebugMessage("Debug 11b: placementResult: " + JSON.stringify(placementResult));
        } catch (placementError) {
            addDebugMessage("Error in findPlacementLocation: " + placementError.toString());
            if (placementError.stack) {
                addDebugMessage("Error stack: " + placementError.stack);
            }
            throw placementError;
        }

        if (!placementResult || typeof placementResult !== 'object') {
            throw new Error("Invalid placementResult");
        }

        if (!placementResult.track || !placementResult.time) {
            addDebugMessage("Debug 11a: No available space found on any unlocked track");
            throw new Error("No available space found on any unlocked track. Last checked track: " + (placementResult.trackIndex !== null ? placementResult.trackIndex + 1 : "N/A"));
        }

        addDebugMessage("Debug 12: Placement location found on track " + (placementResult.trackIndex + 1) + " at " + placementResult.time.seconds.toFixed(2) + " seconds");

        var audioTrack = placementResult.track;
        var insertTime = placementResult.time;
        var intendedTrackIndex = placementResult.trackIndex;

        addDebugMessage("Debug 12a: audioTrack: " + (audioTrack ? "defined" : "undefined"));
        addDebugMessage("Debug 12b: insertTime: " + (insertTime ? insertTime.seconds : "undefined"));
        addDebugMessage("Debug 12c: intendedTrackIndex: " + intendedTrackIndex);

        // Insert the clip
        var newClip;
        try {
            if (!audioTrack || !audioTrack.insertClip || typeof audioTrack.insertClip !== 'function') {
                throw new Error("Invalid audioTrack or insertClip method not found");
            }
            newClip = audioTrack.insertClip(audioItem, insertTime);
            if (!newClip) {
                throw new Error("insertClip returned null or undefined");
            }
            addDebugMessage("Debug 13: Clip inserted successfully");

            try {
                var selectionResult = selectClipUsingQE(intendedTrackIndex, insertTime, addDebugMessage);
                if (!selectionResult.success) {
                    throw new Error("Clip selection failed: " + selectionResult.message);
                }
                addDebugMessage("Debug 14: Clip time range selected successfully");
            } catch (selectionError) {
                addDebugMessage("Error in selectClipUsingQE: " + selectionError.toString());
                // Decide whether to throw the error or continue with the script
                // For now, we'll continue and just log the error
            }

        } catch (insertError) {
            throw new Error("Failed to insert clip - " + insertError.toString());
        }

        // Set volume and pitch if available
        try {
            $.sleep(100);  // Wait for the clip to be fully inserted
            setClipVolume(volume, addDebugMessage);
            addDebugMessage("Debug 16: Clip volume set to " + volume + " dB");

            addDebugMessage("Debug 17: Attempting to apply pitch shift");
            if (pitch !== undefined && pitch !== null) {
                applyPitchShifterToImportedAudio(pitch, addDebugMessage);
                addDebugMessage("Debug 18: Pitch shift applied");
            } else {
                addDebugMessage("Debug 18a: Skipping pitch shift - pitch value is undefined or null");
            }

        } catch (audioError) {
            addDebugMessage("Debug Error: Audio processing failed - " + audioError.toString());
            throw audioError;
        }

        addDebugMessage("Import Audio Debug Log:\n" + debugLog);

        return JSON.stringify({
            success: true,
            message: "Audio imported successfully",
            trackIndex: intendedTrackIndex + 1,
            clipName: newClip.name,
            debugLog: debugLog
        });

    } catch (e) {
        addDebugMessage("Fatal Error in importAudioToTrack: " + e.toString());
        if (e.stack) {
            addDebugMessage("Error stack: " + e.stack);
        }

        return JSON.stringify({
            success: false,
            message: "Error in importAudioToTrack: " + e.toString(),
            debugLog: debugLog
        });
    }
}




function findExistingAudioItem(project, filePath) {
    // Extract the file name from the path
    var fileName = filePath.split('\\').pop().split('/').pop();
    
    function searchInBin(bin) {
        for (var i = 0; i < bin.children.numItems; i++) {
            var item = bin.children[i];
            if (item.type === ProjectItemType.CLIP && item.name === fileName) {
                return item;
            } else if (item.type === ProjectItemType.BIN) {
                var foundItem = searchInBin(item);
                if (foundItem) return foundItem;
            }
        }
        return null;
    }
    
    return searchInBin(project.rootItem);
}




function applyPitchShifterToImportedAudio(pitch, addDebugMessage) {
    // Create a safe version of addDebugMessage
    var safeAddDebugMessage = function(message) {
        if (typeof addDebugMessage === 'function') {
            addDebugMessage(message);
        } else {
            $.writeln(message); // Fallback to ExtendScript's writeln
        }
    };

    try {
        safeAddDebugMessage("Starting applyPitchShifterToImportedAudio function");

        // Skip applying pitch shifter if pitch is exactly 0
        if (pitch === 0) {
            safeAddDebugMessage("Skipping pitch shifter - pitch value is 0");
            return; // Early exit since we don't need to apply the pitch shift
        }

        var sequence = app.project.activeSequence;
        if (!sequence) {
            throw new Error("No active sequence found");
        }

        var selectedClips = sequence.getSelection();
        if (!selectedClips || selectedClips.length === 0) {
            throw new Error("No clip selected");
        }

        var clip = selectedClips[0];
        if (!clip) {
            throw new Error("Selected clip is undefined");
        }

        safeAddDebugMessage("Applying pitch shifter to clip: " + clip.name);

        // Get the QE sequence
        var qeSequence = qe.project.getActiveSequence();
        if (!qeSequence) {
            throw new Error("QE sequence not found");
        }

        safeAddDebugMessage("QE sequence found");

        // Find the QE clip
        var qeClip = findQEClip(qeSequence, clip, safeAddDebugMessage);
        if (!qeClip) {
            throw new Error("QE clip not found");
        }

        safeAddDebugMessage("QE clip found: " + qeClip.name);

        // Apply the Pitch Shifter effect if not already present
        if (!clipHasPitchShifter(qeClip)) {
            safeAddDebugMessage("Adding Pitch Shifter to QE clip");
            var pitchShifterEffect = qe.project.getAudioEffectByName("Pitch Shifter");
            if (!pitchShifterEffect) {
                throw new Error("Pitch Shifter effect not found");
            }
            qeClip.addAudioEffect(pitchShifterEffect);
            safeAddDebugMessage("Pitch Shifter effect added");
        } else {
            safeAddDebugMessage("Pitch Shifter already exists on clip");
        }

        // Now access the clip via the standard DOM to set the effect properties
        safeAddDebugMessage("Accessing clip via standard DOM to set effect properties");

        // Give some time for the effect to be applied
        $.sleep(100);

        // Find the "Pitch Shifter" effect in the clip's components
        var pitchShifterFound = false;

        for (var i = 0; i < clip.components.numItems; i++) {
            var component = clip.components[i];
            safeAddDebugMessage("Component " + i + ": " + component.displayName + " (" + component.matchName + ")");

            if (component.displayName === "Pitch Shifter" || component.matchName === "ADBE Pitch Shifter") {
                pitchShifterFound = true;

                // Log all properties of the effect
                safeAddDebugMessage("Logging properties of the Pitch Shifter effect:");
                logComponentProperties(component, "", safeAddDebugMessage);

                // Now attempt to set the "Transpose Ratio" property
                var propertySet = false;

                for (var j = 0; j < component.properties.numItems; j++) {
                    var property = component.properties[j];
                    safeAddDebugMessage("Property " + j + ": " + property.displayName + " (" + property.matchName + ")");

                    if (property.displayName === "Transpose Ratio" || property.matchName === "ADBE Pitch Shifter-0001") {
                        var transposeRatioValue = semitonesToTransposeRatio(pitch);
                        property.setValue(transposeRatioValue, true);
                        safeAddDebugMessage("Transpose Ratio set to: " + transposeRatioValue);
                        propertySet = true;
                        break;
                    }
                }

                if (!propertySet) {
                    throw new Error("Transpose Ratio property not found in Pitch Shifter effect.");
                }

                break;
            }
        }

        if (!pitchShifterFound) {
            throw new Error("Pitch Shifter effect not found on clip.");
        }

        safeAddDebugMessage("Pitch value successfully set to: " + pitch);

    } catch (e) {
        var errorMessage = "Error in applyPitchShifterToImportedAudio: " + e.toString();
        if (e.stack) {
            errorMessage += "\nStack trace: " + e.stack;
        }

        safeAddDebugMessage(errorMessage);
        throw e;
    }
}


function logComponentProperties(component, indent, addDebugMessage) {
    indent = indent || '';
    if (!component || !component.properties) {
        addDebugMessage(indent + "No properties found for this component.");
        return;
    }
    for (var i = 0; i < component.properties.numItems; i++) {
        var property = component.properties[i];
        addDebugMessage(indent + "Property " + i + ": " + property.displayName + " (" + property.matchName + ")");
        // If the property has sub-properties, recursively log them
        if (property.properties && property.properties.numItems > 0) {
            logComponentProperties(property, indent + '  ', addDebugMessage);
        }
    }
}


// Update the semitonesToTransposeRatio function to handle non-integer values
function semitonesToTransposeRatio(semitones) {
    var semitones_to_ratio_mapping = {
        12: 1, 11: 0.9251657128334, 10: 0.8545315861702, 9: 0.78786188364029,
        8: 0.72493404150009, 7: 0.66553807258606, 6: 0.60947567224503,
        5: 0.55655986070633, 4: 0.5066140294075, 3: 0.45947137475014,
        2: 0.41497468948364, 1: 0.37297543883324, 0: 0.33333334326744,
        "-1": 0.29591619968414, "-2": 0.26059913635254, "-3": 0.22726428508759,
        "-4": 0.19580034911633, "-5": 0.16610236465931, "-6": 0.13807117938995,
        "-7": 0.11161327362061, "-8": 0.08664035797119, "-9": 0.06306902319193,
        "-10": 0.04082067683339, "-11": 0.0198210477829, "-12": 0
    };
    
    // Convert semitones to a number and round to nearest 0.5
    var roundedSemitones = Math.round(Number(semitones) * 2) / 2;
    
    // If the rounded value is in our mapping, return it
    if (semitones_to_ratio_mapping.hasOwnProperty(roundedSemitones.toString())) {
        return semitones_to_ratio_mapping[roundedSemitones.toString()];
    }
    
    // If not, interpolate between the two nearest values
    var lowerSemitone = Math.floor(roundedSemitones);
    var upperSemitone = Math.ceil(roundedSemitones);
    var lowerRatio = semitones_to_ratio_mapping[lowerSemitone.toString()] || 0.33333334326744;
    var upperRatio = semitones_to_ratio_mapping[upperSemitone.toString()] || 0.33333334326744;
    
    var interpolationFactor = roundedSemitones - lowerSemitone;
    var interpolatedRatio = lowerRatio + (upperRatio - lowerRatio) * interpolationFactor;
    
    return interpolatedRatio;
}





function selectClipUsingQE(trackIndex, startTime, addDebugMessage) {
    try {
        var sequence = app.project.activeSequence;
        if (!sequence) {
            throw new Error("No active sequence found.");
        }
        addDebugMessage("Step 1: Active sequence found");

        var track = sequence.audioTracks[trackIndex];
        if (!track) {
            throw new Error("Audio track not found at index " + trackIndex);
        }
        addDebugMessage("Step 2: Audio track found at index " + trackIndex);

        // Find the clip using the standard DOM
        var clipFound = false;
        for (var i = 0; i < track.clips.numItems; i++) {
            var clip = track.clips[i];
            if (Math.abs(clip.start.seconds - startTime.seconds) < 0.1) { // 0.1 second tolerance
                clipFound = true;
                addDebugMessage("Step 3: Matching clip found");
                
                // Select the clip directly
                app.project.activeSequence.setSelection([clip]);
                addDebugMessage("Step 4: Clip directly selected");
                
                return { success: true, message: "Clip directly selected", trackIndex: trackIndex, clip: clip };
            }
        }

        if (!clipFound) {
            throw new Error("No matching clip found at the specified time");
        }

    } catch (e) {
        addDebugMessage("Error in selectClipUsingQE: " + e.toString());
        return { success: false, message: e.toString() };
    }
}







function setClipVolume(volumeDb, addDebugMessage) {
    try {
        var sequence = app.project.activeSequence;
        if (!sequence) {
            throw new Error("No active sequence found");
        }
        
        var selectedClips = sequence.getSelection();
        if (!selectedClips || selectedClips.length === 0) {
            throw new Error("No clip selected");
        }
        
        var clip = selectedClips[0];
        if (!clip) {
            throw new Error("Selected clip is undefined");
        }
        
        addDebugMessage("Setting volume for clip: " + clip.name);
        
        // Iterate through components to find the audio component
        for (var i = 0; i < clip.components.numItems; i++) {
            var component = clip.components[i];
            if (component.displayName === "Volume") {
                for (var j = 0; j < component.properties.numItems; j++) {
                    var property = component.properties[j];
                    if (property.displayName === "Level") {
                        var volumeInDec = dbToDecibel(volumeDb);
                        property.setValue(volumeInDec, true);
                        addDebugMessage("Volume set successfully to " + volumeDb + " dB");
                        return;
                    }
                }
            }
        }
        
        throw new Error("Volume property not found on clip");
    } catch (e) {
        addDebugMessage("Error in setClipVolume: " + e.toString());
        throw e;
    }
}

function dbToDecibel(x) {
    return Math.pow(10, (x - 15) / 20);
}





function logEffectProperties(effect, indent, addDebugMessage) {
    indent = indent || '';
    if (!effect.properties) {
        addDebugMessage(indent + "No properties found for this effect.");
        return;
    }
    for (var i = 0; i < effect.properties.numItems; i++) {
        var property = effect.properties[i];
        addDebugMessage(indent + "Property " + i + ": " + property.displayName + " (" + property.name + ")");
        // If the property has sub-properties, recursively log them
        if (property.properties && property.properties.numItems > 0) {
            logEffectProperties(property, indent + '  ', addDebugMessage);
        }
    }
}





function findQEClip(sequenceQE, clip, addDebugMessage) {
    try {
        addDebugMessage("Finding QE clip for: " + clip.name);
        var matchingClip = null;

        // Check in audio tracks
        for (var i = 0; i < sequenceQE.numAudioTracks; i++) {
            var track;
            try {
                track = sequenceQE.getAudioTrackAt(i);
                addDebugMessage("Checking audio track " + i);
                if (!track || track.numItems === 0) {
                    addDebugMessage("Audio track " + i + " is empty or undefined.");
                    continue;
                }
            } catch (trackError) {
                addDebugMessage("Error accessing audio track " + i + ": " + trackError.message);
                continue;
            }

            for (var j = 0; j < track.numItems; j++) {
                var qeClip;
                try {
                    qeClip = track.getItemAt(j);
                    addDebugMessage("Checking clip " + j + " on audio track " + i + ": " + qeClip.name);
                    if (!qeClip) {
                        addDebugMessage("Clip " + j + " on audio track " + i + " is undefined.");
                        continue;
                    }
                } catch (clipError) {
                    addDebugMessage("Error accessing clip " + j + " on audio track " + i + ": " + clipError.message);
                    continue;
                }

                if (qeClip.name === clip.name && Math.abs(qeClip.start.ticks - clip.start.ticks) < 1) {
                    addDebugMessage("QE clip match found: " + qeClip.name + " on audio track " + i);
                    matchingClip = qeClip;
                    break;
                }
            }
            if (matchingClip) {
                break;
            }
        }

        if (matchingClip) {
            addDebugMessage("QE clip found for: " + matchingClip.name + " at time: " + matchingClip.start.seconds);
            return matchingClip;
        } else {
            addDebugMessage("QE clip not found for: " + clip.name);
            return null;
        }
    } catch (e) {
        addDebugMessage("Error in findQEClip: " + e.message);
        throw new Error("Error in findQEClip: " + e.message);
    }
}




function clipHasPitchShifter(clip) {
    for (var i = 0; i < clip.numComponents; i++) {
        var effect = clip.getComponentAt(i);
        if (effect.name === "Pitch Shifter") {
            logEffectProperties(effect);
            return true;
        }
    }
    return false;
}





function findPlacementLocation(sequence, startIndex, playheadTime, clipDuration) {
    var debugLog = "";

    function addDebugMessage(message) {
        debugLog += message + "\n";
    }

    try {
        addDebugMessage("Starting findPlacementLocation");
        addDebugMessage("startIndex: " + startIndex + ", playheadTime: " + playheadTime.seconds + ", clipDuration: " + clipDuration.seconds);

        var originalStartIndex = startIndex;

        // Check if sequence and audioTracks are defined
        if (!sequence || !sequence.audioTracks) {
            throw new Error("Sequence or audioTracks is undefined");
        }

        addDebugMessage("Total audio tracks: " + sequence.audioTracks.numTracks);

        // Loop through all available tracks starting from the provided index
        for (var i = startIndex; i < sequence.audioTracks.numTracks; i++) {
            var track = sequence.audioTracks[i];
            addDebugMessage("Checking track " + (i + 1));

            // Check if the track is not locked
            if (!track.isLocked()) {
                addDebugMessage("Track " + (i + 1) + " is unlocked");
                
                // Try to find space on this track for the given clip duration
                var spaceResult = findSpaceOnTrack(track, playheadTime, clipDuration);
                debugLog += spaceResult.debugLog;

                // If there's space on this track, use it
                if (spaceResult.space) {
                    addDebugMessage("Space found on track " + (i + 1) + " at " + spaceResult.space.seconds.toFixed(2) + " seconds");
                    return { track: track, time: spaceResult.space, trackIndex: i, debugLog: debugLog };
                } else {
                    addDebugMessage("No space found on track " + (i + 1) + ". Moving to next track.");
                }
            } else {
                addDebugMessage("Track " + (i + 1) + " is locked");
            }
        }

        // If no space was found on any of the existing tracks, create a new one
        addDebugMessage("No suitable space found on any available track. Creating a new track.");
        var newTrackIndex = sequence.audioTracks.numTracks;
        var newTrack = sequence.audioTracks.add();
        addDebugMessage("New track created at index " + (newTrackIndex + 1));

        return { track: newTrack, time: playheadTime, trackIndex: newTrackIndex, debugLog: debugLog };
    } catch (e) {
        addDebugMessage("Error in findPlacementLocation: " + e.toString());
        if (e.stack) {
            addDebugMessage("Error stack: " + e.stack);
        }
        return { track: null, time: null, trackIndex: null, debugLog: debugLog };
    }
}

function findSpaceOnTrack(track, startTime, clipDuration) {
    var debugLog = "";
    var endTime = new Time();
    endTime.seconds = startTime.seconds + clipDuration.seconds;

    debugLog += "Searching for space on track. Start time: " + startTime.seconds.toFixed(2) + ", End time: " + endTime.seconds.toFixed(2) + "\n";

    // Check if there's space at the start position
    if (isSpaceFree(track, startTime, endTime)) {
        debugLog += "Space found at start position\n";
        return { space: startTime, debugLog: debugLog };
    }

    // If not, search for the next available space after the existing clips
    var trackDuration = track.end ? track.end.seconds : 0;
    var currentTime = new Time();
    currentTime.seconds = startTime.seconds;

    while (currentTime.seconds < trackDuration) {
        endTime.seconds = currentTime.seconds + clipDuration.seconds;
        
        debugLog += "Checking space from " + currentTime.seconds.toFixed(2) + " to " + endTime.seconds.toFixed(2) + "\n";
        
        if (isSpaceFree(track, currentTime, endTime)) {
            debugLog += "Space found at " + currentTime.seconds.toFixed(2) + "\n";
            return { space: currentTime, debugLog: debugLog };
        }

        // Move to the next clip end or a small increment if there are no more clips
        var nextClipStart = findNextClipStart(track, currentTime);
        if (nextClipStart !== null) {
            debugLog += "Moving to next clip start at " + nextClipStart.toFixed(2) + "\n";
            currentTime.seconds = nextClipStart;
        } else {
            currentTime.seconds += 0.1; // Move in small increments if no more clips
            debugLog += "No more clips found. Moving to " + currentTime.seconds.toFixed(2) + "\n";
        }
    }

    debugLog += "No space found on this track\n";
    return { space: null, debugLog: debugLog };
}

function isSpaceFree(track, startTime, endTime) {
    if (!track.clips || track.clips.numItems === 0) {
        return true; // If there are no clips, the space is free
    }
    for (var i = 0; i < track.clips.numItems; i++) {
        var clip = track.clips[i];
        if (clip.start.seconds < endTime.seconds && clip.end.seconds > startTime.seconds) {
            return false; // Overlapping clip found
        }
    }
    return true; // Space is free
}

function findNextClipStart(track, currentTime) {
    if (!track.clips || track.clips.numItems === 0) {
        return null; // If there are no clips, return null
    }
    var nextStart = null;
    for (var i = 0; i < track.clips.numItems; i++) {
        var clip = track.clips[i];
        if (clip.start.seconds > currentTime.seconds) {
            if (nextStart === null || clip.start.seconds < nextStart) {
                nextStart = clip.start.seconds;
            }
        }
    }
    return nextStart;
}