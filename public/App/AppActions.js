const onGridItemClick = (gridItem, gridIndex, currentTurn) => {
    return (dispatch) => {
        if(gridItem == ""){
            dispatch ({
                type: "UPDATE_BOARD",
                gridItem: gridItem,
                gridIndex: gridIndex,
                currentTurn: currentTurn
            })

            dispatch ({
                type: "NEXT_TURN",
                nextTurn: currentTurn === 'x' ? 'o' : 'x'
            })
        }
    }
}

module.exports = {
    onGridItemClick
}