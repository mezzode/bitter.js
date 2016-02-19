import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class Navbar extends React.Component {
    search(e) {
        e.preventDefault();
        e.stopPropagation();
        const term = e.target.search.value;
        browserHistory.push('/search/'+term);
    }
    render() {
        let right;
        const user = this.props.user;
        if (user) {
            right = (
                <div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><p className="navbar-text">Signed in as <Link to={'/user/'+user} className="navbar-link">{user}</Link></p></li>
                        <li><div><Link to="/settings" className="btn btn-link navbar-btn">Settings</Link></div></li>
                        <li><button className="btn btn-link navbar-btn" type="submit" name="logout" value="True" onClick={this.props.logout}>Log Out</button></li>
                    </ul>
                </div>
            );
        } else if (user === false) {
            right = (
                <div>
                    <button className="btn btn-link navbar-btn navbar-right" data-toggle="modal" data-target="#log-in">Log In</button>
                    <Link className="btn btn-link navbar-btn navbar-right" to="/signup">Sign Up</Link>
                </div>
            );
        }
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle nagivation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>  
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Bitter</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <form className="navbar-form navbar-left" id="search" role="search" onSubmit={this.search}>
                        <div className="input-group">
                            <input type="text" name="search" className="form-control" placeholder="Search"/>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-link">
                                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                </button>
                            </span>
                        </div>
                        </form>
                        {right}
                    </div>
                </div>
            </nav>
        );
    }
}
