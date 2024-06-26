import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import { getProfiles } from "../../actions/profile";
import { getCurrentProfile } from "../../actions/profile";
import { getContacts } from "../../actions/contact";
import { getArticles } from "../../actions/article";
import ExperienceSmall from "./ExperienceSmall";
import EducationSmall from "./EducationSmall";
import AdminActions from "./AdminActions";
import ProfileItem from "./ProfileItem";
import ProfileSmall from "./ProfileSmall";
import ContactItem from "./ContactItem";
import ContactSmall from "./ContactSmall";
import ArticleItem from "./ArticleItem";
import ArticlesSmall from "./ArticlesSmall";
import Education from "./Education";
import Experience from "./Experience";


const AdminDashboard = ({
  getProfiles,
  getContacts,
  getArticles,
  getCurrentProfile,
  auth: { user },
  profile: { profile, profiles, loading },
  contact: { contacts, loading: contactLoading },
  article: { articles, loading: articleLoading },
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    getProfiles();
    getContacts();
    getArticles();
    getCurrentProfile();

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 426);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getProfiles, getCurrentProfile, getContacts, getArticles]);

 


  return loading || !contacts ? (
    <Spinner />
  ) : (
    <>
      <section className="container">
        <Alert />
        <div className="admin-container">
          <div style={{ paddingTop: isSmallScreen ? '160px' : '0' }}>
            <h3 className="large text-primary">Admin Dashboard</h3>
            <p className="lead">
              <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>
            <AdminActions />
          </div>
        </div>

        {isSmallScreen ? (
          <section className="dashboard-container">
              <ExperienceSmall experience={profile && profile.experience} />
              <EducationSmall education={profile && profile.education} />
            <h1 className="large text-dark">Profile list</h1>
            <hr />
            <ProfileSmall profiles={profiles} />
            
           
            <h1 className="large text-dark" style={{ paddingTop: "20px" }}>
              Contact list
            </h1>
            <ContactSmall contacts={contacts} />
            
            <hr />
            <h1 className="large text-dark" style={{ paddingTop: "20px" }}>
              Article list
            </h1>
            <ArticlesSmall articles={articles} />
            
          </section>
        ) : (
          /////////////////////////////////////////////////////////////////////////
          
          <section className="dashboard-container dashboard-scrollbar">
            
              <section className="">
              <Experience experience={profile && profile.experience} />
              
              <Education education={profile && profile.education} />
                
              </section>
            <h2 className="large text-dark">Profile list</h2>
            <hr />
            <table className="table" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-sm">Company</th>
                  <th className="hide-sm">Website</th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
              <tbody
                className="dashboard-table-body"
                style={{ backgroundColor: "#333", color: "#fff" }}
              >
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <tr>
                    <td>No profiles found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <hr />
            <h2 className="large text-dark" style={{ paddingTop: "50px" }}>
              Contact list
            </h2>
            <table className="table" style={{ paddingTop: "10px", paddingBottom: '40px' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-sm">Email</th>
                  <th className="hide-sm">Description</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody
                className="dashboard-table-body"
                style={{ backgroundColor: "#333", color: "#fff" }}
              >
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <ContactItem key={contact._id} contact={contact} />
                  ))
                ) : (
                  <tr>
                    <td>No contacts found</td>
                  </tr>
                )}
              </tbody>
            </table>
            <hr />
            <h2 className="large text-dark" style={{ paddingTop: "50px" }}>
              Article list
            </h2>
            <table className="table" style={{ paddingTop: "10px" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-sm">Article Title</th>
                  <th className="hide-sm">ID</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody
                className="dashboard-table-body tr"
                style={{ backgroundColor: "#333", color: "#fff" }}
              >
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <ArticleItem key={article._id} article={article} />
                  ))
                ) : (
                  <tr>
                    <td>No articles found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </section>
    </>
  );
};

AdminDashboard.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
};

Education.propTypes = {
  education: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        school: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        fieldofstudy: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string,
        current: PropTypes.bool,
        description: PropTypes.string,
      })
    ),
    PropTypes.object, // Allow null value
  ]),
  deleteEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  contact: state.contact,
  article: state.article,
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile, getContacts, getArticles })(AdminDashboard);
