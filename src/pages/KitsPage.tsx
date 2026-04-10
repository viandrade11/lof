import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KitsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/collections/all?tipo=Kit', { replace: true });
  }, [navigate]);

  return null;
};

export default KitsPage;
