import React from "react";
import {EditorState} from "draft-js";

import './XizhiSidebar.css';
import EditorHelper from "../../commons/utils/editor.helper";

export class XizhiSidebar extends React.Component<any, any> {
  getLineCount(editorState: EditorState) {
    const blockArray = editorState.getCurrentContent().getBlocksAsArray();
    return blockArray ? blockArray.length : null;
  }

  getReadingTime(editorState: EditorState) {
    let str = editorState.getCurrentContent().getPlainText('');
    return `~${Math.round(str.length / 400)} 分钟`; // 400/minute
  }

  getWordCount(editorState: EditorState) {
    // https://blog.csdn.net/gavid0124/article/details/38117381
    let str = editorState.getCurrentContent().getPlainText('');
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
      return '';
    }
    return sLen;
  }

  getSplitWords(editorState: EditorState) {
    return EditorHelper.countWord(editorState.getCurrentContent().getPlainText());
  }

  render() {
    const editorState: EditorState = this.props.editorState;

    let splitWords = this.getSplitWords(editorState);
    let splitSentences = EditorHelper.getSentences(editorState.getCurrentContent().getPlainText());
    // let splitWords = 'null';

    return (
      <div className="xizhi-sidebar">
        <span>Toolbar</span>
        <div className="stats">
          <p className="counts">
            阅读时间：{this.getReadingTime(editorState)};
          </p>
          <p className="counts">
            字数：{this.getWordCount(editorState)};
          </p>
          <p className="words-counts">
            字/词语数：{splitWords.length};
          </p>
          <p className="counts">
            行数：{this.getLineCount(editorState)};
          </p>
          <p className="sentence-counts">
            句子数：{splitSentences.length};
          </p>
        </div>
      </div>
    );
  }
}
