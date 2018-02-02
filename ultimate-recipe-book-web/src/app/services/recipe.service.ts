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

  // addTweet(tweet) {
  //   console.log("Adding tweet using service.." + JSON.stringify(tweet));
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:8080/tweets/add', tweet, {headers: headers})
  //       .map(res => res.json());
  // }
}
