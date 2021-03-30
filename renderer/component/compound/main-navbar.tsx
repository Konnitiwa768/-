//

import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarGroup,
  NavbarHeading
} from "@blueprintjs/core";
import {
  Popover2
} from "@blueprintjs/popover2";
import * as react from "react";
import {
  Fragment,
  ReactElement,
  ReactNode
} from "react";
import {
  GlobalHotKeys
} from "react-hotkeys";
import {
  Marker,
  WordMode,
  WordType
} from "../../module";
import {
  HairianUtil
} from "../../util/hairian";
import {
  HandlerManager
} from "../../util/handler-manager";
import {
  MarkerIcon
} from "../atom";
import {
  Component
} from "../component";
import {
  component
} from "../decorator";


@component()
export class MainNavbar extends Component<Props, State> {

  private handlerManager: HandlerManager;

  public constructor(props: Props) {
    super(props);
    this.handlerManager = this.createHandlerManager();
  }

  private renderFileMenu(): ReactElement {
    let node = (
      <Menu>
        <MenuItem
          text={this.trans("mainNavbar.loadDictionary")}
          label={this.handlerManager.getLabel("loadDictionary")}
          onClick={this.handlerManager.getHandler("loadDictionary")}
          icon="document-open"
        />
        <MenuItem
          text={this.trans("mainNavbar.reloadDictionary")}
          label={this.handlerManager.getLabel("reloadDictionary")}
          onClick={this.handlerManager.getHandler("reloadDictionary")}
          icon="blank"
        />
        <MenuDivider/>
        <MenuItem
          text={this.trans("mainNavbar.saveDictionary")}
          label={this.handlerManager.getLabel("saveDictionary")}
          onClick={this.handlerManager.getHandler("saveDictionary")}
          icon="floppy-disk"
        />
        <MenuItem text={this.trans("mainNavbar.exportDictionary")} icon="blank">
          <MenuItem
            text={this.trans("mainNavbar.exportDictionaryAsOldShaleian")}
            label={this.handlerManager.getLabel("exportDictionaryAsOldShaleian")}
            onClick={this.handlerManager.getHandler("exportDictionaryAsOldShaleian")}
          />
          <MenuItem
            text={this.trans("mainNavbar.exportDictionaryAsSlime")}
            label={this.handlerManager.getLabel("exportDictionaryAsSlime")}
            onClick={this.handlerManager.getHandler("exportDictionaryAsSlime")}
          />
        </MenuItem>
        <MenuDivider/>
        <MenuItem
          text={this.trans("mainNavbar.quit")}
          label={this.handlerManager.getLabel("quit")}
          onClick={this.handlerManager.getHandler("quit")}
          icon="cross"
        />
      </Menu>
    );
    return node;
  }

