import { connect } from "react-redux";
const
    React = require("react"),
    AppActions = require("./AppActions"),
    Board = require("./../components/Board");

const AppRoute = React.createClass({

    ClickHandler(gridItem, gridIndex){
        if(this.props.app.start)
            return this.props.onGridItemClickAction(this.props.app.grid, gridItem, gridIndex, this.props.app.turn)
    },

    PlayHandler(){
        return this.props.onPlayAgainClickAction()
    },

    render() {
        const self = this
        return (
            <div className="AppRoute">
                {(() => {
                    if(this.props.app.turn)
                        return <h2>Now turn of {this.props.app.turn}</h2>
                    else if(this.props.app.winner)
                        return <h2>Winner is {this.props.app.winner}!</h2>
                    else
                        return <h2>Game draw :(</h2>
                })()}
                <Board grid={this.props.app.grid} onGridItemClick={this.ClickHandler}/>
                {(() => {
                    if(self.props.app.winner)
                        return <button className="btn-primary" onClick={this.PlayHandler}>Play Again</button>
                })()}
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGridItemClickAction: (grid, gridItem, gridIndex, currentTurn) => {
            return dispatch(AppActions.onGridItemClick(grid, gridItem, gridIndex, currentTurn))
        },
        onPlayAgainClickAction: () => {
            return dispatch(AppActions.onPlayAgainClick())
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AppRoute);