import React, { createContext, useContext, useReducer, useEffect, Dispatch } from "react"
import { v4 as uuid } from "uuid"
import {findItemIndexById} from "./utills/findItemIndexById"
import { moveItem } from "./moveItem"
import { DragItem } from "./DragItem";
import {save} from "./api"
import { withData } from "./withData"

interface Task {
    id: string
    text: string
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

export interface AppState {
    lists: List[]
    draggedItem: DragItem | undefined
}

interface AppStateContextProps {
    state: AppState
    dispatch: Dispatch<Action>
}

type Action =
    | {
        type: "ADD_LIST"
        payload: string
}
    | {
        type: "ADD_TASK"
        payload: { text: string; taskId: string }
}
    | {
        type: "MOVE_LIST"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
}
    | {
        type: "MOVE_TASK"
        payload: {
            dragIndex: number
            hoverIndex: number
            sourceColumn: string
            targetColumn: string
        }
}
    | {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
}


const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type)  {
        case "ADD_LIST": {
            // Reducer logic here...
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuid(), text: action.payload, tasks: [] }
                ]
            }
        }
        case "ADD_TASK": {
            // Reducer logic here...
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            )
            state.lists[targetLaneIndex].tasks.push({
                id: uuid(),
                text: action.payload.text
            })
            return {
                ...state
            }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return { ...state }
        }
        case "SET_DRAGGED_ITEM": {
            return { ...state, draggedItem: action.payload }
        }
        case "MOVE_TASK": {
            const {
                dragIndex,
                hoverIndex,
                sourceColumn,
                targetColumn
            } = action.payload
            const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn)
            const targetLaneIndex = findItemIndexById(state.lists, targetColumn)
            const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex,1)[0]
            state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
            return { ...state }
        }
        default: {
            return state
        }
    }
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = withData(({children, initialState}: React.PropsWithChildren<{initialState: AppState}>) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState)

    useEffect(() => {
        save(state).then(r => console.log(r))
    }, [state])

    return (
        <AppStateContext.Provider
            value={{ state, dispatch }}
        >
            {children}
        </AppStateContext.Provider>
    )
})

export const useAppState = () => {
    return useContext(AppStateContext)
}
