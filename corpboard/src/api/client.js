const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export const apiClient = {
  async getThreads(_communityId) {
    if (!BASE_URL) return null;
    const res = await fetch(`${BASE_URL}/threads?communityId=${_communityId}`);
    return res.ok ? res.json() : null;
  },
  async getComments(_threadId) {
    if (!BASE_URL) return null;
    const res = await fetch(`${BASE_URL}/comments?threadId=${_threadId}`);
    return res.ok ? res.json() : null;
  },
  async postThread(_data) {
    if (!BASE_URL) return null;
    return null;
  },
  async postComment(_threadId, _data) {
    if (!BASE_URL) return null;
    return null;
  },
};
