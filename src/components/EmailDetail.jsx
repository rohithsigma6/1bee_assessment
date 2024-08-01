import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsFavorite } from '../store/emailSlice';
import { formatTime } from '../utils/timeUtils';
import './EmailDetail.css';

const EmailDetail = () => {
  const dispatch = useDispatch();
  const { currentEmail } = useSelector((state) => state.emails);

  if (!currentEmail) return <div className="email-detail">Select an email to view details</div>;

  const handleFavoriteClick = () => {
    dispatch(markAsFavorite(currentEmail.id));
  };

  return (
    <div className="email-detail">
      <div className="header">
        <div className="avatar">{currentEmail.from.name.charAt(0)}</div>
        <div className="subject">{currentEmail.subject}</div>
        <button className="favorite-button" onClick={handleFavoriteClick}>
          {currentEmail.favorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
        </button>
      </div>
      <p className="email-time">{formatTime(currentEmail.date)}</p>
      <div 
        className="email-body" 
        dangerouslySetInnerHTML={{ __html: currentEmail.body }}
      />
    </div>
  );
};

export default EmailDetail;
