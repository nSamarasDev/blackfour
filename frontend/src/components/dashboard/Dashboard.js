import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getUserArticles } from '../../actions/article'
import Alert from '../layout/Alert';
import Education from './Education';
import EducationSmall from './EducationSmall';
import Experience from './Experience';
import ExperienceSmall from './ExperienceSmall';
import Articles from './Articles';
import ArticleItem from './ArticleItem';

const Dashboard = ({
  getCurrentProfile,
  getUserArticles,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  article: { articles, article },
}) => {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    getUserArticles(user && user._id);
    if (user && user.isAdmin === true) {
      navigate('/admin');
    }
  }, [getCurrentProfile, getUserArticles, user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 426);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <section className="container" style={{ paddingTop: isSmallScreen ? '160px' : '0' }}>
        <Alert />
        <div className="dashboard-header">
        <h1 className="large text-primary" >
            Dashboard
          </h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
          </p>
        </div>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <section className="dashboard-container dashboard-scrollbar">
              <h3 className="large text-dark">Profile Information</h3>
              <hr />
              {isSmallScreen ? (
                <Fragment>
                 <ExperienceSmall experience={profile.experience} />
                  <EducationSmall education={profile.education} />
                  
                  <hr style={{ paddingTop: "10px" }} />
                  <h3 className="large text-dark" style={{ paddingTop: "10px" }}>Articles</h3>
                  <ArticleItem articles={articles} />
                </Fragment>
              ) : (
                <Fragment>
                  <Education education={profile.education} />
                  <Experience experience={profile.experience} />
                  <hr style={{ paddingTop: "20px" }}/>
                  <Articles articles={articles} />
                </Fragment>
              )}
              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAccount()}
                >
                  <i className="fas fa-user-minus"></i>Delete my account
                </button>
              </div>
            </section>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </section>
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUserArticles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  article: state.article,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getUserArticles,
  deleteAccount,
})(Dashboard);
