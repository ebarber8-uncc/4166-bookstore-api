import prisma from '../config/db.js'

export async function createOrder(data){
    try{
        const newOrder = await prisma.order.create({data});
        return newOrder;
    } catch (error) {
        throw new Error('Error creating order');
    }
}

export async function getOrdersByUserId(userId){
    return prisma.order.findMany({
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

export async function getOrderById(id){
    return prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    book: true
                }
            }
        }
    });
}

export async function updateOrder(orderId, bookId, quantity) {


    return prisma.orderItem.updateMany({
        where: {
            orderId,
            bookId
        },
        data: {
            quantity
        }
    });
}

export async function deleteOrder(id){
    return prisma.order.delete({
        where: { id }
    });
}