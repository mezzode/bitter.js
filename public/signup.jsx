import React from 'react';

export default class Signup extends React.Component {
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
