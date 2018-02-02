import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes: Object[];


  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {

    // Get Recipes
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes.recipes;
    },
      err => {
        console.log(err);
        return false;
      });
  }



}
