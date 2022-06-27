const express = require('express');
const router = express.Router();
const Order = require('../models/Order.js');
/*CREATE ORDER*/
router.post('/add', async (req, res) => {
	const order = new Order(req.body);
	try{
		const newOrder = await order.save();
		res.status(200).json(newOrder);
	}catch(error){
		res.status(500).json(error);
	}
});
/*READ ALL ORDERS*/
router.get('/', async (req, res) => {
	try{
		const order =  await Order.find();
		res.status(200).json(order);
	}catch(error){
		res.status(500).json(error);
	}
});
/*READ USER ORDER*/
router.get('/:userId', async (req, res) => {
	try{
		const order = await Order.find({ userId: req.params.userId });
		res.status(200).json(order);
	}catch(error){
		res.status(500).json(error);
		console.log(error);
	}
});
/*INCOME*/
router.get('/income', async (req, res) => {
	const date = new Date();
	const lastmonth = new Date(date.setMonth(date.getMonth() -1));
	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));
	try{
		const income = await Order.aggregate([
			{ $match: { createdAt: {$gte: previousMonth } } }, 
			{ $project: { month: {$month: "$createdAt" }, $sale: "$amount", }, },
			{ $group: { _id: "$month", total: { $sum: $sales }, }, },
		]);
		res.status(200).json(income);
	}catch(error){
		res.status(500).json(error);
	}
});
/*UPDATE ORDER*/
router.put('/:id/update', async (req, res) => {
try{
	const updated = await Order.findByIdAndUpdate(
		req.params.id, { $set: req.body, }, { new: true });
	res.status(200).json(updated);
}catch(error){
	res.status(500).json(error);
}
});
/*DELETE ORDER*/
router.delete('/:id/delete', async (req, res) => {
	try{
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json("order has been deleted");
	}catch(error){
		res.status(500).json(error);
	}
})
module.exports = router;