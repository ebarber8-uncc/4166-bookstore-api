import prisma from '../config/db.js'

export async function addItem(userId, bookId, quantity){
    const cart = await getCartOrThrow(userId);

    const existingItem = await prisma.cartItem.findUnique({
        where: {
            cartId_bookId: { cartId: cart.id, bookId }
        }
    });

    if (existingItem) {
        return prisma.cartItem.update({
            where: {
                cartId_bookId: { cartId: cart.id, bookId }
            },
            data: { quantity: existingItem.quantity + quantity }
        });
    }

    return prisma.cartItem.create({
        data: {
            cartId: cart.id,
            bookId,
            quantity
        }
    });
}

export async function getCartItems(userId){
    return prisma.cartItem.findMany({
        where: { cart: { userId } },
        include: { book: true }
    });
    
}

export async function getCartByUserId(userId){
    return prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    book: true
                }
            }
        }
    });
}

export async function getCartOrThrow(userId) {
    const cart = await prisma.cart.findUnique({
        where: { userId }
    });

    if (!cart) {
        throw new Error('Cart not found');
    }

    return cart;
}

export async function updateCartItem(userId, bookId, quantity){
    const cart = await getCartOrThrow(userId);

    return prisma.cartItem.update({
        where: {
            cartId_bookId: {
                cartId: cart.id,
                bookId
            }
        },
        data: { quantity }
    });
}

export async function removeCartItem(userId, bookId){
    const cart = await getCartOrThrow(userId);

    return prisma.cartItem.delete({
        where: {
            cartId_bookId: {
                cartId: cart.id,
                bookId
            }
        }
    });
}