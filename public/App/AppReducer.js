module.exports = (state = {
    grid: ["", "", "", "", "", "", "", "", ""],
    turn: "x"
}, action) => {
    switch (action.type){
        case "UPDATE_BOARD":
            return Object.assign({}, state, (
                state.grid[action.gridIndex] = action.currentTurn
            ))
        case "NEXT_TURN":
            return Object.assign({}, state, {
                turn: action.nextTurn
            })
        default:
            return state
    }
}