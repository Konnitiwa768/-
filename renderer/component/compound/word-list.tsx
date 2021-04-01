//

import partial from "lodash-es/partial";
import * as react from "react";
import {
  FocusEvent,
  MouseEvent,
  ReactNode
} from "react";
import {
  Dictionary,
  Marker,
  Word
} from "../../module";
import {
  Component
} from "../component";
import {
  Pagination,
  WordPaneWrapper
} from "../compound";
import {
  component
} from "../decorator";


@component()
export class WordList extends Component<Props, State> {

  public componentDidUpdate(previousProps: any): void {
    if (this.props.words !== previousProps.words) {
      document.getElementById("word-list-container")!.scrollTop = 0;
    }
  }

  private handlePageSet(page: number) {
    if (this.props.onPageSet) {
      this.props.onPageSet(page);
      document.getElementById("word-list-container")!.scrollTop = 0;
    }
  }

  public render(): ReactNode {
    let page = this.props.page;
    let maxPage = Math.max(Math.ceil(this.props.words.length / 30) - 1, 0);
    let displayedWords = this.props.words.slice(page * 30, page * 30 + 30);
    let wordPanes = displayedWords.map((word) => {
      let wordPane = (
        <WordPaneWrapper
          key={word.uid}
          dictionary={this.props.dictionary}
          word={word}
          language={this.props.language}
          onCreate={this.props.onCreate}
          onInherit={this.props.onInherit && partial(this.props.onInherit, word)}
          onEdit={this.props.onEdit && partial(this.props.onEdit, word)}
          onDelete={this.props.onDelete && partial(this.props.onDelete, word)}
          onActivate={this.props.onActivate && partial(this.props.onActivate, word)}
          onMarkerToggled={this.props.onMarkerToggled && partial(this.props.onMarkerToggled, word)}
          onLinkClick={this.props.onLinkClick}
        />
      );
      return wordPane;
    });
    let node = (
      <div className="zp-word-list" id="word-list">
        {wordPanes}
        <div className="zp-word-list-pagination-container">
          <Pagination page={this.props.page} minPage={0} maxPage={maxPage} onSet={this.handlePageSet.bind(this)}/>
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
  dictionary: Dictionary,
  words: Array<Word>,
  language: string,
  page: number,
  onCreate?: (event: MouseEvent<HTMLElement>) => void,
  onInherit?: (word: Word, event: MouseEvent<HTMLElement>) => void,
  onEdit?: (word: Word, event: MouseEvent<HTMLElement>) => void,
  onDelete?: (word: Word, event: MouseEvent<HTMLElement>) => void,
  onMarkerToggled?: (word: Word, marker: Marker) => void,
  onLinkClick?: (name: string, event: MouseEvent<HTMLSpanElement>) => void,
  onActivate?: (activeWord: Word | null, event: FocusEvent<HTMLElement>) => void,
  onPageSet?: (page: number) => void
};
type State = {
};