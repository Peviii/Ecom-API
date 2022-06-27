const express = require('express');
const User = require('../models/User.js');
const router = express.Router();
/*UPDATE USER*/
router.put('/:id/update', async (req, res) => {
	const { userId, password } = req.body;
	if(userId == req.params.id){
		if(password){
			const salt = await bcrypt.genSalt(10);
			password = await bcrypt.hash(password, salt);
		}
		try{
			const updateUser = await User.findByIdAndUpdate(req.params.id,
			{ $set: req.body,}, 
				{ new: true }
			);
			res.status(200).json(updateUser);
		}catch(error){
			res.status(500).json(error);
		}
	}else{
		res.status(422).json("only profile is updatable");
	}
});
/*READ ALL USERS*/
router.get('/all', async (req, res) => {
	const query = req.query.new;
	try{
		const users = query
			? await User.find().sort({ _id: 1 }).limit(5)
			: await User.find();
		res.status(200).json(users);	 
	}catch(error){
		res.status(500).json(error);
	}
});
/*DELETE USER*/
router.delete('/:id/delete', async (req, res) => {
	try{
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("user has been deleted")
	}catch(error){
		res.status(500).json(error);
	}
});

module.exports = router;