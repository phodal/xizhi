const Segmentit = require('segmentit');

function countWord(content: string) {
  let segment = new Segmentit.Segment();
  const segmentit = Segmentit.useDefault(segment);
  console.log(removeSpecialChar(content));
  const result = segmentit.doSegment(removeSpecialChar(content));
  console.log(result);
}

function removeSpecialChar(content: string) {
  // 匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
  var chineseSpecialChar = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
  var othersSpecialChar = /\//g;
  return content.replace(chineseSpecialChar, '')
    .replace(othersSpecialChar, '');
}

const EditorHelper = {
  countWord: countWord
};
export default EditorHelper;
