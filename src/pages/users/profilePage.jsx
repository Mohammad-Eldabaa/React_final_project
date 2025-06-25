import React from 'react';
import '../../bootstrap/bootstrap.css';
import SideBar from '../../component/sideBar';
import useAuthStore from '../../store';

export default function ProfilePage() {
  const { currentUser } = useAuthStore();
  const user = currentUser;

  return (
    <div className="d-flex" style={{ height: '100vh', width: '100vr' }}>
      <SideBar current={'profile'} />

      <div style={{ padding: '16', width: '100%', height: '100%' }} className="PagesContainer">
        <div style={{ height: '100vh', background: 'linear-gradient(to right, #e0eafc, #cfdef3)' }}>
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card shadow-lg rounded-4 p-4">
                  <div className="text-center">
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="rounded-circle border border-3 border-primary mb-3"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <h3 className="fw-bold text-primary">{user.name}</h3>
                    <p className="text-muted">@{user.username}</p>
                  </div>
                  <hr />
                  <div className="px-3">
                    <div className="mb-3">
                      <strong>Email:</strong>
                      <p className="form-control bg-light">{user.email}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Phone:</strong>
                      <p className="form-control bg-light">{user.phone}</p>
                    </div>
                    <div className="mb-3">
                      <strong>ID:</strong>
                      <p className="form-control bg-light">{user.id}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Password:</strong>
                      <p className="form-control bg-light">{user.password}</p>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    {/* <button className="btn btn-outline-primary me-2 col-3">Edit</button> */}
                    <button
                      className="btn btn-outline-danger col-3"
                      onClick={() => {
                        localStorage.clear();
                        window.location.replace('/Login');
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
