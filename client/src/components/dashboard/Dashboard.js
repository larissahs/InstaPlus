import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Posts from '../posts/Posts';
import Feed from '../posts/Feed';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';



class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  
  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              {/* Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link> */}
            </p>
            

            <div style={{ marginBottom: '60px' }} />
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-center text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-outline-danger waves-effect">
              Create Profile
            </Link>
          </div>
        );
      }
    }    

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
            {dashboardContent}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
               <Feed />
            </div>
          </div>          
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(
  Dashboard
);
