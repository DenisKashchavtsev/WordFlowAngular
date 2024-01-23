import { Component } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {WordCategoriesResponse} from "../../models/responses/word-categories-response";

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrl: './learning.component.scss'
})
export class LearningComponent {

  public categoriesPaginator$: Observable<WordCategoriesResponse>
  constructor(private _categoryService : CategoryService) {
    this.categoriesPaginator$ = this._categoryService.getList();
  }
}
