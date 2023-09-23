import React, { useState } from "react";

import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import styled, { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const Global = createGlobalStyle`
  .ant-row{
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child{
    padding-left: 0 !important;
  }
  .ant-col:last-child{
    padding-right:0 !important;
  }
`;
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

interface ComponentProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<ComponentProps> = ({ children }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Global />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        items={[
          {
            label: <Link href="/">노드버드</Link>,
            key: "home",
          },
          {
            label: <Link href="/profile">프로필</Link>,
            key: "profile",
          },
          {
            label: <Link href="/signup">회원가입</Link>,
            key: "signup",
          },
        ]}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.notion.so/FrontEnd-Developer-afff2d12dcc14481ae67ac2d0a7c7922"
            target="_blank"
            rel="noreferrer noopener"
          >
            포토폴리오 사이트
          </a>
        </Col>
      </Row>
    </div>
  );
};
export default AppLayout;
