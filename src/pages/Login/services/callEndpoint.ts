import axios from "axios";
import { LoginUser } from "../models/login-form.models";

export const callEndpoint = async (data: LoginUser) => {
     const response = await axios.post('https://rickandmortyapi.com/api/character/2', data);
     return response.data;
}