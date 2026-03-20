"use client";

import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";

interface SubPanelContentMoleculeProps {
  props: {
    subType: "orders" | "switch";
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
  const textFieldProps = {
    label: "Orders Text",
    defaultValue: value,
    onBlur: onValueChange,
  };
  return <TextFieldAtom props={textFieldProps} />;
}

function SwitchSubPanelContentMolecule({
  value,
  onValueChange,
}: SubTypeTextFieldProps) {
  const textFieldProps = {
    label: "Switch Text",
    defaultValue: value,
    onBlur: onValueChange,
  };
  return <TextFieldAtom props={textFieldProps} />;
}

const SUB_PANEL_COMPONENTS: Record<
  "orders" | "switch",
  React.ComponentType<SubTypeTextFieldProps>
> = {
  orders: OrdersSubPanelContentMolecule,
  switch: SwitchSubPanelContentMolecule,
};

export function SubPanelContentMolecule({ props }: SubPanelContentMoleculeProps) {
  const SubPanelComponent = SUB_PANEL_COMPONENTS[props.subType];

  return <SubPanelComponent value={props.value} onValueChange={props.onValueChange} />;
}