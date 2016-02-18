import React from 'react';
import {Link} from 'react-router';

export default class Paginator extends React.Component {
    render() {
        const {total, page, src} = this.props;
        const pages = Math.ceil(total / 16);
        if (pages <= 1) {
            return false;
        }
        const links = [];
        for (let i = 1; i <= pages; i++) {
            links.push(<li key={i} className={i === +page ? 'active' : ''}><Link to={{pathname: src, query: {page: i}}}>{i}</Link></li>);
        }
        return (
            <nav>
                <div className="text-center">
                    <ul className="pagination">
                        <li className={+page === 1 ? 'disabled' : ''}><Link to={{pathname: src, query: {page: 1}}}>&laquo;</Link></li>
                        {links}
                        <li className={+page === pages ? 'disabled' : ''}><Link to={{pathname: src, query: {page: pages}}}>&raquo;</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
