import React, { useState, useEffect } from 'react';
import { addPost } from '../../api/fetchApi';
import '../../bootstrap/bootstrap.css';
import useAuthStore from '../../store';

export default function AddPostModal({ onPostAdded }) {
  const { currentUser } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    section: '',
    content: '',
  });

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newPost = {
      title: formData.title,
      content: formData.content,
      userId: currentUser.id,
      sections: [{ title: formData.section, body: formData.content }],
    };

    try {
      await addPost(newPost);
      onPostAdded();
      setFormData({ title: '', section: '', content: '' });
      setShowModal(false);
    } catch (err) {
      console.error('Failed to add post:', err);
    }
  };

  return (
    <>
      <button className="btn btn-primary mb-4" onClick={() => setShowModal(true)}>
        Add New Post
      </button>

      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Add New Post</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Section Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <textarea
                        className="form-control"
                        name="content"
                        rows="3"
                        value={formData.content}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
