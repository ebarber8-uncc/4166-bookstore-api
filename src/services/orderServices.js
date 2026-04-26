import { createOrder, 
    getOrdersByUserId, 
    getOrderById, 
    updateOrder, 
    deleteOrder} from "../repositories/orderRepo.js";

import prisma from '../config/db.js';


export async function createOrderService(orderData){
    return createOrder(orderData);
}

export async function getOrdersByUserIdService(userId){
    return getOrdersByUserId(userId);
}

export async function getOrderByIdService(id){
    const order = await getOrderById(id);
    if (!order) {
        const error = new Error('Order not found');
        error.status = 404;
        throw error;
    }
    return order;
}

export async function updateOrderService(orderId, bookId, quantity) {
    const order = await getOrderById(orderId);

    if (!order) {
        const error = new Error('Order not found');
        error.status = 404;
        throw error;
    }

    const orderItem = await prisma.orderItem.findFirst({
    where: {
        orderId,
        bookId
    }
    });

    if (!orderItem) {
    const error = new Error('Order does not containe book with the specified ID');
    error.status = 404;
    throw error;
}

    return updateOrder(orderId, bookId, quantity);
}

export async function deleteOrderService(id){
    const order = await getOrderById(id);
    if (!order) {
        const error = new Error('Order not found');
        error.status = 404;
        throw error;
    }
    return deleteOrder(id);
}