"use client";

import { BoxAtom } from "@/components/atoms/BoxAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ReactNode } from "react";

interface ConfigurationsBlocFrameMoleculeProps {
  props: {
    label: {
      text: string;
      variant?:
        | "h4"
        | "h5"
        | "h6"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2"
        | "caption";
    };
  };
  children: ReactNode;
}

export function ConfigurationsBlocFrameMolecule({
  props,
  children,
}: ConfigurationsBlocFrameMoleculeProps) {
  return (
    <BoxAtom>
      <BoxAtom props={{ sx: { px: 2, py: 0.5 } }}>
        <LabelAtom props={props.label} />
      </BoxAtom>
      <DividerAtom />
      {children}
    </BoxAtom>
  );
}
