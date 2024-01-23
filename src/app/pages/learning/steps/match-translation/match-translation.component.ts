import {Component, Input} from '@angular/core';
import {Word} from "../../../../models/word";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-match-translation',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './match-translation.component.html',
  styleUrl: './match-translation.component.scss'
})
export class MatchTranslationComponent {
  @Input() words: Word[] = []
  public currentWord: Word | undefined;

  constructor() {
  }

  ngOnInit() {
    if (this.words) {
      this.currentWord = this.getWord()
    }
  }

  getWord(): Word {
    if (this.words.length) {
      this.words[0].variants = this.getVariants()
    }
    return this.words[0]
  }

  getVariants(): string[] {
    return this.words.map(word => word.translate).sort(() => Math.random() - 0.5);
  }
}
