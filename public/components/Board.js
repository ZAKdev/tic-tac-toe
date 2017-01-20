const React = require("react");

module.exports = React.createClass({

    render(){
        return (
            <div className="Board">
                {this.props.text}
            </div>
        )
    }

})