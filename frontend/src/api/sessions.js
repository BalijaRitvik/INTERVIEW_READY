import axiosInstance from "../lib/axios";

export const sessionApi = {
  createSession: async (data) => {
    const response = await axiosInstance.post("/interviews", data);
    return response.data;
  },

  getActiveSessions: async () => {
    const response = await axiosInstance.get("/interviews/active");
    return response.data;
  },

  getMyRecentSessions: async () => {
    const response = await axiosInstance.get("/interviews/my-recent");
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await axiosInstance.get(`/interviews/${id}`);
    return response.data;
  },

  joinSession: async (id) => {
    const response = await axiosInstance.post(`/interviews/${id}/join`);
    return response.data;
  },

  endSession: async (id) => {
    const response = await axiosInstance.post(`/interviews/${id}/end`);
    return response.data;
  },

  getStreamToken: async () => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },
};
