import { http } from "./config";

export default {
  getAll: () => {
    return http.get("/list");
  },
};
