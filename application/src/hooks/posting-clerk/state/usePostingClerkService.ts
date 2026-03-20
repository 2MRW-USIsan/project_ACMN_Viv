"use client";

import { usePostingClerkFetchReducer } from "@/hooks/posting-clerk/state/usePostingClerkFetchReducer";

export interface PostingClerkFetchItem {
  // フェッチアイテムは後続工程で追加予定
}

export interface PostingClerkRequest {
  // リクエストは後続工程で追加予定
}

export interface PostingClerkServiceReturns {
  fetchItem: PostingClerkFetchItem;
  request: PostingClerkRequest;
}

export function usePostingClerkService(): PostingClerkServiceReturns {
  const { state: _fetchState, action: _fetchAction } =
    usePostingClerkFetchReducer();

  return {
    fetchItem: {},
    request: {},
  };
}
