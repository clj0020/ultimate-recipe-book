import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { LoginComponent } from './components/login/login.component';


// Services
import { RecipeService } from './services/recipe.service';
import { AuthService } from './services/auth.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // {path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'recipes', component: RecipesComponent }
  // {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  // {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  // {path: 'users', component: UserListComponent},
  // {path: 'users/:username', component: UserProfileComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RecipeService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
