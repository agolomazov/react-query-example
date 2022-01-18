import React from 'react';

export function Post({ id, title, body, onClick }) {
  return (
    <div onClick={onClick} className="post">
      <h4>{title}</h4>
    </div>
  );
}
