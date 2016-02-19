import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
    render() {
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
    }
}
