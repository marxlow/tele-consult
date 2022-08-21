import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin, Typography, Row, Col, Card, Space, Button, Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import React from "react";
import axios from "axios";

const getDoctors = async () => {
  const { data } = await axios.get("http://localhost:8000/doctors");
  return data;
};

const createDoctor = async ({ name, title }) => {
  const { data } = await axios.post("http://localhost:8000/doctors", {
    name,
    title,
  });
  return data;
};

const Home = () => {
  const queryClient = useQueryClient();
  //   Queries
  const {
    isLoading,
    data: doctors,
    isError,
    error,
  } = useQuery(["doctors"], getDoctors);

  const { isLoading: creationLoading, mutate } = useMutation(createDoctor, {
    onSuccess: (newDoctor) => {
      queryClient.setQueryData(["doctors"], [...doctors, newDoctor]);
    },
  });

  if (isLoading) {
    return <Spin>Loading</Spin>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  //   Mutations
  return (
    <div>
      <section style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Title level={3}>Doctors</Typography.Title>

          {/* Search */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Row
              wrap={false}
              style={{
                width: "fit-content",
                boxShadow:
                  "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
                borderRadius: 40,
                backgroundColor: "white",
                padding: "8px 24px",
              }}
              align="middle"
              justify="space-around"
            >
              <Col>
                <Typography.Title style={{ marginBottom: 0 }} level={5}>
                  Anywhere
                </Typography.Title>
              </Col>
              <Col>
                <Divider type="vertical" />
              </Col>
              <Col>
                <Typography.Title style={{ marginBottom: 0 }} level={5}>
                  Any day
                </Typography.Title>
              </Col>
              <Col>
                <Divider type="vertical" />
              </Col>
              <Col>
                <Button
                  icon={<SearchOutlined style={{ color: "white" }} />}
                  shape="circle"
                  style={{ backgroundColor: "#ff385c" }}
                />
              </Col>
            </Row>
          </div>
        </Space>
      </section>

      <section style={{ marginBottom: 24 }}>
        <Row gutter={[8, 8]}>
          {doctors.map(({ title, name, id }) => (
            <Col span={8} key={id}>
              <Card
                bodyStyle={{ padding: 0 }}
                cover={
                  <div
                    style={{
                      backgroundColor: "#b2b2b2",
                      height: 8,
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                    }}
                  />
                }
                style={{
                  boxShadow: "0 1px 6px 0 rgb(0 0 0 / 10%)",
                  borderRadius: 6,
                }}
              >
                <Space direction="vertical" size={0} style={{ padding: 16 }}>
                  <Typography.Title
                    strong
                    level={5}
                    style={{ marginBottom: 0 }}
                  >
                    {name}
                  </Typography.Title>
                  <div style={{ marginBottom: 12 }}>
                    <Typography.Text type="secondary">{title}</Typography.Text>
                  </div>

                  <Typography.Link>View booking link</Typography.Link>
                </Space>

                <Divider style={{ margin: 0 }} />

                <Row justify="space-between" style={{ padding: 16 }}>
                  <Col>
                    <Typography.Link>Copy link</Typography.Link>
                  </Col>
                  <Col>
                    <Button>Share</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section style={{ marginBottom: 24 }}>
        <Button
          loading={creationLoading}
          onClick={() => mutate({ name: "Marx", title: "GP" })}
        >
          Create mock doctor
        </Button>
      </section>
    </div>
  );
};

export default Home;
