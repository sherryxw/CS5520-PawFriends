import axios from "axios";

export const baseURL = "http://localhost:9527/api";

const client = axios.create({ baseURL });

export default client;
