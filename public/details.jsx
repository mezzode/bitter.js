var Details = React.createClass({
    render: function() {
        return (
            <div className="panel panel-primary">
                <div className="panel-body">
                    <img src="dataset-medium/users/James41/profile.jpg" className="img-responsive" alt="Profile Picture"/>
                    <h2>James Franco<br/><small>James41</small></h2>
                </div>
            </div>
        );
    }
});
ReactDOM.render(
    <Details/>,
    document.getElementById('details')
);
