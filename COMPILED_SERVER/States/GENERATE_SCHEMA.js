"use strict";
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        }
        else {
            yield path.join(dir, file.name);
        }
    }
}
for (const filePath of walkSync(__dirname)) {
    if (filePath.split(".")[filePath.split(".").length - 1] != "ts")
        continue;
    exec("npx schema-codegen " + filePath + " --output " + `J:/UNITY/ISLAND_GAME_ALPHA_1.0/Assets/SCRIPTS/Network/State` + " --namespace NState --csharp", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}
