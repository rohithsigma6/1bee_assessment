export const formatTime = (time) => {
  const date = new Date(time);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleString('en-GB', options);
};
