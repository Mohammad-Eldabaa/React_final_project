import { Route, Routes } from 'react-router-dom';
import RoutesArray from './routesArray';

import React from 'react';

export default function RoutesPages() {
  return (
    <Routes>
      {RoutesArray.map(item => (
        <Route key={item.id} path={item.path} element={item.element}></Route>
      ))}
    </Routes>
  );
}
