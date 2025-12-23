import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://37.27.29.18:8002/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => "Product/get-products",
    }),
    getProductsByCateg: builder.query<any, string | number>({
      query: (id) => `Product/get-products?SubcategoryId=${id}`,
    }),
    getProductsById: builder.query<any, string | number>({
      query: (id) => `Product/get-product-by-id?id=${id}`,
    }),

  }),
});
export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetProductsByCategQuery
} = pokemonApi