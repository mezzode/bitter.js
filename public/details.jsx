import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class Details extends React.Component {
    constructor() {
        super();
        this.state = {data: {}};
    }
    componentDidMount() {
        this.getDetails();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            console.log('moo');
            this.getDetails();
        }
    }
    getDetails() {
        $.ajax({
            url: '/api/user/' + this.props.user + '/details',
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
        console.log('asdfasdf');
        const data = this.state.data;
        if (!data) return (<div></div>);
        const user = this.props.user;
        const pic = '/api/user/' + user + '/picture';
        const name = data.full_name;
        return (
            <div className="panel panel-primary">
                <div className="panel-body">
                    <img src={pic} className="img-responsive" alt="Profile Picture"/>
                    <h2>{name}<br/><small>{user}</small></h2>
                </div>
                <ul className="list-group">
                    <Listens user={user}/>
                    <Home data={data}/>
                </ul>
            </div>
        );
    }
}

class Home extends React.Component{
    render() {
        const data = this.props.data;
        const latitude = data.home_latitude;
        const longitude = data.home_longitude;
        const suburb = data.home_suburb;
        if (!(latitude || longitude || suburb))
            return (<div></div>);
        let latitudeNode, longitudeNode, suburbNode;
        if (latitude)
            latitudeNode = <div><dt>Latitude</dt><dd>{latitude}</dd></div>;
        if (longitude)
            longitudeNode = <div><dt>Longitude</dt><dd>{longitude}</dd></div>;
        if (suburb)
            suburbNode = <div><dt>Suburb</dt><dd>{suburb}</dd></div>;
        return (
            <li className="list-group-item">
                <h3 className="list-group-item-heading">Home Details</h3>
                <dl>
                    {latitudeNode}
                    {longitudeNode}
                    {suburbNode}
                </dl>
            </li>
        );
    }
}

class Listen extends React.Component {
    constructor() {
        super();
        this.state = {data: {}};
    }
    componentDidMount() {
        $.ajax({
            url: '/api/user/' + this.props.user + '/details',
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
        if (!data) return (<div></div>);
        const user = this.props.user;
        const name = data.full_name;
        const pic = '/api/user/' + user + '/picture';
        return (
            <Link to={'/user/'+user} className="list-group-item">
                <div className="media">
                    <div className="media-left">
                        <img style={{maxWidth:'64px', maxHeight:'64px'}} className="media-object" src={pic}/>
                    </div>
                    <div className="media-body">
                        <h4 className="media-heading">{name}<br/><small>{user}</small></h4>
                    </div>
                </div>
            </Link>
        );
    }
}

class Listens extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        this.getListens();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            console.log('problem?');
            this.getListens();
        }
    }
    getListens() {
        $.ajax({
            url: '/api/user/' + this.props.user + '/listens',
            dataType: 'json',
            cache: false,
            success: (listens) => {
                this.setState({listens});
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
    render() {
        const listens = this.state.listens;
        if (!listens) return (<div></div>);
        const listenNodes = listens.map(user => <Listen key={user} user={user}/>);
        return (
            <li className="list-group-item">
                <h3 className="list-group-item-heading">Listens</h3>
                <div className="list-group">
                    {listenNodes}
                </div>
            </li>
        );
    }
}
