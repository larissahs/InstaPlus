import axios from 'axios';

import {
    ADD_POST,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_POSTS,
    GET_POST,
    POST_LOADING,
    DELETE_POST,
    ADD_COMMENT,
    DELETE_COMMENT
  } from './types';

  // Add Post
export const addPost = (postData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res => {
       
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
      
      //history.push('/dashboard');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
      .get('/api/posts')
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_POSTS,
          payload: null
        })
      );
  };


  // Get Feed
export const getFeed = () => dispatch => {
  console.log("In getFeed");
  dispatch(setPostLoading());
  axios
    .get('/api/posts/feed')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        /** 
        type: GET_POSTS,
        payload: null
        */
       type: GET_ERRORS,
       payload: err.response.data
      })
    );
};


  // Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

  // Delete Post
export const deletePost = id => dispatch => {
    axios
      .delete(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  // Add Like
  export const addLike = id => dispatch => {
    axios
      .post(`/api/posts/like/${id}`)
      .then(res => dispatch(getFeed()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  // Remove Like
  export const removeLike = id => dispatch => {
    axios
      .post(`/api/posts/unlike/${id}`)
      .then(res => dispatch(getFeed()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  // Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


  // Set loading state
export const setPostLoading = () => {
    return {
      type: POST_LOADING
    };
  };

  // Clear errors
export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };