import React from 'react';

const Photo = props => (
    <li>
      <img src={props.url} key={props.id} alt={props.title}/>
    </li>
);

export default Photo;