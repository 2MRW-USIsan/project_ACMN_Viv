"use client";

import { DividerAtom } from "@/components/atoms/DividerAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListFrameAtom } from "@/components/atoms/ListFrameAtom";
import { ListRowAtom } from "@/components/atoms/ListRowAtom";
import { PanelFrameAtom } from "@/components/atoms/PanelFrameAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { RandomSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface OrdersRandomSectionOrganismProps {
  props: RandomSection;
}

export function OrdersRandomSectionOrganism({
  props,
}: OrdersRandomSectionOrganismProps) {
  return (
    <PanelFrameAtom props={{ mt: 1 }}>
      <GridLayoutAtom props={{ px: 2, py: 1 }}>
        <LabelAtom props={props.headerLabel} />
      </GridLayoutAtom>
      <DividerAtom />
      <ListFrameAtom>
        {props.randomRows.map((row) => (
          <ListRowAtom key={row.key} props={{ variant: "item" }}>
            <LabelAtom props={row.valueLabel} />
            <GridLayoutAtom props={{ width: 160 }}>
              <TextFieldAtom props={row.valueField} />
            </GridLayoutAtom>

            <LabelAtom props={row.promptLabel} />
            <GridLayoutAtom props={{ width: 160 }}>
              <TextFieldAtom props={row.promptField} />
            </GridLayoutAtom>

            <LabelAtom props={row.weightLabel} />
            <GridLayoutAtom props={{ width: 100 }}>
              <TextFieldAtom props={row.weightField} />
            </GridLayoutAtom>

            <IconButtonAtom props={row.removeButton} />
          </ListRowAtom>
        ))}
      </ListFrameAtom>
      <DividerAtom />
      <ListRowAtom props={{ variant: "footer" }}>
        <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
          <LabelAtom props={props.addRowLabel} />
          <IconButtonAtom props={props.addRowButton} />
        </StackAtom>
      </ListRowAtom>
    </PanelFrameAtom>
  );
}
