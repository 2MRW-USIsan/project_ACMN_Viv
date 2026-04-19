import { BodyType } from "@/types/components/configurations/types";
import { BodyFrame } from "../../atoms/layout/BodyFrame";
import { PanelList } from "../../atoms/layout/PanelList";
import { AddPanelButton } from "../../molecules/AddPanelButton";
import { SectionLabel } from "../../molecules/SectionLabel";
import { Panel as BlocPanel } from "./Bloc.Panel";

interface BodyProps {
  props: BodyType;
}
export function Body({ props }: BodyProps) {
  return (
    <BodyFrame>
      <SectionLabel props={props.label} />
      <PanelList>
        {props.panels.map((panel) => (
          <BlocPanel props={panel} key={panel.key} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </BodyFrame>
  );
}
