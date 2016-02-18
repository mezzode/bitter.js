import React from 'react';
import {Link} from 'react-router';
import Bleats from './bleats.jsx';
import Nav from './nav.jsx';

export default class Search extends React.Component {
    render() {
        let resultsNode;
        const type = this.props.location.query.type || 'users';
        const page = this.props.location.query.page;
        const term = this.props.params.term;
        if (type === 'bleats') {
            resultsNode = <BleatResults term={term} page={page}/>;
        } else if (type === 'users') {
            resultsNode = <UserResults term={term} page={page}/>;
        }
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12" id="content">
                    <h2>Search Results: <small>{term}</small></h2>
                    <ul className="nav nav-pills">
                        <li className={type === 'users' ? 'active' : ''}>
                            <Link to={{pathname: `/search/${term}`, query: page ? {type: 'users', page: 1} : {type: 'users'}}}>Users</Link>
                        </li>
                        <li className={type === 'bleats' ? 'active' : ''}>
                            <Link to={{pathname: `/search/${term}`, query: page ? {type: 'bleats', page: 1} : {type: 'bleats'}}}>Bleats</Link>
                        </li>
                    </ul>
                    <br/>
                    {resultsNode}
                </div>
            </div>
        );
    }
}

class UserResults extends React.Component {
    constructor() {
        super();
        this.state = {results: [], total: 0};
    }
    componentDidMount() {
        this.search();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.page !== this.props.page) {
            this.search();
        }
    }
    loadMore() {
        const {term} = this.props;
        const limit = this.state.results.length + 16;
        search.call(this, 'users', term, {limit});
    }
    search() {
        const {term, page} = this.props;
        const start = (page-1)*16;
        const limit = 16;
        search.call(this, 'users', term, {start, limit});
    }
    render() {
        const {results, total} = this.state;
        const {term, page} = this.props;
        return (
            <div>
                <div className="panel panel-default">
                    {results.map(result => <UserResult key={result.username} user={result}/>)}
                </div>
                <Nav total={total} page={page} src={`/search/${term}`} loaded={results.length} loadMore={this.loadMore.bind(this)}/>
            </div>
        );
    }
}

function search(type, term, {start = 0, limit = 16} = {}) {
    $.ajax({
        url: `/api/search/${type}/${term}`,
        dataType: 'json',
        cache: false,
        data: {start, limit},
        success: data => this.setState(data),
        error: (xhr, status, err) => {
            console.error(status, err.toString());
        }
    });
}

class BleatResults extends React.Component {
    constructor() {
        super();
        this.state = {results: [], total: 0};
    }
    componentDidMount() {
        this.search();
    }
    loadMore() {
        const {term} = this.props;
        const limit = this.state.results.length + 16;
        $.ajax({
            url: `/api/search/bleats/${term}`,
            dataType: 'json',
            cache: false,
            data: {limit},
            success: (data) => {
                this.setState(data);
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    search() {
        const {term, page} = this.props;
        const start = (page-1)*16;
        const limit = 16;
        $.ajax({
            url: `/api/search/bleats/${term}`,
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
        const {page, term} = this.props;
        const {results, total} = this.state;
        return <Bleats bleats={results} page={page} total={total} src={`/search/${term}?type=bleats`} loaded={results.length} loadMore={this.loadMore.bind(this)}/>;
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
