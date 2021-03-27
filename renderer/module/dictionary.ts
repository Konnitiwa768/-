//

import {
  Word
} from "./word";
import {
  WordParameter
} from "./word-parameter/word-parameter";


export class Dictionary {

  public words: Array<Word>;

  public constructor(words: Array<Word>) {
    this.words = words;
  }

  public static fromPlain(plain: Dictionary): Dictionary {
    let words = plain.words.map((word) => Word.fromPlain(word));
    let dictionary = new Dictionary(words);
    return dictionary;
  }

  public search(parameter: WordParameter): {words: Array<Word>, suggestions: []} {
    let words = this.words.filter((word) => parameter.match(word));
    return {words, suggestions: []};
  }

}