import axios from 'axios';

export const getArticle = _id => {
  return axios.get(`/articles/${_id}`);
};

export const createNote = (_id, note) => {
  return axios.post(`/articles/${_id}/notes`, note);
};

export const getArticles = () => {
  return axios.get('/articles');
};

export const updateNote = (_id, note) => {
  return axios.put(`/articles/${_id}/notes/${note._id}`, note);
};

export const deleteNote = (_id, note) => {
  return axios.delete(`/articles/${_id}/notes/${note._id}`);
};
