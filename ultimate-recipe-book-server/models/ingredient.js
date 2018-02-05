const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Can change the price type to currency, have to look at the mongoose-currency
    library for how to implement.
  // Will add the Currency type to the Mongoose Schema types
  require('mongoose-currency').loadType(mongoose);
  var Currency = mongoose.Types.Currency;
**/


const config = require('../config/database');

// Ingredient Schema
const IngredientSchema = new Schema({
	title: String,
	nutrition: {
		servings: Number,
		servingsUnit: String,
		calories: Number,
		caloriesFromFat: Number,
		fat: Number,
		saturatedFat: Number,
		polyunsaturatedFat: Number,
		monounsaturatedFat: Number,
		cholesterol: Number,
		sodium: Number,
		potassium: Number,
		carbs: Number,
		sugar: Number,
		protein: Number,
		vitaminA: Number,
		vitaminC: Number,
		calcium: Number
	},
	createdBy: String,
	createdById: String
});

const Ingredient = module.exports = mongoose.model('ingredient', IngredientSchema);

module.exports.getIngredientById = function(id, callback) {
	Ingredient.findById(id, callback);
};

// List Ingredients
module.exports.listIngredients = function(options, callback) {
	const criteria = options.criteria || {};
	Ingredient.find(criteria)
		// .populate('user', 'name username')
		.sort({
			'createdAt': -1
		})
		.limit(options.perPage)
		.skip(options.perPage * options.page)
		.exec(callback);
};

module.exports.addIngredient = function(newIngredient, callback) {
	newIngredient.save(callback);
};

// No .save here, is that why the response shows change but the DB doesnt? -RJM
module.exports.updateIngredient = function(ingredient, callback) {
	Ingredient.findOneAndUpdate({
		id: ingredient._id
	}, ingredient, callback);
};
