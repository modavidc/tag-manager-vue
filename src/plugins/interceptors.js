import { parseErrors } from "@/utils/responses";

window.axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const errorMessage = parseErrors(error.response);

    return Promise.reject(errorMessage);
  }
);
