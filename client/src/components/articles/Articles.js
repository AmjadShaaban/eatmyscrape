import React, { Component } from 'react';
import ArticleItem from './ArticleItem';
import { getArticle } from '../../services/articleService';

class Articles extends Component {
  render() {
    return (
      <div style={articleStyle}>
        {this.props.articles.map(article => (
          <ArticleItem
            key={article._id}
            article={article}
            onAddNoteClicked={this.props.onAddNoteClicked}
            onEditNoteClicked={this.props.onEditNoteClicked}
            onDeleteNoteClicked={this.props.onDeleteNoteClicked}
          />
        ))}
      </div>
    );
  }
}

const articleStyle = {
  display: 'grid',
  gridGap: '1rem'
};

export default Articles;
