/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AtomicBlockUtils
 * @typechecks
 * @flow
 */

'use strict';

// const BlockMapBuilder = require('BlockMapBuilder');
// const CharacterMetadata = require('CharacterMetadata');
// const DraftModifier = require('DraftModifier');
const Immutable = require('immutable');

import {genKey, EditorState, ContentBlock, Modifier, CharacterMetadata, BlockMapBuilder} from "draft-js";

const {
  List,
  Repeat,
  Map
} = Immutable;

const AtomicBlockUtils = {
  insertAtomicBlock: function(
    editorState: EditorState,
    data: object
  ): EditorState {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const afterRemoval = Modifier.removeRange(
      contentState,
      selectionState,
      'backward'
    );

    const targetSelection = afterRemoval.getSelectionAfter();
    const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
    const insertionTarget = afterSplit.getSelectionAfter();

    const asAtomicBlock = Modifier.setBlockType(
      afterSplit,
      insertionTarget,
      'atomic'
    );

    // console.log(asAtomicBlock);

    console.log(data)

    data.type = "image"

    const block = new ContentBlock({
        key: genKey(),
        type: 'atomic',
        text: '',
        characterList: List(),
        data: new Map(data),
      })


    const fragmentArray = [
      block,
      new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: '',
        characterList: List(),
      }),
    ];

    // console.log(fragmentArray);

    console.log(block.getData().toObject());

    const fragment = BlockMapBuilder.createFromArray(fragmentArray);

    console.log(fragment.toJS());

    const withAtomicBlock = Modifier.replaceWithFragment(
      asAtomicBlock,
      insertionTarget,
      fragment
    );

    console.log(withAtomicBlock.toJS());

    const newContent = withAtomicBlock.merge({
      selectionBefore: selectionState,
      selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true),
    });

    return EditorState.push(editorState, newContent, 'insert-fragment');
  },
};

module.exports = AtomicBlockUtils;
