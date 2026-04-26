import { addItemToCartService, 
    getCartByUserIdService, 
    getCartItemsService, 
    updateCartItemService, 
    removeCartItemService  } from "../services/cartServices.js";

export async function addItemToCartHandler(req, res){
    const userId = req.user.id;
    const { bookId, quantity } = req.body;
    const cartItem = await addItemToCartService(userId, bookId, quantity);
    res.status(201).json(cartItem);
}

export async function getCartByIdHandler(req, res){
    const userId = parseInt(req.params.userId);
    const cart = await getCartByUserIdService(userId);
    res.status(200).json(cart);
}

export async function getCartItemsHandler(req, res){

    

    const userId = req.user.id;
    const cartItems = await getCartItemsService(userId);
    res.status(200).json(cartItems);
}

export async function updateCartItemHandler(req, res){
    const userId = req.user.id;

    const { bookId, quantity } = req.body;

    const parsedBookId = Number(bookId);
    const parsedQuantity = Number(quantity);

    const updatedItem = await updateCartItemService(userId, bookId, quantity);
    res.status(200).json(updatedItem);
}

export async function removeCartItemHandler(req, res){
     const userId = req.user.id;
    const bookId = Number(req.params.bookId);

    await removeCartItemService(userId, bookId);

    res.status(200).json({ message: 'Item removed from cart' });
}

