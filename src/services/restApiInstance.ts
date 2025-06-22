// services/restApiInstance.ts

import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react"; // ← `react` here is important!
import type { AxiosError } from "axios";
import axios from "axios";
import { ENDPOINTS } from "../config/endpoints";

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<any, unknown, unknown> =>
  async ({ url, method = "get", data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": "application/json", // ✅ Explicitly set
          ...headers, // merge any additional headers
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const restApiInstance = createApi({
  reducerPath: "restApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["Students"],
  endpoints: (build) => ({
    students: build.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `${ENDPOINTS.STUDENTS}?page=${page}&limit=${limit}`,
        method: "get",
      }),
    }),
    subjects: build.query<any, void>({
      query: () => ({
        url: ENDPOINTS.SUBJECTS,
        method: "get",
      }),
    }),
    findById: build.query<any, string>({
      query: (id) => ({
        url: `${ENDPOINTS.STUDENTS}/${id}`,
        method: "get",
      }),
    }),
    addStudent: build.mutation<any, any>({
      query: (body) => ({
        url: ENDPOINTS.STUDENTS,
        method: "post",
        data: body,
      }),
    }),
    deleteStudent: build.mutation<any, number>({
      query: (id) => ({
        url: `${ENDPOINTS.STUDENTS}/${id}`,
        method: "delete",
      }),
    }),
    updateStudent: build.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({
        url: `${ENDPOINTS.STUDENTS}/${id}`,
        method: "PUT",
        data: body,
      }),
    }),
  }),
});

export const {
  useStudentsQuery,
  useSubjectsQuery,
  useFindByIdQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = restApiInstance;
