var page = 1;
var Bleat = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: 'bleat/' + this.props.bleatId,
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
        return (
            <div className="panel panel-default">
                <div className="list-group">
                    <div className="list-group-item">
                        <a style={{color: "inherit"}} className="list-group-item-heading" href={'api/users/' + data.username}><h4 className="list-group-item-heading">{data.username}</h4></a>
                        <p className="lead">{data.bleat}</p>
                        <ul className="list-inline">
                            <li><small>12:32:42 AM</small></li>
                            <li><small>Thursday, 08 October 2015</small></li>
                            <li><small>Location: {data.latitude}, {data.longitude}</small></li>
                        </ul>
                        <a href="?bleat=2041929361" className="btn-sm btn btn-link pull-right"><span className="glyphicon glyphicon-link"></span></a>
                        <div className="btn-group btn-group-sm">
                            <a className="btn btn-link collapsed" data-toggle="collapse" data-parent="#2041929361" href="#2041929361-reply" aria-expanded="false"><small>Reply</small></a>
                            <a className="btn btn-link collapsed" data-toggle="collapse" data-parent="#2041929361" href="#2041929361-conversations" aria-expanded="false"><small>View conversation</small></a>
                            <a className="btn btn-link collapsed" data-toggle="collapse" data-parent="#2041929361" href="#2041929361-replies" aria-expanded="false"><small>View replies</small></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
var Bleats = React.createClass({
    getInitialState: function() {
        return {data: [], new_bleats: false};
    },
    componentDidMount: function() {
        this.loadBleats();
    },
    loadBleats: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                var handle = setInterval(this.checkBleats, this.props.pollInterval);
                this.setState({data: data, new_bleats: false, handle: handle});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    checkBleats: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                if (data.length !== this.state.data.length) {
                    this.setState({new_bleats: true});
                    return;
                }
                var changed = false;
                for (var i in data) {
                    if (data[i] !== this.state.data[i])
                        changed = true;
                }
                this.setState({new_bleats: changed});
                if (changed)
                    clearInterval(this.state.handle);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var bleatNodes = this.state.data.map(function(bleat) {
            return (
                <Bleat key={bleat} bleatId={bleat}/>
            );
        });
        var BleatUpdater;
        if (this.state.new_bleats)
            BleatUpdater = (<button className="btn btn-default" onClick={this.loadBleats}>Test</button>);
        return (
            <div>
                {BleatUpdater}
                {bleatNodes}
            </div>
        );
    }
});
var user = "James41";
ReactDOM.render(
    <Bleats url={'user/' + user + '/bleats?page=' + page} pollInterval={2000}/>,
    document.getElementById('content')
);
