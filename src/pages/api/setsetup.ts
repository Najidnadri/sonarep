import type { NextApiRequest, NextApiResponse } from 'next'
import { setEnvValue } from '../../../utils/environment';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    setEnvValue('NEXT_PUBLIC_FIRSTIME', 'false');

    res.end()
}