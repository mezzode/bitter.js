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
    render() {
        const user = 'James41';
        const page = 1;
        return (
            <div>
                <Navbar user={this.state.curr}/>
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
        // get user and token from cookie
        const user = 'James41';
        const token = 'blahblah';
        $.ajax({
            url: 'api/authenticate/',
            dataType: 'json',
            cache: false,
            data: {user, token},
            success: (data) => {
                if (data) {
                    this.setState({curr: user});
                } else {
                    this.setState({curr: false});
                }
                console.log(data);
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
