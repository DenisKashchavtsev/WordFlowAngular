import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {JsonPipe, NgClass, NgForOf} from "@angular/common";
import {WordLearn} from "../../../../models/word-learn";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-match-translation',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    NgClass,
    FormsModule
  ],
  templateUrl: './match-translation.component.html',
  styleUrl: './match-translation.component.scss'
})
export class MatchTranslationComponent implements OnInit {

  @Input() wordQueue: WordLearn[] = []
  @Output() handleStep = new EventEmitter<WordLearn>();

  public notification: { variant: string, status: boolean } | null = null;
  public sources: string[] = [];
  public translations: string[] = [];

  public buttonSource: string | null = null;
  public buttonTranslation: string | null = null;

  public nextAvailable: boolean = false;

  ngOnInit() {
    this._getVariants();
    this.notification = null;
    this.nextAvailable = true;
  }

  private _getVariants(): void {
    console.log(this.wordQueue)
    this.sources = this.wordQueue
      .map(word => word.source)
      .sort(() => Math.random() - 0.5);

    this.translations = this.wordQueue
      .map(word => word.translate)
      .sort(() => Math.random() - 0.5);
  }

  selectVariant() {
    this.notification = null;

    if (this.buttonSource && this.buttonTranslation) {
      let targetWord = this._checkAnswer()
      if (targetWord !== null) {
        this.sources = this.sources.filter(word => word !== this.buttonSource);
        this.translations = this.translations.filter(word => word !== this.buttonTranslation);

        targetWord.learned = true;
        this.handleStep.emit(targetWord);

        setTimeout(() => {
          this.buttonSource = null
          this.buttonTranslation = null
        }, 1000)
      } else {
        console.log('error')
        setTimeout(() => {
          this.buttonSource = null
          this.buttonTranslation = null
        }, 1000)
      }

      if (!this.sources.length) {
        this.nextAvailable = true;
      }
    }

    // this.notification = {variant: variant, status: false};
    return false;
  }

  private _checkAnswer(): WordLearn | null {
    let word = null;

    this.wordQueue.map(w => {
      if (w.translate === this.buttonTranslation
        && w.source === this.buttonSource) {
        word = w;
      }
    });

    return word;
  }

}
