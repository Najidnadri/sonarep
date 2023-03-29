import type { NextApiRequest, NextApiResponse } from 'next'
import { Server, Socket } from 'socket.io';
import { exec } from 'child_process';
import util from 'util';

const BaseUrl = 'http://127.0.0.1:9000';
const CreateProjectUrl = "/api/projects/create?";
const DeleteProjectUrl = "/api/projects/delete?";
const ExportFindingsUrl = '/api/measures/search_history?'
const UserToken = process.env.USERTOKEN!;

interface AnalyzeBody {
  url: string,
  userToken?: string,
}

function analyzeCommand(projectKey: string, loginToken: string, tmpDirectory: string) {
  return `sonar-scanner.bat -D"sonar.projectKey=${projectKey}" -D"sonar.sources=${tmpDirectory}\\tmp" -D"sonar.host.url=${BaseUrl}" -D"sonar.login=${loginToken}"`
}

async function createProject() {
  let headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(UserToken + ':')}`);

  let params = new URLSearchParams();
  params.set('name', 'sonarep');
  params.set('project', 'sonarep');

  const resp = await fetch(BaseUrl + CreateProjectUrl + params.toString(), {
    method: 'POST',
    headers: headers
  })

  return resp
}

async function exportFindings() {
  let headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(UserToken + ':')}`);

  let params = new URLSearchParams();
  params.set('component', 'sonarep');
  params.set('ps', '1000');

  let url = BaseUrl + ExportFindingsUrl + 'metrics=bugs%2Cvulnerabilities%2Csqale_index%2Cduplicated_lines_density%2Cncloc%2Ccoverage%2Ccode_smells%2Creliability_rating%2Csecurity_rating%2Csqale_rating&component=sonarep&ps=1000';
  const resp = await fetch(url, {
    method: 'GET',
    headers: headers
  })

  return resp
}

async function analyzeCode(tmpDirectory: string) {
  const execPromise = util.promisify(exec);
  return await execPromise(analyzeCommand('sonarep', UserToken, tmpDirectory));

}

async function cloneRepo(url: string, tmpDirectory: string) {
  const execPromise = util.promisify(exec);
  return await execPromise(`git clone ${url} \\tmp && ( move C:\\tmp ${tmpDirectory}\\tmp || mv C:\\tmp ${tmpDirectory}\\tmp)`);
}


async function deleteTmp(tmpDirectory: string) {
  const execPromise = util.promisify(exec);
  return await execPromise(`del /F /Q ${tmpDirectory}\\tmp && rmdir /S /Q ${tmpDirectory}\\tmp`);
}

async function deleteProject() {
  let headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(UserToken + ':')}`);

  let params = new URLSearchParams();
  params.set('project', 'sonarep');

  const resp = await fetch(BaseUrl + DeleteProjectUrl + params.toString(), {
    method: 'POST',
    headers: headers
  })

  return resp
}

async function startAnalyze(msg: string, socket: Socket){
  console.log('start analyzing...');
  let data: AnalyzeBody = JSON.parse(msg);
  let tmpFolder = __dirname.replace('\\.next\\server\\pages\\api', '');

  try {
    const resp = await createProject();
    let createResp = await resp.json();
    socket.emit('analyzeProgress', 'Created new Temporary Project')
    console.log('created new project');

    let cloneResp = await cloneRepo(data.url, tmpFolder);
    socket.emit('analyzeProgress', "Start Analyzing... please wait 60s~")
    console.log('cloned the repo')

    let analyzeResp = await analyzeCode(tmpFolder);
    socket.emit('analyzeProgress', "Repo Analyzed")
    console.log('Analyzed the repo');

    const findingResp = await exportFindings();  
    let findingsData = await findingResp.json();
    findingsData.__status__ = 200;
    console.log("findings exported", findingsData);
    socket.emit('analyzeProgress', "Findings Exported");

    let deleteProjectResp = await deleteProject();
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
      })
    }
    res.end();
}