import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipeService {

  constructor(private http: Http) { }

  getRecipes() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/recipes/', { headers: headers })
      .map(res => res.json());
  }

  addRecipe(recipe) {
    console.log("Adding recipe using service.." + JSON.stringify(recipe));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/recipes/add', recipe, { headers: headers })
      .map(res => res.json());
  }

  getRecipe(id) {
    console.log("Finding recipe with id " + id);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/recipes/recipe/' + id, { headers: headers })
      .map(res => res.json());

  }

}
