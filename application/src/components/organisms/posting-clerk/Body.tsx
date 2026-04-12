import { AlignLayout } from "@/components/atoms/layout/AlignLayout";
import { BodyType } from "@/types/posting-clerk";
import { BodyFrame } from "../../atoms/layout/BodyFrame";
import { ClerkSection } from "../../organisms/posting-clerk/section/ClerkSection";
import { InformSection } from "../../organisms/posting-clerk/section/InformSection";

interface BodyProps {
  props: BodyType;
}

export function Body({ props }: BodyProps) {
  return (
    <BodyFrame>
      <AlignLayout column={1}>
        <InformSection props={props.informProps} />
        <ClerkSection props={props.clerkProps} />
      </AlignLayout>
    </BodyFrame>
  );
}
