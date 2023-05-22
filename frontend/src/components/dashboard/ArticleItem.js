import React from 'react';
import { Link } from 'react-router-dom';

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
        </div>
      ))}
    </div>
  );
};

export default ArticleItem;
