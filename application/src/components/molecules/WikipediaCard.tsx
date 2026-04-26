import { WikipediaSearchResult } from "@/types/wikipedia";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface WikipediaCardProps {
  result: WikipediaSearchResult;
  onClick: (result: WikipediaSearchResult) => void;
}

export function WikipediaCard({ result, onClick }: WikipediaCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", cursor: "pointer" }}
    >
      <CardActionArea
        onClick={() => onClick(result)}
        sx={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        {result.thumbnail ? (
          <Box
            component="img"
            src={result.thumbnail}
            alt={result.title}
            sx={{
              width: 48,
              height: 60,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <Box
            sx={{
              width: 48,
              height: 60,
              flexShrink: 0,
              bgcolor: "grey.200",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              W
            </Typography>
          </Box>
        )}
        <CardContent
          sx={{
            p: 0.5,
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            "&:last-child": { pb: 0.5 },
          }}
        >
          <Typography
            variant="caption"
            component="div"
            fontWeight="bold"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.3,
            }}
          >
            {result.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
