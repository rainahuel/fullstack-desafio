package com.example.previred.service;

import com.example.previred.exception.UserNotFoundException;
import com.example.previred.model.User;
import com.example.previred.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado con ID: " + id));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setNombres(userDetails.getNombres());
        user.setApellidos(userDetails.getApellidos());
        user.setRut(userDetails.getRut());
        user.setDv(userDetails.getDv());
        user.setFechaNacimiento(userDetails.getFechaNacimiento());
        user.setCorreoElectronico(userDetails.getCorreoElectronico());
        user.setContrasena(userDetails.getContrasena());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }


}