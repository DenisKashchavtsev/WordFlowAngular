import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/auth/login/login.component'; // Import LoginComponent
import {AuthService} from './services/auth.service';
import {routes} from './app.routes';
import {InputSubmitComponent} from "./components/form/input-submit/input-submit.component";
import {InputTextComponent} from "./components/form/input-text/input-text.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TokenInterceptorService} from "./services/interceptors/token-interceptor.service";
import {LearningComponent} from "./pages/learning/learning.component";
import {CategoryWordsComponent} from "./pages/category/category-words/category-words.component";
import {StepsComponent} from "./pages/learning/steps/steps.component";
import {MatchTranslationComponent} from "./pages/learning/steps/match-translation/match-translation.component";
import {
  ChooseCorrectOptionComponent
} from "./pages/learning/steps/choose-correct-option/choose-correct-option.component";
import {ChooseLettersComponent} from "./pages/learning/steps/choose-letters/choose-letters.component";
import {WriteComponent} from "./pages/learning/steps/write/write.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    MatchTranslationComponent,
    ChooseCorrectOptionComponent,
    ChooseLettersComponent,
    WriteComponent,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    InputSubmitComponent,
    InputTextComponent,
    DashboardComponent,
    LearningComponent,
    CategoryWordsComponent,
    StepsComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
