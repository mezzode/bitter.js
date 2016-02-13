import React from 'react';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {disabled: 'disabled', username: ''};
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
                            <form method="POST" action="/api/authenticate" login>
                            <div className="form-group">
                            <input type="text" className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={this.props.check.bind(this)}/>
                            </div>
                            <div className="form-group">
                            <input type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" name="remember-me"/> Remember Me
                                 </label>
                            </div>
                            <button type="submit" className="btn btn-default" disabled={this.state.disabled}>Submit</button>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
