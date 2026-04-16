import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { NavigationItemType } from "@/types/navigation";
import { ConfigSelectField } from "./ConfigSelectField";
import { DataSelectField } from "./DataSelectField";
import { NavigationLabel } from "./NavigationLabel";

export interface NavigationItemProps {
  props: NavigationItemType;
}
export function NavigationItem({ props }: NavigationItemProps) {
  const isConfigSelector = props.navigation.isCurrent && props.configSelect;
  const isDataSelector = props.navigation.isCurrent && props.dataSelect;
  return (
    <AlignLayout column={1}>
      <NavigationLabel props={props.navigation} />
      {isConfigSelector && <ConfigSelectField props={props.configSelect!} />}
      {isDataSelector && <DataSelectField props={props.dataSelect!} />}
    </AlignLayout>
  );
}
