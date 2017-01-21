const
    React = require("react"),
    GridItem = require("./GridItem");

module.exports = React.createClass({

    propTypes:{
        grid: React.PropTypes.array,
        onGridItemClick: React.PropTypes.func
    },

    getDefaultProps(){
        return {
            grid: []
        }
    },

    render(){
        const self = this;
        return (
            <ul className="Board">
                {this.props.grid.map((item, index) => {
                    return <GridItem
                        key = {index}
                        mark = {item}
                        onClick = {() => {
                            self.props.onGridItemClick(item, index)
                        }}
                    />
                })}
            </ul>
        )
    }

})