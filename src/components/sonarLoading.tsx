
export default function SonarLoading() {

    return (
        <div className='fixed z-[99] top-0 right-0 left-0 bottom-0 h-[100vh] w-100% overflow-hidden primary-bg white flex flex-col justify-center items-center p-[20px]'>
            <h1 className='init-sonar-text text-[30px] font-bold text-center'>Initializing SonarQube...</h1>
            <p className="init-sonar-text text-[20px] break-words w-[100%] text-center mt-[20px]"><strong>Executing: </strong>{process.env.SONARQUBESTARTCMD}</p>
        </div>
    )
}