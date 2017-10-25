import React, { Component } from 'react';
import { Radio, Icon } from 'antd';
import { inject } from 'mobx-react';
import './Toolbar.less';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import context from '../context';

const toolConfigs = require.context('../tools', true, /\.js$/);
const tools = toolConfigs
  .keys()
  .map(key => toolConfigs(key))
  .sort((a, b) => a.index > b.index);

@inject('feature')
class Toolbar extends Component {
  state = {
    currentTool: ''
  }

  onSwitchTool = (e) => {
    const { currentTool } = this.state;
    const { feature } = this.props;

    currentTool && tools.find(tool => tool.name === currentTool).onDeselect(context)();
    tools.find(tool => tool.name === e.target.value)
      .onSelect(context)();
    this.setState({ currentTool: e.target.value });
  }

  render() {
    const { currentTool } = this.state;

    return <RadioGroup 
      className="toolbar"
      onChange={this.onSwitchTool} 
      value={currentTool}
    >
      {tools.map(({ name, icon }) =>
        <RadioButton key={name} value={name}>
          <Icon type={icon} /> {name}
        </RadioButton>
      )}
    </RadioGroup>;
  }
}

export default Toolbar;
