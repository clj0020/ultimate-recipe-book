const express = require('express');
const router = express.Router();
const config = require('../config/database');
const auth = require('../config/auth');
// const User = require('../models/user');
const Ingredient = require('../models/ingredient');

/** List Ingredients

	Description: List ingredients.

	Endpoint: '/ingredients'

	Method: GET

	Auth: Open

	Request: params.page: Number (For pagination through ingredients)

	Response: success: bool (required),
						msg: String (required),
						ingredients: Ingredient[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/
router.get('/', (req, res) => {
	const page = (req.params.page > 0 ? req.params.page : 1) - 1;
	const perPage = 15;
	const options = {
		perPage: perPage,
		page: page
	};

	// Call the listIngredients method of Ingredient model.
	Ingredient.listIngredients(options, (err, ingredients) => {
		// If theres an error, success will be false
		if (err) {
			return res.json({
				success: false,
				msg: 'Failed to retrieve ingredients: ' + err
			});
		}
		// Get the number of ingredients
		Ingredient.count().exec((err, count) => {
			if (err) {
				return res.json({
					success: false,
					msg: 'Failed to retrieve ingredients: ' + err
				});
			}
			// Success! Send back ingredients along with page info
			res.json({
				success: true,
				msg: 'Got your ingredients',
				ingredients: ingredients,
				page: page + 1,
				pages: Math.ceil(count / perPage),

			});
		});
	})
});

/** Add Ingredient

	Description: Add a ingredient to the database.

	Endpoint: '/ingredients/add'

	Method: POST

	Auth: Restricted

	Request: body.title: String (required),
					 body.description: String (required),
					 body.prepTime Number (maybe include units in another param),
					 body.cookTime Number (),
					 body.servings Number (could turn into objects),
					 body.directions: String (could turn into objects),
					 body.imageUrl: String,
					 req.user: User (optional)

	Response: success: bool (),
						msg: String (),
						ingredient: Ingredient ()
*/
router.post('/add', (req, res) => {
	console.log('Hit endpoint: /ingredients/add');

	//set host of this ingredient to the creator if field is blank?
	//(or give them no option to add host? Not sure what the desire is here)
	//We want to allow owners to assign other hosts to help them plan.
	//This is not necessary for the v1 but I can see many scenarios that it would be used in.
	//Mainly need to be able to invite other people efficiently
	let newIngredient = new Ingredient({
		title: req.body.title,
		nutrition: req.body.nutrition
	});

	// If the user is logged in, set them as the creator of the ingredient.
	if (req.user) {
		newIngredient.createdBy = req.user.displayName;
		newIngredient.createdById = req.user.id;
	} else {
		newIngredient.createdBy = 'Anonymous';
	}

	Ingredient.addIngredient(newIngredient, (err, ingredient) => {
		if (err) {
			res.json({
				success: false,
				msg: 'Failed to add ingredient!'
			});
		} else {
			res.json({
				success: true,
				msg: 'Successfully added ingredient!',
				ingredient: ingredient
			});
		}
	});
});

/** Get Single Ingredient

	Description: Get a single ingredient.

	Endpoint: '/ingredients/ingredient/:id'

	Method: Get

	Auth: Open

	Request: params.id: String (required)

	Response: success: bool (),
						msg: String (),
						ingredient: Ingredient ()
*/
router.get('/ingredient/:id', (req, res) => {
	console.log('Hit endpoint: /ingredients/ingredient/id');

	const id = req.params.id;

	Ingredient.getIngredientById(id, (err, ingredient) => {
		if (err) {
			res.json({
				success: false,
				msg: 'Failed to find ingredient.'
			});
		} else {
			res.json({
				success: true,
				msg: 'Successfully found ingredient.',
				ingredient: ingredient
			});
		}
	});
});


/** Update Single Ingredient

	Description: Update a ingredient

	Endpoint: '/ingredients/update'

	Method: POST

	Auth: Restricted

	Request: 	body.ingredient: Ingredient (with new values)

	Response: success: bool (required),
						msg: String (required),
						ingredients: Ingredient[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/
router.post('/update', (req, res) => {
	/**
		current JSON to process this request:
		{
			id: ObjectID string
			updateField: string
			updateValue: depends on value
		}
		This could be expanded to allow for multiple fields to change
		at once, but I don't see a need for that for now; single attribute
		edits could be like little popups on the front end that the user
		confirms every time a field is changed (and this request goes through
		whenever the user does that). I'm open to other options, just lmk
		-RJM
	**/

	id = req.body.id;
	updateField = req.body.updateField;
	updateValue = req.body.updateValue;
	/*
		make sure these inputs are valid
		if they aren't, stop the function (but do so properly)
	*/

	var query = {
		'_id': id
	};
	//vars must be wrapped in []'s in these mongoose queries
	Ingredient.findOneAndUpdate(query, {
		$set: {
			[updateField]: [updateValue]
		}
	}, {
		upsert: true
	}, (err, doc) => {
		console.log(doc);
		if (err) {
			res.json({
				success: false,
				msg: "Failed to update ingredient"
			});
		} else {
			//get the updated doc and return it to the frontend
			Ingredient.findById(req.body.id, (err, doc) => {
				res.json({
					success: true,
					msg: "Successfully updated ingredient",
					doc: doc
				});
			})
		}
	});
});

/** Delete Ingredient

	Description: Delete a ingredient.

	Endpoint: '/ingredients/remove'

	Method: POST

	Auth: Restricted

	Request: 	ingredientId: String,
						params.page: Number (For pagination through ingredients)

	Response: success: bool (required),
						msg: String (required)

*/
router.post('/remove', (req, res) => {
	//remove ingredient if permissions allow
});

/** List User's Uploaded Ingredients

	Description: List ingredients that the user has uploaded.

	Endpoint: '/ingredients/user/uploads/'

	Method: POST

	Auth: Restricted

	Request: params.page: Number (For pagination through ingredients)

	Response: success: bool (required),
						msg: String (required),
						ingredients: Ingredient[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/

/** List User's Saved Ingredients

	Description: List the user's saved ingredients.

	Endpoint: '/ingredients/user/saved/'

	Method: POST

	Auth: Restricted

	Request: 	body.user: User,
						params.page: Number (For pagination through ingredients)

	Response: success: bool (required),
						msg: String (required),
						ingredients: Ingredient[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/

/** List User's Ingredient Feed

	Description: List ingredients according to user's preferences.

	Endpoint: '/ingredients/feed/'

	Method: POST

	Auth: Restricted

	Request: 	body.user: User, (with preferences)
						params.page: Number (For pagination through ingredients)

	Response: success: bool (required),
						msg: String (required),
						ingredients: Ingredient[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/

/** Scrape open source hingredients from the ingredient depository.

Description: scrape ingredients from


*/

module.exports = router;
