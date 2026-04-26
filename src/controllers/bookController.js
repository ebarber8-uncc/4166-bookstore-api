
import { getAllBooksService, 
    updateBookByIdService, 
    getBookByIdService, 
    deleteBookByIdService, 
    createBookService} from "../services/bookServices.js";


export async function getAllBooksHandler(req, res){
    const filters = req.query;
    const books = await getAllBooksService(filters);
    res.status(200).json(books);
}

export async function createNewBookHandler(req, res){
    const bookData = req.body;
    const newBook = await createBookService(bookData);
    res.status(201).json(newBook);
}

export async function getBookByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const book = await getBookByIdService(id);
    res.status(200).json(book);
}

export async function updateBookHandler(req, res){
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const updatedBook = await updateBookByIdService(id, updatedData);
    res.status(200).json(updatedBook);
}

export async function deleteBookHandler(req, res){
    const id = parseInt(req.params.id);
    await deleteBookByIdService(id);
    res.status(200).json({ message: 'Book deleted successfully' });
}