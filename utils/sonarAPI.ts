const BaseUrl = 'http://127.0.0.1:9000';
const DeleteProjectUrl = "/api/projects/delete?";
const CreateProjectUrl = "/api/projects/create?";
const ExportFindingsUrl = '/api/measures/search_history?';
const LoginUrl = "/api/authentication/login?";

export async function deleteProject(UserToken: string) {
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

export async function createProject(UserToken: string) {
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

export async function exportFindings(UserToken: string) {
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

export async function login() {
    let name = process.env.NEXT_PUBLIC_USERNAME;
    let password = process.env.NEXT_PUBLIC_USERPASSWORD;

    if (name && password) {
        let params = new URLSearchParams();
        params.set('login', name);
        params.set('password', password);
    
        let loginResp = await fetch(BaseUrl + LoginUrl + params.toString(), {
            method: "POST",
            mode: 'no-cors'
        });

        console.log("LOGIN RESPONSE: ", loginResp.status)
        return loginResp
    } else {
        throw Error ('missing creds');
    }
}