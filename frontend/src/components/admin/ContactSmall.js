import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteContact } from '../../actions/contact'

const ContactSmall = ({ contacts, deleteContact }) => {
  if (!contacts || contacts.length === 0) {
    return <p>No contacts available</p>;
  }

  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact._id} className='article-container'>
          <p>{contact.name}</p>
          <p>{contact.email}</p>
          <p>{contact._id}</p>
          <Link to={`/contact/${contact._id}`} className='btn btn-primary'>
            View
          </Link>
          <button className="btn btn-danger" onClick={() => deleteContact(contact._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = dispatch => ({
  deleteProfile: id => dispatch(deleteContact(id))
});

export default connect(mapStateToProps, { deleteContact })(ContactSmall)