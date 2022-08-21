import { Layout, Menu } from "antd";
import React from "react";
import Home from "./pages/home";

const { Header, Content } = Layout;

const menuItems = [
  {
    key: "home",
    label: "Home",
  },
  {
    key: "appointments",
    label: "Appointment",
  },
];

const App = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          backgroundColor: "white",
          boxShadow: "0 20px 20px -20px rgb(0 0 0 / 15%)",
        }}
      >
        <Menu theme="light" mode="horizontal" items={menuItems} />
      </Header>
      <Content style={{ padding: 50 }}>
        <Home />
      </Content>
    </Layout>
  );
};

export default App;