  private renderSearchMenu(): ReactElement {
    let node = (
      <Menu>
        <MenuItem text={this.trans("mainNavbar.changeWordMode")} icon="blank">
          <MenuItem
            text={this.trans("common.mode.name")}
            label={this.handlerManager.getLabel("changeWordModeToName")}
            onClick={this.handlerManager.getHandler("changeWordModeToName")}
          />
          <MenuItem
            text={this.trans("common.mode.equivalent")}
            label={this.handlerManager.getLabel("changeWordModeToEquivalent")}
            onClick={this.handlerManager.getHandler("changeWordModeToEquivalent")}
          />
          <MenuItem
            text={this.trans("common.mode.both")}
            label={this.handlerManager.getLabel("changeWordModeToBoth")}
            onClick={this.handlerManager.getHandler("changeWordModeToBoth")}
          />
          <MenuItem
            text={this.trans("common.mode.content")}
            label={this.handlerManager.getLabel("changeWordModeToContent")}
            onClick={this.handlerManager.getHandler("changeWordModeToContent")}
          />
        </MenuItem>
        <MenuItem text={this.trans("mainNavbar.changeWordType")} icon="blank">
          <MenuItem
            text={this.trans("common.type.exact")}
            label={this.handlerManager.getLabel("changeWordTypeToExact")}
            onClick={this.handlerManager.getHandler("changeWordTypeToExact")}
          />
          <MenuItem
            text={this.trans("common.type.prefix")}
            label={this.handlerManager.getLabel("changeWordTypeToPrefix")}
            onClick={this.handlerManager.getHandler("changeWordTypeToPrefix")}
          />
          <MenuItem
            text={this.trans("common.type.suffix")}
            label={this.handlerManager.getLabel("changeWordTypeToSuffix")}
            onClick={this.handlerManager.getHandler("changeWordTypeToSuffix")}
          />
          <MenuItem
            text={this.trans("common.type.part")}
            label={this.handlerManager.getLabel("changeWordTypeToPart")}
            onClick={this.handlerManager.getHandler("changeWordTypeToPart")}
          />
          <MenuItem
            text={this.trans("common.type.pair")}
            label={this.handlerManager.getLabel("changeWordTypeToPair")}
            onClick={this.handlerManager.getHandler("changeWordTypeToPair")}
          />
          <MenuItem
            text={this.trans("common.type.regular")}
            label={this.handlerManager.getLabel("changeWordTypeToRegular")}
            onClick={this.handlerManager.getHandler("changeWordTypeToRegular")}
          />
        </MenuItem>
        <MenuItem
          text={this.trans("mainNavbar.shuffleWords")}
          label={this.handlerManager.getLabel("shuffleWords")}
          onClick={this.handlerManager.getHandler("shuffleWords")}
          icon="random"
        />
        <MenuDivider/>
        <MenuItem
          text={this.trans("mainNavbar.searchAdvanced")}
          label={this.handlerManager.getLabel("searchAdvanced")}
          onClick={this.handlerManager.getHandler("searchAdvanced")}
          icon="blank"
        />
        <MenuItem
          text={this.trans("mainNavbar.searchScript")}
          label={this.handlerManager.getLabel("searchScript")}
          onClick={this.handlerManager.getHandler("searchScript")}
          icon="blank"
        />
      </Menu>
    );
    return node;
  }

