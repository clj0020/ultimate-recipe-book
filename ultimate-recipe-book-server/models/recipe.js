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
	title: {
		type: String
	},
	description: {
		type: String
	},
	prepTime: {
		type: Number
	},
	cookTime: {
		type: Number
	},
	servings: {
		type: Number,
	},
	directions: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	createdBy: {
		type: String,
	},
	createdById: {
		type: String,
	}
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
