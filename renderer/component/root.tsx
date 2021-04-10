//

import {
  Provider
} from "mobx-react";
import * as queryParser from "query-string";
import * as react from "react";
import {
  ReactNode
} from "react";
import {
  IntlProvider
} from "react-intl";
import {
  Component
} from "./component";
import {
  component
} from "./decorator";
import {
  DictionarySettingsPage,
  EditorPage,
  GitCommitPage,
  GitPushPage,
  MainPage,
  UploadDictionaryPage
} from "./page";
import {
  GlobalStore
} from "./store";


@component({inject: false, injectIntl: false, observer: true})
export class Root extends Component<Props, State> {

  private store: GlobalStore = new GlobalStore();
  private messages: Record<string, string> = require("../language/ja.yml");

  public state: State = {
    mode: "",
    props: null
  };

  public async componentDidMount(): Promise<void> {
    this.fetchProps();
    this.setupRespond();
  }

  private async fetchProps(): Promise<void> {
    let query = queryParser.parse(window.location.search);
    let mode = query.mode;
    let idString = query.idString;
    if (typeof mode === "string" && typeof idString === "string") {
      this.store.id = parseInt(idString, 10);
      let props = await window.api.sendAsync("getProps");
      this.setState({mode, props}, () => {
        window.api.send("showWindow");
      });
    }
  }

  private setupRespond(): void {
    let query = queryParser.parse(window.location.search);
    let respondIdString = query.respondIdString;
    let respondChannel = query.respondChannel;
    if (typeof respondIdString === "string" && typeof respondChannel === "string") {
      this.store.respondId = parseInt(respondIdString, 10);
      this.store.respondChannel = respondChannel;
      window.addEventListener("unload", () => {
        let respondId = this.store.respondId!;
        let respondChannel = this.store.respondChannel!;
        window.api.sendTo(respondId, respondChannel, 0, null);
      });
    }
  }

  public renderPage(): ReactNode {
    let props = this.state.props;
    let mode = this.state.mode;
    if (props !== null) {
      if (mode === "main") {
        return <MainPage {...props}/>;
      } else if (mode === "editor") {
        return <EditorPage {...props}/>;
      } else if (mode === "dictionarySettings") {
        return <DictionarySettingsPage {...props}/>;
      } else if (mode === "gitCommit") {
        return <GitCommitPage {...props}/>;
      } else if (mode === "gitPush") {
        return <GitPushPage {...props}/>;
      } else if (mode === "uploadDictionary") {
        return <UploadDictionaryPage {...props}/>;
      } else {
        return <div/>;
      }
    } else {
      return <div/>;
    }
  }

  public render(): ReactNode {
    let pageNode = this.renderPage();
    let node = (
      <Provider store={this.store}>
        <IntlProvider defaultLocale="ja" locale="ja" messages={this.messages}>
          {pageNode}
        </IntlProvider>
      </Provider>
    );
    return node;
  }

}


type Props = {
};
type State = {
  mode: string,
  props: any | null
};