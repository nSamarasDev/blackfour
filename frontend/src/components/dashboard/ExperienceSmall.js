import React, { Fragment } from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const ExperienceSmall = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <div key={exp._id} className="article-container">
      <p>{exp.company}</p>
      <p className="hide-sm">{exp.title}</p>
      <p className="hide-sm">
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </p>
      <button
        onClick={() => deleteExperience(exp._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  ));

  return (
    <Fragment>
      <section style={{ paddingTop: "20px" }}>
        <h2>Experience Credentials</h2>
        {experiences}
      </section>
    </Fragment>
  );
};

ExperienceSmall.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ExperienceSmall);