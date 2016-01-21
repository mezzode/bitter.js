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
var Listen = React.createClass({
    componentDidMount: function() {
        $.ajax({
            url: 'user/' + this.props.user + '/details',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.id, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var data = this.state.data;
        if (!data) return (<div></div>);
        var user = this.props.user;
        var name = data.full_name;
        var pic = 'user/' + user + '/picture';
        return (
            <a href={'/user/'+user} className="list-group-item">
                <div className="media">
                    <div className="media-left">
                        <img style="max-width:64px; max-height:64px;" className="media-object" src={pic}/>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{name}<br/><small>{user}</small></h4>
                    </div>
                </div>
            </a>
        );
    }
});
var Listens = React.createClass({
    render: function() {
        var listenNodes = this.props.map(function(user) {
            return (<Listen user={user}/>);
        });
        return (
            <li class="list-group-item">
                <h3 class="list-group-item-heading">Listens</h3>
                <div class="list-group">
                    {listenNodes}
                </div>
            </li>
        );
    }
});
ReactDOM.render(
    <Details/>,
    document.getElementById('details')
);
