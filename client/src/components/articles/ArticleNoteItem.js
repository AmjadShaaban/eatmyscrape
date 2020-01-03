import React from 'react';

const ArticleNoteItem = ({ note, onEditClick, onDeleteClick }) => {
  return (
    <div className='card text-left'>
      <p>{note.title}</p>
      <p>{note.body}</p>
      <button onClick={onEditClick} className='btn btn-dark btn-sm my-1'>
        edit
      </button>
      <button onClick={onDeleteClick} className='btn btn-dark btn-sm my-1'>
        delete
      </button>
    </div>
  );
};

export default ArticleNoteItem;
