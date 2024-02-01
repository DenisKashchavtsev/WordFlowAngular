import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {WordLearn} from "../../../../models/word-learn";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './write.component.html',
  styleUrl: './write.component.scss'
})
export class WriteComponent implements OnInit, OnChanges {

  @Input() targetWord: WordLearn | null = null;
  @Output() handleStep = new EventEmitter<WordLearn>();

  public nextAvailable: boolean = false;
  public enteredWord: string = '';
  public error: boolean | null = null;

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
    this.enteredWord = '';
    this.nextAvailable = false;
    this.error = null;
  }

  checkAnswer() {
    if (this.targetWord?.translate === this.enteredWord) {
      this.targetWord.learned = !this.targetWord.attempts;
      this.nextAvailable = true;
      this.error = null;

      return true;
    }

    this.error = true;
    this._addAttempt()
    return false;
  }

  tryAgain() {
    this.error = null
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
