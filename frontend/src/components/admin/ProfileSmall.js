import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteProfile } from '../../actions/profile'

const ProfileSmall = ({ profiles, deleteProfile }) => {
  if (!profiles || profiles.length === 0) {
    return <p>No profiles available</p>;
  }

  return (
    <div>
      {profiles.map((profile) => (
        <div key={profile._id} className="article-container">
          <p>{profile.name}</p>
          <p>{profile.company}</p>
          <p>{profile.website}</p>
          <p>{profile._id}</p>
          <Link to={`/profile/user/${profile.user._id}`} className="btn btn-primary">
            View
          </Link>
          <button className="btn btn-danger" onClick={() => deleteProfile(profile._id)}>Delete</button>
        </div>
      ))}
    </div>

  );
};

const mapStateToProps = dispatch => ({
  deleteProfile: id => dispatch(deleteProfile(id))
});

export default connect(mapStateToProps, { deleteProfile })(ProfileSmall)