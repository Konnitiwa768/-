//

import {
  Part
} from "./part";


export class ParsedWord<S> {

  public readonly name: string;
  public readonly uniqueName: string;
  public readonly date: number;
  public readonly parts: Readonly<Parts<S>>;

  public constructor(name: string, uniqueName: string, date: number, parts: Readonly<Parts<S>>) {
    this.name = name;
    this.uniqueName = uniqueName;
    this.date = date;
    this.parts = parts;
  }

}


export type Parts<S> = {[language: string]: Part<S> | undefined};