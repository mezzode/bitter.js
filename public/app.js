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

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="user/:user" component={User}/>
            <Route path="settings" component={Settings}/>
            <Route path="signup" component={Signup}/>
            <Route path="search/:term" component={Search}/>
        </Route>
    </Router>
), document.getElementById('app'));