  private renderEditMenu(): ReactElement {
    let node = (
      <Menu>
        <MenuItem
          text={this.trans("mainNavbar.createWord")}
          label={this.handlerManager.getLabel("createWord")}
          onClick={this.handlerManager.getHandler("createWord")}
          icon="blank"
        />
        <MenuItem
          text={this.trans("mainNavbar.inheritActiveWord")}
          label={this.handlerManager.getLabel("inheritActiveWord")}
          onClick={this.handlerManager.getHandler("inheritActiveWord")}
          icon="blank"
        />
        <MenuItem
          text={this.trans("mainNavbar.editActiveWord")}
          label={this.handlerManager.getLabel("editActiveWord")}
          onClick={this.handlerManager.getHandler("editActiveWord")}
          icon="blank"
        />
        <MenuItem
          text={this.trans("mainNavbar.deleteActiveWord")}
          label={this.handlerManager.getLabel("deleteActiveWord")}
          onClick={this.handlerManager.getHandler("deleteActiveWord")}
          icon="blank"
          intent="danger"
        />
        <MenuDivider/>
        <MenuItem
          text={this.trans("mainNavbar.cutActiveWord")}
          label={this.handlerManager.getLabel("cutActiveWord")}
          onClick={this.handlerManager.getHandler("cutActiveWord")}
          icon="cut"
        />
        <MenuItem
          text={this.trans("mainNavbar.copyActiveWord")}
          label={this.handlerManager.getLabel("copyActiveWord")}
          onClick={this.handlerManager.getHandler("copyActiveWord")}
          icon="duplicate"
        />
        <MenuItem
          text={this.trans("mainNavbar.pasteActiveWord")}
          label={this.handlerManager.getLabel("pasteActiveWord")}
          onClick={this.handlerManager.getHandler("pasteActiveWord")}
          icon="clipboard"
        />
        <MenuDivider/>
        <MenuItem text={this.trans("mainNavbar.toggleActiveWordMarker")} icon="blank">
          <MenuItem
            text={this.trans("common.marker.circle")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerCircle")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerCircle")}
            icon={<MarkerIcon marker="circle" icon={true}/>}
          />
          <MenuItem
            text={this.trans("common.marker.square")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerSquare")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerSquare")}
            icon={<MarkerIcon marker="square" icon={true}/>}
          />
          <MenuItem
            text={this.trans("common.marker.up")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerUp")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerUp")}
            icon={<MarkerIcon marker="up" icon={true}/>}
          />
          <MenuItem
            text={this.trans("common.marker.diamond")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerDiamond")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerDiamond")}
            icon={<MarkerIcon marker="diamond" icon={true}/>}
          />
          <MenuItem
            text={this.trans("common.marker.down")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerDown")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerDown")}
            icon={<MarkerIcon marker="down" icon={true}/>}
          />
          <MenuItem
            text={this.trans("common.marker.cross")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerCross")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerCross")}
            icon={<MarkerIcon marker="cross" icon={true}/>}
          />
          <MenuItem
            text={this.trans("common.marker.pentagon")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerPentagon")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerPentagon")}
            icon={<MarkerIcon marker="pentagon" icon={true}/>}
          />
          <MenuItem
            text={this.trans("common.marker.heart")}
            label={this.handlerManager.getLabel("toggleActiveWordMarkerHeart")}
            onClick={this.handlerManager.getHandler("toggleActiveWordMarkerHeart")}
            icon={<MarkerIcon marker="heart" icon={true}/>}
          />
        </MenuItem>
      </Menu>
    );
    return node;
  }

  private renderToolMenu(): ReactElement {
    let node = (
      <Menu>
        <MenuItem
          text={this.trans("mainNavbar.openDictionarySettings")}
          label={this.handlerManager.getLabel("openDictionarySettings")}
          onClick={this.handlerManager.getHandler("openDictionarySettings")}
          icon="blank"
        />
        <MenuItem
          text={this.trans("mainNavbar.openSettings")}
          label={this.handlerManager.getLabel("openSettings")}
          onClick={this.handlerManager.getHandler("openSettings")}
          icon="cog"
        />
      </Menu>
    );
    return node;
  }

  private renderHelpMenu(): ReactElement {
    let node = (
      <Menu>
        <MenuItem
          text={this.trans("mainNavbar.openDevTools")}
          label={this.handlerManager.getLabel("openDevTools")}
          onClick={this.handlerManager.getHandler("openDevTools")}
          icon="blank"
        />
        <MenuDivider/>
        <MenuItem
          text={this.trans("mainNavbar.openHelp")}
          label={this.handlerManager.getLabel("openHelp")}
          onClick={this.handlerManager.getHandler("openHelp")}
          icon="help"
        />
        <MenuItem
          text={this.trans("mainNavbar.aboutApplication")}
          label={this.handlerManager.getLabel("aboutApplication")}
          onClick={this.handlerManager.getHandler("aboutApplication")}
          icon="blank"
        />
      </Menu>
    );
    return node;
  }

  private renderHotkeys(): ReactNode {
    let manager = this.handlerManager;
    let node = <GlobalHotKeys keyMap={manager.getKeys()} handlers={manager.getHandlers()}/>;
    return node;
  }

  private createHandlerManager(): HandlerManager {
    let manager = new HandlerManager({
      loadDictionary: {key: "ctrl+o"},
      reloadDictionary: {key: "ctrl+shift+o", handler: () => this.props.reloadDictionary()},
      saveDictionary: {key: "ctrl+s", handler: () => this.props.saveDictionary()},
      changeWordModeToName: {key: "ctrl+w", handler: () => this.props.changeWordMode("name")},
      changeWordModeToEquivalent: {key: "ctrl+e", handler: () => this.props.changeWordMode("equivalent")},
      changeWordModeToBoth: {key: "ctrl+shift+w", handler: () => this.props.changeWordMode("both")},
      changeWordModeToContent: {key: "ctrl+q", handler: () => this.props.changeWordMode("content")},
      changeWordTypeToExact: {key: "ctrl+shift+t", handler: () => this.props.changeWordType("exact")},
      changeWordTypeToPrefix: {key: "ctrl+t", handler: () => this.props.changeWordType("prefix")},
      changeWordTypeToSuffix: {handler: () => this.props.changeWordType("suffix")},
      changeWordTypeToPart: {handler: () => this.props.changeWordType("part")},
      changeWordTypeToPair: {key: "ctrl+shift+g", handler: () => this.props.changeWordType("pair")},
      changeWordTypeToRegular: {key: "ctrl+g", handler: () => this.props.changeWordType("regular")},
      shuffleWords: {key: "ctrl+r", handler: () => this.props.shuffleWords()},
      searchAdvanced: {key: "ctrl+f"},
      searchScript: {key: "ctrl+shift+f"},
      createWord: {key: "ctrl+n", handler: () => this.props.createWord()},
      inheritActiveWord: {key: "ctrl+i", handler: () => this.props.inheritActiveWord()},
      editActiveWord: {key: "ctrl+m", handler: () => this.props.editActiveWord()},
      deleteActiveWord: {handler: () => this.props.deleteActiveWord()},
      toggleActiveWordMarkerCircle: {key: "ctrl+1", handler: () => this.props.toggleActiveWordMarker("circle")},
      toggleActiveWordMarkerSquare: {key: "ctrl+2", handler: () => this.props.toggleActiveWordMarker("square")},
      toggleActiveWordMarkerUp: {key: "ctrl+3", handler: () => this.props.toggleActiveWordMarker("up")},
      toggleActiveWordMarkerDiamond: {key: "ctrl+4", handler: () => this.props.toggleActiveWordMarker("diamond")},
      toggleActiveWordMarkerDown: {key: "ctrl+5", handler: () => this.props.toggleActiveWordMarker("down")},
      toggleActiveWordMarkerCross: {key: "ctrl+6", handler: () => this.props.toggleActiveWordMarker("cross")},
      toggleActiveWordMarkerPentagon: {key: "ctrl+7", handler: () => this.props.toggleActiveWordMarker("pentagon")},
      toggleActiveWordMarkerHeart: {key: "ctrl+8", handler: () => this.props.toggleActiveWordMarker("heart")},
      openDictionarySettings: {key: "ctrl+p", handler: () => this.props.openDictionarySettings()},
      openSettings: {key: "ctrl+shift+p"},
      openDevTools: {key: "f12", handler: () => this.openDevTools()},
      openHelp: {key: "f1"}
    });
    return manager;
  }

  public render(): ReactNode {
    let hotkeyNode = this.renderHotkeys();
    let version = "dev" + HairianUtil.getHairia(process.env["BUILD_DATE"]);
    let node = (
      <Fragment>
        <Navbar fixedToTop={true}>
          <NavbarGroup align="left">
            <NavbarHeading>
              <strong>{this.trans("mainNavbar.title")}</strong><br/>
              <small className="bp3-text-muted">ver {version}</small>
            </NavbarHeading>
          </NavbarGroup>
          <NavbarGroup align="left">
            <Popover2 content={this.renderFileMenu()} position="bottom-left">
              <Button text={this.trans("mainNavbar.file")} minimal={true}/>
            </Popover2>
            <Popover2 content={this.renderSearchMenu()} position="bottom-left">
              <Button text={this.trans("mainNavbar.search")} minimal={true}/>
            </Popover2>
            <Popover2 content={this.renderEditMenu()} position="bottom-left">
              <Button text={this.trans("mainNavbar.edit")} minimal={true}/>
            </Popover2>
            <Button text={this.trans("mainNavbar.git")} minimal={true}/>
            <Popover2 content={this.renderToolMenu()} position="bottom-left">
              <Button text={this.trans("mainNavbar.tool")} minimal={true}/>
            </Popover2>
            <Popover2 content={this.renderHelpMenu()} position="bottom-left">
              <Button text={this.trans("mainNavbar.help")} minimal={true}/>
            </Popover2>
          </NavbarGroup>
        </Navbar>
        {hotkeyNode}
      </Fragment>
    );
    return node;
  }

}


type Props = {
  reloadDictionary: () => void,
  saveDictionary: () => void,
  changeWordMode: (mode: WordMode) => void,
  changeWordType: (type: WordType) => void,
  shuffleWords: () => void,
  createWord: () => void,
  inheritActiveWord: () => void,
  editActiveWord: () => void,
  deleteActiveWord: () => void,
  toggleActiveWordMarker: (marker: Marker) => void,
  openDictionarySettings: () => void
};
type State = {
};