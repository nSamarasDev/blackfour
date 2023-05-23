import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteArticle } from '../../actions/article';

const ArticleItem = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No articles available</p>;
  }

  return (
    <div>
      {articles.map((article) => (
        <div key={article._id} className='article-container'>
          <p>{article.name}</p>
          <p>{article.article}</p>
          <p>{article._id}</p>
          <Link to={`/article/${article._id}`} className='btn btn-primary'>
            View
          </Link>
          <button className="btn btn-danger" onClick={() => deleteArticle(article._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = dispatch => ({
  deleteArticle: id => dispatch(deleteArticle(id))
});

export default connect(mapStateToProps, { deleteArticle })(ArticleItem)
