"use client";

import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { SubPanelType } from "@/types/subPanel";

interface SubPanelContentMoleculeProps {
  props: {
    subType: SubPanelType;
    value: string;
    onValueChange: (value: string) => void;
  };
}

interface SubTypeTextFieldProps {
  value: string;
  onValueChange: (value: string) => void;
}

function OrdersSubPanelContentMolecule({
  value,
  onValueChange,
}: SubTypeTextFieldProps) {
  return (
    <TextFieldAtom
      props={{
        label: "Orders Text",
        defaultValue: value,
        onBlur: onValueChange,
      }}
    />
  );
}

function SwitchSubPanelContentMolecule({
  value,
  onValueChange,
}: SubTypeTextFieldProps) {
  return (
    <TextFieldAtom
      props={{
        label: "Switch Text",
        defaultValue: value,
        onBlur: onValueChange,
      }}
    />
  );
}

function SelectSubPanelContentMolecule({
  value,
  onValueChange,
}: SubTypeTextFieldProps) {
  return (
    <TextFieldAtom
      props={{
        label: "Select Text",
        defaultValue: value,
        onBlur: onValueChange,
      }}
    />
  );
}

const SUB_PANEL_COMPONENTS: Record<SubPanelType, React.ComponentType<SubTypeTextFieldProps>> = {
  orders: OrdersSubPanelContentMolecule,
  switch: SwitchSubPanelContentMolecule,
  select: SelectSubPanelContentMolecule,
};

export function SubPanelContentMolecule({ props }: SubPanelContentMoleculeProps) {
  const SubPanelComponent = SUB_PANEL_COMPONENTS[props.subType];

  return <SubPanelComponent value={props.value} onValueChange={props.onValueChange} />;
}