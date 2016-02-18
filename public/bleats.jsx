import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class Bleats extends React.Component {
    render() {
        const bleatNodes = this.props.bleats.map(bleat => <Bleat key={bleat} bleatId={bleat}/>);
        const {total, page, src} = this.props;
        let nav;
        if (page) {
            nav = <Paginator total={total} page={page} src={src}/>;
        } else {
            nav = <LoadMore loadMore={this.props.loadMore}/>;
        }
        return (
            <div>
                {bleatNodes}
                {nav}
            </div>
        );
    }
}

class Bleat extends React.Component {
    constructor() {
        super();
        this.state = {conversation: [], replies: []};
    }
    componentDidMount() {
        this.getData();
        this.getConversation();
        this.getReplies();
    }
    getData() {
        $.ajax({
            url: '/api/bleat/' + this.props.bleatId,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
    getConversation() {
        $.ajax({
            url: '/api/bleat/' + this.props.bleatId + '/conversation',
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({conversation: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
    getReplies() {
        $.ajax({
            url: '/api/bleat/' + this.props.bleatId + '/replies',
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({replies: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
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
        let location;
        if (data.latitude && data.longitude) {
            location = <li><small>Location: {data.latitude}, {data.longitude}</small></li>;
        }
        let bleat = data.bleat.split(/(@\w+)/).map((element) => {
            if (element.match(/@\w+/)) {
                return <Link key={element} style={{color: 'inherit'}} to={'/user/'+element.substr(1)}>{element}</Link>;
            } else {
                return element;
            }
        });
        bleat = <p className="lead">{bleat}</p>;
        data.bleat.replace(/@(\w+)/g, '<a href="$1">@$1</a>');
        return (
            <div id={id} className="panel panel-default">
                <div className="list-group">
                    <div className="list-group-item">
                        <Link style={{color: 'inherit'}} className="list-group-item-heading" to={'/user/' + data.username}><h4 className="list-group-item-heading">{data.username}</h4></Link>
                        {bleat}
                        <ul className="list-inline">
                            <li><small>{hour}:{min}:{sec} {suffix}</small></li>
                            <li><small>{date.toDateString()}</small></li>
                            {location}
                        </ul>
                        <a href={'/bleat/'+id} className="btn-sm btn btn-link pull-right"><span className="glyphicon glyphicon-link"></span></a>
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
}

class BleatReply extends React.Component {
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
}

class BleatConversation extends React.Component {
    render() {
        const bleatChainNodes = this.props.data.map(bleat => <BleatSub key={bleat} bleatId={bleat}/>);
        const id = this.props.bleatId;
        return (
            <div className="panel-collapse collapse" id={id+'-conversations'} aria-expanded="false" style={{height: '0px'}}>
                <ul className="list-group">
                    {bleatChainNodes}
                </ul>
            </div>
        );
    }
}

class BleatReplies extends React.Component {
    render() {
        const bleatChainNodes = this.props.data.map(bleat => <BleatSub key={bleat} bleatId={bleat}/>);
        const id = this.props.bleatId;
        return (
            <div className="collapse panel-collapse" id={id+'-replies'} aria-expanded="false">
                <ul className="list-group">
                    {bleatChainNodes}
                </ul>
            </div>
        );
    }
}

class BleatSub extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
    }
    componentDidMount() {
        $.ajax({
            url: '/api/bleat/' + this.props.bleatId,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
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
}

class Paginator extends React.Component {
    render() {
        const {total, page, src} = this.props;
        const pages = Math.ceil(total / 16);
        if (pages <= 1) {
            return false;
        }
        const links = [];
        for (let i = 1; i <= pages; i++) {
            links.push(<li key={i} className={i === +page ? 'active' : ''}><Link to={{pathname: src, query: {page: i}}}>{i}</Link></li>);
        }
        return (
            <nav>
                <div className="text-center">
                    <ul className="pagination">
                        <li className={+page === 1 ? 'disabled' : ''}><Link to={{pathname: src, query: {page: 1}}}>&laquo;</Link></li>
                        {links}
                        <li className={+page === pages ? 'disabled' : ''}><Link to={{pathname: src, query: {page: pages}}}>&raquo;</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

class LoadMore extends React.Component {
    render() {
        return (
            <div className="text-center" style={{'margin-bottom': '20px'}}>
                <button className="btn btn-link" onClick={this.props.loadMore}>Load More</button>
            </div>
        );
    }
}
