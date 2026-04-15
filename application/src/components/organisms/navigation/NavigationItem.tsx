import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { ConfigSelectField, ConfigSelectFieldType } from "./ConfigSelectField";
import { DataSelectField, DataSelectFieldType } from "./DataSelectField";
import { NavigationLabel, NavigationLabelType } from "./NavigationLabel";

export type NavigationItemType = {
  key: string;
  navigation: NavigationLabelType;
  configSelect: ConfigSelectFieldType;
  dataSelect: DataSelectFieldType;
};
export interface NavigationItemProps {
  props: NavigationItemType;
}
export function NavigationItem({ props }: NavigationItemProps) {
  const isConfigSelector = props.navigation.isCurrent && props.configSelect;
  const isDataSelector = props.navigation.isCurrent && props.dataSelect;
  return (
    <AlignLayout column={1}>
      <NavigationLabel props={props.navigation} />
      {isConfigSelector && <ConfigSelectField props={props.configSelect} />}
      {isDataSelector && <DataSelectField props={props.dataSelect} />}
    </AlignLayout>
  );
}
