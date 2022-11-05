import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'

const pageSize = 15; //Here we are showing only 10 data on a page.
const Posts = () => {
    const [posts, setPosts] = useState([])
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currpage, setCurrPage] = useState(1)
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
            setPosts(res.data);
            setPaginatedPosts(_(res.data).slice(0).take(pageSize).value()); //here we are passing the array data to lodash and taking data from first position i.e. from 0 index to 10 page and store this into pagination variable.
        })
    }, [])

    const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0 // Here (totalPosts/showing_posts) or else it'll show 0 page. Initially it will give a float number, so in order to get this in Int, we will use Math Function. 

    if (pageCount === 1) return null; // If total data posts is less than 1 page then hide the pagination.
    const pages = _.range(1, pageCount + 1);  // We'll store all pages in the array and we use this package(Lodash), so that we get an array from range (1 to 20).
    const pagination = (pageNo) => {    //Here we change the page Number and content of page.
        setCurrPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize
        const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
        setPaginatedPosts(paginatedPost);
    }
    return (
        <>
            {
                !paginatedPosts ? (<div className="conatiner-fluid">
                    <div className="d-flex justify-content-center align-items-center h-100vh">
                        <h1 className="text-center">
                            No Data Found...
                        </h1>
                    </div>
                </div>) : (
                    <div className="container">
                        <h4 className="text-center text-danger my-1">Axios with Pagination</h4>
                        <div className="table-responsive">
                            <table className='table table-striped table-bordered my-2 text-center'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>UserID</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginatedPosts.map((post, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{post.id}</td>
                                                    <td>{post.userId}</td>
                                                    <td>{post.title}</td>
                                                    <td>
                                                        <p className={post.completed ? 'btn btn-success' : 'btn btn-danger'}>
                                                            {post.completed ? 'Completed' : 'Pending'}
                                                        </p>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <nav class="d-flex justify-content-center">
                            <ul className="pagination">
                                {
                                    pages.map(page =>
                                        <li className={page === currpage ? 'page-item active' : 'page-item'} >
                                            <p className="page-link"
                                                onClick={() => pagination(page)}>
                                                {page}
                                            </p>
                                        </li>
                                    )
                                }
                            </ul>
                        </nav>
                    </div>
                )
            }

        </>
    )
}

export default Posts