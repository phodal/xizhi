const Segmentit = require('segmentit');

function countWord(content: string) {
  let segment = new Segmentit.Segment();
  const segmentit = Segmentit.useDefault(segment);
  const result = segmentit.doSegment(content);
  console.log(result);
}
const EditorHelper = {
  countWord: countWord
};
export default EditorHelper;
