"use client";

import { useEffect } from "react";
import { SampleItem } from "@/types/sampleItem";
import {
  fetchSampleItems,
  postSampleItem,
  putSampleItem,
  deleteSampleItemRequest,
} from "@/services/sampleItemService";
import { useSampleFetchReducer } from "@/hooks/sample/state/useSampleFetchReducer";

export interface SampleFetchItem {
  itemList: SampleItem[] | null;
}

export interface SampleRequest {
  createItem: (title: string, description: string) => Promise<void>;
  updateItem: (id: string, title: string, description: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  refreshList: () => Promise<void>;
}

export interface SampleServiceReturns {
  fetchItem: SampleFetchItem;
  request: SampleRequest;
}

export function useSampleService(): SampleServiceReturns {
  const { state: fetchState, action: fetchAction } = useSampleFetchReducer();

  useEffect(() => {
    fetchSampleItems().then((items) => {
      fetchAction.setItemList(items);
    });
    // Mount-only effect: intentionally run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateItem = async (
    title: string,
    description: string,
  ): Promise<void> => {
    await postSampleItem({ title, description });
    const items = await fetchSampleItems();
    fetchAction.setItemList(items);
  };

  const handleUpdateItem = async (
    id: string,
    title: string,
    description: string,
  ): Promise<void> => {
    await putSampleItem(id, { title, description });
    const items = await fetchSampleItems();
    fetchAction.setItemList(items);
  };

  const handleDeleteItem = async (id: string): Promise<void> => {
    await deleteSampleItemRequest(id);
    const items = await fetchSampleItems();
    fetchAction.setItemList(items);
  };

  const handleRefreshList = async (): Promise<void> => {
    const items = await fetchSampleItems();
    fetchAction.setItemList(items);
  };

  return {
    fetchItem: { itemList: fetchState.itemList },
    request: {
      createItem: handleCreateItem,
      updateItem: handleUpdateItem,
      deleteItem: handleDeleteItem,
      refreshList: handleRefreshList,
    },
  };
}

