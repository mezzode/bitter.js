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
        const email = this.validEmail();
        const name = this.validName();
        const username = this.validUsername();
        const password = this.validPassword();
        if (email && name && username && password) {
            $.ajax({
                url: '/api/user',
                method: 'POST',
                dataType: 'json',
                cache: false,
                data: {
                    email: this.state.email,
                    username: this.state.username,
                    name: this.state.name,
                    password: this.state.password
                },
                success: () => {
                    console.log('Sent');
                    // push "Success" page to browserHistory
                },
                error: (xhr, status, err) => {
                    console.error(status, err.toString());
                }
            });
        }
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
        return !validEmail;
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
        return !validName;
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
        return !validUsername;
    }
    validPassword() {
        const password = this.state.password;
        let validPassword;
        if (password !== this.state.confirm) {
            validPassword = 'Passwords do not match';
        } else if (password.length === 0) {
            validPassword = 'Password required';
        } else {
            validPassword = '';
        }
        this.setState({validPassword});
        return !validPassword;
    }
    render() {
        const {name, email, username, password, confirm, validEmail, validName, validUsername, validPassword} = this.state;
        const onChange = this.onChange.bind(this);
        return(
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                    <h1>New Profile</h1>
                    <form onSubmit={this.submit.bind(this)}>
                        <Input name="name" title="Full Name" value={name} onChange={onChange} error={validName}/>
                        <Input name="email" title="Email" value={email} onChange={onChange} error={validEmail}/>
                        <Input name="username" title="Username" value={username} onChange={onChange} error={validUsername}/>
                        <Password password={password} confirm={confirm} onChange={onChange} error={validPassword}/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

class Password extends React.Component {
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
        const {password, confirm, error} = this.props;
        return (
            <div>
                <div className={'form-group'+(this.state.error ? ' has-error' : '')}>
                    <label>Password</label>
                    <input name="password" className="form-control" placeholder="Password" type="password" value={password} onChange={this.onChange.bind(this)}/>
                </div>
                <div className={'form-group'+(this.state.error ? ' has-error' : '')}>
                    <label>Confirm Password</label>
                    <input name="confirm" className="form-control" placeholder="Confirm Password" type="password" value={confirm} onChange={this.onChange.bind(this)}/>
                    <span className="help-block">{error}</span>
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
        const {name, value, title, type, error} = this.props;
        return (
            <div className={'form-group'+(this.state.error ? ' has-error' : '')}>
                <label>{title}</label>
                <input name={name} className="form-control" placeholder={title} type="text" value={value} onChange={this.onChange.bind(this)}/>
                <span className="help-block">{error}</span>
            </div>
        );
    }
}
