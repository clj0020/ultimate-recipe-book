import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-recipe-profile',
  templateUrl: './recipe-profile.component.html',
  styleUrls: ['./recipe-profile.component.css']
})
export class RecipeProfileComponent implements OnInit {
  recipe: Object;
  // id: string;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipeService
      .getRecipe(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        this.recipe = res.recipe;
        console.log(this.recipe);
      },
      err => {
        console.log("There was an error with getting the recipe: " + err);
        return false;
      });


  }

  // return percent daily value of nutritional data in the recipe.
  getDailyValue(recipe, nutritionValue) {
    if (nutritionValue == "protein") {
      return ((recipe.nutrition.protein / 50) * 100).toFixed(0);
    }
    else if (nutritionValue == "carbs") {
      return ((recipe.nutrition.carbs / 300) * 100).toFixed(0);
    }
    else if (nutritionValue == "fat") {
      return ((recipe.nutrition.fat / 65) * 100).toFixed(0);
    }


  }

}
