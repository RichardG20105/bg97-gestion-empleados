import axios from "axios";
import { useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API;

export const EmpleadoApi = axios.create({
  baseURL: API,
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