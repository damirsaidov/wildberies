import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const API = import.meta.env.VITE_API_URL;
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API, 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product', 'Cart'],
  endpoints: () => ({}),
});
