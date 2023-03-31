import type { NextApiRequest, NextApiResponse } from 'next'
import { checkScanner } from '../../../utils/cli';

function createPromise() {
    let resp = new Promise<void>(async (resolve, reject) => {
        try {
            let {stdout, stderr} = await checkScanner()

            if (stdout.includes('SonarScanner')) {
                resolve()
            } 
    
            if (stderr !== '') {
                reject("Command Error, Please check if the path is correct by running 'start-scanner.bat --version' in terminal anywhere")
            }
        } catch (err) {
            reject("Command Error, Please check if the path is correct by running 'start-scanner.bat --version' in terminal anywhere")
        }
    })

    return resp
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        let resp = await createPromise();
        res.status(200).send('Sonar Scanner valid')
    } catch(err) {
        console.warn(err);
        res.status(400).send(JSON.stringify(err))
    }
}