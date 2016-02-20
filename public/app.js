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
    submit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Submitted');
    }
    render() {
        return(
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                    <h1>New Profile</h1>
                    <form method="POST" id="new-user-required" onSubmit={this.submit}>
                        <input name="new-validate" value="True" type="hidden"/>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input name="full-name" value="" className="form-control" placeholder="Full Name" type="text"/>
                            <span id="name-help" className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input name="email" value="" className="form-control" placeholder="Email" type="email"/>
                            <span id="email-help" className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="new-username" value="" className="form-control" placeholder="Username" type="text"/>
                            <span id="username-help" className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="new-password" value="" className="form-control" placeholder="Password" type="password"/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input name="new-password-confirm" value="" className="form-control" placeholder="Confirm Password" type="password"/>
                            <span id="password-help" className="help-block"></span>
                        </div>
                        <button type="submit" name="new-user" value="submit" className="btn btn-primary">Submit</button>
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
