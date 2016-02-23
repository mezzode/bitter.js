import React from 'react';

export default class Confirm extends React.Component {
    constructor() {
        super();
        this.state = {success: false}
    }
    componentDidMount() {
        const token = this.props.location.query.token;
        if (token) {
            $.ajax({
                url: '/api/user/',
                method: 'POST',
                dataType: 'json',
                data: {token},
                cache: false,
                success: () => {
                    this.setState({success: true});
                },
                error: (xhr, status, err) => {
                    console.error(this.props.id, status, err.toString());
                }
            });
        }
    }
    render() {
        let message;
        if (this.state.success) {
            message = 'Success! You can now log in.';
        } else {
            message = 'Invalid URL';
        }
        return(
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 col-sm-12">
                {message}
                </div>
                <div className="col-md-3">
                </div>
            </div>
        );
    }
}
