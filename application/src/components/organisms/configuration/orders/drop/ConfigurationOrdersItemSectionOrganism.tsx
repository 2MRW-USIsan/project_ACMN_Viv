// import { BoxLayout } from "@/components/atoms/layout/BoxLayout";
// import { CollapseLayout } from "@/components/atoms/layout/CollapseLayout";
// import { ListItemLayout } from "@/components/atoms/layout/ListItemLayout";
// import { ListLayout } from "@/components/atoms/layout/ListLayout";
// import { StackLayout } from "@/components/atoms/layout/StackLayout";
// import type { ConfigurationOrdersItemSectionOrganismProps } from "@/types/configuration";
// import type { LabelAtomType } from "@/types/ui";
// import { DividerAtom } from "../../../atoms/display/DividerAtom";
// import { LabelAtom } from "../../../atoms/display/LabelAtom";
// import { ChipCheckboxAtom } from "../../../atoms/inputs/ChipCheckboxAtom";
// import { IconButtonAtom } from "../../../atoms/inputs/IconButtonAtom";
// import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";
// import { ConfigurationComplexSectionOrganism } from "./ConfigurationComplexSectionOrganism";
// import { ConfigurationOrdersItemColorsOrganism } from "./ConfigurationOrdersItemColorsOrganism";
// import { ConfigurationOrdersItemScriptsOrganism } from "./ConfigurationOrdersItemScriptsOrganism";
// import { OrdersRandomSectionOrganism } from "./OrdersRandomSectionOrganism";

// const BLANK_LABEL: LabelAtomType = {
//   text: "Blank",
//   variant: "body1",
//   fontWeight: "bold",
// };

// export function ConfigurationOrdersItemSectionOrganism({
//   props,
// }: ConfigurationOrdersItemSectionOrganismProps) {
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
//       <ListLayout disablePadding>
//         {props.ordersItemPanels.map((item, index) => (
//           <BoxLayout key={item.key}>
//             {index > 0 && <DividerAtom />}

//             {/* Item panel header */}
//             <ListItemLayout
//               disablePadding
//               sx={{
//                 px: 2,
//                 py: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 flexWrap: "wrap",
//               }}
//             >
//               <LabelAtom props={item.panelLabel} />
//               <LabelAtom props={item.keyLabel} />
//               <BoxLayout sx={{ width: 160 }}>
//                 <TextFieldAtom props={item.keyField} />
//               </BoxLayout>

//               <LabelAtom props={item.labelLabel} />
//               <BoxLayout sx={{ flex: 1, minWidth: 160 }}>
//                 <TextFieldAtom props={item.labelField} />
//               </BoxLayout>

//               <IconButtonAtom props={item.removeButton} />
//               <IconButtonAtom props={item.toggleButton} />
//             </ListItemLayout>

//             {/* Expanded content: Orders Type chips + selected type label + section */}
//             <CollapseLayout in={item.isExpanded} timeout="auto" unmountOnExit>
//               <BoxLayout
//                 sx={{
//                   borderTop: "1px solid",
//                   borderColor: "divider",
//                   px: 3,
//                   py: 2,
//                 }}
//               >
//                 <StackLayout
//                   direction="row"
//                   alignItems="center"
//                   spacing={1}
//                   flexWrap="wrap"
//                 >
//                   <LabelAtom props={item.ordersTypeLabel} />
//                   {item.ordersTypeChips.map((chip) => (
//                     <ChipCheckboxAtom key={chip.key} props={chip} />
//                   ))}
//                 </StackLayout>

//                 {(item.randomSection ||
//                   item.complexSection ||
//                   item.scriptsSection ||
//                   item.colorsSection ||
//                   item.selectedTypeLabel) && (
//                   <BoxLayout mt={1}>
//                     {item.randomSection ? (
//                       <OrdersRandomSectionOrganism props={item.randomSection} />
//                     ) : item.complexSection ? (
//                       <ConfigurationComplexSectionOrganism
//                         props={item.complexSection}
//                       />
//                     ) : item.scriptsSection ? (
//                       <ConfigurationOrdersItemScriptsOrganism
//                         props={item.scriptsSection}
//                       />
//                     ) : item.colorsSection ? (
//                       <ConfigurationOrdersItemColorsOrganism
//                         props={item.colorsSection}
//                       />
//                     ) : (
//                       item.selectedTypeLabel && (
//                         <>
//                           <LabelAtom props={item.selectedTypeLabel} />
//                           <BoxLayout
//                             sx={{
//                               bgcolor: "grey.200",
//                               borderRadius: 1,
//                               p: 4,
//                               mt: 1,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <LabelAtom props={BLANK_LABEL} />
//                           </BoxLayout>
//                         </>
//                       )
//                     )}
//                   </BoxLayout>
//                 )}
//               </BoxLayout>
//             </CollapseLayout>
//           </BoxLayout>
//         ))}

//         {/* Add Orders Item row */}
//         <DividerAtom />
//         <ListItemLayout
//           disablePadding
//           sx={{
//             px: 2,
//             py: 1.5,
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <StackLayout direction="row" alignItems="center" spacing={0.5}>
//             <LabelAtom props={props.addItemRowLabel} />
//             <IconButtonAtom props={props.addItemButton} />
//           </StackLayout>
//         </ListItemLayout>
//       </ListLayout>
//     </BoxLayout>
//   );
// }
