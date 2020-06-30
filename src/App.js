import React, { useState } from "react";
import "./App.css";
import Resizer from "react-image-file-resizer";
import { Card, Button, Space, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const App = () => {
  const [resizedImgs, setResizeImgs] = useState([]);
  const [imgType, setImgType] = useState("profile");

  const fileSelectedHandler = (event) => {
    let img = event.target.files[0];

    let width = 18;
    let height = 18;
    if (imgType !== "profile") {
      width = 40;
      height = 40;
    }

    Resizer.imageFileResizer(
      img,
      width,
      height,
      "JPEG",
      100,
      0,
      (uri) => {
        setResizeImgs([...resizedImgs, { resizedImg: uri }]);
      },
      "base64"
    );

    console.log(resizedImgs);
  };

  const fileUploadHandler = () => {
    // send post request to upload picture to server
    console.log("Send post request to server");
    message.success("Uploaded successfully");
  };

  const tabList = [
    {
      key: "profile",
      tab: "Profile",
    },
    {
      key: "wallpaper",
      tab: "Wallpaper",
    },
  ];

  const onTabChange = (type) => {
    setImgType(type);
    console.log(imgType);
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Card
        style={{ width: "60%", margin: "20px" }}
        title="Upload Your Image"
        bordered={false}
        tabList={tabList}
        activeTabKey={imgType}
        onTabChange={(type) => {
          onTabChange(type);
        }}
      >
        <Space direction="vertical">
          <input
            type="file"
            onChange={fileSelectedHandler}
            accept=".png, .jpg"
            id="uploadWallpaper"
            name="img"
          />

          <Button
            onClick={fileUploadHandler}
            size="small"
            type="primary"
            icon={<UploadOutlined />}
            disabled={resizedImgs.length === 0}
          >
            Upload
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default App;
