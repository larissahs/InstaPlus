import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';


class Navbar extends Component {

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
      }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav mr-auto">
              <Link className="navbar-brand" to="/dashboard">InstaPlus</Link>
              <Link className="nav-link" to="/addPost">Add Post</Link>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/feed">
                  Post Feed
                </Link>
              </li> */}
                {/* <div className="searchForm">
                    <form>
                        <input
                            placeholder="Search"
                            // value={this.state.query}
                            // onChange={this.handleInputChange}
                        />
                    </form>
                </div> */}
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Feed
                  </Link>
                </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                <img
                    className="rounded-circle"
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: '25px', marginRight: '5px' }}
                    title="You must have a Gravatar connected to your email to display an image"
                  />{' '}
                    Profile
                </Link>
              </li>
              <li className="nav-item logout">
                <a
                  href=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="nav-link"
                >
                  Logout
                </a>
              </li>
            </ul>
          );

        const guestLinks = (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                    <Link className="navbar-brand" to="/">
                      InstaPlus
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
                    
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-light mb-4">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        );
    }
};

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
    Navbar
  );
  
