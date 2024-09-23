const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function startRustServer() {
    console.log("Starting Rust server...");
    if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
        console.log("Node.js environment detected. Node version:", process.version);

        // Get the extension root path
        const extensionRoot = getExtensionRootPath();
        console.log('Extension root path:', extensionRoot);

        // Correcting the path construction
        let rustExecutablePath = path.join(extensionRoot, 'target', 'release', 'audio_importer.exe');

        // Normalize the path and remove any 'file:' prefix
        rustExecutablePath = rustExecutablePath.replace('file:\\', ''); // Remove file: prefix for Windows path
        rustExecutablePath = path.normalize(rustExecutablePath); // Normalize the path
        console.log('Corrected Rust executable path:', rustExecutablePath);

        // Check if the file exists at the normalized path
        if (!fs.existsSync(rustExecutablePath)) {
            console.error(`Rust executable not found at ${rustExecutablePath}`);
            return;
        }

        const child = spawn(rustExecutablePath, [], {
            cwd: path.dirname(rustExecutablePath), // Set working directory to executable's directory
            env: process.env,
            stdio: 'inherit',
        });

        child.on('error', (err) => {
            console.error(`Failed to start Rust server: ${err}`);
        });

        child.on('close', (code) => {
            if (code !== 0) {
                console.error(`Rust server process exited with code ${code}`);
            } else {
                console.log('Rust server process exited successfully');
            }
        });
    } else {
        console.error('This script should only be run in a Node.js environment.');
    }
}

function getExtensionRootPath() {
    if (window.__adobe_cep__) {
        return window.__adobe_cep__.getSystemPath('extension');
    } else {
        // Fallback for development environment
        return process.cwd();
    }
}

console.log("Background script loaded. Starting Rust server...");
startRustServer();
