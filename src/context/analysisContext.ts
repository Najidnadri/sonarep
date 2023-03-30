import { createContext, Dispatch, SetStateAction } from "react";


interface History {
    date: string,
    value: string
}

interface Measure {
    metric: string,
    history: History[]
}

export interface Analysis {
    paging?: {
        pageIndex: number,
        pageSize: number,
        total: number
    },
    measures?: Measure[],
    __status__?: string
}

export interface AnalysisState {
    analysis?: Analysis,
    setAnalysis?: Dispatch<SetStateAction<Analysis>>
}

// interface SocketState {
//     socket?: string,
//     setSocket?: string
// }

export const AnalysisContext = createContext<AnalysisState>({});

