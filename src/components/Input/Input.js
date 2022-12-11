import React, { Component } from "react";
import { connect } from "react-redux";
import SwitchLanguage from "../../SwitchLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

import "./Input.scss";

class Input extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      isShowPlhd: true,
      isFucus: false,
    };
  }

  // Change input
  handleChange = (value, name) => {
    let { change } = this.props;
    change(value, name);

    if (value.length > 0) {
      this.setState({
        isShowPlhd: false,
      });
    }

    if (value.length == 0) {
      this.setState({
        isShowPlhd: true,
      });
    }
  };

  // Click focus
  handleClickInput = () => {
    const node = this.input.current;
    node.focus();
  };

  render() {
    let { isShowPlhd, isFucus } = this.state;
    let {
      language,
      className,
      label,
      placeholder,
      fucus,
      blur,
      change,
      name,
      type,
      value,
    } = this.props;

    return (
      <div className={`glb-hug-input ${className}`}>
        <label className="glb-label-input">
          <SwitchLanguage id={label} />
        </label>

        <div
          className="glb-border-input"
          onClick={() => this.handleClickInput()}
        >
          <input
            className="glb-input"
            type={type}
            name={name}
            ref={this.input}
            autoComplete="off"
            onChange={(e) => this.handleChange(e.target.value, name)}
            value={value}
          />
          {isShowPlhd || value == "" ? (
            <span className="glb-placeholder-input">
              <SwitchLanguage id={placeholder} />
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    dataUser: state.app.loginUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
