import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Object;


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }

  goToRecipePage(id) {
    this.router.navigate(['/recipe', id]);
  }

}
