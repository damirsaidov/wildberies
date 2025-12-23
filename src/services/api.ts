import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store-api.softclub.tj/",
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