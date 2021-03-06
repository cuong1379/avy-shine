import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav3 from "../Home/Nav3";
import { useHistory } from "react-router-dom";

import { AudioOutlined } from "@ant-design/icons";

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
const { Search } = Input;

const index = () => {
  let history = useHistory();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  // const [spec, setSpec] = useState("G??y m?? - ??i???u tr??? ??au");

  const [currentDoctorId, setCurrentDoctorId] = useState();

  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("");

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

  const onSearch = (value) => {
    setQ(value);
  };

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

      handleFetchScheduleByDoctorId(id);
      setIsModalVisible(true);
    } catch (error) {
      console.log(error);
    }
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
        `http://localhost:5555/users/query?type=doctor&q=${q}&speciality=${spec}`,
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

  useEffect(() => {
    handleFetchDoctor();
  }, [spec, q]);

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
        `http://localhost:5555/schedules/query?doctorId=${id}`,
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
    const { title, content } = values;

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
      message.success("?????t l???ch kh??m th??nh c??ng");
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
      message.error("?????t l???ch kh??m th???t b???i");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = async (values) => {
    console.log("??dasdasd", values);
    try {
      const res = await axios.get(
        `http://localhost:5555/users/query?type=doctor&speciality=${values}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ket qua", res.data.user);
      setListDoctor(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const steps = [
    {
      title: "B??c s??",
      content: (
        <>
          <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
            TH??NG TIN B??C S??
          </h3>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>H??? t??n:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.name}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>Tu??i:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.age}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>B???nh vi???n ??ang c??ng t??c:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.hispital}
            </p>
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <p>M?? t???:</p>
            <p style={{ marginLeft: "10px", color: "green" }}>
              {currentDoctor.description}
            </p>
          </div>

          <Button
            style={{ marginTop: "10px", marginBottom: "20px" }}
            type="primary"
            onClick={() => next()}
          >
            Ti???p
          </Button>
        </>
      ),
    },
    {
      title: "Th???i gian",
      content: (
        <>
          <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
            L???CH L??M VI???C C???A B??C S??
          </h3>

          <p style={{ marginBottom: "15px", marginTop: "15px" }}>
            B???n c?? th??? ch???n 1 l???ch tr??nh c???a b??c s?? ????? y??u c???u l???ch kh??m
          </p>

          <div>
            <List
              itemLayout="horizontal"
              dataSource={listSchedule}
              renderItem={(item) => (
                <List.Item>
                  <div
                    onClick={() => handlePreCreateClinic(item)}
                    style={{ cursor: "pointer", backgroundColor: "gray" }}
                  >
                    <Descriptions bordered>
                      <Descriptions.Item
                        label="Th???i gian"
                        style={{ backgroundColor: "gray" }}
                      >
                        {item.date}
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="T???i ph??ng kh??m"
                        style={{ backgroundColor: "gray" }}
                      >
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
            Quay l???i
          </Button>
        </>
      ),
    },
    {
      title: "X??c nh???n",
      content: (
        <>
          <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
            ?????T L???CH Y??U C???U
          </h3>

          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div style={{ margin: "5px", textAlign: "left" }}>Ti??u ?????</div>
            <Form.Item name="title">
              <Input placeholder="Kh??m b???nh da li???u"></Input>
            </Form.Item>

            <div style={{ margin: "5px", textAlign: "left" }}>N???i dung</div>
            <Form.Item name="content">
              <Input.TextArea placeholder="Nh???p n???i dung..." />
            </Form.Item>

            <div
              style={{ margin: "5px", textAlign: "left", fontWeight: "500" }}
            >
              Th??ng tin c???a b???n
            </div>

            <div style={{ margin: "5px", textAlign: "left" }}>S??T c???a b???n</div>
            <Form.Item name="phone">
              <Input></Input>
            </Form.Item>

            <div style={{ margin: "5px", textAlign: "left" }}>T??n c???a b???n</div>
            <Form.Item name="createdBy">
              <Input></Input>
            </Form.Item>

            <div
              style={{ margin: "5px", textAlign: "left", fontWeight: "500" }}
            >
              Th??ng tin l???ch kh??m
            </div>
            <div style={{ margin: "5px", textAlign: "left" }}>Th???i gian</div>
            <Form.Item name="date">
              <Input disabled></Input>
            </Form.Item>

            <div style={{ margin: "5px", textAlign: "left" }}>
              T???i ph??ng kh??m
            </div>
            <Form.Item name="place">
              <Input disabled></Input>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                X??c nh???n
              </Button>

              <Button onClick={() => prev()} style={{ marginLeft: "20px" }}>
                Quay l???i
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
          DANH S??CH B??C S?? N???I B???T
        </h2>

        <div>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Ch???n 1 chuy??n m??n"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="G??y m?? ??i???u tr??? ??au">G??y m?? ??i???u tr??? ??au</Option>
            <Option value="N???i c?? x????ng kh???p">N???i c?? x????ng kh???p</Option>
            <Option value="R??ng H??m M???t">R??ng H??m M???t</Option>
            <Option value="Da li???u">Da li???u</Option>
            <Option value="Y h???c c??? truy???n">Y h???c c??? truy???n</Option>
            <Option value="Ph???c h???i ch???c n??ng">Ph???c h???i ch???c n??ng</Option>
            <Option value="Ho???t ?????ng tr??? li???u">Ho???t ?????ng tr??? li???u</Option>
            <Option value="Ph???u thu???t th???m m???">Ph???u thu???t th???m m???</Option>
            <Option value="Th???m m???">Th???m m???</Option>
            <Option value="">T???t c???</Option>
          </Select>
        </div>

        <Search
          placeholder="T??m ki???m b??c s??"
          onSearch={onSearch}
          enterButton
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />

        <List
          itemLayout="horizontal"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={listDoctor}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                style={{ cursor: "pointer" }}
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

        {/* <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            marginBottom: "15px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={() => history.push("/listdoctor")}
        >
          Xem t???t c??? danh s??ch b??c s??
        </p> */}
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
          DANH S??CH PH??NG KH??M N???I B???T
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
          C??C B?????C ?????T L???CH KH??M
        </h2>

        <div style={{ padding: "20px" }}>
          <Timeline>
            <Timeline.Item color="green">B???n mu???n ?????t l???ch kh??m?</Timeline.Item>
            <Timeline.Item color="green">
              ????ng nh???p b???ng t??i kho???n c???a b???n
            </Timeline.Item>
            <Timeline.Item color="red">
              <p>Ch???n b??c s?? b???n mu???n?</p>
              <p>Ch???n ph??ng kh??m b???n mu???n?</p>
              <p>Ch???n th???i gian b???n mu???n? </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>X??c nh???n v?? ki???m tra l???i l???ch ?????t</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Ch??? th??ng b??o x??c nh???n th??nh c??ng t??? h??? th???ng</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <p>Tham gia bu???i kh??m b???nh</p>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
      <Modal
        title="?????t l???ch"
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
              Ti???p
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary">X??c nh???n</Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Quay l???i
            </Button>
          )}
        </div> */}
      </Modal>
    </div>
  );
};

export default index;
