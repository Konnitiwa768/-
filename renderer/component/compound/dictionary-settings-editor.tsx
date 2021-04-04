//

import {
  Button,
  FormGroup,
  InputGroup,
  Tab,
  Tabs,
  Toaster
} from "@blueprintjs/core";
import * as react from "react";
import {
  MouseEvent,
  ReactElement,
  ReactNode
} from "react";
import {
  Controlled as CodeMirror
} from "react-codemirror2";
import {
  HotKeys
} from "react-hotkeys";
import {
  PlainDictionarySettings
} from "../../module/dictionary";
import {
  Deserializer
} from "../../module/dictionary/loader/deserializer";
import {
  Serializer
} from "../../module/dictionary/saver/serializer";
import {
  Component
} from "../component";
import {
  component
} from "../decorator";


@component()
export class DictionarySettingsEditor extends Component<Props, State> {

  public constructor(props: Props) {
    super(props);
    let serializer = new Serializer();
    let oldSettings = props.settings;
    let revisionString = serializer.serializeRevisions(oldSettings.revisions);
    let settings = {...oldSettings, revisionString};
    this.state = {settings};
  }

  private handleCancel(event: MouseEvent<HTMLElement>): void {
    if (this.props.onCancel) {
      this.props.onCancel(event);
    }
  }

  private handleConfirm(event?: MouseEvent<HTMLElement> | KeyboardEvent): void {
    if (this.props.onConfirm) {
      try {
        let deserializer = new Deserializer();
        let settings = this.state.settings;
        settings.revisions = deserializer.deserializeRevisions(settings.revisionString);
        this.props.onConfirm(settings, event);
      } catch (error) {
        CustomToaster.show({message: this.trans("dictionarySettingsEditor.errorRevisions"), icon: "error", intent: "danger"});
      }
    }
  }

  private setSettings<T extends Array<unknown>>(setter: (...args: T) => void): (...args: T) => void {
    let outerThis = this;
    let wrapper = function (...args: T): void {
      setter(...args);
      let settings = outerThis.state.settings;
      outerThis.setState({settings});
    };
    return wrapper;
  }

  public renderBasic(): ReactElement {
    let settings = this.state.settings;
    let node = (
      <div className="zp-dictionary-settings-editor-tab zp-editor-tab">
        <FormGroup label="バージョン" labelFor="version">
          <InputGroup id="version" value={settings.version} onChange={this.setSettings((event) => settings.version = event.target.value)}/>
        </FormGroup>
        <FormGroup label="アルファベット順" labelFor="alphabet-rule">
          <InputGroup id="alphabet-rule" value={settings.alphabetRule} onChange={this.setSettings((event) => settings.alphabetRule = event.target.value)}/>
        </FormGroup>
      </div>
    );
    return node;
  }

  public renderRevision(): ReactElement {
    let settings = this.state.settings;
    let node = (
      <div className="zp-dictionary-settings-editor-tab zp-editor-tab">
        <CodeMirror
          className="zp-dictionary-settings-editor-revision"
          value={settings.revisionString}
          options={{theme: "zpshcontent", mode: {name: "shcontent"}, lineWrapping: true}}
          onBeforeChange={this.setSettings((editor, data, value) => settings.revisionString = value)}
        />
      </div>
    );
    return node;
  }

  public render(): ReactNode {
    let basicNode = this.renderBasic();
    let revisionNode = this.renderRevision();
    let keys = {confirm: "ctrl+enter"};
    let handlers = {confirm: this.handleConfirm.bind(this)};
    let node = (
      <div className="zp-dictionary-settings-editor zp-editor">
        <HotKeys keyMap={keys} handlers={handlers}>
          <Tabs defaultSelectedTabId="revision">
            <Tab id="basic" title={this.trans("dictionarySettingsEditor.basic")} panel={basicNode}/>
            <Tab id="revision" title={this.trans("dictionarySettingsEditor.revision")} panel={revisionNode}/>
          </Tabs>
          <div className="zp-dictionary-settings-editor-button zp-editor-button">
            <Button text={this.trans("dictionarySettingsEditor.cancel")} icon="cross" onClick={this.handleCancel.bind(this)}/>
            <Button text={this.trans("dictionarySettingsEditor.confirm")} intent="primary" icon="confirm" onClick={this.handleConfirm.bind(this)}/>
          </div>
        </HotKeys>
      </div>
    );
    return node;
  }

}


type Props = {
  settings: PlainDictionarySettings,
  onConfirm?: (settings: PlainDictionarySettings, event?: MouseEvent<HTMLElement> | KeyboardEvent) => void,
  onCancel?: (event: MouseEvent<HTMLElement>) => void
};
type State = {
  settings: PlainDictionarySettings & {revisionString: string};
};

let CustomToaster = Toaster.create({className: "zp-dictionary-settings-toaster", position: "top", maxToasts: 2});