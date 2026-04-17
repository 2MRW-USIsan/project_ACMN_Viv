// import { BoxLayout } from "@/components/atoms/layout/BoxLayout";
// import { ListItemLayout } from "@/components/atoms/layout/ListItemLayout";
// import { ListLayout } from "@/components/atoms/layout/ListLayout";
// import { StackLayout } from "@/components/atoms/layout/StackLayout";
// import type { OrdersRandomSectionOrganismProps } from "@/types/configuration";
// import { DividerAtom } from "../../../../atoms/display/DividerAtom";
// import { LabelAtom } from "../../../../atoms/display/LabelAtom";
// import { IconButtonAtom } from "../../../../atoms/inputs/IconButtonAtom";
// import { TextFieldAtom } from "../../../../atoms/inputs/TextFieldAtom";

// export function OrdersRandomSectionOrganism({
//   props,
// }: OrdersRandomSectionOrganismProps) {
//   return (
//     <BoxLayout
//       sx={{
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: 1,
//         overflow: "hidden",
//         mt: 1,
//       }}
//     >
//       <BoxLayout sx={{ px: 2, py: 1 }}>
//         <LabelAtom props={props.headerLabel} />
//       </BoxLayout>
//       <DividerAtom />
//       <ListLayout disablePadding>
//         {props.randomRows.map((row) => (
//           <ListItemLayout
//             key={row.key}
//             disablePadding
//             sx={{
//               px: 2,
//               py: 1,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               flexWrap: "wrap",
//             }}
//           >
//             <LabelAtom props={row.valueLabel} />
//             <BoxLayout sx={{ width: 160 }}>
//               <TextFieldAtom props={row.valueField} />
//             </BoxLayout>

//             <LabelAtom props={row.promptLabel} />
//             <BoxLayout sx={{ width: 160 }}>
//               <TextFieldAtom props={row.promptField} />
//             </BoxLayout>

//             <LabelAtom props={row.weightLabel} />
//             <BoxLayout sx={{ width: 100 }}>
//               <TextFieldAtom props={row.weightField} />
//             </BoxLayout>

//             <IconButtonAtom props={row.removeButton} />
//           </ListItemLayout>
//         ))}
//       </ListLayout>
//       <DividerAtom />
//       <ListItemLayout
//         disablePadding
//         sx={{
//           px: 2,
//           py: 1.5,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <StackLayout direction="row" alignItems="center" spacing={0.5}>
//           <LabelAtom props={props.addRowLabel} />
//           <IconButtonAtom props={props.addRowButton} />
//         </StackLayout>
//       </ListItemLayout>
//     </BoxLayout>
//   );
// }
