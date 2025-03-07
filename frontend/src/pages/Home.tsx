import { UserList } from "../components/UserList";
import { UserForm } from "../components/UserForm";
import { useUsers } from "../hooks/useUsers";
import { Container, Box, Typography } from '@mui/material';

export const Home = () => {
  const { loadUsers, users, loading } = useUsers();

  return (
    <Container sx={{ padding: 4 }}>
      <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>Gestión de Usuarios Previred</Typography>

        <UserForm onUserAdded={loadUsers} />
      </Box>
      <UserList users={users} loading={loading} loadUsers={loadUsers} />
    </Container>
  );
};
