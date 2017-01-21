import { connect } from "react-redux";
const
    React = require("react"),
    AppActions = require("./AppActions"),
    Board = require("./../components/Board");

const AppRoute = React.createClass({

    ClickHandler(gridItem, gridIndex){
        return this.props.onGridItemClickAction(gridItem, gridIndex, this.props.app.turn)
    },

    render() {
        return (
            <div className="AppRoute">
                <h2>Now turn of {this.props.app.turn}</h2>
                <Board grid={this.props.app.grid} onGridItemClick={this.ClickHandler}/>
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
        onGridItemClickAction: (gridItem, gridIndex, currentTurn) => {
            return dispatch(AppActions.onGridItemClick(gridItem, gridIndex, currentTurn))
        }
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AppRoute);