import { exec } from 'child_process';
import util from 'util';
import { spawn } from 'child_process';
import { Socket } from 'socket.io';

const BaseUrl = 'http://127.0.0.1:9000';

interface checkCmdRespObject {
    __status__: string,
    msg: string
}

const execPromise = util.promisify(exec);

function analyzeCommand(projectKey: string, loginToken: string, tmpDirectory: string) {
    return `sonar-scanner.bat -D"sonar.projectKey=${projectKey}" -D"sonar.sources=${tmpDirectory}\\tmp" -D"sonar.host.url=${BaseUrl}" -D"sonar.login=${loginToken}"`
}

// Start Analyzing Cloned git repo
export async function analyzeCode(tmpDirectory: string, UserToken: string) {
    return await execPromise(analyzeCommand('sonarep', UserToken, tmpDirectory));
}

// Clone the given git repo url in tmpDirectory
export async function cloneRepo(url: string, tmpDirectory: string) {
    return await execPromise(`git clone ${url} \\tmp && ( move C:\\tmp ${tmpDirectory}\\tmp || mv C:\\tmp ${tmpDirectory}\\tmp)`);
}

// Delete the tempDirectory folder
export async function deleteTmp(tmpDirectory: string) {
    return await execPromise(`del /F /Q ${tmpDirectory}\\tmp && rmdir /S /Q ${tmpDirectory}\\tmp`);
}

export async function startSonarQube(cmd: string, socket: Socket) {
    let process = spawn(cmd);
    process.stdout.setEncoding('utf-8');
    process.stdout.on('data', (data) => {
        let log: string = data.toString();
        console.log('StartSonarQube: LOG: ', log);

        if (log.includes('SonarQube is operational')) {
            let resp = {
                __status__: '200',
                msg: 'Succesfully Initialized'
            }
            socket.emit('sonarInitResp', JSON.stringify(resp));
        } else if (log.includes('Another instance of the SonarQube application is already running')) {
            let resp = {
                __status__: '409',
                msg: 'SonarQube already running'
            }
            socket.emit('sonarInitResp', JSON.stringify(resp));
        }
    })

    process.stderr.setEncoding('utf-8');
    process.stderr.on('data', (data) => {
        let log: string = data.toString();
        console.error('StartSonarQube: ERR: ', log);

        let resp = {
            __status__: '400',
            msg: 'Something went wrong initializing SonarQube, Please Refresh'
        }
        socket.emit('sonarInitResp', JSON.stringify(resp));
    })

    process.on('error', (data) => {
        let log: string = data.toString();
        console.error('StartSonarQube: ERR: ', log);

        let resp = {
            __status__: '400',
            msg: 'Something went wrong executing command, please double check or test the given command manually'
        }
        socket.emit('sonarInitResp', JSON.stringify(resp));
    })
}


export async function checkScanner() {
    return await execPromise('sonar-scanner.bat --version');
}