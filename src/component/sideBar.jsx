import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../bootstrap/bootstrap.css';
import '../pages/homePage/HomePage';

export default function SideBar({ current }) {
  const colored = { backgroundColor: '#fada7a', borderRadius: '8px', color: ' #3674b5' };
  const [pressed, setpressed] = useState(current);

  return (
    <nav
      className={` text-light flex-shrink-0 p-3 border-end border-secondary`}
      style={{
        width: '240px',
        backgroundColor: '#578FCA',
      }}
    >
      <Link
        to="/home"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none text-light"
      >
        <span className="fs-4 fw-bold">Postat</span>
      </Link>
      <hr className="text-secondary" />
      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li className="nav-item">
          <Link
            to="/home"
            className="nav-link text-light"
            style={pressed === 'Home' ? { ...colored } : { color: 'white' }}
          >
            <i className="bi bi-house me-2" />
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="/myPosts"
            className="nav-link text-light"
            style={pressed === 'MyPosts' ? { ...colored } : { color: 'white' }}
          >
            <i className="bi bi-house me-2" />
            My posts
          </Link>
        </li>

        <li>
          <Link
            to="/allUsers"
            className="nav-link text-light"
            style={pressed === 'All' ? { ...colored } : { color: 'white' }}
          >
            <i className="bi bi-people me-2" />
            All users
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            className="nav-link"
            style={pressed === 'profile' ? { ...colored } : { color: 'white' }}
          >
            <i className="bi bi-person-circle me-2" />
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/Login"
            className="nav-link text-light"
            style={pressed === 'Logout' ? { ...colored } : { color: 'white' }}
          >
            <i className="bi bi-box-arrow-right me-2" />
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
