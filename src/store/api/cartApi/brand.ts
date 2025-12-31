import { baseApi } from "../../../ultis/api";
export interface ProductImage {
  images: string;
}
export interface ProductFromList {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  color: string;
  image: string;
}
export interface Product extends Omit<ProductFromList, "images"> {
  images: ProductImage[];
  description: string;
  brand: string;
  code: number;
  productName: string;
  brandId?: number;
  subCategoryId?: number;
  colorId?: number;
  categoryId?: number;
}
export interface GetProductsParams {
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  colorId?: number;
  categoryId?: number;
  subCategoryId?: number;
  brandId?: number;
  hasDiscount?: boolean;
}
export const productApi = baseApi.injectEndpoints({
  endpoints: (builder:any) => ({
    getProducts: builder.query({
      query: (params:any) => {
        const queryParams = new URLSearchParams();
        if (params?.minPrice !== undefined)
          queryParams.append("minPrice", params.minPrice.toString());
        if (params?.maxPrice !== undefined)
          queryParams.append("maxPrice", params.maxPrice.toString());
        if (params?.colorId !== undefined)
          queryParams.append("ColorId", params.colorId.toString());
        if (params?.categoryId !== undefined)
          queryParams.append("categoryId", params.categoryId.toString());
        if (params?.subCategoryId !== undefined)
          queryParams.append("subCategoryId", params.subCategoryId.toString());
        if (params?.brandId !== undefined)
          queryParams.append("brandId", params.brandId.toString());
        if (params?.hasDiscount !== undefined)
          queryParams.append("hasDiscount", params.hasDiscount.toString());
        return `/Product/get-products?${queryParams.toString()}`;
      },
      transformResponse: (res: any) =>
        res.data.products.map((p:any) => ({
          ...p,
          images: [{ images: p.image }],
          description: "",
          brand: "",
          code: 0,
        })),
    }),
    getProductById: builder.query({
      query: (id:any) => `/Product/get-product-by-id?id=${id}`,
      transformResponse: (res: { data: Product }) => res.data,
    }),
    getProductByIdSubCategory: builder.query({
      query: (subCategoryId:any) =>
        `/Product/get-products?SubcategoryId=${subCategoryId}`,
      transformResponse: (res: any) =>
        res.data.products.map((p:any) => ({
          ...p,
          images: [{ images: p.image }],
          description: "",
          brand: "",
          code: 0,
        })),
    }),
    getProductsByBrand: builder.query({
      query: (brandId:any) => `/Product/get-products?brandId=${brandId}`,
      transformResponse: (res:any) =>
        res.data.products.map((p:any) => ({
          ...p,
          images: [{ images: p.image }],
          description: "",
          brand: "",
          code: 0,
        })),
    }),
    getProductsByColor: builder.query({
      query: (colorId:any) => `/Product/get-products?ColorId=${colorId}`,
      transformResponse: (res: {
        data: {
          products: ProductFromList[];
        };
      }) =>
        res.data.products.map((p) => ({
          ...p,
          images: [{ images: p.image }],
          description: "",
          brand: "",
          code: 0,
        })),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductByIdSubCategoryQuery,
  useGetProductsByBrandQuery,
  useGetProductsByColorQuery
} = productApi;