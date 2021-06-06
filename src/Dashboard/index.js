import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav3 from "../Home/Nav3";
import { useHistory } from "react-router-dom";

import {
  List,
  Avatar,
  Rate,
  Carousel,
  Card,
  Timeline,
  Modal,
  Steps,
  Button,
  message,
  Select,
  Descriptions,
  Form,
  Input,
} from "antd";

import "./dashboard.css";

import { Nav30DataSource } from "../Home/data.source";
import "../Home/less/antMotionStyle.less";

const token = localStorage.getItem("avy-shine-token");

const contentStyle1 = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundImage:
    "url(" +
    "http://file.medinet.gov.vn/UploadImages/soytehcm/2018_8/19/hinh-pkdk-1_19820187.png" +
    ")",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
const contentStyle2 = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundImage:
    "url(" +
    "http://file.medinet.gov.vn/UploadImages/soytehcm/2018_8/19/hinh-pkdk-2_19820187.png" +
    ")",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
const contentStyle3 = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundImage:
    "url(" +
    "http://file.medinet.gov.vn/UploadImages/soytehcm/2018_8/19/hinh-pkdk-4_19820187.png" +
    ")",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
const contentStyle4 = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundImage:
    "url(" +
    "http://file.medinet.gov.vn/UploadImages/soytehcm/2018_8/19/hinh-pkdk-8_19820187.png" +
    ")",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const { Meta } = Card;
const { Step } = Steps;
const { Option } = Select;

