import React, { Component } from 'react';

class ArticleNoteForm extends Component {
  state = this.props.note
    ? { ...this.props.note }
    : {
        title: '',
        body: ''
      };

  render() {
    return (
      <div className='right-form'>
        Note Form for {this.props.articleId}
        {this.props.note && (
          <pre>Editing Note: {JSON.stringify(this.props.note, null, 4)}</pre>
        )}
        <form
          onSubmit={e => {
            e.preventDefault();

            this.props.onSaveNoteClicked(this.state);
          }}
          onReset={e => {
            this.setState({
              title: '',
              body: ''
            });
          }}
        >
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <textarea
            name='body'
            value={this.state.body}
            onChange={e => this.setState({ body: e.target.value })}
          ></textarea>
          <button type='submit'> Save </button>
          <button type='reset'> Clear </button>
        </form>
      </div>
    );
  }
}

export default ArticleNoteForm;
