import api from "./axios";

export const deleteTaskPermanently = (taskId) => {
  return api.delete(`/tasks/${taskId}`);
};
