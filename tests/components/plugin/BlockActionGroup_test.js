/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import icons from "../../../src/icons";

import BlockActionGroup from "../../../src/components/plugin/BlockActionGroup";
import BlockAction from "../../../src/components/plugin/BlockAction";

let expect = chai.expect;


describe("BlockActionGroup Component", function() {

  beforeEach(function() {
    this.crop = sinon.spy();
    this.edit = sinon.spy();
    this.delete = sinon.spy();

    const actionsItems = [
      {"key": "crop", "icon": icons.CropIcon, "action": this.crop},
      {"key": "edit", "icon": icons.EditIcon, "action": this.edit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.delete}
    ];

    this.component = TestUtils.renderIntoDocument(
      <BlockActionGroup items={actionsItems} />
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(
      ReactDOM.findDOMNode(this.component).parentNode
    );
  });

  it("renders without problems", function() {
    expect(this.component).to.exist;
  });

  it("renders actions items", function() {
    const items = TestUtils.scryRenderedComponentsWithType(
      this.component, BlockAction
    );

    expect(items).to.have.length(3);
  });
});
