import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process';
import { setEnvValue } from '../../../utils/environment';

function createPromise(cmd: string) {
    let resp = new Promise<void>(async (resolve, reject) => {
        let process = spawn(cmd);
        process.stdout.setEncoding('utf-8');
        process.stdout.on('data', (data) => {
            let log: string = data.toString();
            console.log('CheckCmdSonar: LOG: ', log);
    
            if (log.includes('SonarQube is operational') || log.includes('Another instance of the SonarQube application is already running')) {
                resolve();
            }
        })
        process.stderr.setEncoding('utf-8');
        process.stderr.on('data', (data) => {
            let log: string = data.toString();
            console.error('CheckCmdSonar: ERR: ', log);

            reject('Something went wrong initializing SonarQube, Please Refresh Browser')
        })
        process.on('error', (data) => {
            let log: string = data.toString();
            console.error('CheckCmdSonar: ERR: ', log);

            reject('Something went wrong executing command, please double check or test the given command manually')
        })
    })

    return resp
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    let data = JSON.parse(req.body);

    try {
        let respp = await createPromise(data.cmd);
        setEnvValue("SONARQUBESTARTCMD", data.cmd);

        res.status(200).send('CMD Valid')
    } catch(err) {
        res.status(500).send(JSON.stringify(err))
    }
}