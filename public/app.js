import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import Navbar from './navbar.jsx';
import Login from './login.jsx';
import User from './user.jsx';
import Search from './search.jsx';
import Home from './home.jsx';
import Signup from './signup.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    logout() {
        document.cookie = 'token=; Max-Age=0';
        this.setState({curr: false});
    }
    login(username, password, remember) {
        $.ajax({
            url: '/api/authenticate/',
            method: 'POST',
            dataType: 'json',
            cache: false,
            data: {username, password, remember},
            success: data => this.setState({curr: data}),
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
    render() {
        let login;
        if (!this.state.curr){
            login = <Login login={this.login.bind(this)}/>;
        }
        return (
            <div>
                <Navbar user={this.state.curr} logout={this.logout.bind(this)} location={this.props.location}/>
                {login}
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
    componentDidMount() {
        $.ajax({
            url: '/api/current/',
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({curr: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
}

class Settings extends React.Component {
    render() {
        return(<div>Moo</div>);
    }
}

class Confirm extends React.Component {
    constructor() {
        super();
        this.state = {success: false}
    }
    componentDidMount() {
        const token = this.props.location.query.token;
        if (token) {
            $.ajax({
                url: '/api/user/',
                method: 'POST',
                dataType: 'json',
                data: {token},
                cache: false,
                success: () => {
                    this.setState({success: true});
                },
                error: (xhr, status, err) => {
                    console.error(this.props.id, status, err.toString());
                }
            });
        }
    }
    render() {
        let message;
        if (this.state.success) {
            message = 'Success! You can now log in.';
        } else {
            message = 'Invalid URL';
        }
        return(
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                {message}
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="user/:user" component={User}/>
            <Route path="settings" component={Settings}/>
            <Route path="signup" component={Signup}/>
            <Route path="search/:term" component={Search}/>
            <Route path="confirm" component={Confirm}/>
        </Route>
    </Router>
), document.getElementById('app'));
