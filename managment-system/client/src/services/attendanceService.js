import api from "./api";
export const getAttendance = async (params) => {
  const response = await api.get("/attendance", { params });
  return response.data;
};
export const markAttendance = async (data) => {
  const response = await api.post("/attendance", data);
  return response.data;
};
export const updateAttendance = async (id, data) => {
  const response = await api.put(`/attendance/${id}`, data);
  return response.data;
};
