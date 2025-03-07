import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Box, CircularProgress, TextField } from '@mui/material';
import { User } from "../types/User";
import { deleteUser, updateUser } from '../services/userService';

interface UserListProps {
  users: User[];
  loading: boolean;
  loadUsers: () => void;
}

export const UserList: React.FC<UserListProps> = ({ users, loading, loadUsers }) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    setLoadingState(true); 
    setTimeout(async () => {
      await deleteUser(id); 
      loadUsers();  
      setLoadingState(false);  
    }, 2000); 
  };
  

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditedUser({ ...user });  
  };

  const handleSaveEdit = async () => {
    if (editedUser && editedUser.id) {
      try {
        setLoadingState(true);  
        await updateUser(editedUser.id, editedUser);  
        loadUsers();  
        setEditingUser(null);  
        setEditedUser(null);  
        setLoadingState(false);  
      } catch (error) {
        console.error("Error al guardar los cambios:", error);
        setLoadingState(false);  
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: "80%", margin: "auto", marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>Lista de Usuarios</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {editingUser && editingUser.id === user.id ? (
                  <TextField
                    name="nombres"
                    value={editedUser ? editedUser.nombres : ''}
                    onChange={handleChange}
                  />
                ) : (
                  `${user.nombres} ${user.apellidos}`
                )}
              </TableCell>

              <TableCell>
                {editingUser && editingUser.id === user.id ? (
                  <TextField
                    name="correoElectronico"
                    value={editedUser!.correoElectronico}
                    onChange={handleChange}
                  />
                ) : (
                  user.correoElectronico
                )}
              </TableCell>
              <TableCell>
                {editingUser && editingUser.id === user.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveEdit}
                    disabled={loadingState} 
                  >
                    Guardar
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(user)}
                    disabled={loadingState} 
                  >
                    Editar
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(user.id!)}
                  disabled={loadingState} 
                  sx={{ marginLeft: 1 }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
