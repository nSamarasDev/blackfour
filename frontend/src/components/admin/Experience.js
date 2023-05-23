import React, { Fragment } from "react";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
import styled from "styled-components";
import Spinner from '../layout/Spinner'

const TableBackground = styled.tbody`
  background-color: #333;
  color: #fff;
`;

const Experience = ({ experience, deleteExperience }) => {

    if (experience === null) {
        return <Spinner />; // or return a loading spinner, error message, or any appropriate component
      }
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <section style={{ paddingTop: "0px" }}>
        <h2 className="table">Experience Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <TableBackground>{experiences}</TableBackground>
        </table>
      </section>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
