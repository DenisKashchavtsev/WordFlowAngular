import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {WordLearn} from "../../../../models/word-learn";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-choose-letters',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './choose-letters.component.html',
  styleUrl: './choose-letters.component.scss'
})
export class ChooseLettersComponent implements OnInit, OnChanges {

  @Input() targetWord: WordLearn | null = null;
  @Output() handleStep = new EventEmitter<WordLearn>();

  public nextAvailable: boolean = false;
  public letters: string[] | undefined = [];
  public disabledLetters: Record<number, boolean> = [];
  public enteredWord: string = '';

  ngOnInit() {
    this.handleTargetWordChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['targetWord']) {
      this.handleTargetWordChange();
    }
  }

  private handleTargetWordChange(): void {
    this.targetWord = this.targetWord || null;
    this._getLetters();
    this.disabledLetters = [];
    this.enteredWord = '';
    this.nextAvailable = false;
  }

  private _getLetters(): void {
    this.letters = this.targetWord?.translate
      ? this.targetWord?.translate?.split('').sort(() => Math.random() - 0.5)
      : [];
  }

  selectLetter(key: number, letter: string) {
    let letterNumber = this.enteredWord.length

    if (this.targetWord?.translate[letterNumber] === letter) {
      this.enteredWord += letter
      this.disabledLetters[key] = true;

      if (this.targetWord?.translate.length === this.enteredWord.length) {
        this.targetWord.learned = !this.targetWord.attempts;
        this.nextAvailable = true;
      }

      return true;
    }

    this._addAttempt()
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
