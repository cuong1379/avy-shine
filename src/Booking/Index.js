import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  DatePicker,
  Button,
  List,
  Avatar,
  Modal,
  Form,
  message,
} from "antd";
import axios from "axios";
import Nav3 from "../Home/Nav3";

import { Nav30DataSource } from "../Home/data.source";
import "../Home/less/antMotionStyle.less";

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
  const [date, setDate] = useState();

  const [form] = Form.useForm();

  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    phone: "",
  });

  const [listSchedule, setListSchedule] = useState();
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

  const [detailSchedule, setDetailSchedule] = useState({
    date: "",
    note: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChooseSchedule = async (id) => {
    setCurrentId(id);
    try {
      const res = await axios.get(`http://localhost:5555/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.schedule);
      setDetailDoctor(res.data.schedule.doctor);
      setDetailSchedule(res.data.schedule);
      form.setFieldsValue({
        doctor: res.data.schedule.doctor.name,
        date: res.data.schedule.date,
        room: res.data.schedule.room.name,
      });
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(true);
  };

  const handleFilterSchedule = async () => {
    console.log(date);
    try {
      const res = await axios.get(
        `http://localhost:5555/schedules/query?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.schedule);
      setListSchedule(res.data.schedule);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchMe = async () => {
    try {
      const res = await axios.get(`http://localhost:5555/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("profile", res.data.user);
      setProfile(res.data.user);
      form.setFieldsValue({
        phone: res.data.user.phone,
        createdBy: res.data.user.name,
        patient: res.data.user.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (date, dateString) => {
    console.log("day la date", dateString);
    setDate(dateString);
  };

  useEffect(() => {
    handleFetchMe();
  }, []);

  // const handleDayChange = (e) => {
  //   setDay(e.target.value);
  // };

  const onSearch = (val) => {
    console.log("search:", val);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const { title, content } = values;

    const dataForm = {
      title,
      content,
      doctor: detailDoctor,
      patient: profile,
      createdBy: profile._id,
      phone: profile.phone,
      schedule: detailSchedule,
    };

    console.log("dataForm", dataForm);

    try {
      const res = await axios.post(`http://localhost:5555/clinics`, dataForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("ket qua call api tao don kham", res.data.clinic);
      message.success("Đặt lịch khám thành công");
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
      message.error("Đặt lịch khám thất bại");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <Nav3
        id="Nav3_0"
        key="Nav3_0"
        dataSource={Nav30DataSource}
        isMobile={true}
      />

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
        <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>1. GHI CHÚ</h3>

        {/* <div>
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
        </div> */}
        {/* <p
          style={{ color: "#f46969", marginTop: "20px", marginBottom: "20px" }}
        >
          Quý khách vui lòng chọn 1 nhu cầu khám bệnh, chúng tôi sẽ chọn lọc
          những bác sĩ giỏi về lĩnh vực này
        </p> */}
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
          <DatePicker onChange={onChange} style={{ width: "100%" }} />
        </div>

        {/* <p style={{ color: "green", marginTop: "20px", marginBottom: "20px" }}>
          Quý khách vui lòng chọn 1 ngày trong tuần hiện tại để đến khám bệnh.
          (Lưu ý, nếu bạn muốn khám vào tuần sau xin đặt lịch vào thứ 2 tuần
          sau, nếu bạn chọn thứ trước ngày hiện tại thì đơn khám sẽ vô hiệu lực)
        </p> */}

        <p
          style={{ color: "#172d42", marginTop: "20px", marginBottom: "20px" }}
        >
          Sau khi bấm nút Xác nhận, hệ thống sẽ lọc ra lịch làm việc của những
          bác sĩ có lịch rãnh vào ngày của bạn.
        </p>

        <Button
          style={{ width: "100%" }}
          type="primary"
          onClick={handleFilterSchedule}
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
          dataSource={listSchedule}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                onClick={() => handleChooseSchedule(item._id)}
                avatar={<Avatar src={item.doctor.avatar} />}
                title={
                  <p>
                    {item.doctor.name} tại phòng khám {item.room.name}{" "}
                  </p>
                }
                description={`Chuyên môn của bác sĩ:  ${item.doctor.speciality}`}
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
        footer={null}
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
          {/* <div
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
          </div> */}
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
            <p>Ngày làm việc:</p>
            <p style={{ fontWeight: "500", marginLeft: "10px" }}>
              {detailSchedule.date}
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
          {/* <div
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
          </div> */}
          <div
            style={{
              display: "flex",
              width: "50%",
              paddingLeft: "10px",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <p>Bệnh viện từng làm:</p>
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
          {/* <div
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
          </div> */}
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
            form={form}
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
              // rules={[
              //   {
              //     required: true,
              //     message: "Vui lòng nhập tiêu đề!",
              //   },
              // ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Nội dung" name="content">
              <TextArea />
            </Form.Item>

            <Form.Item label="Bác sĩ" name="doctor">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Bệnh nhân" name="patient">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Người tạo đơn" name="createdBy">
              <Input disabled />
            </Form.Item>

            <Form.Item label="SĐT người tạo" name="phone">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Ngày khám bệnh" name="date">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Tại phòng khám" name="room">
              <Input disabled />
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
