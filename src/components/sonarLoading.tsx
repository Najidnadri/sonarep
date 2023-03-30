interface Props {
    startCmd: string,
    progress: string,
}

export default function SonarLoading(props: Props) {

    return (
        <div className='fixed z-[99] top-0 right-0 left-0 bottom-0 h-[100vh] w-100% overflow-hidden primary-bg white flex flex-col justify-center items-center p-[20px]'>
            {
                props.progress === 'init' &&
                <div>
                    <h1 className='init-sonar-text text-[30px] font-bold text-center'>Initializing SonarQube...</h1>
                    <p className="init-sonar-text text-[20px] break-words w-[100%] text-center mt-[20px]"><strong>Executing: </strong>{props.startCmd}</p>
                    <p className="text-[14px] font-extralight text-center absolute bottom-[20px] left-[50%] translate-x-[-50%] w-[100%] max-w-[600px] px-[20px] ">To Change the executing command, please do so in the .env file for field: <strong>SONARQUBESTARTCMD</strong></p>
                </div>
            }
            {
                props.progress === 'login' &&
                <div>
                    <h1 className='init-sonar-text text-[30px] font-bold text-center'>Logging In...</h1>
                    <p className="init-sonar-text text-[20px] break-words w-[100%] text-center mt-[20px]">Logging in for username: <strong>{process.env.NEXT_PUBLIC_USERNAME}</strong></p>
                    <p className="text-[14px] font-extralight text-center absolute bottom-[20px] left-[50%] translate-x-[-50%] w-[100%] max-w-[600px] px-[20px]">To Change the username & password, please do so in the .env file for field: <strong>NEXT_PUBLIC_USERNAME</strong> & <strong>NEXT_PUBLIC_USERPASSWORD</strong></p>
                </div>
            }

        </div>
    )
}