import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
      <nav className="main-nav">
        <ul>
          <li><NavLink onClick={() => props.performSearch('Halloween') } exact to={`/Halloween`} >Halloween</NavLink></li>
          <li><NavLink onClick={() => props.performSearch('Skeleton') } exact to={`/Skeleton`} >Skeleton</NavLink></li>
          <li><NavLink onClick={() => props.performSearch('Candy') } exact to={`/Candy`} >Candy</NavLink></li>
        </ul>
      </nav>
  );
};

export default Nav