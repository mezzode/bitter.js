import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import Navbar from './navbar.jsx';
import Login from './login.jsx';
import User from './user.jsx';
import Search from './search.jsx';
import Home from './home.jsx';

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

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirm: ''
        };
    }
    submit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Submitted');
    }
    render() {
        const {name, email, username, password, confirm} = this.state;
        return(
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                    <h1>New Profile</h1>
                    <form onSubmit={this.submit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input name="name" className="form-control" placeholder="Full Name" type="text" value={name}/>
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input name="email" className="form-control" placeholder="Email" type="email" value={email}/>
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" className="form-control" placeholder="Username" type="text" value={username}/>
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" className="form-control" placeholder="Password" type="password" value={password}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input className="form-control" placeholder="Confirm Password" type="password" value={confirm}/>
                            <span className="help-block"></span>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
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
        </Route>
    </Router>
), document.getElementById('app'));
