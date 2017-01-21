const _ = require("lodash");

const onGridItemClick = (grid, gridItem, gridIndex, currentTurn) => {
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
                nextTurn: currentTurn === 'X' ? 'O' : 'X'
            })

            const
                Xarray = ["X", "X", "X"],
                Oarray = ["O", "O", "O"];

            // Start Matching Horizontally
            let gridBreakHoriz = _.chunk(grid, 3);

            gridBreakHoriz.map((items) => {
                if(_.isEqual(items, Xarray)){
                    dispatch({
                        type: "SET_X",
                        winner: _.take(items).toString()
                    })
                    dispatch({
                        type: "GAME_END"
                    })
                }
                if(_.isEqual(items, Oarray)){
                    dispatch({
                        type: "SET_O",
                        winner: _.take(items).toString()
                    })
                    dispatch({
                        type: "GAME_END"
                    })
                }
            })            
            // End Matching Horizontally

            // Start Matching Vertically
            let gridBreakVert = grid,
                vertical1 = [],
                vertical2 = [],
                vertical3 = [];
            gridBreakVert.map((item, index) => {
                if(item)
                    if(index == 0 || index == 3 || index == 6)
                        vertical1.push(item)
                    if(index == 1 || index == 4 || index == 7)
                        vertical2.push(item)
                    if(index == 2 || index == 5 || index == 8)
                        vertical3.push(item)
            })
            if(_.isEqual(vertical1, Xarray) || _.isEqual(vertical2, Xarray) || _.isEqual(vertical3, Xarray)){
                dispatch({
                    type: "SET_X",
                    winner: _.take(Xarray).toString()
                })
                dispatch({
                    type: "GAME_END"
                })
            }
            if(_.isEqual(vertical1, Oarray) || _.isEqual(vertical2, Oarray) || _.isEqual(vertical3, Oarray)){
                dispatch({
                    type: "SET_O",
                    winner: _.take(Oarray).toString()
                })
                dispatch({
                    type: "GAME_END"
                })
            }
            // End Matching Vertically

            // Start Matching Cross
            let gridBreakCross = grid,
                cross1 = [],
                cross2 = [];
            gridBreakCross.map((item, index) => {
                if(item)
                    if(index == 0 || index == 4 || index == 8)
                        cross1.push(item)
                    if(index == 2 || index == 4 || index == 6)
                        cross2.push(item)
            })
            if(_.isEqual(cross1, Xarray) || _.isEqual(cross2, Xarray)){
                dispatch({
                    type: "SET_X",
                    winner: _.take(Xarray).toString()
                })
                dispatch({
                    type: "GAME_END"
                })
            }
            if(_.isEqual(cross1, Oarray) || _.isEqual(cross2, Oarray)){
                dispatch({
                    type: "SET_O",
                    winner: _.take(Oarray).toString()
                })
                dispatch({
                    type: "GAME_END"
                })
            }
            // End Matching Cross
        }
    }
}

const onPlayAgainClick = () => {
    return {
        type: "PLAY_AGAIN"
    }
}

module.exports = {
    onGridItemClick,
    onPlayAgainClick
}