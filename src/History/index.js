import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav3 from "../Home/Nav3";
import { useHistory } from "react-router-dom";

import { List, Avatar } from "antd";

import { Nav30DataSource } from "../Home/data.source";
import "../Home/less/antMotionStyle.less";

const token = localStorage.getItem("avy-shine-token");

const index = () => {
  let history = useHistory();

  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    phone: "",
  });

  const [listClinic, setListClinic] = useState([]);

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  const handleFetchMe = async () => {
    try {
      const res = await axios.get(`http://localhost:5555/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("profile", res.data.user);
      setProfile(res.data.user);
      fetchClinic(res.data.user._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClinic = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5555/clinics/query?patientId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("lít clinic", res.data);
      setListClinic(res.data.clinic);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }

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
          DANH SÁCH ĐƠN ĐẶT LỊCH
        </h2>

        <List
          itemLayout="horizontal"
          dataSource={listClinic}
          renderItem={(item) => (
            <List.Item>
              {item.schedule && (
                <div>
                  <h3>Tiêu đề: {item.title}</h3>
                  <p>Mã: {item.code}</p>
                  <p>Nội dung: {item.content}</p>
                  <p>Bác sĩ khám: {item.doctor.name}</p>
                  <p>Bệnh nhân: {item.patient.name}</p>
                  <p>Thời gian: {item.schedule.date.substr(0, 10)}</p>
                </div>
              )}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default index;
