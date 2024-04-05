import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (intitle) => `volumes?q=intitle:${intitle}`,
    }),
    getBook: builder.query({
      query: (isbn) => `volumes?q=isbn:${isbn}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookQuery } = booksApi;
