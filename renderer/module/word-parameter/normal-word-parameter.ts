//

import {
  Word
} from "../word";
import {
  IgnoreOptions,
  WordMode,
  WordParameter,
  WordType
} from "./word-parameter";


export class NormalWordParameter extends WordParameter {

  public search: string;
  public mode: WordMode;
  public type: WordType;
  public language: string;
  public ignoreOptions: IgnoreOptions;

  public constructor(search: string, mode: WordMode, type: WordType, language: string, ignoreOptions?: IgnoreOptions) {
    super();
    this.search = search;
    this.mode = mode;
    this.type = type;
    this.language = language;
    this.ignoreOptions = ignoreOptions ?? NormalWordParameter.getDefaultIgnoreOptions(mode, type);
  }

  public static createEmpty(language: string): NormalWordParameter {
    let parameter = new NormalWordParameter("", "both", "prefix", language);
    return parameter;
  }

  private static getDefaultIgnoreOptions(mode: WordMode, type: WordType): IgnoreOptions {
    if ((mode === "name" || mode === "both") && (type !== "pair" && type !== "regular")) {
      return {case: false, diacritic: true};
    } else {
      return {case: false, diacritic: false};
    }
  }

  public match(word: Word): boolean {
    let candidates = WordParameter.createCandidates(word, this.mode, this.language);
    let matcher = WordParameter.createMatcher(this.type);
    let normalizedSearch = WordParameter.normalize(this.search, this.ignoreOptions);
    let predicate = candidates.some((candidate) => {
      let normalizedCandidate = WordParameter.normalize(candidate, this.ignoreOptions);
      return matcher(normalizedSearch, normalizedCandidate);
    });
    return predicate;
  }

}