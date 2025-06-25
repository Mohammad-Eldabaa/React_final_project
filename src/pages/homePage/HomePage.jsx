import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import UsersPage from '../users/UsersPage';
import SideBar from '../../component/sideBar';
import ShowAllPosts from '../posts/showAllPosts';
import ShowPost from '../posts/showPost';

export default function HomePage() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div>
      <ShowAllPosts />

      {/* <ShowPost /> */}
    </div>
  );
}
