export type PostStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED' | string;

export interface PostItem {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  content: string;
  viewCount: number;
  isPinned: boolean;
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PostListData {
  content: PostItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PostListParams extends Record<string, string | number | boolean | undefined> {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'ASC' | 'DESC';
}

export interface PostCreateRequest {
  title: string;
  content: string;
}

export interface PostUpdateRequest {
  title?: string;
  content?: string;
}

export interface AdminPostCreateRequest {
  title: string;
  content: string;
  isPinned?: boolean;
  status?: 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | string;
}

export interface AdminPostUpdateRequest {
  title?: string;
  content?: string;
  isPinned?: boolean;
  status?: 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | string;
}

export interface PostFileItem {
  id: number;
  postId: number;
  storageUrl: string;
  originalFilename: string;
  fileSize: number;
  contentType: string;
  createdAt: string;
}
