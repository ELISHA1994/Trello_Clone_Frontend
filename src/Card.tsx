import React, {useRef} from "react"
import {useDrop} from "react-dnd"

import {useItemDrag} from "./useItemDrag"
import {isHidden} from "./utills/isHidden"
import {useAppState} from "./AppStateContext"
import {CardDragItem} from "./DragItem"
import { CardContainer } from "./styles"

interface CardProps {
    text: string
    index: number
    id: string
    columnId: string
    isPreview?: boolean
}

export const Card = ({ text, index, id, columnId, isPreview }: CardProps) => {
    const { state, dispatch } = useAppState()

    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId })
    const [, drop] = useDrop({
        accept: "CARD",
        hover(item: CardDragItem) {

            if (item.id === id) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            const sourceColumn = item.columnId
            const targetColumn = columnId

            dispatch({
                type: "MOVE_TASK",
                payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
            })
            item.index = hoverIndex
            item.columnId = targetColumn
        }
    })

    drag(drop(ref))

    return <CardContainer
        ref={ref}
        isHidden={isHidden(isPreview, state.draggedItem, 'CARD', id)}
        isPreview={isPreview}
    >
        {text}
    </CardContainer>
}
