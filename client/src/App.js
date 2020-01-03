import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Articles from './components/articles/Articles';
import {
  getArticles,
  createNote,
  updateNote,
  deleteNote
} from './services/articleService';
import ArticleNoteForm from './components/articles/ArticleNoteForm';

function updateArticle(articles, newArticle) {
  return articles.map(article => {
    if (article._id === newArticle._id) {
      return newArticle;
    }

    return article;
  });
}

class App extends Component {
  state = {
    articles: [],
    loading: true,
    noteFormArticleId: null,
    noteToEdit: null
  };

  async componentDidMount() {
    try {
      let response = await getArticles();
      this.setState({ articles: response.data, loading: false });
    } catch (error) {}
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <div className='container'>
            <div className='article-container'>
              <Articles
                onAddNoteClicked={noteFormArticleId => {
                  this.setState({ noteFormArticleId });
                }}
                onEditNoteClicked={(noteFormArticleId, noteToEdit) => {
                  this.setState({ noteFormArticleId, noteToEdit });
                }}
                onDeleteNoteClicked={(noteFormArticleId, noteToEdit) => {
                  deleteNote(noteFormArticleId, noteToEdit).then(response => {
                    this.setState({
                      noteFormArticleId: null,
                      noteToEdit: null,
                      articles: updateArticle(
                        this.state.articles,
                        response.data.article
                      )
                    });
                  });
                }}
                loading={this.state.loading}
                articles={this.state.articles}
              />
            </div>
            {this.state.noteFormArticleId && (
              <ArticleNoteForm
                articleId={this.state.noteFormArticleId}
                note={this.state.noteToEdit}
                onSaveNoteClicked={note => {
                  let promise;
                  if (note._id) {
                    promise = updateNote(this.state.noteFormArticleId, note);
                  } else {
                    promise = createNote(this.state.noteFormArticleId, note);
                  }

                  promise.then(response => {
                    this.setState({
                      noteFormArticleId: null,
                      noteToEdit: null,
                      articles: updateArticle(
                        this.state.articles,
                        response.data.article
                      )
                    });
                  });
                }}
              />
            )}
          </div>
        </Router>
      </>
    );
  }
}

export default App;
