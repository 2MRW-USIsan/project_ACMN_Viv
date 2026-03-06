import { Container, Typography } from "@mui/material";
import TodoList from "@/components/organisms/TodoList";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        TODO App
      </Typography>
      <TodoList />
    </Container>
  );
}
