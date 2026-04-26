import { getAllbooks,
     getBookById, 
     updateBookById, 
     deleteBookById , 
     createBook} from "../repositories/bookRepo.js";


export async function getAllBooksService(filters){
    return getAllbooks(filters);
}

export async function createBookService(bookData){
    return createBook(bookData);
}

export async function getBookByIdService(id){
    const book = await getBookById(id);
    if(!book){
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }
    return book;
}
    

export async function updateBookByIdService(id, updatedData){
    const book = await getBookById(id);
    if(!book){
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }
    return updateBookById(id, updatedData);
}

export async function deleteBookByIdService(id){
    const book = await getBookById(id);
    if(!book){
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }
    return deleteBookById(id);
}

