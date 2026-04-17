// import { BoxLayout } from "@/components/atoms/layout/BoxLayout";
// import type { ConfigurationComplexSectionOrganismProps } from "@/types/configuration";
// import { DividerAtom } from "../../../atoms/display/DividerAtom";
// import { LabelAtom } from "../../../atoms/display/LabelAtom";
// import { IconButtonAtom } from "../../../atoms/inputs/IconButtonAtom";
// import { TextFieldAtom } from "../../../atoms/inputs/TextFieldAtom";

// export function ConfigurationComplexSectionOrganism({
//   props,
// }: ConfigurationComplexSectionOrganismProps) {
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
//         {props.categoryPanels.map((category, index) => (
//           <BoxLayout key={category.key}>
//             {index > 0 && <DividerAtom />}

//             {/* Category row */}
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
//               <LabelAtom props={category.categoryLabel} />
//               <LabelAtom props={category.valueLabel} />
//               <BoxLayout sx={{ width: 140 }}>
//                 <TextFieldAtom props={category.valueField} />
//               </BoxLayout>

//               <LabelAtom props={category.promptLabel} />
//               <BoxLayout sx={{ flex: 1, minWidth: 140 }}>
//                 <TextFieldAtom props={category.promptField} />
//               </BoxLayout>

//               <LabelAtom props={category.weightLabel} />
//               <BoxLayout sx={{ width: 100 }}>
//                 <TextFieldAtom props={category.weightField} />
//               </BoxLayout>

//               <IconButtonAtom props={category.removeButton} />
//               <IconButtonAtom props={category.toggleButton} />
//             </ListItemLayout>

//             {/* Expanded random sub-section */}
//             <CollapseLayout in={category.isExpanded} timeout="auto" unmountOnExit>
//               <BoxLayout
//                 sx={{
//                   borderTop: "1px solid",
//                   borderColor: "divider",
//                   px: 3,
//                   py: 2,
//                 }}
//               >
//                 <LabelAtom props={category.randomSectionLabel} />
//                 <DividerAtom />

//                 <StackLayout spacing={1} mt={1}>
//                   {category.randomItemPanels.map((item) => (
//                     <StackLayout
//                       key={item.key}
//                       direction="row"
//                       alignItems="center"
//                       gap={1}
//                       flexWrap="wrap"
//                     >
//                       <LabelAtom props={item.valueLabel} />
//                       <BoxLayout sx={{ width: 140 }}>
//                         <TextFieldAtom props={item.valueField} />
//                       </BoxLayout>

//                       <LabelAtom props={item.promptLabel} />
//                       <BoxLayout sx={{ flex: 1, minWidth: 140 }}>
//                         <TextFieldAtom props={item.promptField} />
//                       </BoxLayout>

//                       <LabelAtom props={item.weightLabel} />
//                       <BoxLayout sx={{ width: 100 }}>
//                         <TextFieldAtom props={item.weightField} />
//                       </BoxLayout>

//                       <IconButtonAtom props={item.removeButton} />
//                     </StackLayout>
//                   ))}
//                 </StackLayout>

//                 {/* Add Random Item row */}
//                 <StackLayout
//                   direction="row"
//                   alignItems="center"
//                   justifyContent="center"
//                   spacing={0.5}
//                   mt={2}
//                 >
//                   <LabelAtom props={category.addRandomItemRowLabel} />
//                   <IconButtonAtom props={category.addRandomItemButton} />
//                 </StackLayout>
//               </BoxLayout>
//             </CollapseLayout>
//           </BoxLayout>
//         ))}

//         {/* Add Complex Category row */}
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
//             <LabelAtom props={props.addCategoryRowLabel} />
//             <IconButtonAtom props={props.addCategoryButton} />
//           </StackLayout>
//         </ListItemLayout>
//       </ListLayout>
//     </BoxLayout>
//   );
// }
