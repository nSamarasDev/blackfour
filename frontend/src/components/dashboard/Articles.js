import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteArticle } from '../../actions/article';
import styled from "styled-components";

const TableBackground = styled.tbody`
  background-color: #333;
  color: #fff;
`;

const Articles = ({ articles, deleteArticle }) => {
  const articleItems = articles.map((article) => (
    <tr key={article._id}>
      <td>{article.name}</td>
      <td>
        <button onClick={() => deleteArticle(article._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
      <td>
      <Link to={`/article/${article._id}`} className='btn btn-primary'>
        View 
      </Link>
    </td>
    </tr>
  ));

  return (
    <Fragment>
      <section style={{ paddingTop: '20px' }}>
        <h2 className="table">Articles</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <TableBackground>{articleItems}</TableBackground>
        </table>
      </section>
    </Fragment>
  );
};

Articles.propTypes = {
  articles: PropTypes.array.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

export default connect(null, { deleteArticle })(Articles);
