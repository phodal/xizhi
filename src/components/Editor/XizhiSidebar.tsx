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

  getSplitWords(editorState: EditorState) {
    return EditorHelper.countWord(editorState.getCurrentContent().getPlainText());
  }

  render() {
    const editorState: EditorState = this.props.editorState;
    let plainText = editorState.getCurrentContent().getPlainText('');

    let splitWords = this.getSplitWords(editorState);
    let splitSentences = EditorHelper.getSentences(plainText);
    // let splitWords = 'null';
    let wordCount = EditorHelper.getWordCount(plainText);
    let strokesNumber = EditorHelper.calculateStroke(plainText);
    let level = EditorHelper.calculateLevel(strokesNumber, splitWords.length, splitSentences.length);

    return (
      <div className="xizhi-sidebar">
        <span>复杂度：{level}</span>
        <div className="stats">
          <p className="counts">
            阅读时间：{this.getReadingTime(editorState)};
          </p>
          <p className="counts">
            字数：{wordCount};
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
