import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const baseURL = "http://localhost:5000";

class RestService {
  // constructor() {
  //   this.baseUrl = baseURL;
  //   this.header = {};
  // }

  async get(path: string, queryParam?: string) {
    return await axios.get(`${baseURL}${path}`);
  }

  put(path: string, body: any) {}

  post(path: string, body: any) {
    console.log("REST ++ ", path, body);

    return axios.post(`${baseURL}${path}`, body, config);
  }

  delete(path: string, id: any) {}
}

const Rest = new RestService();

export default Rest;
