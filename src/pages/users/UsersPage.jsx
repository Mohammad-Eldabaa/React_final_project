import React, { useEffect, useState } from 'react';
import '../../bootstrap/bootstrap.css';
import { deleteUser, getUsers } from '../../api/fetchApi';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../component/sideBar';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    await getUsers()
      .then(res => {
        setUsers(res.data);
      })
      .catch(e => {
        console.log(e);
        if (e.status === 401) navigate('/');
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className=" d-flex" style={{ height: '100vh', width: '100%' }}>
      <SideBar current={'All'} />
      <div style={{ padding: '16px', width: '100%' }} className="PagesContainer">
        <div style={{ margin: '16px' }}>
          <div className="container">
            <h1 className="text-center fw-bold mb-5" style={{ color: '#3674B5' }}>
              Users Page
            </h1>
            <div className="row g-4">
              {users.map(user => (
                <div className="col-12 col-sm-6 col-lg-4" key={user.id}>
                  <div className="card border-0 shadow-lg rounded-4 h-100 position-relative overflow-hidden">
                    <div className="text-center mt-4">
                      <img
                        src={user.avatar || 'https://i.pravatar.cc/150?img=2'}
                        alt={user.name}
                        className="rounded-circle border border-0 border-primary"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold " style={{ color: '#3674B5' }}>
                        {user.name}
                      </h5>
                      <span className="badge text-dark mb-2">@{user.username}</span>
                      <ul className="list-group list-group-flush text-start mt-3">
                        <li className="list-group-item bg-light">
                          <i className="bi bi-envelope text-primary me-2"></i>
                          <strong>Email:</strong> {user.email}
                        </li>
                        <li className="list-group-item bg-light">
                          <i className="bi bi-telephone text-success me-2"></i>
                          <strong>Phone:</strong> {user.phone}
                        </li>
                        <li className="list-group-item bg-light">
                          <i className="bi bi-hash text-warning me-2"></i>
                          <strong>ID:</strong> {user.id}
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer bg-white text-center">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={async () => {
                          const result = window.confirm(
                            'Are you sure you want to delete this user?'
                          );
                          if (result) {
                            await deleteUser(user.id).catch(e => {
                              console.log(e);
                              if (e.status === 500) window.alert("You can't remove current user");
                            });
                            getAllUsers();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {users.length === 0 ? (
            <h2 className="text-center text-danger fw-bold mb-5" style={{ marginTop: '180px' }}>
              This page is empty
            </h2>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
