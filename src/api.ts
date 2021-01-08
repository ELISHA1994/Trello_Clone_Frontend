import { AppState } from "./AppStateContext"

export const save = (payload: AppState) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}save`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            return response.json()
        })
        .catch(e => console.error(e))
}

export const load = () => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}load`)
        .then((response) => {
            return response.json() as Promise<AppState>
        })
}
