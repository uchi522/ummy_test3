import { useState, useEffect } from 'react';
import { THREADS, EXTRA_THREADS } from '../data/mock.js';
import { apiClient } from '../api/client.js';

export function useThreads(communityId) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient.getThreads(communityId).then(data => {
      if (data) {
        setThreads(data);
      } else {
        setThreads(THREADS);
      }
      setLoading(false);
    });
  }, [communityId]);

  return { threads, setThreads, extraThreads: EXTRA_THREADS, loading };
}
