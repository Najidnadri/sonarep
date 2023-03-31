import type { NextApiRequest, NextApiResponse } from 'next'
import { Server, Socket } from 'socket.io';
import { analyzeCode, cloneRepo, deleteTmp, startSonarQube } from '../../../utils/cli';
import { deleteProject, createProject, exportFindings } from '../../../utils/sonarAPI';

const UserToken = process.env.USERTOKEN!;
const SonarStartCmd = process.env.SONARQUBESTARTCMD!;

/*
  START SONARQUBE INIT API
*/
async function sonarQubeInit(socket: Socket) {
  await startSonarQube(SonarStartCmd, socket);
}

/*
  START ANALYZE WEBSOCKET API
*/
interface AnalyzeBody {
  url: string,
  userToken?: string,
}

async function startAnalyze(msg: string, socket: Socket){
  console.log('start analyzing...');
  let data: AnalyzeBody = JSON.parse(msg);
  let tmpFolder = __dirname.replace('\\.next\\server\\pages\\api', '');

  try {
    const resp = await createProject(UserToken);
    let createResp = await resp.json();
    socket.emit('analyzeProgress', 'Created new Temporary Project')
    console.log('created new project');

    let cloneResp = await cloneRepo(data.url, tmpFolder);
    socket.emit('analyzeProgress', "Start Analyzing... please wait 60s~")
    console.log('cloned the repo')

    let analyzeResp = await analyzeCode(tmpFolder, UserToken);
    socket.emit('analyzeProgress', "Repo Analyzed")
    console.log('Analyzed the repo');

    const findingResp = await exportFindings(UserToken);  
    let findingsData = await findingResp.json();
    findingsData.__status__ = 200;
    console.log("findings exported", findingsData);
    socket.emit('analyzeProgress', "Findings Exported");

    let deleteProjectResp = await deleteProject(UserToken);
    let deleteTmpResp = await deleteTmp(tmpFolder);
    console.log("Deleted Project and Temp Folders");
    socket.emit('analyzeProgress', "Complete Deletion");

    socket.emit('analyzeResponse', JSON.stringify(findingsData));

  } catch (err) {
    console.warn(err);
    let data = {
      __status__:400
    } 
    socket.emit('analyzeResponse', JSON.stringify(data));
  }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse | any
  ) {

    if (res.socket!.server.io) {
      console.log('Socket is already running')
    } else {
      console.log('Initializing Socket');
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
      io.on('connection', socket => {
        socket.on('startAnalyze', msg => startAnalyze(msg, socket))
        socket.on('sonarQubeInit', () => sonarQubeInit(socket))
        socket.on('reqStartCmd', () => socket.emit('respStartCmd', SonarStartCmd));
      })
    }
    res.end();
}