import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { inject, observer } from 'mobx-react';
const { Item } = Form;
import { formItemLayout, tailFormItemLayout } from './shared';
import { getFeatureByUid } from '../../utils'

@inject('feature')
@observer class FeatureTab extends Component {
  handleRemove = e => {
    const { uid } = this.props.feature;
    if (uid !== -1) {
      const feature = getFeatureByUid(window._source, uid);
      window._source.removeFeature(feature);
      this.props.feature.deselectFeature();
      message.success('Feature removed.');
    }
  }

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
      <Item {...tailFormItemLayout}>
        <Button 
          style={{ display: feature.uid === -1 ? 'none' : 'inline-block' }}
          type="danger" 
          icon="delete"
          onClick={this.handleRemove}
        >Delete</Button>
      </Item>
    </Form>;
  }
}

export default Form.create()(FeatureTab);