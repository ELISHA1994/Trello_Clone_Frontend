import React, { useState } from "react"

import { useFocus } from "./utills/useFocus"
import {
    NewItemFormContainer,
    NewItemButton,
    NewItemInput
} from "./styles"

interface NewItemFormProps {
    onAdd(text: string): void
}

export const NewItemForm = (props: NewItemFormProps) => {
    const [text, setText] = useState("")
    const inputRef = useFocus()
    const { onAdd } = props

    return (
        <NewItemFormContainer>
            <NewItemInput
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <NewItemButton onClick={() => onAdd(text)}>
                Create
            </NewItemButton>
        </NewItemFormContainer>
    )
}
