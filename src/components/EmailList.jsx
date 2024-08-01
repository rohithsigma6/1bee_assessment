import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmails, fetchEmailBody } from '../store/emailSlice';
import EmailItem from './EmailItem';
import FilterBar from './FilterBar';
import './EmailList.css';  

const EmailList = () => {
  const dispatch = useDispatch();
  const { filteredEmailList: emailList, loading, error } = useSelector((state) => state.emails);
  const [activeEmailId, setActiveEmailId] = useState(null);

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  const handleEmailClick = (id) => {
    setActiveEmailId(id);
    dispatch(fetchEmailBody(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="email-list">
      <FilterBar />
      {emailList.map((email) => (
        <EmailItem
          key={email.id}
          email={email}
          onClick={handleEmailClick}
          isActive={email.id === activeEmailId}
        />
      ))}
    </div>
  );
};

export default EmailList;
