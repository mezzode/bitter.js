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
        this.validUsername();
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    validEmail() {
        const email = this.state.email;
        let validEmail;
        if (email.length === 0) {
            validEmail = 'Email address required';
        } else if (/^[^@\s]+@[\w\-]+(\.[\w\-]+)+$/.test(email)) {
            validEmail = '';
        } else {
            validEmail = 'Invalid email address';
        }
        this.setState({validEmail});
    }
    validName() {
        const name = this.state.name;
        let validName;
        if (name.length === 0) {
            validName = 'Full name required';
        } else if (/^[A-Za-z\-]+( [A-Za-z\-]+)*$/.test(name)) {
            validName = '';
        } else {
            validName = 'Invalid name';
        }
        this.setState({validName});
    }
    validUsername() {
        const username = this.state.username;
        let validUsername;
        if (username.length === 0) {
            validUsername = 'Username required';
        } else if (/^\w+$/.test(username)) {
            validUsername = '';
        } else {
            validUsername = 'Invalid username';
        }
        this.setState({validUsername});
    }
    render() {
        const {name, email, username, password, confirm, validEmail, validName, validUsername} = this.state;
        const onChange = this.onChange.bind(this);
        return(
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                    <h1>New Profile</h1>
                    <form onSubmit={this.submit.bind(this)}>
                        <Input name="name" title="Full Name" type="text" value={name} onChange={onChange} error={validName}/>
                        <Input name="email" title="Email" type="text" value={email} onChange={onChange} error={validEmail}/>
                        <Input name="username" title="Username" type="text" value={username} onChange={onChange} error={validUsername}/>
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
    constructor() {
        super();
        this.state = {error: false};
    }
    onChange(e) {
        this.props.onChange(e);
        this.setState({error: false});
    }
    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            this.setState({error: !!this.props.error});
        }
    }
    render() {
        const {name, value, title, type, error, onChange} = this.props;
        return (
            <div className={'form-group'+(this.state.error ? ' has-error' : '')}>
                <label>{title}</label>
                <input name={name} className="form-control" placeholder={title} type={type} value={value} onChange={this.onChange.bind(this)}/>
                <span className="help-block">{error}</span>
            </div>
        );
    }
}
