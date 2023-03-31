import { useState } from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import Head from 'next/head'
import { login } from "../../utils/sonarAPI";
import { setEnvValue } from "../../utils/environment";

interface SonarQubeState {
    cmd: string,
    token: string,
    username: string,
    userpassword: string,
    validCmd: boolean,
    checkingCmd: boolean,
    validToken: boolean,
    checkingToken: boolean,
    validCreds: boolean,
    checkingCreds: boolean,
}

interface SonarScannerState {
    valid: boolean,
    checkingValid: boolean,
}

class CompState {
    step: number;
    sonarQubeState: SonarQubeState;
    sonarScannerState: SonarScannerState;
    constructor() {
        this.step = 1;
        this.sonarQubeState = {
            cmd: '',
            token: '',
            username: '',
            userpassword: '',
            validCmd: false,
            checkingCmd: false,
            validToken: false,
            checkingToken: false,
            validCreds: false,
            checkingCreds: false,
        };
        this.sonarScannerState = {
            valid: false,
            checkingValid: false,
        }
    }
}

const checkCmdUrl = 'api/startsonar'
const checkTokenUrl = 'api/checktoken'
const checkScannerUrl = 'api/checkscanner'
const setSetupUrl = 'api/setsetup'

export default function Setup() {
    let [state, setState] = useState(new CompState()); 

    /*
        EVENT HANDLER
    */
    let startCmdHandler = (event: any) => {
        setState({...state, sonarQubeState: {
            ...state.sonarQubeState,
            cmd: event.target.value,
        }})
    }

    let userTokenHandler = (event: any) => {
        setState({...state, sonarQubeState: {
            ...state.sonarQubeState,
            token: event.target.value,
        }})
    }

    let usernameHandler = (event: any) => {
        setState({...state, sonarQubeState: {
            ...state.sonarQubeState,
            username: event.target.value
        }})
    }

    let passwordHandler = (event: any) => {
        setState({...state, sonarQubeState: {
            ...state.sonarQubeState,
            userpassword: event.target.value
        }})
    }

    let checkStartCmd = () => {
        setState({...state, sonarQubeState: {
            ...state.sonarQubeState,
            checkingCmd: true
        }})
        fetch(checkCmdUrl, {
            method: 'POST',
            body: JSON.stringify({cmd: state.sonarQubeState.cmd})
        }).then((resp => {
            resp.text().then((text) => {
                if (resp.status <= 200) {
                    setState({...state, sonarQubeState: {
                        ...state.sonarQubeState,
                        validCmd: true,
                        checkingCmd: false,
                    }})
                } else {
                    setState({...state, sonarQubeState: {
                        ...state.sonarQubeState,
                        checkingCmd: false,
                    }})
                    alert(text)
                }
            })

        }))
    }

    let checkLogin = () => {
        setState({...state, sonarQubeState: {
            ...state.sonarQubeState,
            checkingCreds: true
        }})
        login(state.sonarQubeState.username, state.sonarQubeState.userpassword).then((resp) => {
            setState({...state, sonarQubeState: {
                ...state.sonarQubeState,
                validCreds: true,
                checkingCreds: false,
            }})
        });
    }

    let checkUserToken = () => {
        setState({...state, sonarQubeState: {
            ...state.sonarQubeState,
            checkingToken: true
        }})
        fetch(checkTokenUrl, {
            method: 'POST',
            body: JSON.stringify({token: state.sonarQubeState.token})
        }).then((resp => {
            resp.text().then((text) => {
                if (resp.status <= 200) {
                    setState({...state, sonarQubeState: {
                        ...state.sonarQubeState,
                        validToken: true,
                        checkingToken: false,
                    }})
                } else {
                    setState({...state, sonarQubeState: {
                        ...state.sonarQubeState,
                        checkingToken: false,
                    }})
                    alert(text)
                }
            })
        }))
    }

    let checkSonarScanner = () => {
        setState({...state, sonarScannerState: {
            ...state.sonarScannerState,
            checkingValid: true
        }})
        fetch(checkScannerUrl, {
            method: 'GET',
        }).then((resp => {
            resp.text().then((text) => {
                if (resp.status <= 200) {
                    setState({...state, sonarScannerState: {
                        ...state.sonarScannerState,
                        checkingValid: false,
                        valid: true
                    }})
                } else {
                    setState({...state, sonarScannerState: {
                        ...state.sonarScannerState,
                        checkingValid: false
                    }})
                    alert(text)
                }
            })
        }))
    }

    let setSetup = () => {
        fetch(setSetupUrl).then(() => {
            setState({...state, step: 4})
        })
    }

    return (
        <>
            <Head>
                <title>SONAREP | SETUP</title>
            </Head>
            <div className="fixed z-[99] top-0 bottom-0 left-0 right-0 primary-bg h-[100%] min-h-[100vh] min-h-[100svh] py-[120px] px-[20px] flex justify-center items-start overflow-auto ">
                {
                    state.step === 1 &&
                    <div className="w-[100%] max-w-[1300px] min-h-[200px] flex flex-col justify-start items-start white">
                        <h1 className="text-[40px] font-bold">Presequites</h1>

                        <div className="mt-[20px] grid grid-cols-[50px_auto] justify-center items-center place-items-center">
                            <AiFillCheckSquare className="text-[40px]" />
                            <p className="text-[30px] mt-[5px]">Windows OS</p>
                        </div>
                        <div className="mt-[15px] grid grid-cols-[50px_auto] justify-center items-center place-items-center">
                            <AiFillCheckSquare className="text-[40px]" />
                            <p className="text-[30px] mt-[5px]">Java 17</p>
                        </div>
                        <div className="mt-[15px] grid grid-cols-[50px_auto] justify-center items-center place-items-center">
                            <AiFillCheckSquare className="text-[40px]" />
                            <p className="text-[30px] mt-[5px]">SonarQube V9.9 LTS Community Edition</p>
                        </div>
                        <div className="mt-[15px] grid grid-cols-[50px_auto] justify-center items-center place-items-center">
                            <AiFillCheckSquare className="text-[40px]" />
                            <p className="text-[30px] mt-[5px]">SonarScanner V4.8</p>
                        </div>
                        <div className="mt-[15px] grid grid-cols-[50px_auto] justify-center items-center place-items-center">
                            <AiFillCheckSquare className="text-[40px]" />
                            <p className="text-[30px] mt-[5px]">GitCLI</p>
                        </div>

                        <div className="mt-[70px] w-[100%] flex flex-row justify-start items-center">
                            <button className="px-[15px] py-[10px] secondary-bg" onClick={() => setState({...state, step: 2})}>I Installed all of above</button>
                        </div>
                    </div>
                }
                
                {
                    state.step === 2 &&
                    <div className="w-[100%] max-w-[1300px] min-h-[200px] flex flex-col justify-start items-start white">
                        <h1 className="text-[40px] font-bold">SonarQube Setup</h1>

                        <div className="mt-[20px] grid grid-cols-[50px_auto] grid-rows-[auto_auto_auto] justify-center items-center place-items-center">
                            <p className="rounded-full white-bg primary text-[20px] font-semibold w-[30px] h-[30px] flex justify-center items-center pt-[4px]">1</p>
                            <p className="text-[30px] mt-[5px] place-self-start">Insert Executing Command</p>
                            <input type="text" value={state.sonarQubeState.cmd} onChange={startCmdHandler} className="row-start-2 col-start-2 w-[100%] min-w-[600px] py-[10px] px-[15px] black text-[20px] rounded" placeholder="C:/Users/user/sonarqube/bin/windows/StartSonar.bat"/>
                            <button onClick={checkStartCmd} className="row-start-3 col-start-2 py-[10px] px-[15px] secondary-bg text-[20px] rounded mt-[10px] place-self-start ">
                                {
                                    !state.sonarQubeState.checkingCmd &&
                                    <p>Check</p>
                                }
                                {
                                    state.sonarQubeState.checkingCmd &&
                                    <p>Loading</p>
                                }
                            </button>
                        </div>

                        {
                            state.sonarQubeState.validCmd &&
                            <div className="mt-[25px] grid grid-cols-[50px_auto] grid-rows-[auto_auto_auto] justify-center items-center place-items-center">
                                <p className="rounded-full white-bg primary text-[20px] font-semibold w-[30px] h-[30px] flex justify-center items-center pt-[4px]">2</p>
                                <p className="text-[30px] mt-[5px] place-self-start">Go to SonarQube UI</p>
                                <p className="text-[20px] row-start-2 col-start-2 place-self-start">
                                    Go to SonarQube UI in  
                                    <a href="http://localhost:9000" target="_blank" className="underline pl-[5px]">
                                        http://localhost:9000
                                    </a> and log in using <span className="secondary-bg inline px-[5px] py-[2px] rounded">admin</span> as both <strong>Username</strong> & <strong>Password</strong>
                                </p>
                            </div>
                        }

                        {
                            state.sonarQubeState.validCmd &&
                            <div className="mt-[25px] grid grid-cols-[50px_auto] grid-rows-[auto_auto_auto_auto_auto] justify-center items-center place-items-center w-[100%] max-w-[700px]">
                                <p className="rounded-full white-bg primary text-[20px] font-semibold w-[30px] h-[30px] flex justify-center items-center pt-[4px]">3</p>
                                <p className="text-[30px] mt-[5px] place-self-start">Change the Password & update it here</p>
                                <input type="text" value={state.sonarQubeState.username} onChange={usernameHandler}  className="row-start-2 col-start-2 w-[100%] min-w-[600px] py-[10px] px-[15px] black text-[20px] rounded" placeholder="username"/>
                                <input type="password" value={state.sonarQubeState.userpassword} onChange={passwordHandler} className="mt-[10px] row-start-3 col-start-2 w-[100%] min-w-[600px] py-[10px] px-[15px] black text-[20px] rounded" placeholder="password"/>
                                <p className="text-[16px] mt-[5px] row-start-4 col-start-2 place-self-start font-extralight">
                                    This creds will be store in the <span className="secondary-bg inline px-[5px] py-[2px] rounded">.env</span> file in the project folder.
                                     If there&apos;s any change on the pass or username in the future, you will need to update it 
                                    manually.
                                </p>
                                <button onClick={checkLogin} className="row-start-5 col-start-2 py-[10px] px-[15px] secondary-bg text-[20px] rounded mt-[10px] place-self-start">
                                {
                                    !state.sonarQubeState.checkingCreds &&
                                    <p>Check</p>
                                }
                                {
                                    state.sonarQubeState.checkingCreds &&
                                    <p>Loading</p>
                                }
                                </button>
                            </div>
                        }

                        {
                            state.sonarQubeState.validCmd && state.sonarQubeState.validCreds &&
                            <div className="mt-[25px] grid grid-cols-[50px_auto] grid-rows-[auto_auto_auto_auto] justify-center items-center place-items-center">
                                <p className="rounded-full white-bg primary text-[20px] font-semibold w-[30px] h-[30px] flex justify-center items-center pt-[4px]">4</p>
                                <p className="text-[30px] mt-[5px] place-self-start">Disable SCM</p>
                                <p className="text-[20px] row-start-2 col-start-2 place-self-start w-[100%] max-w-[600px]">
                                    Go to <strong>Administration&gt;SCM</strong> and disable the SCM Sensor
                                </p>
                            </div>
                        }

                        {
                            state.sonarQubeState.validCmd && state.sonarQubeState.validCreds &&
                            <div className="mt-[25px] grid grid-cols-[50px_auto] grid-rows-[auto_auto_auto_auto] justify-center items-center place-items-center">
                                <p className="rounded-full white-bg primary text-[20px] font-semibold w-[30px] h-[30px] flex justify-center items-center pt-[4px]">5</p>
                                <p className="text-[30px] mt-[5px] place-self-start">Create New UserToken</p>
                                <p className="text-[20px] row-start-2 col-start-2 place-self-start w-[100%] max-w-[600px]">
                                    Go to <strong>Profile&gt;My Account&gt;Security</strong> and create a <pre className="secondary-bg inline px-[5px] py-[2px] rounded">UserToken</pre>.
                                    Copy the generated token and paste it here.
                                </p>
                                <input value={state.sonarQubeState.token} onChange={userTokenHandler}  type="text" className="mt-[10px] row-start-3 col-start-2 w-[100%] min-w-[600px] py-[10px] px-[15px] black text-[20px] rounded" placeholder="squ_12345...."/>
                                <button onClick={checkUserToken} className="row-start-4 col-start-2 py-[10px] px-[15px] secondary-bg text-[20px] rounded mt-[10px] place-self-start">
                                {
                                    !state.sonarQubeState.checkingToken &&
                                    <p>Check</p>
                                }
                                {
                                    state.sonarQubeState.checkingToken &&
                                    <p>Loading</p>
                                }
                                </button>
                            </div>
                        }


                        <div className="mt-[70px] w-[100%] flex flex-row justify-start items-center gap-[10px]">
                            <button className="px-[15px] py-[10px] white-bg black" onClick={() => setState({...state, step: 1})}>Back</button>
                            {
                                state.sonarQubeState.validCmd && state.sonarQubeState.validToken && state.sonarQubeState.validCreds &&
                                <button className="px-[15px] py-[10px] secondary-bg" onClick={() => setState({...state, step: 3})}>Next</button>
                            }
                        </div>

                    </div>
                }

                {
                    state.step === 3 &&
                    <div className="w-[100%] max-w-[1300px] min-h-[200px] flex flex-col justify-start items-start white">
                        <h1 className="text-[40px] font-bold">Sonar Scanner</h1>

                        <div className="mt-[25px] grid grid-cols-[50px_auto] grid-rows-[auto_auto_auto] justify-center items-center place-items-center">
                            <p className="rounded-full white-bg primary text-[20px] font-semibold w-[30px] h-[30px] flex justify-center items-center pt-[4px]">1</p>
                            <p className="text-[30px] mt-[5px] place-self-start">Set to PATH</p>
                            <p className="text-[20px] row-start-2 col-start-2 place-self-start w-[100%] max-w-[1000px]">
                                After Installation, make the <span className="secondary-bg inline px-[5px] py-[2px] rounded">sonar-scanner.bat</span> binary available at PATH.
                                You can find the binary at <span className="secondary-bg inline px-[5px] py-[2px] rounded">sonarScannerFolder/bin/sonar-scanner.bat</span>.
                            </p>
                            <button onClick={checkSonarScanner} className="row-start-4 col-start-2 py-[10px] px-[15px] secondary-bg text-[20px] rounded mt-[10px] place-self-start">
                                {
                                    !state.sonarScannerState.checkingValid &&
                                    <p>Check</p>
                                }
                                {
                                    state.sonarScannerState.checkingValid &&
                                    <p>Loading</p>
                                }
                            </button>
                        </div>

                        <div className="mt-[70px] w-[100%] flex flex-row justify-start items-center gap-[10px]">
                            <button className="px-[15px] py-[10px] white-bg black" onClick={() => setState({...state, step: 2})}>Back</button>
                            {
                                state.sonarScannerState.valid &&
                                <button className="px-[15px] py-[10px] secondary-bg" onClick={() => setSetup()}>DONE!!</button>
                            }
                        </div>
                    </div>
                }

{
                    state.step === 4 &&
                    <div className="w-[100%] max-w-[1300px] min-h-[200px] flex flex-col justify-start items-start white">
                        <h1 className="text-[40px] font-bold">And That&apos;s all. Restart SONAREP, Run <span className="secondary-bg inline px-[5px] py-[2px] rounded">npm run setupstart</span> again and you good to go!</h1>

                        <div className="mt-[70px] w-[100%] flex flex-row justify-start items-center gap-[10px]">
                            <button className="px-[15px] py-[10px] white-bg black" onClick={() => setState({...state, step: 3})}>Back</button>

                        </div>
                    </div>
                }

            </div>
        </>
    )
}