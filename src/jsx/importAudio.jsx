function importAudioToTrack(filePath, initialTrackIndex, volume, pitch, debugMode) {
    var debugLog = "Debug Log:\n";

    function addDebugMessage(message) {
        debugLog += message + "\n";
        if (debugMode) {
            $.writeln(message);  // This writes to the ExtendScript Toolkit console
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

        var importArray = [filePath];
        var importSuccessful = project.importFiles(importArray, 1, project.rootItem, 0);
        if (!importSuccessful) {
            throw new Error("Import failed");
        }
        addDebugMessage("Debug 5: File imported");

        var importedItem = project.rootItem.children[project.rootItem.children.numItems - 1];
        if (!importedItem) {
            throw new Error("Import item not found");
        }
        addDebugMessage("Debug 6: Imported item found - Name: " + importedItem.name + ", Type: " + importedItem.type);

        var metadata = importedItem.getProjectMetadata();
        addDebugMessage("Debug 7: Metadata retrieved");
        
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

        var placementResult = findPlacementLocation(sequence, initialTrackIndex - 1, time, {seconds: audioDuration});
        debugLog += placementResult.debugLog;
        addDebugMessage("Debug 11: Placement location found");

        if (!placementResult.track || !placementResult.time) {
            throw new Error("No available space found on any unlocked track");
        }

        var audioTrack = placementResult.track;
        var insertTime = placementResult.time;
        var intendedTrackIndex = placementResult.trackIndex;
        
        addDebugMessage("Debug 12: Attempting to insert at " + insertTime.seconds.toFixed(2) + " seconds on intended track " + (intendedTrackIndex + 1));

        var newClip;
        try {
            newClip = audioTrack.insertClip(importedItem, insertTime);
            if (!newClip) {
                throw new Error("insertClip returned null or undefined");
            }
            addDebugMessage("Debug 13: Clip inserted");
        } catch (insertError) {
            throw new Error("Failed to insert clip - " + insertError.toString());
        }

        // Search for the newly added clip, starting from the intended track
        var finalAudioTrackIndex = intendedTrackIndex;
        var foundClip;
        for (var i = intendedTrackIndex; i < sequence.audioTracks.numTracks; i++) {
            var track = sequence.audioTracks[i];
            var lastClip = track.clips[track.clips.numItems - 1];
            if (lastClip && lastClip.name === importedItem.name && Math.abs(lastClip.start.seconds - insertTime.seconds) < 0.1) {
                finalAudioTrackIndex = i;
                foundClip = lastClip;
                addDebugMessage("Debug 14: Found newly inserted clip on track " + (finalAudioTrackIndex + 1));
                break;
            }
        }

        if (!foundClip) {
            throw new Error("Unable to find the newly inserted clip");
        }

        addDebugMessage("Debug 15: Final audio track index: " + (finalAudioTrackIndex + 1));

        if (finalAudioTrackIndex !== intendedTrackIndex) {
            addDebugMessage("Warning: Clip was placed on track " + (finalAudioTrackIndex + 1) + " instead of intended track " + (intendedTrackIndex + 1));
        }

        try {
            sequence.setSelection([foundClip]);
            addDebugMessage("Debug 16: Clip selection successful");
        } catch (selectionError) {
            addDebugMessage("Debug Error: Clip selection failed - " + selectionError.toString());
        }

        addDebugMessage("Debug 17a: Received pitch value: " + pitch);

        try {
            setClipVolume(foundClip, volume);
            addDebugMessage("Debug 17: Clip volume set to " + volume + " dB");
            
            addDebugMessage("Debug 18: Attempting to apply pitch shift");
            if (pitch !== undefined && pitch !== null) {
                setPitchShifter(foundClip, pitch);
                addDebugMessage("Debug 19: Pitch shift applied with value: " + pitch);
            } else {
                addDebugMessage("Debug 19a: Skipping pitch shift - pitch value is undefined or null");
            }

        } catch (audioError) {
            addDebugMessage("Debug Error: Audio processing failed - " + audioError.toString());
            if (audioError.stack) {
                addDebugMessage("Error stack: " + audioError.stack);
            }
            throw audioError;
        }

            // At the end of the function, add this alert:
            alert("Import Audio Debug Log:\n" + debugLog);

            return {
                success: true,
                message: "Audio imported successfully",
                trackIndex: finalAudioTrackIndex + 1,
                clipName: foundClip.name,
                debugLog: debugLog
            };

    } catch (e) {
        addDebugMessage("Fatal Error in importAudioToTrack: " + e.toString());
        if (e.stack) {
            addDebugMessage("Error stack: " + e.stack);
        }
        return {
            success: false,
            message: "Error in importAudioToTrack: " + e.toString(),
            debugLog: debugLog
        };
    }
}

// Helper functions

function setClipVolume(clip, volumeDb) {
    try {
        if (!clip) {
            throw new Error("Clip is undefined");
        }
        for (var i = 0; i < clip.components.numItems; i++) {
            var component = clip.components[i];
            if (component.displayName === "Volume") {
                for (var j = 0; j < component.properties.numItems; j++) {
                    var property = component.properties[j];
                    if (property.displayName === "Level") {
                        var volumeInDec = dbToDecibel(volumeDb);
                        property.setValue(volumeInDec, true);
                        return;
                    }
                }
            }
        }
        throw new Error("Volume property not found");
    } catch (e) {
        throw new Error("Error in setClipVolume: " + e.toString());
    }
}

function applyPitchShifter(clip, pitchValue) {
    var pitchDebugLog = "Pitch Shifter Debug Log:\n";

    try {
        if (!clip) {
            throw new Error("No selected clip found");
        }

        pitchDebugLog += "Clip found\n";

        // Check if the clip already has a Pitch Shifter effect
        var pitchShifterComponent = null;
        for (var i = 0; i < clip.components.numItems; i++) {
            if (clip.components[i].displayName === "Pitch Shifter") {
                pitchShifterComponent = clip.components[i];
                break;
            }
        }

        // If no Pitch Shifter is found, add it
        if (!pitchShifterComponent) {
            pitchDebugLog += "No Pitch Shifter effect found, adding it\n";

            // Get Pitch Shifter effect from the audio effect library
            var pitchShifterEffect = app.project.getAudioEffectByName("Pitch Shifter");
            if (!pitchShifterEffect) {
                throw new Error("Pitch Shifter effect not found in Premiere");
            }

            // Add the Pitch Shifter effect to the clip
            pitchShifterComponent = clip.addComponent(pitchShifterEffect);
            if (!pitchShifterComponent) {
                throw new Error("Failed to add Pitch Shifter effect");
            }
            pitchDebugLog += "Pitch Shifter effect added successfully\n";
        }

        // Adjust the Transpose property of the Pitch Shifter effect
        var transposeProperty = null;
        for (var j = 0; j < pitchShifterComponent.properties.numItems; j++) {
            if (pitchShifterComponent.properties[j].displayName === "Transpose") {
                transposeProperty = pitchShifterComponent.properties[j];
                break;
            }
        }

        if (!transposeProperty) {
            throw new Error("Transpose property not found in Pitch Shifter effect");
        }

        // Convert semitones to transpose ratio (mapping from your old script)
        var semitonesToRatio = {
            12: 1, 11: 0.9251657128334, 10: 0.8545315861702, 9: 0.78786188364029,
            8: 0.72493404150009, 7: 0.66553807258606, 6: 0.60947567224503,
            5: 0.55655986070633, 4: 0.5066140294075, 3: 0.45947137475014,
            2: 0.41497468948364, 1: 0.37297543883324, 0: 0.33333334326744,
            "-1": 0.29591619968414, "-2": 0.26059913635254, "-3": 0.22726428508759,
            "-4": 0.19580034911633, "-5": 0.16610236465931, "-6": 0.13807117938995,
            "-7": 0.11161327362061, "-8": 0.08664035797119, "-9": 0.06306902319193,
            "-10": 0.04082067683339, "-11": 0.0198210477829, "-12": 0
        };

        // Ensure the pitch value is mapped correctly
        var transposeRatio = semitonesToRatio[pitchValue];
        if (transposeRatio === undefined) {
            throw new Error("Invalid pitch value");
        }

        // Set the Transpose property to the correct value
        transposeProperty.setValue(transposeRatio, true);
        pitchDebugLog += "Pitch Shifter Transpose set to " + transposeRatio + "\n";

        // Final success message
        alert("Pitch Shifter applied successfully. Debug log:\n" + pitchDebugLog);

    } catch (e) {
        pitchDebugLog += "Error in applyPitchShifter: " + e.toString() + "\n";
        if (e.stack) {
            pitchDebugLog += "Stack trace: " + e.stack + "\n";
        }
        alert("Error in applyPitchShifter: " + e.toString() + "\n\nDebug log:\n" + pitchDebugLog);
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


function dbToDecibel(x) {
    return Math.pow(10, (x - 15) / 20);
}



function findPlacementLocation(sequence, startIndex, playheadTime, clipDuration) {
    var debugLog = "";
    for (var i = startIndex; i < sequence.audioTracks.numTracks; i++) {
        var track = sequence.audioTracks[i];
        debugLog += "Checking track " + (i + 1) + "\n";
        if (!track.isLocked()) {
            debugLog += "Track " + (i + 1) + " is unlocked\n";
            var space = findSpaceOnTrack(track, playheadTime, clipDuration);
            if (space) {
                debugLog += "Space found on track " + (i + 1) + " at " + space.seconds + " seconds\n";
                return { track: track, time: space, trackIndex: i, debugLog: debugLog };
            } else {
                debugLog += "No space found on track " + (i + 1) + "\n";
            }
        } else {
            debugLog += "Track " + (i + 1) + " is locked\n";
        }
    }
    debugLog += "No suitable space found on any track\n";
    return { track: null, time: null, trackIndex: null, debugLog: debugLog };
}

function findSpaceOnTrack(track, playheadTime, clipDuration) {
    var endTime = new Time();
    endTime.seconds = playheadTime.seconds + clipDuration.seconds;

    // Check if there's space at the playhead position
    if (isSpaceFree(track, playheadTime, endTime)) {
        return playheadTime;
    }

    // If not, find the next available space
    var lastClipEnd = playheadTime.seconds;
    for (var i = 0; i < track.clips.numItems; i++) {
        var clip = track.clips[i];
        if (clip.start.seconds > lastClipEnd + 0.01) { // 0.01 second buffer
            var spaceStart = new Time();
            spaceStart.seconds = lastClipEnd;
            if (isSpaceFree(track, spaceStart, endTime)) {
                return spaceStart;
            }
        }
        lastClipEnd = Math.max(lastClipEnd, clip.end.seconds);
    }

    // If no space found, return null
    return null;
}

function isSpaceFree(track, startTime, endTime) {
    for (var i = 0; i < track.clips.numItems; i++) {
        var clip = track.clips[i];
        if (clip.start.seconds < endTime.seconds && clip.end.seconds > startTime.seconds) {
            return false;
        }
    }
    return true;
}