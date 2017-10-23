import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';
import GeoJSON from 'ol/format/geojson';
import Projection from 'ol/proj/projection';
import download from 'downloadjs';
const { Item } = Form;
const { Option } = Select;
import { formItemLayout, tailFormItemLayout } from '../../utils/layout';

const formats = {
  GeoJSON
};

class ExportTab extends Component {
  handleExport = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const projection = new Projection({ code: values.projection });
        const format = new formats[values.format]({ defaultDataProjection: projection });
        const file = format.writeFeatures(window._source.getFeatures(), {
          featureProjection: projection,
          dataProjection: projection
        });
        download(file, 'features.geojson', 'text/plain');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return <Form>
      <Item {...formItemLayout}
        label="format"
      >
        {getFieldDecorator('format', {
          initialValue: 'GeoJSON',
          rules: [
            { required: true, message: 'Please select a format.' }
          ]
        })(
          <Select>
            <Option value="GeoJSON">GeoJSON</Option>
          </Select>
        )}
      </Item>
      <Item {...formItemLayout}
        label="projection"
      >
        {getFieldDecorator('projection', {
          initialValue: 'EPSG:3857',
          rules: [
            { required: true, message: 'Please select a projection.' }
          ]
        })(
          <Select>
            <Option value="EPSG:3857">EPSG:3857</Option>
            <Option value="EPSG:4326">EPSG:4326</Option>
          </Select>
        )}
      </Item>
      <Item {...tailFormItemLayout}>
        <Button
          type="primary"
          icon="export"
          onClick={this.handleExport}
        >Export</Button>
      </Item>
    </Form>;
  }
}

export default Form.create()(ExportTab);