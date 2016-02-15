import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar.jsx';
import Details from './details.jsx';
import Bleats from './bleats.jsx';
import Login from './login.jsx';

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
            url: 'api/authenticate/',
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
        const user = 'James41';
        const page = 1;
        let login;
        if (!this.state.curr){
            login = <Login login={this.login.bind(this)}/>;
        }
        return (
            <div>
                <Navbar user={this.state.curr} logout={this.logout.bind(this)}/>
                {login}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 col-md-3">
                            <Details user={user}/>
                        </div>
                        <div className="col-md-9 col-sm-7" id="content">
                            <Bleats url={'api/user/' + user + '/bleats?page=' + page} pollInterval={2000}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        $.ajax({
            url: 'api/current/',
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

ReactDOM.render(<App/>, document.getElementById('app'));
