import {
     getOrdersByUserIdService, 
     getOrderByIdService, 
     updateOrderService, 
     deleteOrderService} from "../services/orderServices.js";



import { checkout } from '../services/cartServices.js';

export const createOrderHandler = async (req, res, next) => {
  try {
    const userId = req.user.id; // from auth middleware

    const order = await checkout(userId);

    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export async function getCurrentUsersOrdersHandler(req, res){
    const userId = req.user.id;
    const orders = await getOrdersByUserIdService(userId);
    res.status(200).json(orders);
}

export async function getOrderByIdHandler(req, res){
    const id = parseInt(req.params.id);
    const order = await getOrderByIdService(id);
    res.status(200).json(order);
}

export async function updateOrderHandler(req, res) {
    const orderId = parseInt(req.params.id);

    const { bookId, quantity } = req.body;

    const updatedOrderItem = await updateOrderService(
        orderId,
        bookId,
        quantity
    );

    res.status(200).json({Message: 'Order updated successfully'});
}

export async function deleteOrderHandler(req, res){
    const id = parseInt(req.params.id);
    await deleteOrderService(id);
    res.status(200).json({Message: 'Order deleted successfully'});
}