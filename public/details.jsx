var Details = React.createClass({
    getInitialState: function() {
        return {data: {}};
    },
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
        var pic = 'user/' + user + '/picture';
        var name = data.full_name;
        var listens = data.listens;
        return (
            <div className="panel panel-primary">
                <div className="panel-body">
                    <img src={pic} className="img-responsive" alt="Profile Picture"/>
                    <h2>{name}<br/><small>{user}</small></h2>
                </div>
                <ul className="list-group">
                    <Listens listens={listens}/>
                </ul>
            </div>
        );
    }
});
var Listen = React.createClass({
    getInitialState: function() {
        return {data: {}};
    },
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
                        <img style={{maxWidth:'64px', maxHeight:'64px'}} className="media-object" src={pic}/>
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
        var listens = this.props.listens;
        if (!listens) return (<div></div>);
        var listenNodes = listens.map(function(user) {
            return (<Listen user={user}/>);
        });
        return (
            <li className="list-group-item">
                <h3 className="list-group-item-heading">Listens</h3>
                <div className="list-group">
                    {listenNodes}
                </div>
            </li>
        );
    }
});
var user = 'James41';
ReactDOM.render(
    <Details user={user}/>,
    document.getElementById('details')
);
