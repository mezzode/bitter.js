import React from 'react';

export default class Search extends React.Component {
    constructor() {
        super();
        this.state = {results: []};
    }
    componentDidMount() {
        this.search();
    }
    search() {
        const term = this.props.params.term;
        const page = this.props.location.query.page || 1;
        const type = this.props.location.query.type || 'users';
        const start = (page-1)*16;
        const limit = 16;
        $.ajax({
            url: `/api/search/${type}/${term}`,
            dataType: 'json',
            cache: false,
            data: {start, limit},
            success: (results) => {
                this.setState({results});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }
    render() {
        let results;
        const type = this.props.location.query.type;
        if (type === 'bleats') {
            results = this.state.results.map(result => <BleatResult key={result} bleat={result}/>);
        } else if ((type === 'users') || !type) {
            results = this.state.results.map(result => <UserResult key={result.username} user={result}/>);
        }
        return (
            <div className="row">
                <div className="col-sm-5 col-md-3">
                </div>
                <div className="col-md-9 col-sm-7" id="content">
                    {results}
                </div>
            </div>
        );
    }
}

class BleatResult extends React.Component {
    render() {
        return <div></div>;
    }
}

class UserResult extends React.Component {
    render() {
        const user = this.props.user;
        console.log(user.username);
        console.log(user.full_name);
        return <div></div>;
    }
}
