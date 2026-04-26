import {
    addItem,
    getCartByUserId,
    getCartItems,
    updateCartItem,
    removeCartItem,
    getCartOrThrow
} from '../repositories/cartRepo.js';

import prisma from '../config/db.js';

export async function checkout(userId) {
    return await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
            where: { userId }
        });
        //User should always have a cart, but we check just in case.
        if (!cart) {
            const error = new Error('Cart not found');
            error.status = 404;
            throw error;
        }
        // Get all items in the user's cart
        const cartItems = await tx.cartItem.findMany({
            where: { cartId: cart.id }
        });

        if (cartItems.length === 0) {
            const error = new Error('Cart is empty');
            error.status = 400;
            throw error;
        }

        const order = await tx.order.create({
            data: {
                userId,
                items: {
                    create: cartItems.map(item => ({
                        bookId: item.bookId,
                        quantity: item.quantity
                    }))
                }
            }
        });

        await tx.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        return order;
    });
}

export async function addItemToCartService(userId, bookId, quantity) {

     const book = await prisma.book.findUnique({
        where: { id: bookId }
    });

    if (!book) {
        const err = new Error('Book not found');
        err.status = 404;
        throw err;
    }

    return addItem(userId, bookId, quantity);
}

export async function getCartItemsService(userId) {
    return getCartItems(userId);
}
export async function updateCartItemService(userId, bookId, quantity) {

    const cart = await getCartOrThrow(userId);



    const cartItem = await prisma.cartItem.findUnique({
        where: {
            cartId_bookId: {
                cartId: cart.id,
                bookId
            }
        }
    });

    if (!cartItem) {
        const error = new Error('Item not found in cart');
        error.status = 404;
        throw error;
    }

    return updateCartItem(userId, bookId, quantity);
}

export async function removeCartItemService(userId, bookId) {

    const cart = await getCartOrThrow(userId);


    const cartItem = await prisma.cartItem.findUnique({
        where: {
            cartId_bookId: {
                cartId: cart.id,
                bookId
            }
        }
    });

    if (!cartItem) {
        const error = new Error('Item not found in cart');
        error.status = 404;
        throw error;
    }

    return removeCartItem(userId, bookId);
}

export async function getCartByUserIdService(userId) {
    

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }

    return getCartByUserId(userId);
}
