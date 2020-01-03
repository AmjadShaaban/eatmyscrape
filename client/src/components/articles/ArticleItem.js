import ArticleNoteItem from './ArticleNoteItem';
import React, { Component } from 'react';

class ArticleItem extends Component {
  state = {
    show: false
  };
  render() {
    const {
      article: { _id, link, title, notes },
      onAddNoteClicked,
      onEditNoteClicked,
      onDeleteNoteClicked
    } = this.props;
    return (
      <div className='card text-left'>
        <h4>{title}</h4>
        <div>
          <a href={link} className='btn btn-dark btn-sm my-1'>
            Link to Article
          </a>
          <button
            className='btn btn-dark btn-sm my-1'
            disabled={notes.length === 0}
            onClick={() => {
              this.setState({ show: !this.state.show });
            }}
          >
            {this.state.show ? 'Hide' : 'View'} Notes({notes.length})
          </button>
          <button
            onClick={() => onAddNoteClicked(_id)}
            className='btn btn-dark btn-sm my-1'
          >
            Add note
          </button>

          {this.state.show &&
            notes.map(note => {
              return (
                <ArticleNoteItem
                  key={note._id}
                  note={note}
                  onEditClick={() => onEditNoteClicked(_id, note)}
                  onDeleteClick={() => onDeleteNoteClicked(_id, note)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default ArticleItem;
