import React, { Component } from 'react';
import { Radio } from 'antd';
import { inject } from 'mobx-react';
import './Toolbar.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import context from '../context';

const tools = require.context('../tools', true, /\.js$/);

@inject('feature')
class Toolbar extends Component {
  state = {
    currentTool: ''
  }

  onSwitchTool = (e) => {
    const { currentTool } = this.state;
    const { feature } = this.props;

    currentTool && tools(currentTool).onDeselect(context)();
    tools(e.target.value).onSelect(context)();
    this.setState({ currentTool: e.target.value });
  }

  render() {
    const { currentTool } = this.state;

    return <RadioGroup 
      className="toolbar"
      onChange={this.onSwitchTool} 
      value={currentTool}
    >
      {tools.keys().map(key =>
        <RadioButton key={key} value={key}>{tools(key).name}</RadioButton>
      )}
    </RadioGroup>;
  }
}

export default Toolbar;
