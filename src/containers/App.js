import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
const { Content, Sider } = Layout;
const { TabPane } = Tabs;
import './App.less';

class App extends Component {
  render() {
    return (
      <Layout className="app">
        <Content className="app-content">
          map
        </Content>
        <Sider className="app-sider" width={400}>
          <Tabs type="card">
            <TabPane tab="Map" key="map">

            </TabPane>
            <TabPane tab="Feature" key="feature">
              
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
