import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse | any
  ) {
    // console.log(res.socket!)
    // console.log(res.socket!.server);
    // console.log(res.socket!.server.io);
    if (res.socket!.server.io) {
      console.log('Socket is already running')
    } else {
      console.log('Initializing Socket');
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
    }
    res.end();
}