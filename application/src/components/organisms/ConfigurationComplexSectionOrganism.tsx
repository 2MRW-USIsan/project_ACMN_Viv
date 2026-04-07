"use client";

import { CollapseAtom } from "@/components/atoms/CollapseAtom";
import { DividerAtom } from "@/components/atoms/DividerAtom";
import { GridLayoutAtom } from "@/components/atoms/GridLayoutAtom";
import { IconButtonAtom } from "@/components/atoms/IconButtonAtom";
import { LabelAtom } from "@/components/atoms/LabelAtom";
import { ListFrameAtom } from "@/components/atoms/ListFrameAtom";
import { ListRowAtom } from "@/components/atoms/ListRowAtom";
import { PanelContentAtom } from "@/components/atoms/PanelContentAtom";
import { PanelFrameAtom } from "@/components/atoms/PanelFrameAtom";
import { StackAtom } from "@/components/atoms/StackAtom";
import { TextFieldAtom } from "@/components/atoms/TextFieldAtom";
import { ComplexSection } from "@/hooks/configurations/viewModel/useConfigurationsComposer";

interface ConfigurationComplexSectionOrganismProps {
  props: ComplexSection;
}

export function ConfigurationComplexSectionOrganism({
  props,
}: ConfigurationComplexSectionOrganismProps) {
  return (
    <PanelFrameAtom props={{ mt: 1 }}>
      <ListFrameAtom>
        {props.categoryPanels.map((category, index) => (
          <GridLayoutAtom key={category.key}>
            {index > 0 && <DividerAtom />}

            {/* Category row */}
            <ListRowAtom props={{ variant: "item" }}>
              <LabelAtom props={category.categoryLabel} />
              <LabelAtom props={category.valueLabel} />
              <GridLayoutAtom props={{ width: 140 }}>
                <TextFieldAtom props={category.valueField} />
              </GridLayoutAtom>

              <LabelAtom props={category.promptLabel} />
              <GridLayoutAtom props={{ flex: 1, minWidth: 140 }}>
                <TextFieldAtom props={category.promptField} />
              </GridLayoutAtom>

              <LabelAtom props={category.weightLabel} />
              <GridLayoutAtom props={{ width: 100 }}>
                <TextFieldAtom props={category.weightField} />
              </GridLayoutAtom>

              <IconButtonAtom props={category.removeButton} />
              <IconButtonAtom props={category.toggleButton} />
            </ListRowAtom>

            {/* Expanded random sub-section */}
            <CollapseAtom props={{ isOpen: category.isExpanded }}>
              <PanelContentAtom>
                <LabelAtom props={category.randomSectionLabel} />
                <DividerAtom />

                <StackAtom props={{ spacing: 1, mt: 1 }}>
                  {category.randomItemPanels.map((item) => (
                    <StackAtom
                      key={item.key}
                      props={{ direction: "row", alignItems: "center", gap: 1, flexWrap: "wrap" }}
                    >
                      <LabelAtom props={item.valueLabel} />
                      <GridLayoutAtom props={{ width: 140 }}>
                        <TextFieldAtom props={item.valueField} />
                      </GridLayoutAtom>

                      <LabelAtom props={item.promptLabel} />
                      <GridLayoutAtom props={{ flex: 1, minWidth: 140 }}>
                        <TextFieldAtom props={item.promptField} />
                      </GridLayoutAtom>

                      <LabelAtom props={item.weightLabel} />
                      <GridLayoutAtom props={{ width: 100 }}>
                        <TextFieldAtom props={item.weightField} />
                      </GridLayoutAtom>

                      <IconButtonAtom props={item.removeButton} />
                    </StackAtom>
                  ))}
                </StackAtom>

                {/* Add Random Item row */}
                <StackAtom props={{ direction: "row", alignItems: "center", justifyContent: "center", spacing: 0.5, mt: 2 }}>
                  <LabelAtom props={category.addRandomItemRowLabel} />
                  <IconButtonAtom props={category.addRandomItemButton} />
                </StackAtom>
              </PanelContentAtom>
            </CollapseAtom>
          </GridLayoutAtom>
        ))}

        {/* Add Complex Category row */}
        <DividerAtom />
        <ListRowAtom props={{ variant: "footer" }}>
          <StackAtom props={{ direction: "row", alignItems: "center", spacing: 0.5 }}>
            <LabelAtom props={props.addCategoryRowLabel} />
            <IconButtonAtom props={props.addCategoryButton} />
          </StackAtom>
        </ListRowAtom>
      </ListFrameAtom>
    </PanelFrameAtom>
  );
}
