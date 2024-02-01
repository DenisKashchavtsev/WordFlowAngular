import {Component} from '@angular/core';
import {LearningService} from "../../../services/learning.service";
import {ActivatedRoute} from "@angular/router";
import {WordLearnCategoryResponse} from "../../../models/responses/word-learn-category-response";
import {WordLearn} from "../../../models/word-learn";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {

  public learnCategory: WordLearnCategoryResponse | undefined;
  public wordNumber: number = 0;
  public wordQueue: WordLearn[] = [];

  constructor(
    private _learningService: LearningService,
    private _route: ActivatedRoute
  ) {
    this._getWords()
  }

  private _getWords(): void {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this._learningService.getCategoryWords(params['id']).subscribe(response => {
          this.learnCategory = response;
          this.wordQueue = this.learnCategory?.words ?? [];
          this._filterLearnedWords();
          this._checkFinishingCategory();
        });
      }
    });
  }

  _nextWord(): void {
    this._filterLearnedWords()
    this._checkFinishingCategory()

    if (!this.wordQueue.length) {
      this._getWords();
    }

    if (this.wordQueue[this.wordNumber + 1]) {
      this.wordNumber++
    } else {
      this.wordNumber = 0;
    }
  }

  _moveToEnd(currentWord: WordLearn): void {
    this.wordQueue = this.wordQueue.filter(word => word.id !== currentWord.id)
    currentWord.attempts = 0;
    this.wordQueue.push(currentWord)
  }

  handlerStep(currentWord: WordLearn, step: number): void {
    if (currentWord.learned && !currentWord.attempts) {
      this._addCurrentStep(currentWord, step)

      this._nextWord()
    } else {
      this._moveToEnd(currentWord)
    }
  }

  private _addCurrentStep(currentWord: WordLearn, step: number) {
    this.wordQueue.map(word => {
      if (word.id === currentWord.id) {
        word.currentStep = step;
      }
    });
  }

  private _filterLearnedWords() {
    this.wordQueue = this.wordQueue.filter(word => {
      return word.currentStep === null || word.currentStep < 4;
    });
  }

  private _checkFinishingCategory() {
    if (this.learnCategory?.words) {
      if (!this.wordQueue.length && this.learnCategory.words.every(w => w.currentStep === 4)) {
        this._learningService.addLearningHistory(this.learnCategory.words.map(w => w.id), 4).subscribe()
        alert('Category learned!')
      }
    }
  }

  hasWordWithStep(step: number | null): boolean {
    return this.wordQueue.some(word => word.currentStep === step);
  }
}
