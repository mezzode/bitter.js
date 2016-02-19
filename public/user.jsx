import React from 'react';
import Details from './details.jsx';
import Bleats from './bleats.jsx';

export default class User extends React.Component {
    render() {
        console.log('noooo');
        const user = this.props.params.user;
        const page = this.props.location.query.page;
        return (
            <div className="row">
                <div className="col-sm-5 col-md-3">
                    <Details user={user}/>
                </div>
                <div className="col-md-9 col-sm-7" id="content">
                    <UserBleats user={user} page={page}/>
                </div>
            </div>
        );
    }
}

class UserBleats extends React.Component {
    constructor() {
        super();
        this.state = {bleats: []};
    }
    componentDidMount() {
        this.getBleats();
        this.getTotal();
    }
    componentDidUpdate(prevProps) {
        if ((prevProps.user !== this.props.user) || (prevProps.page !== this.props.page)) {
            this.getBleats();
            this.getTotal();
        }
    }
    getBleats() {
        const user = this.props.user;
        const page = this.props.page || 1;
        const start = (page-1)*16;
        const limit = 16;
        $.ajax({
            url: `/api/user/${user}/bleats`,
            dataType: 'json',
            cache: false,
            data: {start, limit},
            success: (bleats) => {
                this.setState({bleats});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    getTotal() {
        const user = this.props.user;
        $.ajax({
            url: `/api/user/${user}/bleats/total`,
            dataType: 'json',
            cache: false,
            success: (total) => {
                this.setState({total});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    loadMore() {
        const user = this.props.user;
        const limit = this.state.bleats.length + 16;
        $.ajax({
            url: `/api/user/${user}/bleats`,
            dataType: 'json',
            cache: false,
            data: {limit},
            success: (bleats) => {
                this.setState({bleats});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    render() {
        const {bleats, total} = this.state;
        const {page, user} = this.props;
        return <Bleats bleats={bleats} page={page} total={total} src={{pathname: `/user/${user}`}} loadMore={this.loadMore.bind(this)}/>;
    }
}
