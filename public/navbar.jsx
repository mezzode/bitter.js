(function() {
    'use strict';
    const Navbar = React.createClass({
        render() {
            // check if logged in
            const logged_in = false;
            let right;
            if (logged_in) {
                right = (
                    <div></div>
                );
            } else {
                right = (
                    <div>
                        <button className="btn btn-link navbar-btn navbar-right" data-toggle="modal" data-target="#log-in">Log In</button>
                        <a className="btn btn-link navbar-btn navbar-right" href="?new-user=True">Sign Up</a>
                    </div>
                );
            }
            return (
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle nagivation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>  
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="?">Bitter</a>
                        </div>
                        <div id="navbar" className="collapse navbar-collapse">
                            <form className="navbar-form navbar-left" action="?" id="search" role="search">
                            <div className="input-group">
                                <input type="text" name="search" className="form-control" placeholder="Search"/>
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-link">
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                                </span>
                            </div>
                            </form>
                            {right}
                        </div>
                    </div>
                </nav>
            );
        }
    });
    ReactDOM.render(<Navbar/>, document.getElementById('react-navbar'));
})();
