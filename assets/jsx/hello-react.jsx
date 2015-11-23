var HelloWorld = React.createClass({
    render: function() {
        return (
            <p>
            Hello,<input type="text" placeholder="your name here"/>!
            It is {this.props.date.toTimeString()}
            </p>
        );
    }


});
setInterval(function() {
    React.render(
        <HelloWorld date={new Date()}></HelloWorld>, document.getElementById('example'));
}, 500);
