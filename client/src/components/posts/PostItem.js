import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';
import '../../App.css';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div>
      <div className="card">
      
      <div className="card-header">
      <div className="row">
          <div className="col-md-2">        
              <Link to="/profile">
                <img
                  className="rounded-circle latest-profiles-img d-none d-md-block"
                  src={post.avatar}
                  alt=""
                />
              </Link>
          </div>
          <div className="col-md-8"> 
             <span className="text-left"> {post.name}</span>
          </div>
          <div className="col-md-2 text-right"> 
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1" >
                    <i className="fas fa-trash-alt"></i>
                    </button>
                ) : null}          
          </div>          
        </div>
      </div>

      <div className="card-body mb-3">
      <div className="row">
          <div className="col-md-12">
          <img
            src={post.photo}
            alt=""
            options={{ width: 200 }}
          />            
          </div>
            </div> 


          <div className="row">
          <div className="col-md-12">
            <p className="card-title">{post.caption}</p>
            <span className="card-text">{post.location} </span>
            { post.location && post.country && <span>, </span>}
    
            <span className="card-text">{post.country}</span>
            
            </div>
            </div>
     
            
            <div className="row">
            <div className="col-md-12">            
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-alert': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-outline-danger waves-effect mr-1">
                  + Comments
                </Link>
              </span>
            ) : null}
          </div>
        </div>
                  
      </div>
      </div>
      <div className="spacer"></div>
      </div>
      
     
    );
  }
}


PostItem.defaultProps = {
  showActions: true 
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
