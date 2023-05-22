import React, { Fragment } from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
import styled from "styled-components";

const EducationSmall = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <div key={edu._id} className="article-container">
      <p>{edu.school}</p>
      <p className="hide-sm">{edu.degree}</p>
      <p className="hide-sm">
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </p>
      <button
        onClick={() => deleteEducation(edu._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </div>
  ));

  return (
    <Fragment>
      <section style={{ paddingTop: "20px" }}>
        <h2>Education Credentials</h2>
        {educations}
      </section>
    </Fragment>
  );
};

EducationSmall.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(EducationSmall);
