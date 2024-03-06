const childProcess = require('child_process');
const fs = require('fs');
const process = require('process');


const execProcess = (command) => {
    childProcess.exec(command, (error, stdout, stderr) => {
        process.stdout.write(`${stdout}\r`);

        if (error !== null) {
            console.log(`error: ${error}`);
        }
    });
}

function runExecProcess() {
    return execProcess('ps -A -o %cpu,%mem,comm | sort -nr | head -n 1');
}

setInterval(runExecProcess, 1000);