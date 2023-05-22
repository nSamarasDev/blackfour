import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getContactById } from '../../actions/contact'
import ContactTop from './ContactTop'

const ContactView = ({
    getContactById,
    contact: { contact, loading },
    auth
}) => {

    const { id } = useParams()

    useEffect(() => {
        getContactById(id);
    }, [getContactById, id])

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
        {contact === null || loading ? (
            <Spinner />
        ) : (
            <Fragment>
                <Link to='/dashboard' className='btn btn-light'>
                   Back 
                </Link>
                {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === contact._id && (
              <Link to='/edit-contact' className='btn btn-dark'>
                Edit Contact
              </Link>
            )}

          <div>
            <ContactTop contact={contact} />
          </div>
            </Fragment>
        )}   
    </section> 
    </>
  )
}

ContactView.propTypes = {
    getContactById: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    contact: state.contact,
    auth: state.auth,
  });

export default connect(mapStateToProps, { getContactById })(ContactView)
