import { apiGet, apiPost, ApiRequestError } from '../../api/client';
import { QaPost, QaPostInput } from '../../types/decisionRoom';
import { getMockQaPostsForUser } from '../../mocks/decisionRoom.mock';
import { getStoredUser } from '../auth';

const USER_QNA_BASE = '/api/qna';
let lastFallback = false;

export const userQnaApi = {
  listPosts: async (): Promise<QaPost[]> => {
    const currentUser = getStoredUser();
    const fallbackUserId = currentUser?.id ?? 'mock-user';
    lastFallback = true;
    try {
      await apiGet<QaPost[]>(USER_QNA_BASE);
    } catch (error) {
      if (error instanceof ApiRequestError) {
        // ignore API errors for now and use mock data
      }
    }
    return getMockQaPostsForUser(fallbackUserId);
  },

  createPost: async (input: QaPostInput): Promise<QaPost> =>
    apiPost<QaPost, QaPostInput>(USER_QNA_BASE, input),
  wasFallback: (): boolean => lastFallback,
};
