(function() {
    'use strict';
    const Details = React.createClass({
        getInitialState() {
            return {data: {}};
        },
        componentDidMount() {
            $.ajax({
                url: 'user/' + this.props.user + '/details',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.id, status, err.toString());
                }.bind(this)
            });
        },
        render() {
            const data = this.state.data;
            if (!data) return (<div></div>);
            const user = this.props.user;
            const pic = 'user/' + user + '/picture';
            const name = data.full_name;
            const listens = data.listens;
            return (
                <div className="panel panel-primary">
                    <div className="panel-body">
                        <img src={pic} className="img-responsive" alt="Profile Picture"/>
                        <h2>{name}<br/><small>{user}</small></h2>
                    </div>
                    <ul className="list-group">
                        <Listens listens={listens}/>
                        <Home data={data}/>
                    </ul>
                </div>
            );
        }
    });
    const Home = React.createClass({
        render() {
            const data = this.props.data;
            const latitude = data.home_latitude;
            const longitude = data.home_longitude;
            const suburb = data.home_suburb;
            if (!(latitude || longitude || suburb))
                return (<div></div>);
            let latitudeNode, longitudeNode, suburbNode;
            if (latitude)
                latitudeNode = <div><dt>Latitude</dt><dd>{latitude}</dd></div>;
            if (longitude)
                longitudeNode = <div><dt>Longitude</dt><dd>{longitude}</dd></div>;
            if (suburb)
                suburbNode = <div><dt>Suburb</dt><dd>{suburb}</dd></div>;
            return (
                <li className="list-group-item">
                    <h3 className="list-group-item-heading">Home Details</h3>
                    <dl>
                        {latitudeNode}
                        {longitudeNode}
                        {suburbNode}
                    </dl>
                </li>
            );
        }
    });
    const Listen = React.createClass({
        getInitialState() {
            return {data: {}};
        },
        componentDidMount() {
            $.ajax({
                url: 'user/' + this.props.user + '/details',
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.id, status, err.toString());
                }.bind(this)
            });
        },
        render() {
            const data = this.state.data;
            if (!data) return (<div></div>);
            const user = this.props.user;
            const name = data.full_name;
            const pic = 'user/' + user + '/picture';
            return (
                <a href={'/user/'+user} className="list-group-item">
                    <div className="media">
                        <div className="media-left">
                            <img style={{maxWidth:'64px', maxHeight:'64px'}} className="media-object" src={pic}/>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{name}<br/><small>{user}</small></h4>
                        </div>
                    </div>
                </a>
            );
        }
    });
    const Listens = React.createClass({
        render() {
            const listens = this.props.listens;
            if (!listens) return (<div></div>);
            const listenNodes = listens.map(function(user) {
                return (<Listen user={user}/>);
            });
            return (
                <li className="list-group-item">
                    <h3 className="list-group-item-heading">Listens</h3>
                    <div className="list-group">
                        {listenNodes}
                    </div>
                </li>
            );
        }
    });
    const user = 'James41';
    ReactDOM.render(
        <Details user={user}/>,
        document.getElementById('details')
    );
})();