const index = () => {
  let history = useHistory();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  // const [spec, setSpec] = useState("Gây mê - điều trị đau");

  const [currentDoctorId, setCurrentDoctorId] = useState();

  const [listSchedule, setListSchedule] = useState([]);

  const [currentSchedule, setCurrentSchedule] = useState([]);

  const [currentDoctor, setCurrentDoctor] = useState({
    name: "",
    age: "",
    description: "",
    exp: "",
    hispital: "",
    rate: "",
  });

  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    phone: "",
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const showModal = async (id) => {
    console.log(id);
    setCurrentDoctorId(id);
    try {
      const res = await axios.get(`http://localhost:5555/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.user);
      setCurrentDoctor(res.data.user);

      await handleFetchScheduleByDoctorId(id);
    } catch (error) {
      console.log(error);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [listDoctor, setListDoctor] = useState();
  const [listRoom, setListRoom] = useState();

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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchDoctor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5555/users/query?type=doctor&limit=3`,
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

  const handleFetchRoom = async () => {
    try {
      const res = await axios.get(`http://localhost:5555/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.room);
      setListRoom(res.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchScheduleByDoctorId = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5555/schedules/query?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fetchSchedule", res.data.schedule);
      setListSchedule(res.data.schedule);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreCreateClinic = (schedule) => {
    setCurrentSchedule(schedule);
    console.log("schedule hien tai", schedule);
    form.setFieldsValue({
      date: schedule.date.substr(0, 10),
      place: schedule.room.name,
    });
    next();
  };

  const onFinish = async (values) => {
    const { title, content, ...rest } = values;

    const dataForm = {
      title,
      content,
      doctor: currentDoctor,
      patient: profile,
      createdBy: profile._id,
      phone: profile.phone,
      schedule: currentSchedule,
    };

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

  const steps = [
    {
      title: "Bác sĩ",
      content: (
        <>
          <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
            THÔNG TIN BÁC SĨ
          </h3>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>Họ tên:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.name}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>Tuôi:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.age}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>Bệnh viện đang công tác:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.hispital}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>Mô tả:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.description}
            </p>
          </div>

          <Button
            style={{ marginTop: "10px", marginBottom: "20px" }}
            type="primary"
            onClick={() => next()}
          >
            Tiếp
          </Button>
        </>
      ),
    },
    {
      title: "Thời gian",
      content: (
        <>
          <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
            LỊCH LÀM VIỆC CỦA BÁC SĨ
          </h3>

          <p style={{ marginBottom: "15px", marginTop: "15px" }}>
            Bạn có thể chọn 1 lịch trình của bác sĩ để yêu cầu lịch khám
          </p>

          <div>
            <List
              itemLayout="horizontal"
              dataSource={listSchedule}
              renderItem={(item) => (
                <List.Item>
                  <div onClick={() => handlePreCreateClinic(item)}>
                    <Descriptions bordered>
                      <Descriptions.Item label="Thời gian">
                        {item.date}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tại phòng khám">
                        {item.room.name}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </List.Item>
              )}
            />
          </div>
          <Button
            onClick={() => prev()}
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            Quay lại
          </Button>
        </>
      ),
    },
    {
      title: "Xác nhận",
      content: (
        <>
          <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
            ĐẶT LỊCH YÊU CẦU
          </h3>

          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div style={{ margin: "5px", textAlign: "left" }}>Tiêu đề</div>
            <Form.Item name="title">
              <Input placeholder="Khám bệnh da liễu"></Input>
            </Form.Item>

            <div style={{ margin: "5px", textAlign: "left" }}>Nội dung</div>
            <Form.Item name="content">
              <Input.TextArea placeholder="Nhập nội dung..." />
            </Form.Item>

            <div
              style={{ margin: "5px", textAlign: "left", fontWeight: "500" }}
            >
              Thông tin của bạn
            </div>

            <div style={{ margin: "5px", textAlign: "left" }}>SĐT của bạn</div>
            <Form.Item name="phone">
              <Input></Input>
            </Form.Item>

            <div style={{ margin: "5px", textAlign: "left" }}>Tên của bạn</div>
            <Form.Item name="createdBy">
              <Input></Input>
            </Form.Item>

            <div
              style={{ margin: "5px", textAlign: "left", fontWeight: "500" }}
            >
              Thông tin lịch khám
            </div>
            <div style={{ margin: "5px", textAlign: "left" }}>Thời gian</div>
            <Form.Item name="date">
              <Input disabled></Input>
            </Form.Item>

            <div style={{ margin: "5px", textAlign: "left" }}>
              Tại phòng khám
            </div>
            <Form.Item name="place">
              <Input disabled></Input>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>

              <Button onClick={() => prev()} style={{ marginLeft: "20px" }}>
                Quay lại
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }

    handleFetchDoctor();
    handleFetchRoom();
    handleFetchMe();
  }, []);

  return (
    <div style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
      <Nav3
        id="Nav3_0"
        key="Nav3_0"
        dataSource={Nav30DataSource}
        isMobile={true}
      />

      <Carousel autoplay>
        <div>
          <h3 style={contentStyle1}></h3>
        </div>
        <div>
          <h3 style={contentStyle2}></h3>
        </div>
        <div>
          <h3 style={contentStyle3}></h3>
        </div>
        <div>
          <h3 style={contentStyle4}></h3>
        </div>
      </Carousel>

      <div
        style={{
          padding: "15px",
          backgroundColor: "white",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          DANH SÁCH BÁC SĨ NỖI BẬT
        </h2>

        <List
          itemLayout="horizontal"
          dataSource={listDoctor}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                onClick={() => showModal(item._id)}
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
                description={
                  <div>
                    <p style={{ color: "green" }}> {item.speciality} </p>

                    {item.description}
                    <br></br>
                    <Rate value={item.rate} />
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>

      <div
        style={{
          padding: "15px",
          backgroundColor: "white",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          DANH SÁCH PHÒNG KHÁM NỖI BẬT
        </h2>

        <List
          // grid={{ gutter: 4, column: 4 }}
          dataSource={listRoom}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={<img alt="example" src={item.avatar} />}
              >
                <Meta title={item.name} description={item.description} />
              </Card>
            </List.Item>
          )}
        />
      </div>

      <div
        style={{
          padding: "15px",
          backgroundColor: "white",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          CÁC BƯỚC ĐẶT LỊCH KHÁM
        </h2>

        <div style={{ padding: "20px" }}>
          <Timeline>
            <Timeline.Item color="green">Bạn muốn đặt lịch khám?</Timeline.Item>
            <Timeline.Item color="green">
              Đăng nhập bằng tài khoản của bạn
            </Timeline.Item>
            <Timeline.Item color="red">
              <p>Chọn bác sĩ bạn muốn?</p>
              <p>Chọn phòng khám bạn muốn?</p>
              <p>Chọn thời gian bạn muốn? </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>Xác nhận và kiểm tra lại lịch đặt</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Chờ thông báo xác nhận thành công từ hệ thống</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Tham gia buổi khám bệnh</p>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
      <Modal
        title="Đặt lịch"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        {/* <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Tiếp
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary">Xác nhận</Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Quay lại
            </Button>
          )}
        </div> */}
      </Modal>
    </div>
  );
};

export default index;
