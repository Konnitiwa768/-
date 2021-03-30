//


export class Markers extends Map<string, Array<Marker>> implements Map<string, Array<Marker>> {

  public constructor(...args: any) {
    super(...args);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public static fromPlain(plain: Map<string, Array<Marker>>): Markers {
    let markers = new Markers(plain.entries());
    return markers;
  }

  public static fromString(string: string): Markers {
    let lines = string.trim().split(/\r\n|\r|\n/);
    let rawMarkers = new Map<string, Array<Marker>>();
    for (let line of lines) {
      if (line.trim() !== "" || line.trim() === "!MARKER") {
        let match = line.match(/^\-\s*(?:\{(.*?)\}|(.*?))\s*:\s*(.*?)\s*$/);
        if (match) {
          let name = match[1] ?? match[2];
          let wordMarkers = match[3].split(/\s*,\s*/).map((value) => {
            let wordMarker = MarkerUtil.cast(value);
            if (wordMarker !== undefined) {
              return wordMarker;
            } else {
              throw new Error("parse failed");
            }
          });
          if (wordMarkers.length > 0) {
            rawMarkers.set(name, wordMarkers);
          }
        } else {
          throw new Error("parse failed");
        }
      }
    }
    let markers = new Markers(rawMarkers.entries());
    return markers;
  }

  public toString(): string {
    let string = "";
    string += "!MARKER\n";
    for (let [name, wordMarkers] of this.entries()) {
      string += `- {${name}}: ${wordMarkers.join(", ")}\n`;
    }
    return string;
  }

  public get(name: string): Array<Marker> {
    let markers = super.get(name) ?? [];
    return markers;
  }

  public toggle(name: string, marker: Marker): void {
    let markers = [...this.get(name)];
    let index = markers.findIndex((existingMarker) => existingMarker === marker);
    if (index >= 0) {
      markers.splice(index, 1);
    } else {
      markers.push(marker);
    }
    if (markers.length > 0) {
      MarkerUtil.sort(markers);
      super.set(name, markers);
    } else {
      super.delete(name);
    }
  }

}


export class MarkerUtil {

  public static cast(value: string | number | null | undefined): Marker | undefined {
    if (typeof value === "string") {
      let anyValue = value as any;
      let index = MARKERS.indexOf(anyValue);
      if (index >= 0) {
        return MARKERS[index];
      } else {
        return undefined;
      }
    } else if (typeof value === "number") {
      if (value >= 0 && value < MARKERS.length) {
        return MARKERS[value];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  public static sort(markers: Array<Marker>): Array<Marker> {
    return markers.sort((firstMarker, secondMarker) => this.getIndex(firstMarker) - this.getIndex(secondMarker));
  }

  public static getIndex(marker: Marker): number {
    return MARKERS.indexOf(marker);
  }

}


export const MARKERS = ["circle", "square", "up", "diamond", "down", "cross", "pentagon", "heart"] as const;
export type Marker = (typeof MARKERS)[number];