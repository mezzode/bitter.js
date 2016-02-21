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
                        <Input name="name" title="Full Name" type="text" value={name}/>
                        <Input name="email" title="Email" type="email" value={email}/>
                        <Input name="username" title="Username" type="text" value={username}/>
                        <Input name="password" title="Password" type="password" value={password}/>
                        <Input className="form-control" title="Confirm Password" type="password" value={confirm}/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

class Input extends React.Component {
    render() {
        const {name, value, title, type, error} = this.props;
        return (
            <div className="form-group">
                <label>{title}</label>
                <input name={name} className="form-control" placeholder={title} type={type} value={value}/>
                <span className="help-block">{error}</span>
            </div>
        );
    }
}
