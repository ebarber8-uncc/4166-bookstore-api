import { createUserService, 
    findAllUsersService, 
    findUserByIdService, 
    deleteUserByIdService, 
    updateUserByIdService, 
    updateUserRoleService, 
    findUserByEmailService} from "../services/userServices.js";


export async function createUserHandler(req, res){
    const userData = req.body;
    const newUser = await createUserService(userData);
    res.status(201).json(newUser);
}

export async function getAllUsersHandler(req, res){
    const users = await findAllUsersService();
    res.status(200).json(users);
}

export async function getUserByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const user = await findUserByIdService(id);
    res.status(200).json(user);
}

export async function deleteUserHandler(req, res){
    const id = parseInt(req.params.id);
    await deleteUserByIdService(id);
    res.status(204).json({ message: 'User deleted successfully' });
}

export async function updateUserHandler(req, res){
    const id = parseInt(req.params.id);
    const email = req.body.email;

    const exist = await findUserByEmailService(email);
    if (exist && exist.id !== id) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    const updatedData = req.body;
    const updatedUser = await updateUserByIdService(id, updatedData);
    res.status(200).json(updatedUser);
}

export async function updateUserRoleHandler(req, res){
    const id = parseInt(req.params.id);
    const { role } = req.body;
    const updatedUser = await updateUserRoleService(id, role);
    res.status(200).json(updatedUser);
}