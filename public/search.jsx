import React from 'react';
import {Link} from 'react-router';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {results: [], total: 0};
    }
    componentDidMount() {
        this.search();
    }
    search() {
        const term = this.props.params.term;
        const page = this.props.location.query.page || 1;
        const type = this.props.location.query.type || 'users';
        const start = (page-1)*16;
        const limit = 16;
        $.ajax({
            url: `/api/search/${type}/${term}`,
            dataType: 'json',
            cache: false,
            data: {start, limit},
            success: (data) => {
                this.setState(data);
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    render() {
        let resultsNode;
        const type = this.props.location.query.type || 'users';
        const page = this.props.location.query.page || 1;
        const term = this.props.params.term;
        const {results, total} = this.state;
        if (type === 'bleats') {
            resultsNode = <BleatResults bleats={results} page={page} total={total} src={`/search/${term}?type=bleats`} loadMore={this.loadMore.bind(this)}/>;
        } else if (type === 'users') {
            resultsNode = (
                <div className="panel panel-default">
                    {results.map(result => <UserResult key={result.username} user={result}/>)}
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12" id="content">
                    <h2>Search Results: <small>{term}</small></h2>
                    <ul className="nav nav-pills">
                        <li className={type === 'users' ? 'active' : ''}>
                            <Link to={{pathname: `/search/${term}`, query: {type: 'users'}}}>Users</Link>
                        </li>
                        <li className={type === 'bleats' ? 'active' : ''}>
                            <Link to={{pathname: `/search/${term}`, query: {type: 'bleats'}}}>Bleats</Link>
                        </li>
                    </ul>
                    <br/>
                    {resultsNode}
                </div>
            </div>
        );
    }
}

class BleatResults extends React.Component {
    render() {
        const {bleats, page, total, src, loadMore} = this.props;
        return <Bleats bleats={bleats} page={page} total={total} src={src} loadMore={loadMore}/>;
    }
}

class UserResult extends React.Component {
    render() {
        const user = this.props.user;
        const {username, full_name} = user;
        return (
            <Link className="list-group-item" to={'/user/'+username}>
                <div className="media-left">
                    <img className="media-object" src={'/api/user/'+username+'/picture'} style={{maxWidth: '100px'}}></img>
                </div>
                <div className="media-body">
                    <h3 className="media-heading">
                        {full_name}
                        <br/>
                        <small>{username}</small>
                    </h3>
                </div>
            </Link>
        );
    }
}
