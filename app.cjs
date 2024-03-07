const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

let platformCommand = '';

if (os.type() === "Windows_NT") {
    platformCommand = 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
} else {
    platformCommand = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
}

setInterval(() => {
    exec(platformCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        console.clear();
        process.stdout.write(stdout);
    });
}, 100);

setInterval(() => {
    exec(platformCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        const logData = `${Math.floor(new Date().getTime() / 1000)} : ${stdout}`;
        fs.appendFile(path.join(__dirname, 'activityMonitor.log'), logData, (err) => {
            if (err) throw err;
        });
    });
}, 60000);