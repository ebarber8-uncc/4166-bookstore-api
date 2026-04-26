import prisma from '../config/db.js'
import bcrypt from 'bcrypt';

export async function createUser(data) {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...data,
        cart: {
          create: {} // creates an empty cart linked to this user
        }
      },
      omit: { password: true }
    });

    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Email has already been used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function findUserByEmail(email){
    return prisma.user.findUnique({where: {email}})
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true } 
  });
}

export async function updateUserById(id, updatedData) {
  const dataToUpdate = { ...updatedData };

  // Only hash if password is provided
  if (updatedData.password) {
    dataToUpdate.password = await bcrypt.hash(updatedData.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data: dataToUpdate,
    select: { id: true, email: true, role: true } 
  });
}


export async function findAllUsers(){
    return prisma.user.findMany({omit: { password: true }});
}


export async function deleteUserById(id) {
  return prisma.user.delete({
    where: { id },
  });
}


export async function updateUserRole(id, newRole) {
  return prisma.user.update({
    where: { id },
    data: { role: newRole },
    select: { id: true, email: true, role: true } 
  });
}