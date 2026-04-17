// import { BoxLayout } from "@/components/atoms/layout/BoxLayout";
// import { CollapseLayout } from "@/components/atoms/layout/CollapseLayout";
// import { ListItemLayout } from "@/components/atoms/layout/ListItemLayout";
// import { ListLayout } from "@/components/atoms/layout/ListLayout";
// import { StackLayout } from "@/components/atoms/layout/StackLayout";
// import type { ConfigurationOrdersSectionOrganismProps } from "@/types/configuration";
// import { DividerAtom } from "../../../atoms/display/DividerAtom";
// import { LabelAtom } from "../../../atoms/display/LabelAtom";
// import { IconButtonAtom } from "../../../atoms/inputs/IconButtonAtom";
// import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";
// import { ConfigurationOrdersItemSectionOrganism } from "./ConfigurationOrdersItemSectionOrganism";

// export function ConfigurationOrdersSectionOrganism({
//   props,
// }: ConfigurationOrdersSectionOrganismProps) {
//   return (
//     <BoxLayout mt={2}>
//       <LabelAtom props={props.titleLabel} />
//       <DividerAtom />

//       <BoxLayout
//         sx={{
//           border: "1px solid",
//           borderColor: "divider",
//           borderRadius: 1,
//           overflow: "hidden",
//           mt: 1,
//         }}
//       >
//         <ListLayout disablePadding>
//           {props.ordersGrpPanels?.map((grp, index) => (
//             <BoxLayout key={grp.key}>
//               {index > 0 && <DividerAtom />}

//               {/* Orders Grp panel header */}
//               <ListItemLayout
//                 disablePadding
//                 sx={{
//                   px: 2,
//                   py: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <LabelAtom props={grp.panelLabel} />
//                 <LabelAtom props={grp.keyLabel} />
//                 <BoxLayout sx={{ width: 160 }}>
//                   <TextFieldAtom props={grp.keyField} />
//                 </BoxLayout>

//                 <LabelAtom props={grp.labelLabel} />
//                 <BoxLayout sx={{ flex: 1, minWidth: 160 }}>
//                   <TextFieldAtom props={grp.labelField} />
//                 </BoxLayout>

//                 <IconButtonAtom props={grp.removeButton} />
//                 <IconButtonAtom props={grp.toggleButton} />
//               </ListItemLayout>

//               {/* Expanded content: Order Items section */}
//               <CollapseLayout in={grp.isExpanded} timeout="auto" unmountOnExit>
//                 <BoxLayout
//                   sx={{
//                     borderTop: "1px solid",
//                     borderColor: "divider",
//                     px: 3,
//                     py: 2,
//                   }}
//                 >
//                   <LabelAtom props={grp.orderItemsLabel} />
//                   <ConfigurationOrdersItemSectionOrganism
//                     props={grp.ordersItemSection}
//                   />
//                 </BoxLayout>
//               </CollapseLayout>
//             </BoxLayout>
//           ))}

//           {/* Add Orders Grp row */}
//           {props.addGrpRowLabel && props.addGrpButton && (
//             <>
//               <DividerAtom />
//               <ListItemLayout
//                 disablePadding
//                 sx={{
//                   px: 2,
//                   py: 1.5,
//                   display: "flex",
//                   justifyContent: "center",
//                 }}
//               >
//                 <StackLayout direction="row" alignItems="center" spacing={0.5}>
//                   <LabelAtom props={props.addGrpRowLabel} />
//                   <IconButtonAtom props={props.addGrpButton} />
//                 </StackLayout>
//               </ListItemLayout>
//             </>
//           )}
//         </ListLayout>
//       </BoxLayout>
//     </BoxLayout>
//   );
// }
