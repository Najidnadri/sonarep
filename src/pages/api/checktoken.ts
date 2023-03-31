import type { NextApiRequest, NextApiResponse } from 'next'
import { setEnvValue } from '../../../utils/environment';
import { checkToken } from '../../../utils/sonarAPI';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    let data = JSON.parse(req.body);

    try {
        let resp = await checkToken(data.token);
        console.log(resp);
        setEnvValue('USERTOKEN', data.token);
        res.status(200).send('Token Valid')
    } catch(err) {
        console.warn(err);
        res.status(401).send(JSON.stringify(err))
    }
}