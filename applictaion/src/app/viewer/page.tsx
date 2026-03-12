"use client";

import { OrdersViewerPanel } from "@/components/features/viewer/OrdersViewerPanel";
import { useViewerViewModel } from "@/hooks/viewer/useViewerViewModel";

export default function ViewerPage() {
  const vm = useViewerViewModel();
  return <OrdersViewerPanel props={vm} />;
}
