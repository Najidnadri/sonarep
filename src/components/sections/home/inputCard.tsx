import { useState } from "react"


export default function InputCard() {
    /*
        VARIABLES
    */
    const [loading, setloading] = useState(false);

    /*
        EVENT HANDLERS
    */
    let analyze = () => {
        setloading(true)
    }


    return (
        <>
            <div className="p-[20px] pt-[70px] h-[100vh] h-[100svh] min-h-[800px] white-bg w-[100%] flex justify-center items-center">
                <div className="card w-[100%] max-w-[600px] rounded-2xl overflow-hidden secondary-bg flex flex-col justify-start items-center white p-[30px] gap-[5px]">
                    <h1 className="text-6xl font-semibold">Github link</h1>
                    <input type="text" className="w-[100%] max-w-[500px] mt-[15px] text-3xl black py-[10px] px-[15px] rounded" placeholder="https://github.com/Najidnadri/sonarep"/>
                    <button className="w-[100%] max-w-[200px] mt-[30px] primary-bg px-[15px] py-[10px]" onClick={analyze}>
                        {!loading && <p>Analyze</p>}
                        {loading && <p>Loading</p>}
                    </button>
                </div>
            </div>
        </>
    )
}