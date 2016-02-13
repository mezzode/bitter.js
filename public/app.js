import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar.jsx';
import Details from './details.jsx';
import Bleats from './bleats.jsx';
import Login from './login.jsx';

class App extends React.Component {
    constructor() {
        super();
        this.state = {curr: false};
    }
    logout() {
        document.cookie = 'token=; Max-Age=0';
        this.setState({curr: false});
    }
    render() {
        const user = 'James41';
        const page = 1;
        return (
            <div>
                <Navbar user={this.state.curr} logout={this.logout.bind(this)}/>
                <Login/>
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
