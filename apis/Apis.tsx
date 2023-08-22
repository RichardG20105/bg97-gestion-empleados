import axios from "axios";
import { useEffect } from "react";

export const EmpleadoApi = axios.create({
  baseURL: "https://twqqfaj1ae.execute-api.us-east-2.amazonaws.com/dev/gb97",
  headers: {
    "Accept-Language": "es"
  }
});

export const GeneralApi = axios.create({
  baseURL: "https://w1sppy28xj.execute-api.us-east-1.amazonaws.com/prod/gb97",
  headers: {
    "Accept-Language": "es"
  }
});