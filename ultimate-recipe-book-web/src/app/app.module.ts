import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

// Components
import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeProfileComponent } from './components/recipe-profile/recipe-profile.component';
import { LoginComponent } from './components/login/login.component';


// Services
import { RecipeService } from './services/recipe.service';
import { AuthService } from './services/auth.service';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';



const appRoutes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'recipe/:id', component: RecipeProfileComponent },
  // { path: 'recipes', component: RecipesComponent }
  // {path: 'register', component: RegisterComponent},
  // { path: 'login', component: LoginComponent },

  // {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  // {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  // {path: 'users', component: UserListComponent},
  // {path: 'users/:username', component: UserProfileComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    LoginComponent,
    RecipeProfileComponent,
    RecipeCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
  ],
  providers: [
    RecipeService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
