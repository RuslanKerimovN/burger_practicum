import { useLocation } from 'react-router';

export const FeedPage = () => {
  const location = useLocation();
  localStorage.setItem('noLogin', `${location.pathname}`);

  return (
    <div>
    </div>
  );
};
