import axios from 'axios';

const server = "http://dev.donorium.ro:10000/";

export const getRequest = ( path, token , callback) => {
  console.log("GET", server + path, token);
  axios.get(server + path,{ headers: { Authorization: "Bearer " + token } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const postRequest = (path, data, token, callback) => {
  console.log("POST", server + path, data, token);
  axios.post(server + path, data,{ headers: { Authorization: "Bearer " + token } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const putRequest = (path, data, token, callback) => {
  console.log("PUT", server + path + (token != null ? "?access-token=" + token : ""), data);
  axios.put(server + path, data,{ headers: { Authorization: "Bearer " + token } })
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteRequest = (path, token, callback) => {
  console.log("DELETE", server + path + (token != null ? "?access-token=" + token : ""));
  axios.delete(server + path + (token != null ? "?access-token=" + token : ""))
    .then(response => {
      callback(response);
    })
    .catch(error => {
      console.log(error);
    });
};
