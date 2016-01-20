var page = 1;
var Bleat = React.createClass({
    getInitialState: function() {
        return {conversation: [], replies: []};
    },
    componentDidMount: function() {
        this.getConversation();
        this.getReplies();
    },
    getConversation: function() {
        $.ajax({
            url: 'bleat/' + this.props.bleatId + '/conversation',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({conversation: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.id, status, err.toString());
            }.bind(this)
        });
    },
    getReplies: function() {
        $.ajax({
            url: 'bleat/' + this.props.bleatId + '/replies',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({replies: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.id, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var bleat = this.props.bleatId;
        var conversationNode, repliesNode;
        var conversation = this.state.conversation;
        var replies = this.state.replies;
        if (conversation.length > 0)
            conversationNode = <BleatConversation data={conversation} bleatId={bleat}/>;
        if (replies.length > 0)
            repliesNode = <BleatReplies data={replies} bleatId={bleat}/>;
        return (
            <div id="2041929361" className="panel panel-default">
                <BleatMain bleatId={bleat}/>
                <BleatReply bleatId={bleat}/>
                {conversationNode}
                {repliesNode}
            </div>
        )
    }
});
var BleatReply = React.createClass({
    render: function() {
        var id = this.props.bleatId;
        return (
           <div className="collapse panel-collapse" id={id+'-reply'} aria-expanded="false">
                <ul className="list-group">
                    <li className="list-group-item">
                        <p className="list-group-item-text"><a href="?new-user=True">Sign Up</a> or <a href="" data-toggle="modal" data-target="#log-in">Login</a> to reply to this bleat</p>
                    </li>
                 </ul>
            </div> 
        );
    }
});
var BleatConversation = React.createClass({
    render: function() {
        var bleatChainNodes = this.props.data.map(function(bleat) {
            return (<BleatSub bleatId={bleat}/>);
        });
        var id = this.props.bleatId;
        return (
            <div className="panel-collapse collapse" id={id+'-conversations'} aria-expanded="false" style={{height: '0px'}}>
                <ul className="list-group">
                    {bleatChainNodes}
                    <li className="list-group-item">
                        <a style={{color: 'inherit'}} className="list-group-item-heading" href="?user=JuliannaWoman78"><h4 className="list-group-item-heading">JuliannaWoman78</h4></a>
                        <p className="lead">@CrazyMarisa28 nope. baby's due in 5th may! getting closer but still 1001 things not done</p>
                        <a href="?bleat=2041928103" style={{marginTop: '-4px'}} className="btn-sm btn btn-link pull-right"><span className="glyphicon glyphicon-link"></span></a>
                        <ul className="list-inline">
                            <li><small>11:43:38 PM</small></li>
                            <li><small>Wednesday, 07 October 2015</small></li>
                            <li><small>Location: -33.7398, 151.2985</small></li>
                        </ul>
                    </li>
                    <li className="list-group-item">
                        <a style={{color: 'inherit'}} className="list-group-item-heading" href="?user=CupcakeGal95"><h4 className="list-group-item-heading">CupcakeGal95</h4></a>
                        <p className="lead">@FunnyGenius47 connor, it's me, febi  are you really really mad at me??</p>
                        <a href="?bleat=2041921106" style={{marginTop: '-4px'}} className="btn-sm btn btn-link pull-right"><span className="glyphicon glyphicon-link"></span></a>
                        <ul className="list-inline">
                            <li><small>08:01:01 PM</small></li>
                            <li><small>Wednesday, 07 October 2015</small></li>
                            <li><small>Location: -33.8226, 151.1926</small></li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
});
var BleatReplies = React.createClass({
    render: function() {
        var id = this.props.bleatId;
        return (
            <div className="collapse panel-collapse" id={id+'-replies'} aria-expanded="false">
                <ul className="list-group">
                    <BleatSub bleatId={id}/>
                </ul>
            </div>
        );
    }
});
var BleatSub = React.createClass({
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
        var id = this.props.bleatId;
        if (!data) return (<div></div>);
        var date = new Date(data.time * 1000);
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var suffix;
        if (hour === 0) {
            hour = 12;
            suffix = 'AM';
        } else if (hour === 12) {
            suffix = 'PM';
        } else if (hour > 12) {
            hour -= 12;
            suffix = 'PM';
        } else {
            suffix = 'AM';
        }
        if (hour < 10)
            hour = '' + '0' + hour
        if (min < 10)
            min = '' + '0' + min
        if (sec < 10)
            sec = '' + '0' + sec
        return (
            <li className="list-group-item">
                <a style={{color: 'inherit'}} className="list-group-item-heading" href={'/users/' + data.username}><h4 className="list-group-item-heading">{data.username}</h4></a>
                <p className="lead">{data.bleat}</p>
                <a href={'?bleat='+id} style={{marginTop: '-4px'}} className="btn-sm btn btn-link pull-right"><span className="glyphicon glyphicon-link"></span></a>
                <ul className="list-inline">
                    <li><small>{hour}:{min}:{sec} {suffix}</small></li>
                    <li><small>{date.toDateString()}</small></li>
                    <li><small>Location: {data.latitude}, {data.longitude}</small></li>
                </ul>
            </li>
        );
    }
});
var BleatMain = React.createClass({
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
        var id = this.props.bleatId;
        if (!data) return (<div></div>);
        var date = new Date(data.time * 1000);
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var suffix;
        if (hour === 0) {
            hour = 12;
            suffix = 'AM';
        } else if (hour === 12) {
            suffix = 'PM';
        } else if (hour > 12) {
            hour -= 12;
            suffix = 'PM';
        } else {
            suffix = 'AM';
        }
        if (hour < 10)
            hour = '' + '0' + hour
        if (min < 10)
            min = '' + '0' + min
        if (sec < 10)
            sec = '' + '0' + sec
        return (
            <div className="list-group">
                <div className="list-group-item">
                    <a style={{color: 'inherit'}} className="list-group-item-heading" href={'/users/' + data.username}><h4 className="list-group-item-heading">{data.username}</h4></a>
                    <p className="lead">{data.bleat}</p>
                    <ul className="list-inline">
                        <li><small>{hour}:{min}:{sec} {suffix}</small></li>
                        <li><small>{date.toDateString()}</small></li>
                        <li><small>Location: {data.latitude}, {data.longitude}</small></li>
                    </ul>
                    <a href={'?bleat='+id} className="btn-sm btn btn-link pull-right"><span className="glyphicon glyphicon-link"></span></a>
                    <div className="btn-group btn-group-sm">
                        <a className="btn btn-link collapsed" data-toggle="collapse" data-parent={'#'+id} href={'#'+id+'-reply'} aria-expanded="false"><small>Reply</small></a>
                        <a className="btn btn-link collapsed" data-toggle="collapse" data-parent={'#'+id} href={'#'+id+'-conversations'} aria-expanded="false"><small>View conversation</small></a>
                        <a className="btn btn-link collapsed" data-toggle="collapse" data-parent={'#'+id} href={'#'+id+'-replies'} aria-expanded="false"><small>View replies</small></a>
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
var user = 'James41'
ReactDOM.render(
    <Bleats url={'user/' + user + '/bleats?page=' + page} pollInterval={2000}/>,
    document.getElementById('content')
);
