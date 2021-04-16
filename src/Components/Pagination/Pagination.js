import React from 'react';

//Component to paginate the listings
export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

    //Create array of page numbers and calculate how many pages needed through total posts and posts per page.
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    //returns list of clickable elements to seperate pages of listings.
    return (
        <nav className="pagination">
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={(e) => {
                            e.preventDefault();
                            return paginate(number)
                        }
                        } href='!#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

