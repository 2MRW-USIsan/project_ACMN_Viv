import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { PanelList } from "@/components/atoms/layout/PanelList";
import { AddPanelButton } from "@/components/molecules/AddPanelButton";
import { ListItemForm } from "@/components/molecules/ListItemForm";
import { SectionProps } from "@/types/configurations/select";

export function Section({ props }: SectionProps) {
  return (
    <AlignLayout column={0.1} indent>
      <PanelList>
        {props.panels.map((panel) => (
          <ListItemForm props={panel.props} key={panel.key} />
        ))}
        <AddPanelButton props={props.add} />
      </PanelList>
    </AlignLayout>
  );
}
