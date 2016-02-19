import React from 'react';
import {Link} from 'react-router';

export default class Nav extends React.Component {
    render() {
        const {total, page, src, loadMore, loaded} = this.props;
        let nav;
        if (page) {
            nav = <Paginator total={total} page={page} src={src}/>;
        } else if (loaded < total) {
            nav = <LoadMore loadMore={loadMore}/>;
        } else {
            nav = false;
        }
        return nav;
    }
}

class Paginator extends React.Component {
    render() {
        const {total, src} = this.props;
        const page = parseInt(this.props.page);
        const {pathname, query} = src;
        const pages = Math.ceil(total / 16);
        if (pages <= 1) {
            return false;
        }
        const links = [];
        const start = Math.max(1, page - 5);
        const end = Math.min(page + 5, pages);
        for (let i = start; i <= end; i++) {
            links.push(<li key={i} className={i === +page ? 'active' : ''}><Link to={{pathname, query: Object.assign({page: i}, query)}}>{i}</Link></li>);
        }
        return (
            <nav>
                <div className="text-center">
                    <ul className="pagination">
                        <li className={+page === 1 ? 'disabled' : ''}><Link to={{pathname, query: Object.assign({page: 1}, query)}}>&laquo;</Link></li>
                        {links}
                        <li className={+page === pages ? 'disabled' : ''}><Link to={{pathname, query: Object.assign({page: pages}, query)}}>&raquo;</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

class LoadMore extends React.Component {
    render() {
        return (
            <div className="text-center" style={{marginBottom: '20px'}}>
                <button className="btn btn-link" onClick={this.props.loadMore}>Load More</button>
            </div>
        );
    }
}
