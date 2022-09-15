import { v4 } from "uuid";
import {
  AnimationType,
  Content,
  Item,
  Position,
  SetData,
  ReqStartDirection,
} from "./type";

class Reaction {
  private size: number = 1;
  private emojiArray: Array<Item> = [];
  private uiOption: {
    position: Position;
    startDirection: ReqStartDirection;
    animationType: AnimationType;
    leftPadding: number;
    rightPadding: number;
    animationMinRange: number;
    animationMaxRange: number;
  } = {
    position: "full",
    startDirection: "mix",
    animationType: "scale",
    leftPadding: 10, // unit - %
    rightPadding: 10, // unit - %
    animationMinRange: 60, // unit - px
    animationMaxRange: 86, // unit - px
  };

  constructor(
    props: SetData & { position?: Position; animationType?: AnimationType }
  ) {
    this.size = props.size || this.size;
    this.uiOption.position = props.position || this.uiOption.position;
    this.uiOption.startDirection =
      props.startDirection || this.uiOption.startDirection;
    this.uiOption.animationType =
      props.animationType || this.uiOption.animationType;
  }

  public getEmoji() {
    return this.emojiArray;
  }

  public setType(type: AnimationType) {
    this.uiOption.animationType = type;
  }

  public addEmoji(data: Content) {
    const newArray = this.fillArray(data, this.size).map((item) => {
      const bottom = this.minMaxCalculator(0, 30);
      return {
        ...item,
        id: v4(),
        time: 1.5,
        height: this.minMaxCalculator(40 - bottom, 60 - bottom), // this.minMaxCalculator(40 - this.minMaxCalculator(0, 30), 60 - this.minMaxCalculator(0, 30)),
        width: this.minMaxCalculator(36, 68),
        bottom: bottom,
        startDirection: this.startDirectionCalculator(
          this.uiOption.startDirection
        ),
        delay: this.minMaxCalculator(100, 1000),
        ...this.drawPosition(this.uiOption.position),
      };
    }) as Item[];

    this.emojiArray = this.emojiArray.concat(newArray);
    return newArray;
  }

  private fillArray(data: SetData, len: number) {
    if (len == 0) return [];

    let arr = [data];

    while (arr.length * 2 <= len) arr = arr.concat(arr);

    if (arr.length < len) arr = arr.concat(arr.slice(0, len - arr.length));

    return arr;
  }

  private startDirectionCalculator(type: ReqStartDirection) {
    const range = this.minMaxCalculator(
      this.uiOption.animationMaxRange,
      this.uiOption.animationMaxRange
    );
    switch (type) {
      case "left":
        return `-${range}px`;

      case "right":
        return `+${range}px`;

      default:
        return [`-${range}px`, `+${range}px`][
          Math.round(Math.random() * (1 - 0))
        ];
    }
  }

  private minMaxCalculator(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private drawPosition(type: Position) {
    const renderPosition = {
      left: {
        position: {
          left: `${this.minMaxCalculator(this.uiOption.leftPadding, 40)}%`,
        },
      },
      right: {
        position: {
          right: `${this.minMaxCalculator(
            60,
            100 - this.uiOption.rightPadding
          )}%`,
        },
      },
      full: {
        position: {
          left: `${this.minMaxCalculator(10, 90)}%`,
        },
      },
    };

    return renderPosition[type];
  }

  public removeEmoji() {
    if (this.getEmoji().length !== 0) {
      this.emojiArray.shift();
    }
    return this.emojiArray;
  }

  public reset() {
    this.emojiArray = [];
    return this.emojiArray;
  }
}

export default new Reaction({ size: 8, startDirection: "mix" });
