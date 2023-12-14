import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ title, category }) => {
    const routes = [
        { path: '/:category', breadcrumb: category },
        { path: '/:category/:pid/:title', breadcrumb: title },
        { path: '/', breadcrumb: 'Home' },
    ];

    const breadcrumb = useBreadcrumbs(routes);
    return (
        <div className="text-sm flex items-center gap-1">
            {breadcrumb
                ?.filter((el) => !el.match.route === false)
                .map(({ match, breadcrumb }) => (
                    <Link
                        className="flex items-center hover:text-main gap-1"
                        key={match.pathname}
                        to={match.pathname}
                    >
                        <span className="capitalize">{breadcrumb} /</span>
                    </Link>
                ))}
        </div>
    );
};

export default Breadcrumbs;
