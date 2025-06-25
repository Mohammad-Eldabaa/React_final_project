import React, { useState, useEffect } from 'react';
import { addPost } from '../../api/fetchApi';
import '../../bootstrap/bootstrap.css';
import useAuthStore from '../../store';
import { useForm } from 'react-hook-form';

export default function AddPostModal({ onPostAdded }) {
  const { currentUser } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const onsubmit = async data => {
    const newPost = {
      title: data.title,
      content: data.content,
      userId: currentUser.id,
      sections: [{ title: data.section, body: data.content }],
    };
    try {
      await addPost(newPost);
      onPostAdded();
      reset();
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
                <form onSubmit={handleSubmit(onsubmit)}>
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
                        {...register('title', { required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Section Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="section"
                        {...register('section', { required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <textarea
                        className="form-control"
                        name="content"
                        rows="3"
                        {...register('content', { required: true })}
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
