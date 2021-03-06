import React from 'react';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {username: '', password: '', remember: false};
    }
    check(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    remember(event) {
        this.setState({remember: event.target.checked});
    }
    submit() {
        this.props.login(this.state.username, this.state.password, this.state.remember);
        this.setState({username: '', password: '', remember: false});
    }
    render() {
        return (
            <div className="modal fade" id="log-in" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                            <h4 className="modal-title">Log In</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.submit}>
                                <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={this.check.bind(this)}/>
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.check.bind(this)}/>
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" checked={this.state.checked} onChange={this.remember.bind(this)}/> Remember Me
                                     </label>
                                </div>
                                <button type="submit" className="btn btn-default" disabled={this.state.username && this.state.password ? false : 'disabled'} onClick={this.submit.bind(this)} data-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
