import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Avatar } from "antd";
import { useSelector } from "react-redux";
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

//#region  Imports Local
import {
  Container,
  Content,
  CardContainer,
  ContainerMenu,
  Siderbar,
  Profile,
  Header,
  HideMenu,
} from "./styles";

import Clients from "./Clients";
import Register from "./Clients/Register";
import Edit from "./Clients/Edit";
import Home from "./Home";

import { logout } from "../../services/auth";
//#endregion

const { Footer } = Layout;
const { SubMenu } = Menu;

const Dashboard = ({ match, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state) => state.user);
  //#region Functions
  const breadcrumb = (id) => {
    switch (id) {
      case "clients":
        return (
          <>
            <Breadcrumb.Item>Clientes</Breadcrumb.Item>
            <Breadcrumb.Item>Ver Todos</Breadcrumb.Item>
          </>
        );
      case "register":
        return (
          <>
            <Breadcrumb.Item>Clientes</Breadcrumb.Item>
            <Breadcrumb.Item>Cadastrar</Breadcrumb.Item>
          </>
        );
      case "edit":
        return (
          <>
            <Breadcrumb.Item>Clientes</Breadcrumb.Item>
            <Breadcrumb.Item>Editar</Breadcrumb.Item>
          </>
        );
      default:
        return <Breadcrumb.Item>Inicio</Breadcrumb.Item>;
    }
  };

  const content = (id) => {
    switch (id) {
      case "clients":
        return <Clients {...props} />;
      case "edit":
        return <Edit {...props} />;
      case "register":
        return <Register {...props} />;
      default:
        return <Home {...props} />;
    }
  };
  return (
    <Container>
      <Header className="layout-background" style={{ padding: 0 }}>
        <HideMenu>
          <MenuOutlined onClick={() => setCollapsed(!collapsed)} />
        </HideMenu>
        <Profile>
          <Avatar icon={<UserOutlined />} />
          <div>
            <h1>Bem Vindo</h1>
            <h3>{user.username}</h3>
          </div>
        </Profile>
      </Header>
      <Layout>
        <Siderbar
          collapsed={collapsed}
          breakpoint="md"
          trigger={null}
          collapsedWidth={0}
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
        >
          <ContainerMenu mode="inline" defaultSelectedKeys={["home"]}>
            <Menu.Item
              onClick={() => props.history.push("/dashboard/home")}
              icon={<HomeOutlined />}
            >
              Inicio
            </Menu.Item>
            <SubMenu icon={<UserOutlined />} title="Clientes">
              <Menu.Item
                onClick={() => props.history.push("/dashboard/clients")}
              >
                Ver Todos
              </Menu.Item>
              <Menu.Item
                onClick={() => props.history.push("/dashboard/register")}
              >
                Cadastrar
              </Menu.Item>
              <Menu.Item onClick={() => props.history.push("/dashboard/edit")}>
                Editar
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              onClick={() => {
                logout();
                props.history.push("/");
              }}
              icon={<LogoutOutlined />}
            >
              Sair
            </Menu.Item>
          </ContainerMenu>
        </Siderbar>
        <Layout>
          <Content>
            <Breadcrumb className="margin_right_left">
              {breadcrumb(match.params.id)}
            </Breadcrumb>

            <CardContainer>{content(match.params.id)}</CardContainer>

            <Footer className="text_center">
              Ant Design ©2020 Criado por Cleverson Fernandes
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Container>
  );
};
export default Dashboard;
