(function() {
    'use strict';
    const page = 1;
    const Bleat = React.createClass({
        getInitialState() {
            return {conversation: [], replies: [], data: []};
        },
        componentDidMount() {
            this.getData();
            this.getConversation();
            this.getReplies();
        },
        getData() {
            $.ajax({
                url: 'bleat/' + this.props.bleatId,
                dataType: 'json',
                cache: false,
                success: (data) => {
                    this.setState({data});
                },
                error: (xhr, status, err) => {
                    console.error(this.props.id, status, err.toString());
                }
            });
        },
        getConversation() {
            $.ajax({
                url: 'bleat/' + this.props.bleatId + '/conversation',
                dataType: 'json',
                cache: false,
                success: (data) => {
                    this.setState({conversation: data});
                },
                error: (xhr, status, err) => {
                    console.error(this.props.id, status, err.toString());
                }
            });
        },
        getReplies() {
            $.ajax({
                url: 'bleat/' + this.props.bleatId + '/replies',
                dataType: 'json',
                cache: false,
                success: (data) => {
                    this.setState({replies: data});
                },
                error: (xhr, status, err) => {
                    console.error(this.props.id, status, err.toString());
                }
            });
        },
        render() {
            const data = this.state.data;
            if (!data) return (<div></div>);
            const id = this.props.bleatId;
            const date = new Date(data.time * 1000);
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            let suffix;
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
            let conversationNode, repliesNode, conversationButton, repliesButton;
            const conversation = this.state.conversation;
            const replies = this.state.replies;
            if (conversation.length > 0) {
                conversationNode = <BleatConversation data={conversation} bleatId={id}/>;
                conversationButton = <a className="btn btn-link collapsed" data-toggle="collapse" data-parent={'#'+id} href={'#'+id+'-conversations'} aria-expanded="false"><small>View conversation</small></a>;
            }
            if (replies.length > 0) {
                repliesNode = <BleatReplies data={replies} bleatId={id}/>;
                repliesButton = <a className="btn btn-link collapsed" data-toggle="collapse" data-parent={'#'+id} href={'#'+id+'-replies'} aria-expanded="false"><small>View replies</small></a>;
            }
            return (
                <div id={id} className="panel panel-default">
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
                                {conversationButton}
                                {repliesButton}
                            </div>
                        </div>
                    </div>
                    <BleatReply bleatId={id}/>
                    {conversationNode}
                    {repliesNode}
                </div>
            )
        }
    });
    const BleatReply = React.createClass({
        render() {
            const id = this.props.bleatId;
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
    const BleatConversation = React.createClass({
        render() {
            const bleatChainNodes = this.props.data.map(function(bleat) {
                return (<BleatSub bleatId={bleat}/>);
            });
            const id = this.props.bleatId;
            return (
                <div className="panel-collapse collapse" id={id+'-conversations'} aria-expanded="false" style={{height: '0px'}}>
                    <ul className="list-group">
                        {bleatChainNodes}
                    </ul>
                </div>
            );
        }
    });
    const BleatReplies = React.createClass({
        render() {
            const bleatChainNodes = this.props.data.map(function(bleat) {
                return (<BleatSub bleatId={bleat}/>);
            });
            const id = this.props.bleatId;
            return (
                <div className="collapse panel-collapse" id={id+'-replies'} aria-expanded="false">
                    <ul className="list-group">
                        {bleatChainNodes}
                    </ul>
                </div>
            );
        }
    });
    const BleatSub = React.createClass({
        getInitialState() {
            return {data: []};
        },
        componentDidMount() {
            $.ajax({
                url: 'bleat/' + this.props.bleatId,
                dataType: 'json',
                cache: false,
                success: (data) => {
                    this.setState({data});
                },
                error: (xhr, status, err) => {
                    console.error(this.props.id, status, err.toString());
                }
            });
        },
        render() {
            const data = this.state.data;
            const id = this.props.bleatId;
            if (!data) return (<div></div>);
            const date = new Date(data.time * 1000);
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            let suffix;
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
    const Bleats = React.createClass({
        getInitialState() {
            return {data: [], new_bleats: false};
        },
        componentDidMount() {
            this.loadBleats();
        },
        loadBleats() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: (data) => {
                    const handle = setInterval(this.checkBleats, this.props.pollInterval);
                    this.setState({data, new_bleats: false, handle});
                },
                error: (xhr, status, err) => {
                    console.error(this.props.url, status, err.toString());
                }
            });
        },
        checkBleats() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: (data) => {
                    if (data.length !== this.state.data.length) {
                        this.setState({new_bleats: true});
                        return;
                    }
                    let changed = false;
                    for (const i in data) {
                        if (data[i] !== this.state.data[i])
                            changed = true;
                    }
                    this.setState({new_bleats: changed});
                    if (changed)
                        clearInterval(this.state.handle);
                },
                error: (xhr, status, err) => {
                    console.error(this.props.url, status, err.toString());
                }
            });
        },
        render() {
            const bleatNodes = this.state.data.map(function(bleat) {
                return (
                    <Bleat key={bleat} bleatId={bleat}/>
                );
            });
            let bleatUpdater;
            if (this.state.new_bleats)
                bleatUpdater = (<button className="btn btn-default" onClick={this.loadBleats}>Test</button>);
            return (
                <div>
                    {bleatUpdater}
                    {bleatNodes}
                    <Paginator/>
                </div>
            );
        }
    });
    const Paginator = React.createClass({
        render() {
            return (
                <nav>
                    <div className="text-center">
                        <ul className="pagination">
                            <li className="disabled"><a>&laquo;</a></li>
                            <li className="active"><a>1</a></li>
                            <li><a href="?user=James41&page=2">2</a></li>
                            <li><a href="?user=James41&page=2" >&raquo;</a></li>
                        </ul>
                    </div>
                </nav>
            );
        }
    });
    const user = 'James41'
    ReactDOM.render(
        <Bleats url={'user/' + user + '/bleats?page=' + page} pollInterval={2000}/>,
        document.getElementById('content')
    );
})();
