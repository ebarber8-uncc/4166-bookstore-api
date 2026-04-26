

export async function authorizeOwnership(req, res, next) {
  
   const requestedId = parseInt(req.params.id);

  if (req.user.id !== requestedId && req.user.role !== 'ADMIN') {
    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    return next(error);
  }
  next();
}

export async function authorizeOrderOwnership(req, res, next) {
  const requestedId = parseInt(req.params.id);
  const order = await req.context.models.Order.findByPk(requestedId);
  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    return next(error);
  }
  if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
    const error = new Error('Forbidden: insufficient permission');
    error.status = 403;
    return next(error);
  }
  next();
}