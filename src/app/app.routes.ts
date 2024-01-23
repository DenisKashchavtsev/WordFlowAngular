import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LearningComponent} from "./pages/learning/learning.component";
import {CategoryWordsComponent} from "./pages/category/category-words/category-words.component";
import {StepsComponent} from "./pages/learning/steps/steps.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'learning', component: LearningComponent},
  {path: 'learn-category/:id', component: StepsComponent},

  {path: 'category/:id', component: CategoryWordsComponent},
];
