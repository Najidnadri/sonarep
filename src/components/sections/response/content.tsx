import { AnalysisContext } from "@/context/analysisContext";
import { useContext } from "react";


export default function ResponseContent() {
    function getIndex(key: string): number {
        let res = -1;
        analysis?.measures.forEach((measure, index) => {
            if (measure.metric === key) {
                res = index
            }
        })
        return res
    }

    let {analysis, setAnalysis} = useContext(AnalysisContext);

    return (
        <>  

            <div className="w-[100%] max-w-[1300px] min-h-[400px] border mx-auto mt-[40px] grid grid-cols-[1fr_1fr] gap-[10px]">
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">BUGS</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('bugs')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">CODE SMELLS</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('code_smells')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">COVERAGE</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('coverage')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">DUPLICATES</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('duplicated_lines_density')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">NCLOC</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('ncloc')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">RELIABILITY</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('reliability_rating')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">SECURITY</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('security_rating')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">SQALE INDEX</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('sqale_index')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">SQALE RATING</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('sqale_rating')].history[0].value}</p>
                </div>
                <div className="w-[100%] h-[250px] secondary-bg rounded-xl flex flex-col justify-center items-center">
                    <h2 className="text-[45px] white font-bold">VULNERABILITIES</h2>
                    <p className="text-[100px] white font-semibold">{analysis?.measures[getIndex('vulnerabilities')].history[0].value}</p>
                </div>
            </div>  
        </>
    )
}