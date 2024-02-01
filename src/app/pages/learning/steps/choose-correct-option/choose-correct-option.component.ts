import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {JsonPipe, NgClass, NgForOf} from "@angular/common";
import {WordLearn} from "../../../../models/word-learn";

@Component({
  selector: 'app-choose-correct-option',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    NgClass
  ],
  templateUrl: './choose-correct-option.component.html',
  styleUrl: './choose-correct-option.component.scss'
})
export class ChooseCorrectOptionComponent implements OnInit, OnChanges {

  @Input() wordQueue: WordLearn[] = []
  @Input() targetWord: WordLearn | null = null;
  @Output() handleStep = new EventEmitter<WordLearn>();

  public notification: { variant: string, status: boolean } | null = null;
  public variants: string[] = [];
  public nextAvailable: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetWord']) {
      this.handleTargetWordChange();
    }
  }

  ngOnInit() {
    this.handleTargetWordChange();
  }

  private handleTargetWordChange(): void {
    this.targetWord = this.targetWord || null;
    this._getVariants();
    this.notification = null;
    this.nextAvailable = true;
  }

  private _getVariants(): void {
    if (this.targetWord) {
      this.variants = this.wordQueue
        .filter(word => word.id !== this.targetWord?.id)
        .map(word => word.translate)
        .splice(0, 4)
        .concat(this.targetWord?.translate?? '')
        .sort(() => Math.random() - 0.5);
    }
  }

  selectVariant(variant: string) {
    this.notification = null;

    if (this.targetWord?.translate === variant) {
      this.nextAvailable = false;
      this.targetWord.learned = !this.targetWord.attempts;
      this.notification = {variant: variant, status: true};

      return true;
    }

    this._addAttempt()

    this.notification = {variant: variant, status: false};
    return false;
  }

  private _addAttempt() {
    if (this.targetWord) {
      this.targetWord.attempts = (this.targetWord?.attempts || 0) + 1;
    }
  }

  next() {
    if (this.targetWord) {
      this.handleStep.emit(this.targetWord);
    }
  }
}
