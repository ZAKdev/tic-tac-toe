import { connect } from "react-redux";
const
    React = require("react"),
    Board = require("./../components/board");

const AppRoute = React.createClass({
    
    render(){
        return (
            <div className="AppRoute">
                Testing React Route
                <Board text="Board for tic tac toe"/>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    return {
        app: state.app
    }
}

module.exports = connect(mapStateToProps)(AppRoute);