import React, { useState, useEffect } from "react";
import { Select, Input, Radio, Button, List, Avatar, Modal, Form } from "antd";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const token = localStorage.getItem("avy-shine-token");

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Index = () => {
  const [spec, setSpec] = useState("Gây mê - điều trị đau");
  const [day, setDay] = useState("8");

  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    phone: "",
  });

  const [listDoctor, setListDoctor] = useState();
  const [currentId, setCurrentId] = useState();
  const [detailDoctor, setDetailDoctor] = useState({
    name: "",
    phone: "",
    speciality: "",
    schedule: "",
    idCard: "",
    insurance: "",
    avatar: "",
    address: "",
    hospital: "",
    email: "",
    age: "",
    gender: "",
    facebook: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChooseDoctor = async (id) => {
    setCurrentId(id);
    try {
      const res = await axios.get(`http://localhost:5555/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.user);
      setDetailDoctor(res.data.user);
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(true);
  };

  const handleFilterDoctor = async () => {
    console.log(spec);
    try {
      const res = await axios.get(
        `http://localhost:5555/users/query?speciality=${spec}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.user);
      setListDoctor(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (value) => {
    setSpec(value);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const onSearch = (val) => {
    console.log("search:", val);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <div
        style={{
          padding: "15px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="https://is.vnecdn.net/v101/31/65/11/4116531/assets/images/logo/logo-31.png"
          alt="picktur"
          style={{ width: "40px" }}
        ></img>
        <h2 style={{ color: "rgb(115 113 113)", marginLeft: "10px" }}>
          AVY SHINE
        </h2>
      </div>

      <h2
        style={{ textAlign: "center", marginTop: "15px", marginBottom: "15px" }}
      >
        THÔNG TIN LỊCH ĐẶT
      </h2>

      <div
        style={{
          padding: "15px",
          backgroundColor: "white",
        }}
      >
        <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
          1. CHỌN NHU CẦU KHÁM BỆNH
        </h3>

        <div>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Chọn 1 chuyên môn"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Gây mê điều trị đau">Gây mê điều trị đau</Option>
            <Option value="Nội cơ xương khớp">Nội cơ xương khớp</Option>
            <Option value="Răng Hàm Mặt">Răng Hàm Mặt</Option>
            <Option value="Da liễu">Da liễu</Option>
            <Option value="Y học cổ truyền">Y học cổ truyền</Option>
            <Option value="Phục hồi chức năng">Phục hồi chức năng</Option>
            <Option value="Hoạt động trị liệu">Hoạt động trị liệu</Option>
            <Option value="Phẫu thuật thẩm mỹ">Phẫu thuật thẩm mỹ</Option>
            <Option value="Thẩm mỹ">Thẩm mỹ</Option>
          </Select>
        </div>
        <p
          style={{ color: "#f46969", marginTop: "20px", marginBottom: "20px" }}
        >
          Quý khách vui lòng chọn 1 nhu cầu khám bệnh, chúng tôi sẽ chọn lọc
          những bác sĩ giỏi về lĩnh vực này
        </p>
        <p
          style={{ color: "#172d42", marginTop: "20px", marginBottom: "20px" }}
        >
          Quý khách đi cùng người, có thể nhắn nhủ dưới đây để phòng khám tiện
          sắp xếp chỗ ngồi.
        </p>

        <TextArea rows={4} placeholder="VD: Anh đi cùng con trai/ 2 người..." />
      </div>

      <div
        style={{
          marginTop: "15px",
          padding: "15px",
          backgroundColor: "white",
        }}
      >
        <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
          2. CHỌN THỜI GIAN
        </h3>

        <div>
          <Radio.Group value={day} onChange={handleDayChange}>
            <Radio.Button value="2">Thứ 2</Radio.Button>
            <Radio.Button value="3">Thứ 3</Radio.Button>
            <Radio.Button value="4">Thứ 4</Radio.Button>
            <Radio.Button value="5">Thứ 5</Radio.Button>
            <Radio.Button value="6">Thứ 6</Radio.Button>
            <Radio.Button value="7">Thứ 7</Radio.Button>
            <Radio.Button value="8">Chủ nhật</Radio.Button>
          </Radio.Group>
        </div>

        <p
          style={{ color: "#f46969", marginTop: "20px", marginBottom: "20px" }}
        >
          Quý khách vui lòng chọn 1 ngày trong tuần hiện tại để đến khám bệnh.
          (Lưu ý, nếu bạn muốn khám vào tuần sau xin đặt lịch vào thứ 2 tuần
          sau, nếu bạn chọn thứ trước ngày hiện tại thì đơn khám sẽ vô hiệu lực)
        </p>

        <p
          style={{ color: "#172d42", marginTop: "20px", marginBottom: "20px" }}
        >
          Sau khi bấm nút Xác nhận, hệ thống sẽ lọc ra những bác sĩ đúng chuyên
          môn và có lịch rãnh vào ngày của bạn.
        </p>

        <Button
          style={{ width: "100%" }}
          type="primary"
          onClick={handleFilterDoctor}
        >
          Xác nhận
        </Button>
      </div>

      <div
        style={{
          marginTop: "15px",
          padding: "15px",
          backgroundColor: "white",
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={listDoctor}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                onClick={() => handleChooseDoctor(item._id)}
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<p>{item.name}</p>}
                description={`Chuyên môn của bác sĩ:  ${item.speciality}`}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        title="Thông tin chi tiết bác sĩ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Họ tên:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.name}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>SĐT:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.phone}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Chuyên môn:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.speciality}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Lịch làm việc trong tuần:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              Thứ {detailDoctor.schedule}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Số CMT:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.idCard}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Số thẻ BHYT:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.insurance}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Địa chỉ:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.address}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Bệnh viện:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.hispital}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Email:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.email}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Tuổi:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.age}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Giới tính:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailDoctor.gender}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Facebook:</p>
          </div>
        </div>

        <h3 style={{ marginTop: "20px", marginBottom: "15px" }}>
          Đặt lịch khám bệnh
        </h3>

        <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Thời gian khám dự kiến" name="time">
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Index;
