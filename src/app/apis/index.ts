import axios from 'axios';
import { IForm } from "app/models";

const baseApi = 'http://localhost:3005/api';

export function submitFormData(formData: any) {
  return axios.post(`${baseApi}/data/submit`, formData);
}
export function getFormDataSubmissions() {
  return axios.get(`${baseApi}/data`);
}

export function saveFormSchema(form: IForm) {
  return axios.post(`${baseApi}/form`, form);
}
export function deleteFormSchema(formId: string) {
  return axios.delete(`${baseApi}/form/${formId}`);
}
export function getFormSchemas() {
  return axios.get(`${baseApi}/form`);
}
