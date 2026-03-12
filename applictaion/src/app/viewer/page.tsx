"use client";

import { OrdersViewerPanel } from "@/components/organisms/viewer/OrdersViewerPanel";
import { useViewerViewModel } from "@/hooks/useViewerViewModel";

export default function ViewerPage() {
  const vm = useViewerViewModel();
  return <OrdersViewerPanel props={vm} />;
}
