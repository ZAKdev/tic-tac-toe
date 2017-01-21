const React = require("react");

module.exports = React.createClass({

	propTypes:{
        mark: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    render(){
        return (
            <li className={'GridItem ' + this.props.mark} onClick={this.props.onClick}></li>
        )
    }

})