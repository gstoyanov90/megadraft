/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import classNames from "classnames";

import icons from "../../icons";


export default class BlockInput extends Component {
  renderError(error) {
    if (!error) {
      return;
    }
    return (
      <div className="block__input__error-text">{error}</div>
    );
  }

  render(){
    const {value, error, ...props} = this.props;

    const styles = this.props.styles || {};

    let className = classNames({
      "block__input": true,
      "block__input--empty": !value,
      "block__input--error": error,
      [`block__input--${styles.padding}-padding`]: styles.padding,
      [`block__input--${styles.text}-text`]: styles.text
    });

    return (
      <div className="block__input__row">
        <div className="block__input__wrapper">
          <input {...props} defaultValue={value} type="text" className={className} />
          <icons.EditIcon className="block__input__icon" />
        </div>
        {this.renderError(error)}
      </div>
    );
  }
}
