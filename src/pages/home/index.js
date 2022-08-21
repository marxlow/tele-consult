import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin, Typography, Row, Col, Card, Space, Button } from "antd";
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
      <Button
        loading={creationLoading}
        onClick={() => mutate({ name: "Marx", title: "GP" })}
      >
        Create doctor
      </Button>
      <Typography.Title level={3}>Doctors</Typography.Title>

      <Row gutter={[8, 8]}>
        {doctors.map(({ title, name, id }) => (
          <Col span={8} key={id}>
            <Card>
              <Space direction="vertical">
                <Typography.Text strong>{name}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
