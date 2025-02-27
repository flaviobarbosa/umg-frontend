import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/codechallenge',
  auth: {
    username: 'umg',
    password: 'umg',
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
