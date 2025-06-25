import React, { useEffect, useState } from 'react';
import '../../bootstrap/bootstrap.css';
import SideBar from '../../component/sideBar';
import { getPosts } from '../../api/fetchApi';
import { Link } from 'react-router-dom';

export default function ShowAllPosts() {
  const [posts, setPosts] = useState([]);
  const cur = { current: 'Home' };

  const getAllPost = async () => {
    await getPosts()
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className=" d-flex" style={{ height: '100vh' }}>
      <SideBar current={'Home'} />
      <div
        className="container px-4 py-5"
        style={{
          background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
          width: '100%',
          overflowY: 'scroll',
        }}
      >
        <h1 className="text-center mb-5 text-primary fw-bold">📚 Show Posts</h1>
        <div className="row g-4">
          {posts.map(post => (
            <Link
              to={'/showPost'}
              state={{ post, cur }}
              style={{ textDecoration: 'none' }}
              className="col-md-6 col-lg-4"
              key={post.id}
            >
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{post.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Section:{' '}
                    <span className="fw-normal">{post.sections?.[0]?.title || 'Error'}</span>
                  </h6>
                  <p className="card-text">
                    {post.content.length > 40
                      ? post.content.substring(0, 40) + '.......'
                      : post.content}
                  </p>
                </div>
                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center">
                  <small className="text-muted">User ID: {post.userId}</small>
                  <span className="badge bg-info text-dark">#{post.id}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
