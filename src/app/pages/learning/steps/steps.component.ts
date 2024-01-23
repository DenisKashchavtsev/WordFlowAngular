import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {LearningService} from "../../../services/learning.service";
import {ActivatedRoute} from "@angular/router";
import {WordLearnCategoryResponse} from "../../../models/responses/word-learn-category-response";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {

  public learnCategory$: Observable<WordLearnCategoryResponse> | undefined;
  public successfulStep: number = 0;

  constructor(
    private _learningService: LearningService,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this.learnCategory$ = this._learningService.getCategoryWords(params['id'])
      }
    });
  }
}
