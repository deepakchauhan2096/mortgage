import axios from "axios";

const instance = axios.create({
  baseURL : "http://44.203.89.214:3001/",
  headers: {
    'Content-Type' : "application/json",
    'authorization_key': 'qzOUsBmZFgMDlwGtrgYypxUz',
    timeout : 1000,
  }, 
});


export default instance;

