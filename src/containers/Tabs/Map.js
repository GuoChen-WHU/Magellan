import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { inject, observer } from 'mobx-react';
const { Item } = Form;
import { formItemLayout } from '../../utils/layout';

@inject('map')
@observer class MapTab extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { map } = this.props;

    return <Form>
      <Item {...formItemLayout}
        label="source"
      >
        {getFieldDecorator('source', {
          initialValue: map.source
        })(
          <Input readOnly />
        )}
      </Item>
      <Item {...formItemLayout}
        label="zoom"
      >
        {getFieldDecorator('zoom', {
          initialValue: map.zoom
        })(
          <Input readOnly />
        )}
      </Item>
      <Item {...formItemLayout}
        label="center"
      >
        {getFieldDecorator('center', {
          initialValue: map.center.join(', ')
        })(
          <Input readOnly />
        )}
      </Item>
    </Form>;
  }
}

export default Form.create()(MapTab);