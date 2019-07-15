import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const baseURL = "http://localhost:5000";

class RestService {
  get(path: string) {
    return axios.get(`${baseURL}${path}`);
  }

  put(path: string) {
    return axios.put(`${baseURL}${path}`);
  }

  post(path: string, body: any) {
    return axios.post(`${baseURL}${path}`, body, config);
  }

  delete(path: string) {
    return axios.delete(`${baseURL}${path}`);
  }
}

const Rest = new RestService();

export default Rest;
