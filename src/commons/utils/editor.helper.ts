const Segmentit = require('segmentit');
const cnchar = require('cnchar');

let count = false;

function countWord(content: string) {
  if (count) {
    return;
  }
  count = true;

  let segment = new Segmentit.Segment();
  const segmentit = Segmentit.useDefault(segment);
  const result = segmentit.doSegment(removeSpecialChar(content));
  count = false;
  return result;
}

function removeSpecialChar(content: string) {
  // 匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
  var chineseSpecialChar = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;
  var othersSpecialChar = /\//g;
  return content.replace(chineseSpecialChar, '')
    .replace(othersSpecialChar, '');
}

function getSentences(content: string) {
  let sentences = content
    .split("。")
    .filter(s => s.length > 0)
    .map(s => s + "。");
  return sentences;
}

function getWordCount(str: string) {
  // https://blog.csdn.net/gavid0124/article/details/38117381
  let sLen = 0;
  try {
    //先将回车换行符做特殊处理
    str = str.replace(/(\r\n+|\s+|　+)/g, "龘");
    //处理英文字符数字，连续字母、数字、英文符号视为一个单词
    // eslint-disable-next-line no-control-regex
    str = str.replace(/[\x00-\xff]/g, "m");
    //合并字符m，连续字母、数字、英文符号视为一个单词
    str = str.replace(/m+/g, "*");
    //去掉回车换行符
    str = str.replace(/龘+/g, "");
    //返回字数
    sLen = str.length;
  } catch (e) {
    return 0;
  }
  return sLen;
}

function calculateLevel(letters: number, words: number, sentences: number) {
  if (letters === 0 || words === 0 || sentences === 0) {
    return 0;
  }
  // 中文，来源：https://patents.google.com/patent/CN105630940A/zh
  // 文本可读性=MX (NX中文平均笔画数+(1-N) X中文难词频度) + (1-Μ) X (PX英文平 均字符数+(1-P) X英文难词频度）
  //
  // https://www.webfx.com/tools/read-able/automated-readability-index.html
  let level = Math.round(
    4.71 * (letters / words) + 0.5 * words / sentences - 21.43
  );
  return level <= 0 ? 0 : level;
}

function calculateStroke(letters: string) {
  return cnchar.stroke(letters);
}

const EditorHelper = {
  countWord: countWord,
  getWordCount: getWordCount,
  getSentences: getSentences,
  calculateStroke: calculateStroke,
  calculateLevel: calculateLevel
};
export default EditorHelper;
