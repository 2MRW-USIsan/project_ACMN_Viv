"use client";

import { WikipediaCard } from "@/components/molecules/WikipediaCard";
import { WikipediaModal } from "@/components/molecules/WikipediaModal";
import { WikipediaSearchResult } from "@/types/wikipedia";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

export function WikipediaSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WikipediaSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<WikipediaSearchResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `/api/wikipedia?q=${encodeURIComponent(trimmed)}`,
      );
      const data = (await res.json()) as { results: WikipediaSearchResult[] };
      setResults(data.results ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCardClick = (result: WikipediaSearchResult) => {
    setSelected(result);
    setModalOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <TextField
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Wikipedia を検索..."
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleSearch}
                  disabled={loading}
                  edge="end"
                >
                  {loading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <SearchIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {searched && !loading && results.length === 0 && (
        <Typography variant="caption" color="text.secondary">
          結果が見つかりませんでした。
        </Typography>
      )}

      {results.length > 0 && (
        <Grid container spacing={0.5}>
          {results.map((result) => (
            <Grid key={result.pageid} size={3}>
              <WikipediaCard result={result} onClick={handleCardClick} />
            </Grid>
          ))}
        </Grid>
      )}

      <WikipediaModal
        open={modalOpen}
        result={selected}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
}
