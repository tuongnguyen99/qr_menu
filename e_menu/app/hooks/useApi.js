import { useState } from 'react';

const useApi = (apiFunction) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    setData([]);
    setError('');
    const response = await apiFunction(...args);
    // console.log(response);
    setLoading(false);
    if (!response.ok) {
      setError('Err');
    }
    setData(response.data);
    setDone(true);
    return response;
  };

  return { data, error, loading, done, request };
};

export default useApi;
