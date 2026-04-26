import { WikipediaSearch } from "@/components/organisms/configuration/Wikipedia.Search";
import { NavigationLayoutOrganism } from "@/components/organisms/navigation/NavigationLayoutOrganism";
import { ConfigurationsViewModel } from "@/hooks/configurations/viewModel/useConfigurationsComposer";
import { Box, Toolbar } from "@mui/material";
import { Body } from "../organisms/configuration/Body";
import { SectionLabel } from "../molecules/SectionLabel";

interface ConfigurationsTemplateProps {
  props: ConfigurationsViewModel;
}

export function ConfigurationsTemplate({ props }: ConfigurationsTemplateProps) {
  return (
    <NavigationLayoutOrganism props={props.navigationLayout}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            px: 1,
            py: 0.5,
            gap: 1,
          }}
        >
          <Box
            sx={{
              flex: "0 0 auto",
              overflow: "hidden",
            }}
          >
            <SectionLabel props={{ text: "Wikipedia 参照:" }} />
            <WikipediaSearch />
          </Box>
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Body props={props.configBody} />
          </Box>
        </Box>
      </Box>
    </NavigationLayoutOrganism>
  );
}
