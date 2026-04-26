import { createUser, 
    findAllUsers, 
    findUserById, 
    deleteUserById, 
    updateUserById, 
    updateUserRole,
    findUserByEmail
} from "../repositories/userRepo.js";


export async function createUserService(userData){
    return createUser(userData);
}  

export async function findAllUsersService(){
    return findAllUsers();
} 

export async function findUserByIdService(id){
    const user = await findUserById(id);   
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    
    return user;
}

export async function deleteUserByIdService(id){
    const user = await findUserById(id);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    return deleteUserById(id);
}

export async function updateUserByIdService(id, updatedData){
    const user = await findUserById(id);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    return updateUserById(id, updatedData);
}

export async function updateUserRoleService(id, newRole){
    const user = await findUserById(id);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    return updateUserRole(id, newRole);
}

export async function findUserByEmailService(email){
    return findUserByEmail(email);
}