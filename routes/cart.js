const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart.js');

/*CREATE CART*/
router.post('/add', async (req, res) => {
	const cart = new Cart(req.body);
	try{
		const newCart = await cart.save();
		res.status(200).json(newCart);
	}catch(error){
		res.status(500).json(error);
	}
});
/*READ ALL CARTS*/
router.get('/', async (req, res) => {
	try{
		const carts = await Cart.find();
		res.status(200).json(carts);
	}catch(error){
		res.status(500).json(error);
	}
});
/*READ ONE CART*/
router.get('/find/:userId', async (req, res) => {
	try{
		const cart = await Cart.findOne({ userId: req.params.userId });
		res.status(200).json(cart);
	}catch(error){
		res.status(500).json(error);
	}
});
/*UPDATE CART*/
router.put('/:id/update', async (req, res) => {
	try{
		const updated = await Cart.findByIdAndUpdate(
			req.params.id, { $set: req.body }, 
			{ new: true }
		);
		res.status(200).json(updated);
	}catch(error){
		res.status(500).json(error);
	}
});
/*DELETE CART*/
router.delete('/:id/delete', async (req, res) => {
	try{
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json("cart has been deleted");
	}catch(error){
		res.status(500).json(error);
	}
});
module.exports = router;