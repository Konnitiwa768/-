//

import {
  ControlGroup,
  InputGroup
} from "@blueprintjs/core";
import * as react from "react";
import {
  ReactNode
} from "react";
import {
  NormalWordParameter,
  WORD_MODES,
  WORD_TYPES,
  WordMode,
  WordParameter,
  WordType
} from "../../module";
import {
  Select
} from "../atom";
import {
  Component
} from "../component";
import {
  component
} from "../decorator";


@component()
export class SearchForm extends Component<Props, State> {

  private handleParameterSet(nextParameter: {search?: string, mode?: WordMode, type?: WordType}): void {
    if (this.props.onParameterSet) {
      let oldParameter = WordParameter.getNormal(this.props.parameter);
      let search = nextParameter.search ?? oldParameter.search;
      let mode = nextParameter.mode ?? oldParameter.mode;
      let type = nextParameter.type ?? oldParameter.type;
      let language = oldParameter.language;
      let parameter = new NormalWordParameter(search, mode, type, language);
      this.props.onParameterSet(parameter);
    }
  }

  public render(): ReactNode {
    let parameter = WordParameter.getNormal(this.props.parameter);
    let node = (
      <div className="zp-search-form">
        <ControlGroup fill={true}>
          <InputGroup value={parameter.search} fill={true} onChange={(event) => this.handleParameterSet({search: event.target.value})}/>
          <Select
            className="zp-search-form-select"
            buttonClassName="zp-search-form-button"
            items={[...WORD_MODES]}
            activeItem={parameter.mode}
            getText={(mode) => this.trans(`searchForm.modeShort.${mode}`)}
            getMenuText={(mode) => this.trans(`searchForm.mode.${mode}`)}
            onItemSelect={(mode) => this.handleParameterSet({mode})}
          />
          <Select
            className="zp-search-form-select"
            buttonClassName="zp-search-form-button"
            items={[...WORD_TYPES]}
            activeItem={parameter.type}
            getText={(type) => this.trans(`searchForm.typeShort.${type}`)}
            getMenuText={(type) => this.trans(`searchForm.type.${type}`)}
            onItemSelect={(type) => this.handleParameterSet({type})}
          />
        </ControlGroup>
      </div>
    );
    return node;
  }

}


type Props = {
  parameter: WordParameter,
  onParameterSet?: (parameter: WordParameter) => void;
};
type State = {
};