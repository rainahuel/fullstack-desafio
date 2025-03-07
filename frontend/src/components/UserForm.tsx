
import { useState } from "react";
import { createUser } from "../services/userService";
import { User } from "../types/User";
import { TextField, Button, Grid, Typography, Box } from '@mui/material';

interface UserFormProps {
  onUserAdded: () => void;  
}

export const UserForm: React.FC<UserFormProps> = ({ onUserAdded }) => {
  const [user, setUser] = useState<User>({
    nombres: "",
    apellidos: "",
    rut: 0,
    dv: "",
    correoElectronico: "",
    contrasena: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(user);  
    onUserAdded();  
    setUser({ nombres: "", apellidos: "", rut: 0, dv: "", correoElectronico: "", contrasena: "" });  
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>Agregar Usuario</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombres"
              name="nombres"
              value={user.nombres}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellidos"
              name="apellidos"
              value={user.apellidos}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="RUT"
              name="rut"
              type="number"
              value={user.rut}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="DV"
              name="dv"
              value={user.dv}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correoElectronico"
              type="email"
              value={user.correoElectronico}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contraseña"
              name="contrasena"
              type="password"
              value={user.contrasena}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Agregar Usuario
        </Button>
      </form>
    </Box>
  );
};
