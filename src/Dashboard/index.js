import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav3 from "../Home/Nav3";
import { useHistory } from "react-router-dom";

import { List, Avatar, Rate, Carousel, Card, Timeline } from "antd";

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

const index = () => {
  let history = useHistory();

  const [listDoctor, setListDoctor] = useState();
  const [listRoom, setListRoom] = useState();

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

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }

    handleFetchDoctor();
    handleFetchRoom();
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
    </div>
  );
};

export default index;
