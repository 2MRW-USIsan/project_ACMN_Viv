"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListAtom } from "@/components/atoms/ListAtom";
import { ListItemAtom } from "@/components/atoms/ListItemAtom";

interface ConfigurationsAddBlocMoleculeProps {
  props: {
    onAddBloc: () => void;
  };
}

export function ConfigurationsAddBlocMolecule({
  props,
}: ConfigurationsAddBlocMoleculeProps) {
  return (
    <ListAtom props={{ disablePadding: true }}>
      <ListItemAtom
        props={{
          onClick: props.onAddBloc,
          sx: { justifyContent: "center", cursor: "pointer" },
        }}
      >
        <LabelAtom props={{ text: "Add Bloc +", variant: "body2" }} />
      </ListItemAtom>
      <DividerAtom />
    </ListAtom>
  );
}
