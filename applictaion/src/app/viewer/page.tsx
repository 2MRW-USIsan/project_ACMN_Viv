"use client";

import { OrdersViewerPanel } from "@/components/features/viewer/OrdersViewerPanel";
import { useViewerViewModel } from "@/hooks/viewer/viewModel/useViewerViewModel";

export default function ViewerPage() {
  const { viewModels: vm } = useViewerViewModel();
  return <OrdersViewerPanel props={vm} />;
}
