import React, { useEffect, useState } from 'react';
import '../../bootstrap/bootstrap.css'; // Your custom Bootstrap CSS
import SideBar from '../../component/sideBar';
import useAuthStore from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { deletePost } from '../../api/fetchApi';
import EditPostModal from './editPostModal';

const ShowPost = () => {
  const location = useLocation();
  const { post, cur } = location.state || {};
  const navigate = useNavigate();

  const removePost = () => {
    deletePost(post.id)
      .then(() => {
        navigate(-1);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div
      className="d-flex"
      style={{
        height: '100vh',
        width: '100vr',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
      }}
    >
      <SideBar current={cur.current} />
      <div
        className="container d-flex flex-column justify-content-center my-5 col-8"
        style={{ height: '86vh' }}
      >
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body">
            <h2 className="text-primary mb-3">{post.title}</h2>
            <p className="text-muted">{post.content}</p>

            {post.sections.map((section, idx) => (
              <div key={idx} className="my-4">
                <h4 className="text-secondary">{section.title}</h4>
                <p>{section.body}</p>
              </div>
            ))}

            {cur.current === 'MyPosts' ? (
              <div className="row mt-4">
                <div className="col-12 col-md-6 mb-2">
                  <button className="btn btn-outline-danger w-100" onClick={removePost}>
                    Delete
                  </button>
                </div>
                <div className="col-12 col-md-6">
                  <EditPostModal
                    onPostAdded={() => {
                      navigate(-1);
                    }}
                    item={post}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
