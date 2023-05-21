import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getArticleById } from '../../actions/article'
import ArticleTop from './ArticleTop'
import ArticleView from './ArticleView'

const Article = ({
    getArticleById,
    article: { article, loading },
    auth,
}) => {

    const { id } = useParams()

    useEffect(() => {
        getArticleById(id);
    }, [getArticleById, id])

    const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 426);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
     <section className='container' style={{ paddingTop: isSmallScreen ? '160px' : '0' }}>
        {article === null || loading ? (
            <Spinner />
        ) : (
            <Fragment>
                <Link to='/dashboard' className='btn btn-light'>
                   Back 
                </Link>
                {auth.isAuthenticated &&
                auth.loading === false &&
               auth.user._id === article.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Article
              </Link>
            )}

          <div>
            <ArticleTop article={article} />
            <ArticleView article={article} />
          </div>
            </Fragment>
        )}   
    </section> 
    </>
  )
}

Article.propTypes = {
    getArticleById: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    article: state.article,
    auth: state.auth,
  });

export default connect(mapStateToProps, { getArticleById })(Article)