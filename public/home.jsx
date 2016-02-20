import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        $.ajax({
            url: '/api/current/',
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
    render() {
        if (this.state.curr) {
            return <Dashboard/>;
        } else if (this.state.curr === false) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron">
                            <h1>Welcome to Bitter</h1>
                            <p>The latest and greatest thing since sliced bread!</p>
                            <br/>
                            <p><Link className="btn btn-primary btn-lg" to='/signup' role="button">Join Now</Link></p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return false;
        }
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                    Dashboard
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

