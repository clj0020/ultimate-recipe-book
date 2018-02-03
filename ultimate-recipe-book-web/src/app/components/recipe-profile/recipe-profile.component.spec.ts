import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeProfileComponent } from './recipe-profile.component';

describe('RecipeProfileComponent', () => {
  let component: RecipeProfileComponent;
  let fixture: ComponentFixture<RecipeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
