import prisma from '../config/db.js'

export async function createBook(data){
    try{
        const newBook = await prisma.book.create({data});
        return newBook;
    }
    catch(error){
        if(error.code === 'P2002'){
            const err = new Error('Book with the same title already exists');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function getAllbooks({title, author, genre, publisher}){

    const conditions = {};

    if(title) conditions.title = {contains: title, mode: 'insensitive'}
    
    if(author) conditions.author = {contains: author, mode: 'insensitive'}

    if(genre) conditions.genre = {contains: genre, mode: 'insensitive'}

    if(publisher) conditions.publisher = {contains: publisher, mode: 'insensitive'}

    return prisma.book.findMany({where: conditions});
}

export async function getBookById(id){
    return prisma.book.findUnique({where: {id}})
}

export async function updateBookById(id, updatedData){
    return prisma.book.update({
        where: {id},
        data: updatedData
    })
}

export async function deleteBookById(id){
    return prisma.book.delete({
        where: {id}
    })
}