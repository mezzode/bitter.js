import React from 'react';

export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirm: '',
            validEmail: ''
        };
    }
    submit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Submitted');
        this.validEmail();
        this.validName();
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    validEmail() {
        if (this.state.email === 'a@a.a') {
            this.setState({validEmail: ''});
        } else {
            this.setState({validEmail: 'Invalid'});
        }
    }
    validName() {
        this.setState({
            validName: /^[A-Za-z\-]+( [A-Za-z\-]+)*$/.test(this.state.name) ? '' : 'Full name required.'
        });
    }
    render() {
        const {name, email, username, password, confirm, validEmail, validName} = this.state;
        const onChange = this.onChange.bind(this);
        return(
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                    <h1>New Profile</h1>
                    <form onSubmit={this.submit.bind(this)}>
                        <Input name="name" title="Full Name" type="text" value={name} onChange={onChange} error={validName}/>
                        <Input name="email" title="Email" type="email" value={email} onChange={onChange} error={validEmail}/>
                        <Input name="username" title="Username" type="text" value={username} onChange={onChange}/>
                        <Input name="password" title="Password" type="password" value={password} onChange={onChange}/>
                        <Input className="form-control" title="Confirm Password" type="password" value={confirm} onChange={onChange}/>
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
        const {name, value, title, type, error, onChange} = this.props;
        return (
            <div className={'form-group'+(error ? ' has-error' : '')}>
                <label>{title}</label>
                <input name={name} className="form-control" placeholder={title} type={type} value={value} onChange={onChange}/>
                <span className="help-block">{error}</span>
            </div>
        );
    }
}
