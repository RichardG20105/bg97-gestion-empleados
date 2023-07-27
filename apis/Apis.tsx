import axios from "axios";
import { useEffect } from "react";

export const EmpleadoApi = axios.create({
  baseURL: "https://uk561ltns2.execute-api.us-east-1.amazonaws.com/prod/gb97",
});

export const GeneralApi = axios.create({
  baseURL: "https://w1sppy28xj.execute-api.us-east-1.amazonaws.com/prod/gb97",
});