import React, { useState } from "react"

import {NewItemForm} from "./NewItemForm"
import { AddItemButton } from "./styles"

interface AddNewItemProps {
    onAdd(text: string): void
    toggleButtonText: string
    dark?: boolean
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState(false)
    const { onAdd, toggleButtonText, dark } = props;

    if (showForm) {
        // we show ite creation form here
        return (
            <NewItemForm
                onAdd={text => {
                    onAdd(text)
                    setShowForm(false)
                }}
            />
        )
    }

    // return <button onClick={() => setShowForm(true)}>{toggleButtonText}</button>
    return (
        <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}
