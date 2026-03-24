"use client";
import { ButtonAtom } from "@/components/atoms/ButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { SelectAtom } from "@/components/atoms/SelectAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { StackProps } from "@mui/material";

interface ConfigurationsSetSelectorMoleculeProps {
  props: {
    styling: StackProps;
    label: {
      text: string;
      variant: "body2";
    };
    selector: {
      value: string;
      options: string[];
      onChange: (value: string) => void;
      fullWidth: boolean;
    };
    load: {
      label: string;
      onClick: () => void;
    };
  };
}

export function ConfigurationsSetSelectorMolecule({
  props,
}: ConfigurationsSetSelectorMoleculeProps) {
  return (
    <StackAtom props={props.styling}>
      <LabelAtom props={props.label} />
      <SelectAtom props={props.selector} />
      <ButtonAtom props={props.load} />
    </StackAtom>
  );
}
