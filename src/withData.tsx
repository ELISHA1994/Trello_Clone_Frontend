import React, { PropsWithChildren, ComponentType } from "react"
import { AppState } from "./AppStateContext"

export const withData = ( WrappedComponent: ComponentType<PropsWithChildren<{initialState: AppState}>> ) => {
    return ({ children }: PropsWithChildren<{}>) => {
        const initialState: AppState = { lists: [], draggedItem: undefined }

        // Here wil go the logic of our HOC

        return (
            <WrappedComponent initialState={initialState}>
                {children}
            </WrappedComponent>
        )
    }
}
