//

import {
  Button,
  InputGroup,
  NumericInput,
  Tab,
  Tabs,
  TextArea
} from "@blueprintjs/core";
import * as react from "react";
import {
  ReactElement,
  ReactNode
} from "react";
import {
  Component
} from "../component";
import {
  component
} from "../decorator";
import {
  Word
} from "../../module";


@component()
export class WordEditor extends Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    let uid = props.word?.uid ?? null;
    let word = (props.word !== null) ? props.word : Word.createEmpty();
    let language = "ja";
    this.state = {uid, word, language};
  }

  private setWord<T extends Array<unknown>>(setter: (...args: T) => void): (...args: T) => void {
    let outerThis = this;
    let wrapper = function (...args: T): void {
      setter(...args);
      let word = outerThis.state.word;
      outerThis.setState({word});
    };
    return wrapper;
  }

  public renderEditor(language: string): ReactElement {
    let word = this.state.word;
    let node = (
      <div className="zp-word-editor-tab" key={language}>
        <div className="zp-word-editor-head">
          <InputGroup fill={true} value={word.name} onChange={this.setWord((event) => word.name = event.target.value)}/>
          <NumericInput className="zp-word-editor-date" value={word.date} onValueChange={this.setWord((date) => word.date = date)}/>
        </div>
        <TextArea className="zp-word-editor-content" fill={true} value={word.contents[language] ?? ""} onChange={this.setWord((event) => word.contents[language] = event.target.value)}/>
      </div>
    );
    return node;
  }

  public render(): ReactNode {
    let languages = ["ja", "en"];
    let tabNodes = languages.map((language) => {
      let editorNode = this.renderEditor(language);
      let tabNode = (
        <Tab id={language} title={this.trans(`wordEditor.language.${language}`)} panel={editorNode}/>
      );
      return tabNode;
    })
    let node = (
      <div className="zp-word-editor">
        <Tabs selectedTabId={this.state.language} onChange={(language) => this.setState({language: "" + language})}>
          {tabNodes}
        </Tabs>
        <div className="zp-word-editor-button">
          <Button text={this.trans("wordEditor.cancel")} icon="cross"/>
          <Button text={this.trans("wordEditor.delete")} intent="danger" icon="trash"/>
          <Button text={this.trans("wordEditor.confirm")} intent="primary" icon="confirm"/>
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
  word: Word | null
};
type State = {
  uid: string | null,
  word: Word,
  language: string
};