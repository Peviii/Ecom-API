const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');

/*CREATE PRODUCT*/
router.post('/add', async (req, res) => {
	const { title, desc, img, categories, size, color, price } = req.body;
	try{
		const product = new Product({
		title,
		desc,
		img,
		categories,
		size,
		color,
		price
	});
	const newProduct = await product.save();
	res.status(200).json(newProduct);	
	}catch(error){
		res.status(500).json(error);
	}	
});
/*READ PRODUCTS*/
router.get('/', async (req, res) => {
	const newq = req.query.new;
	const category = req.query.category;
	try{
		let products;
		if(newq){
			products = await Product.find().sort({ createdAt: -1 }).limit(1);	
		}else if(category){
			products = await Product.find({
				$in: [category],
			});
		}else{
			products = Product.find();
		}
		res.status(200).json(products);
	}catch(error){
		res.status(500).json(error);
	}
});
/*READ PRODUCT*/
router.get('/find/:id', async (req, res) => {
	try{
		const product =  await Product.findById(req.params.id);
		res.status(200).json(product);
	}catch(error){
		res.status(500).json(error);
	}
})
/*UPDATE PRODUCTS*/
router.put('/:id/update', async (req, res) => {
	try{
		const updated = await Product.findByIdAndUpdate(req.params.id,
			{ $set: req.body, },{ new: true }
		);
		res.status(200).json(updated);
	}catch(error){
		res.status(500).json(error);
	}
});
/*DELETE PRODUCTS*/
router.delete('/:id/delete', async (req, res) => {
	try{
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("product has beem deleted");
	}catch(error){
		res.status(500).json(error);
	}
})

module.exports = router;