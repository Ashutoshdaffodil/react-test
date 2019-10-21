import data from "emoji-mart/data/all.json";
export const emojiSetDef = {
  spriteUrl: "https://getstream.imgix.net/images/emoji-sprite.png",
  size: 20,
  sheetColumns: 2,
  sheetRows: 3,
  sheetSize: 64
};
const d = Object.assign({}, data);
export const commonEmoji = {
  emoticons: [],
  short_names: [],
  custom: true
};
export const emojiData = data;
export const defaultMinimalEmojis = [
  {
    id: "love",
    name: "love",
    colons: ":heart:",
    sheet_x: 1,
    sheet_y: 2,
    ...commonEmoji,
    ...emojiSetDef
  },
  {
    id: "like",
    name: "like",
    colons: ":+1:",
    sheet_x: 0,
    sheet_y: 0,
    ...commonEmoji,
    ...emojiSetDef
  },
  {
    id: "haha",
    name: "haha",
    colons: ":joy:",
    sheet_x: 1,
    sheet_y: 0,
    ...commonEmoji,
    ...emojiSetDef
  },
  {
    id: "wow",
    name: "wow",
    colons: ":astonished:",
    sheet_x: 0,
    sheet_y: 2,
    ...commonEmoji,
    ...emojiSetDef
  },
  {
    id: "sad",
    name: "sad",
    colons: ":pensive:",
    sheet_x: 0,
    sheet_y: 1,
    ...commonEmoji,
    ...emojiSetDef
  },
  {
    id: "angry",
    name: "angry",
    colons: ":angry:",
    sheet_x: 1,
    sheet_y: 1,
    ...commonEmoji,
    ...emojiSetDef
  }
];
