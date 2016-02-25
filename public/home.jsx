import React from 'react';
import {Link} from 'react-router';
import Bleats from './bleats.jsx';

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
            return <Dashboard page={this.props.location.query.page}/>;
        } else if (this.state.curr === false) {
            return <Landing/>;
        } else {
            return false;
        }
    }
}

class Landing extends React.Component {
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

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {bleats: [], total: 0};
    }
    componentDidMount() {
        const {page} = this.props;
        const start = page ? (page-1)*16 : 0;
        const limit = 16;
        this.load({start, limit});
    }
    componentDidUpdate(prevProps) {
        if (prevProps.page !== this.props.page) {
            const {page} = this.props;
            const start = page ? (page-1)*16 : 0;
            const limit = 16;
            this.load({start, limit});
        }
    }
    load({start = 0, limit = 16} = {}) {
        $.ajax({
            url: '/api/current/dashboard',
            dataType: 'json',
            cache: false,
            data: {start, limit},
            success: (data) => {
                this.setState(data);
            },
            error: (xhr, status, err) => {
                console.error(this.props.id, status, err.toString());
            }
        });
    }
    loadMore() {
        const limit = this.state.bleats.length + 16;
        this.load({limit});
    }
    render() {
        const {page} = this.props;
        const {bleats, total} = this.state;
        return (
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                    <Bleats bleats={bleats} page={page} total={total} src={{pathname: '/'}} loaded={bleats.length} loadMore={this.loadMore.bind(this)}/>;
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}

