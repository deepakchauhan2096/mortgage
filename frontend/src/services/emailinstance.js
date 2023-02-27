import axios from "axios";

const emailinstance = axios.create({
  baseURL : "http://3.8.178.158:4000/",
  headers: {
    'Content-Type' : "application/json",
    'authorization_key': '',
    timeout : 1000,
  }, 
});


export default emailinstance;

