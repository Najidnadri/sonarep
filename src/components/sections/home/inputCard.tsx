import { SocketContext } from "@/context/socket";
import { MouseEventHandler, useContext, useState } from "react"

interface CardProps {
    handleSubmit: (url: string) => void,
}

export default function InputCard(props: CardProps) {
    /*
        VARIABLES
    */
    const {socket, setSocket} = useContext(SocketContext);
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    /*
        EVENT HANDLERS
    */
    let writeSocket = (event: any) => {
        setInput(event.target.value);
        socket?.emit('input-change', event.target.value)
    }

    let startAnalyze = () => {
        if (input.startsWith('https://github.com/') || input.startsWith('git@github.com:')) {
            setError(false);
            props.handleSubmit(input);
        } else {
            setError(true);
        }
    }


    return (
        <>
            <div className="p-[20px] pt-[70px] h-[100vh] h-[100svh] min-h-[800px] white-bg w-[100%] flex justify-center items-center relative z-[20]">
                <div className="card w-[100%] max-w-[600px] rounded-2xl overflow-hidden secondary-bg flex flex-col justify-start items-center white p-[30px] gap-[5px]">
                    <h1 className="text-6xl font-semibold">Github link</h1>
                    
                    <input type="text" value={input} onChange={writeSocket}
                        className="w-[100%] max-w-[500px] mt-[15px] text-3xl black py-[10px] px-[15px] rounded"
                        placeholder="https://github.com/Najidnadri/sonarep"
                     />
                     {error && <p className="text-[16px] white mt-5px">Link must start with &apos;https://github.com/&apos;</p>}

                    <button className="w-[100%] max-w-[200px] mt-[30px] primary-bg px-[15px] py-[10px]" onClick={startAnalyze}>
                        Analyze
                    </button>
                    
                </div>
            </div>
        </>
    )
}