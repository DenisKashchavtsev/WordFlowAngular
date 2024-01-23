import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {Observable} from "rxjs";
import {WordCategoriesWordsResponse} from "../../../models/responses/word-categories-words-response";

@Component({
  selector: 'app-category-words',
  templateUrl: './category-words.component.html',
  styleUrl: './category-words.component.scss'
})
export class CategoryWordsComponent {

  public category$: Observable<Category> | undefined;
  public wordsPaginator$: Observable<WordCategoriesWordsResponse> | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService
  ) {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this.category$ = this._categoryService.show(params['id'])
        this.wordsPaginator$ = this._categoryService.getCategoryWords(params['id'])
      }
    })
  }

}
