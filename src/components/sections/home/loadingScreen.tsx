import styles from '@/styles/homeloading.module.css'

export default function LoadingScreen() {
    return (
        <>
            <div className={"fixed z-[99] top-0 left-0 right-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center " + styles.loadingscreen}>
                <div className="h-[100px] w-[100px] rounded-3xl primary-bg animate-spin">

                </div>
                <h2 className='white text-[25px] mt-[50px] font-semibold'>Analyzing your repo...</h2>
            </div>
        </>
    )
}