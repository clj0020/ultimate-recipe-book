const express = require('express');
const router = express.Router();
const config = require('../config/database');
const auth = require('../config/auth');
// const User = require('../models/user');
const Recipe = require('../models/recipe');

/** Recipe Routes
		Notes: Need to update for auth.
**/

/** List Recipes

	Description: List recipes.

	Endpoint: '/recipes'

	Method: GET

	Auth: Open

	Request: params.page: Number (For pagination through recipes)

	Response: success: bool (required),
						msg: String (required),
						recipes: Recipe[] (optional),
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

	// Call the listRecipes method of Recipe model.
	Recipe.listRecipes(options, (err, recipes) => {
		// If theres an error, success will be false
		if (err) {
			return res.json({
				success: false,
				msg: 'Failed to retrieve recipes: ' + err
			});
		}
		// Get the number of recipes
		Recipe.count().exec((err, count) => {
			if (err) {
				return res.json({
					success: false,
					msg: 'Failed to retrieve recipes: ' + err
				});
			}
			// Success! Send back recipes along with page info
			res.json({
				success: true,
				msg: 'Got your recipes',
				recipes: recipes,
				page: page + 1,
				pages: Math.ceil(count / perPage),

			});
		});
	})
});

/** Add Recipe

	Description: Add a recipe to the database.

	Endpoint: '/recipes/add'

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
						recipe: Recipe ()
*/
router.post('/add', (req, res) => {
	console.log('Hit endpoint: /recipes/add');

	//set host of this recipe to the creator if field is blank?
	//(or give them no option to add host? Not sure what the desire is here)
	//We want to allow owners to assign other hosts to help them plan.
	//This is not necessary for the v1 but I can see many scenarios that it would be used in.
	//Mainly need to be able to invite other people efficiently
	let newRecipe = new Recipe({
		title: req.body.title,
		description: req.body.description,
		prepTime: req.body.prepTime,
		cookTime: req.body.cookTime,
		servings: req.body.servings,
		directions: req.body.directions,
		imageUrl: req.body.imageUrl
	});

	// If the user is logged in, set them as the creator of the recipe.
	if (req.user) {
		newRecipe.createdBy = req.user.displayName;
		newRecipe.createdById = req.user.id;
	} else {
		newRecipe.createdBy = 'Anonymous';
	}

	Recipe.addRecipe(newRecipe, (err, recipe) => {
		if (err) {
			res.json({
				success: false,
				msg: 'Failed to add recipe!'
			});
		} else {
			res.json({
				success: true,
				msg: 'Successfully added recipe!',
				recipe: recipe
			});
		}
	});
});

/** Get Single Recipe

	Description: Get a single recipe.

	Endpoint: '/recipes/recipe/:id'

	Method: Get

	Auth: Open

	Request: params.id: String (required)

	Response: success: bool (),
						msg: String (),
						recipe: Recipe ()
*/
router.get('/recipe/:id', (req, res) => {
	console.log('Hit endpoint: /recipes/recipe/id');

	const id = req.params.id;

	Recipe.getRecipeById(id, (err, recipe) => {
		if (err) {
			res.json({
				success: false,
				msg: 'Failed to find recipe.'
			});
		} else {
			res.json({
				success: true,
				msg: 'Successfully found recipe.',
				recipe: recipe
			});
		}
	});
});


/** Update Single Recipe

	Description: Update a recipe

	Endpoint: '/recipes/update'

	Method: POST

	Auth: Restricted

	Request: 	body.recipe: Recipe (with new values)

	Response: success: bool (required),
						msg: String (required),
						recipes: Recipe[] (optional),
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
	Recipe.findOneAndUpdate(query, {
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
				msg: "Failed to update recipe"
			});
		} else {
			//get the updated doc and return it to the frontend
			Recipe.findById(req.body.id, (err, doc) => {
				res.json({
					success: true,
					msg: "Successfully updated recipe",
					doc: doc
				});
			})
		}
	});
});

/** Delete Recipe

	Description: Delete a recipe.

	Endpoint: '/recipes/remove'

	Method: POST

	Auth: Restricted

	Request: 	recipeId: String,
						params.page: Number (For pagination through recipes)

	Response: success: bool (required),
						msg: String (required)

*/
router.post('/remove', (req, res) => {
	//remove recipe if permissions allow
});

/** List User's Uploaded Recipes

	Description: List recipes that the user has uploaded.

	Endpoint: '/recipes/user/uploads/'

	Method: POST

	Auth: Restricted

	Request: params.page: Number (For pagination through recipes)

	Response: success: bool (required),
						msg: String (required),
						recipes: Recipe[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/

/** List User's Saved Recipes

	Description: List the user's saved recipes.

	Endpoint: '/recipes/user/saved/'

	Method: POST

	Auth: Restricted

	Request: 	body.user: User,
						params.page: Number (For pagination through recipes)

	Response: success: bool (required),
						msg: String (required),
						recipes: Recipe[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/

/** List User's Recipe Feed

	Description: List recipes according to user's preferences.

	Endpoint: '/recipes/feed/'

	Method: POST

	Auth: Restricted

	Request: 	body.user: User, (with preferences)
						params.page: Number (For pagination through recipes)

	Response: success: bool (required),
						msg: String (required),
						recipes: Recipe[] (optional),
						page: Number (optional),
						pages: Number (optional)
*/

module.exports = router;
