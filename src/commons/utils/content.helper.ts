import Draft from "draft-js";
import * as immutable from "immutable";

function contentBlock(str: string) {
  var splitContent = str.split("\n");
  return splitContent.map(function (text: string, index: number) {
    return new Draft.ContentBlock({
      key: ContentHelper.generateKey(),
      text: text,
      type: 0 === index ? "header-two" : "unstyled",
      characterList: immutable.List(immutable.Repeat(Draft.CharacterMetadata.create(), text.length))
    })
  })
}

const ContentHelper = {
  contentBlock,
  generateKey: function () {
    return Math.floor(Math.random() * Math.pow(2, 24)).toString(32);
  }
};

export default ContentHelper;
