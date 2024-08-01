import React from 'react';
import { useDispatch } from 'react-redux';
import { markAsRead } from '../store/emailSlice';
import { formatTime } from '../utils/timeUtils';
import './EmailItem.css';  

const EmailItem = ({ email, onClick, isActive }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(markAsRead(email.id));
    onClick(email.id);
  };

  return (
    <div
      className={`email-item ${email.read ? 'read' : 'unread'} ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="avatar">{email.from.name.charAt(0)}</div>
      <div className="email-info">
        <div className="email-details">
          <p className="from">From: <span>{email.from.name} &lt;{email.from.email}&gt;</span></p>
          <p className="subject">Subject: <span>{email.subject}</span></p>
          <p className="description">{email.short_description.substring(0, 45)}...</p>
        </div>
        <p className="time">
          {formatTime(email.date)}
          {email.favorite ? ' - Favorite' : ''}
        </p>
      </div>
    </div>
  );
};

export default EmailItem;
