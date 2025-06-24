import React, { useEffect, useState } from 'react';
import '../../bootstrap/bootstrap.css';
import SideBar from '../../component/sideBar';
import { addPost, getPosts } from '../../api/fetchApi';

export default function ShowAllPosts() {
  const [posts, setPosts] = useState([]);
  const [rel, setRel] = useState('');
  const post = {
    title: 'How are you2',
    content: 'React makes it painless to create interactive UIs...',
    userId: 11,
    sections: [
      {
        title: 'Frontend Development',
        body: 'React makes it painless to create interactive UIs...',
      },
    ],
  };
  const addnewPost = async () => {
    await addPost(post)
      .then(res => {
        console.log(res);
        setRel(res.status);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getAllPost = async () => {
    await getPosts(post)
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
  }, [rel]);

  return (
    <div className=" d-flex" style={{ height: '100vh' }}>
      <SideBar />
      {/* <button onClick={addnewPost}>Add new post</button> */}
      <div
        className="container px-4 py-5"
        style={{ background: 'linear-gradient(to right, #e0eafc, #cfdef3)', width: '100%' }}
      >
        <h1 className="text-center mb-5 text-primary fw-bold">📚 Show Posts</h1>
        <div className="row g-4">
          {posts.map(post => (
            <div className="col-md-6 col-lg-4" key={post.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary">{post.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Section: <span className="fw-normal">{post.section}</span>
                  </h6>
                  <p className="card-text">{post.content}</p>
                </div>
                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center">
                  <small className="text-muted">User ID: {post.userId}</small>
                  <span className="badge bg-info text-dark">#{post.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
