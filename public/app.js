import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar.jsx';
import Details from './details.jsx';
import Bleats from './bleats.jsx';
import Login from './login.jsx';

class App extends React.Component {
    render() {
        const user = 'James41';
        const page = 1;
        return (
            <div>
                <Navbar/>
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
}

ReactDOM.render(<App/>, document.getElementById('app'));
