import React, { useState, useEffect } from 'react';
import { editPost } from '../../api/fetchApi';
import '../../bootstrap/bootstrap.css';

export default function EditPostModal({ onPostAdded, item }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: item.title,
    content: item.content,
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
    };

    try {
      await editPost(item.id, newPost);
      onPostAdded();
      setShowModal(false);
    } catch (err) {
      console.error('Failed to add post:', err);
    }
  };

  return (
    <>
      <button className="btn btn-primary w-100" onClick={() => setShowModal(true)}>
        Edit
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
