import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
const { Content, Sider } = Layout;
const { TabPane } = Tabs;
import './App.less';

import Map from './Map';
import Toolbar from './Toolbar';
import MapTab from './Tabs/Map';
import FeatureTab from './Tabs/Feature';

class App extends Component {
  render() {
    return (
      <Layout className="app">
        <Content className="app-content">
          <Map />
          <Toolbar />
        </Content>
        <Sider className="app-sider" width={400}>
          <Tabs type="card">
            <TabPane tab="Map" key="map">
              <MapTab />
            </TabPane>
            <TabPane tab="Feature" key="feature">
              <FeatureTab />
            </TabPane>
            <TabPane tab="Export" key="export">
              
            </TabPane>
          </Tabs>
        </Sider>
      </Layout>
    );
  }
}

export default App;
