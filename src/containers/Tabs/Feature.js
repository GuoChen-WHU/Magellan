import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { inject, observer } from 'mobx-react';
const { Item } = Form;
import { formItemLayout, tailFormItemLayout } from '../../utils/layout';
import AddPropertyDialog from '../../components/AddPropertyDialog';

@inject('feature')
@observer class FeatureTab extends Component {
  state = {
    modalVisible: false
  }

  handleRemove = () => {
    if (this.props.feature.uid !== -1) {
      this.props.feature.removeFeature();
      message.success('Feature removed.');
    }
  }

  handleOpenModal = () => {
    this.setState({ modalVisible: true });
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false });
  }

  addProperty = ({ key, value }) => {
    this.props.feature.addProperty({ key, value });
  }

  removeProperty = (key) => {
    this.props.feature.removeProperty(key);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { feature } = this.props;
    const { modalVisible } = this.state;

    return <div>
      <Form>
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
        {feature.properties.map(prop => 
          <Item {...formItemLayout}
            key={prop.key}
            label={prop.key}
          >
            {getFieldDecorator(prop.key, {
              initialValue: prop.value
            })(
              <Input style={{ width: '80%', marginRight: 8 }} readOnly />
            )}
            <Button 
              icon="close" 
              onClick={() => this.removeProperty(prop.key)}
            />
          </Item>
        )}
        <Item {...tailFormItemLayout}>
          <Button
            style={{ display: feature.uid === -1 ? 'none' : 'inline-block' }}
            type="primary"
            icon="plus"
            onClick={this.handleOpenModal}
          >Add custom property</Button>
        </Item>
        <Item {...tailFormItemLayout}>
          <Button 
            style={{ display: feature.uid === -1 ? 'none' : 'inline-block' }}
            type="danger" 
            icon="delete"
            onClick={this.handleRemove}
          >Delete</Button>
        </Item>
      </Form>
      <AddPropertyDialog 
        visible={modalVisible}
        handleCloseModal={this.handleCloseModal}
        addProperty={this.addProperty}
      />
    </div>;
  }
}

export default Form.create()(FeatureTab);