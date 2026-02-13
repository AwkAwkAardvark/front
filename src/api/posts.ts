import { apiDelete, apiGet, apiPatch, apiPost, apiPostForm } from './client';
import {
  AdminPostCreateRequest,
  AdminPostUpdateRequest,
  PostCreateRequest,
  PostFileItem,
  PostItem,
  PostListData,
  PostListParams,
  PostUpdateRequest,
} from '../types/post';

export const listPosts = async (
  categoryName: string,
  params?: PostListParams,
): Promise<PostListData> => {
  return apiGet<PostListData>('/api/posts', { ...params, categoryName });
};

export const getPost = async (
  categoryName: string,
  postId: number | string,
): Promise<PostItem> => {
  return apiGet<PostItem>(`/api/posts/${postId}`);
};

export const createPost = async (
  categoryName: string,
  payload: PostCreateRequest,
): Promise<PostItem> => {
  return apiPost<PostItem, PostCreateRequest & { categoryName: string }>(
    '/api/posts',
    {
      ...payload,
      categoryName,
    },
  );
};

export const updatePost = async (
  categoryName: string,
  postId: number | string,
  payload: PostUpdateRequest,
): Promise<PostItem> => {
  return apiPatch<PostItem, PostUpdateRequest>(`/api/posts/${postId}`, payload);
};

export const deletePost = async (
  categoryName: string,
  postId: number | string,
): Promise<string> => {
  return apiDelete<string>(`/api/posts/${postId}`);
};

export const listAdminPosts = async (
  categoryName: string,
  params?: PostListParams,
): Promise<PostListData> => {
  return apiGet<PostListData>(`/api/admin/posts/${categoryName}`, params);
};

export const createAdminPost = async (
  categoryName: string,
  payload: AdminPostCreateRequest,
): Promise<PostItem> => {
  return apiPost<PostItem, AdminPostCreateRequest>(
    `/api/admin/posts/${categoryName}`,
    payload,
  );
};

export const updateAdminPost = async (
  categoryName: string,
  postId: number | string,
  payload: AdminPostUpdateRequest,
): Promise<PostItem> => {
  return apiPatch<PostItem, AdminPostUpdateRequest>(
    `/api/admin/posts/${categoryName}/${postId}`,
    payload,
  );
};

export const deleteAdminPost = async (
  categoryName: string,
  postId: number | string,
): Promise<string> => {
  return apiDelete<string>(`/api/admin/posts/${categoryName}/${postId}`);
};

export const listPostFiles = async (postId: number | string): Promise<PostFileItem[]> => {
  return apiGet<PostFileItem[]>(`/api/posts/${postId}/files`);
};

export const uploadPostFiles = async (
  postId: number | string,
  files: File[],
): Promise<PostFileItem[] | string> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  return apiPostForm<PostFileItem[] | string>(`/api/posts/${postId}/files`, formData);
};

export const getFileDownloadUrl = async (fileId: number | string): Promise<{ url: string }> => {
  return apiGet<{ url: string }>(`/api/files/${fileId}/download-url`);
};
