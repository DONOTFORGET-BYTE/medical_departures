import { object, string, ref } from "yup";

const payload = {
  body: object({
    title: string().required("title is required"),
    content: string().required("content is required")
  }),
}

export const createBlogSchema = object({
  ...payload,
});

export const updateBlogSchema = object({
  params: object({
    blogId: string().required("blogId is required"),
  }),
  ...payload,
});

export const deleteBlogSchema = object({
  params: object({
    blogId: string().required("blogId is required"),
  }),
});