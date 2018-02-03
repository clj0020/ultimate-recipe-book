const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Can change the price type to currency, have to look at the mongoose-currency
    library for how to implement.
  // Will add the Currency type to the Mongoose Schema types
  require('mongoose-currency').loadType(mongoose);
  var Currency = mongoose.Types.Currency;
**/


const config = require('../config/database');

// Recipe Attributes
/*
  String title
  String description
  Integer prepTime
  Integer cookTime
  Integer servings
  String directions
  Ingredients []
*/

// Recipe Schema
const RecipeSchema = new Schema({
	title: String,
	description: String,
	prepTime: String,
	cookTime: String,
	imageUrl: String,
	servings: Number,
	directions: [{
		step: Number,
		content: String
	}],
	nutrition: {
		calories: Number,
		protein: Number,
		carbs: Number,
		fat: Number,
		sugar: Number
	},
	ingredients: [{
		name: String,
		amount: Number,
		unit: String
	}],
	tools: [{
		name: String,
		amount: Number
	}],
	createdAt: {
		type: Date,
		default: Date.now
	},
	createdBy: String,
	createdById: String,
	ratings: {
		voteCount: Number,
		voteValue: Number
	},
	views: Number
});

const Recipe = module.exports = mongoose.model('Recipe', RecipeSchema);

module.exports.getRecipeById = function(id, callback) {
	Recipe.findById(id, callback);
};

// List Recipes
module.exports.listRecipes = function(options, callback) {
	const criteria = options.criteria || {};
	Recipe.find(criteria)
		// .populate('user', 'name username')
		.sort({
			'createdAt': -1
		})
		.limit(options.perPage)
		.skip(options.perPage * options.page)
		.exec(callback);
};

module.exports.addRecipe = function(newRecipe, callback) {
	newRecipe.save(callback);
};

// No .save here, is that why the response shows change but the DB doesnt? -RJM
module.exports.updateRecipe = function(recipe, callback) {
	Recipe.findOneAndUpdate({
		id: recipe._id
	}, recipe, callback);
};



// Add rating of Recipe
module.exports.addRating = function(recipe, voteValue, callback) {
	Recipe.update({
		"_id": recipe._id
	}, {
		$inc: {
			'ratings.voteCount': 1,
			'ratings.voteValue': voteValue
		}
	}, callback);
}

// Add view
module.exports.addView = function(recipe, callback) {
	Recipe.update({
		"_id": recipe._id
	}, {
		$inc: {
			'views': 1
		}
	}, callback);
}
