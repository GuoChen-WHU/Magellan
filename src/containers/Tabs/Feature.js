import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
const { Item } = Form;
import { formItemLayout } from './shared';

@inject('feature')
@observer class FeatureTab extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { feature } = this.props;

    return <Form>
      <Item {...formItemLayout}
        label="type"
      >
        {getFieldDecorator('type', {
          initialValue: feature.type
        })(
          <Input readOnly />
        )}
      </Item>
      {feature.attributes.map(attr => 
        <Item {...formItemLayout}
          key={attr.key}
          label={attr.key}
        >
          {getFieldDecorator(attr.key, {
            initialValue: attr.value
          })(
            <Input readOnly />
          )}
        </Item>
      )}
    </Form>;
  }
}

export default Form.create()(FeatureTab);