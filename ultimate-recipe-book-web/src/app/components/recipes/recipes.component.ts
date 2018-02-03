import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Object[];

  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  directions: string;
  imageUrl: string;


  formActive: boolean;
  editRecipeForm: boolean;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.formActive = false;
    this.editRecipeForm = false;

    // Get Recipes
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes.recipes;
    },
      err => {
        console.log(err);
        return false;
      });
  }


  // Add recipe
  toggleAddRecipeForm() {
    this.formActive = !this.formActive;
  }

  onAddRecipe() {

    const recipe = {
      title: this.title,
      description: this.description,
      prepTime: this.prepTime,
      cookTime: this.cookTime,
      servings: this.servings,
      directions: this.directions,
      imageUrl: this.imageUrl
    };

    this.recipeService.addRecipe(recipe).subscribe(response => {
      if (response.success == false) {
        console.log("Uh ohh, can't add your recipe: " + response.msg);
      }
      else {
        this.recipes.unshift(recipe);
        console.log("Added recipe to db: " + JSON.stringify(recipe));


        // var form = document.getElementById("tweetForm");
        // form.reset();
      }
    });
  }

  goToRecipePage(id) {
    this.router.navigate(['/recipe', id]);
  }

  activateClass(recipe) {
    recipe.active = !recipe.active;
  }

}
