import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Index = () => {
  let history = useHistory();
  const onFinish = async (values) => {
    console.log(values);

    try {
      const res = await axios.post("http://localhost:5555/users/login", values);
      console.log(res.data);
      message.success("Đăng nhập thành công");
      localStorage.setItem("avy-shine-token", res.data.token);
      history.push("/booking");
    } catch (error) {
      console.log(error);
      message.error("Đăng nhập thất bại");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("avy-shine-token")) {
      history.push("/booking");
    }
  }, []);

  const comeBack = () => {
    history.push("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      style={{
        padding: "30px",
        height: "100vh",
        margin: "auto",

        backgroundImage:
          "url(" +
          "https://img4.thuthuatphanmem.vn/uploads/2020/04/11/anh-nen-3d-cho-zalo_090719803.jpg" +
          ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h3 style={{ textAlign: "center", color: "white" }}>Đăng nhập</h3>
      <div style={{ marginTop: "100px" }}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Số điện thoại"
            name="phone"
            initialValue="0285455324"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập SĐT!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            initialValue="123456"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <Button style={{ marginLeft: "30px" }} onClick={comeBack}>
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Index;
