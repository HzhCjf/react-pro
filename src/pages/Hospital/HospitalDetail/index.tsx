import React from "react";
import { Descriptions } from "antd";
import { useParams } from "react-router-dom";

export default function HospitalDetail() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <Descriptions title="基本信息" bordered column={2}>
        <Descriptions.Item label="医院名称">xxxxx</Descriptions.Item>
        <Descriptions.Item label="医院logo">xxxxx</Descriptions.Item>
        <Descriptions.Item label="医院编码">xxxxx</Descriptions.Item>
        <Descriptions.Item label="医院地址">xxxxx</Descriptions.Item>
        <Descriptions.Item label="坐车路线" span={2}>
          xxxxx
        </Descriptions.Item>
        <Descriptions.Item label="医院简介" span={2}>
          xxxxx
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title="预约规则信息"
        bordered
        column={2}
        style={{ marginTop: "30px" }}
      >
        <Descriptions.Item label="预约周期">xxxxx</Descriptions.Item>
        <Descriptions.Item label="放号时间">xxxxx</Descriptions.Item>
        <Descriptions.Item label="停挂时间">xxxxx</Descriptions.Item>
        <Descriptions.Item label="退号时间">xxxxx</Descriptions.Item>
        <Descriptions.Item label="预约规则" span={2}>
          xxxxx
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
