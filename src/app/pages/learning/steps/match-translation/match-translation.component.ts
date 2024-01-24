import {Component, Input, OnInit, Output} from '@angular/core';
import {JsonPipe, NgClass, NgForOf} from "@angular/common";
import {WordLearn} from "../../../../models/word-learn";
import {LearningService} from "../../../../services/learning.service";

@Component({
  selector: 'app-match-translation',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    NgClass
  ],
  templateUrl: './match-translation.component.html',
  styleUrl: './match-translation.component.scss'
})
export class MatchTranslationComponent implements OnInit {

  static readonly TIMEOUT_BETWEEN_STEPS: number = 2000;

  @Input() words: WordLearn[] = []
  @Output() learned: boolean = false;

  public currentWord: WordLearn | null = null;
  public answerStatuses: { variant: string, status: boolean } | null = null;

  constructor(private _learningService: LearningService) {
  }

  ngOnInit() {
    if (this.words.length) {
      this._getWord()
    }
  }

  private _getWord(): void {
    for (let word of this.words) {
      if (!word.learned) {
        word.variants = this._getVariants()
        this.currentWord = word;
        return;
      }
    }

    this.currentWord = null;
    this.learned = true;
  }

  private _getVariants(): string[] {
    return this.words.map(word => word.translate).sort(() => Math.random() - 0.5);
  }

  selectVariant(variant: string) {
    this.answerStatuses = null
    if (this.currentWord?.translate === variant) {
      if (!this.currentWord.attempts) {
        this._makeLearned()
        this._learningService.addLearningHistory(this.currentWord.id, 1).subscribe()
      } else {
        this._moveToEnd()
      }
      this.answerStatuses = {variant: variant, status: true};

      setTimeout(() => {
        this._getWord();
      }, MatchTranslationComponent.TIMEOUT_BETWEEN_STEPS)
      return true;

    }
    this.answerStatuses = {variant: variant, status: false};
    this._addAttempt()
    return false
  }

  private _moveToEnd(): void {
    this.words = this.words.filter(word => word.id !== this.currentWord?.id)

    if (this.currentWord) {
      this.currentWord.attempts = 0;
      this.words.push(this.currentWord)
    }
  }

  private _addAttempt() {
    this.words.map(word => {
      if (word.id === this.currentWord?.id) {
        word.attempts = word.attempts ? word.attempts + 1 : 1
      }
    });
  }

  private _makeLearned(): void {
    this.words.map(word => {
      if (word.id === this.currentWord?.id) {
        word.learned = true
      }
    });
  }
}
