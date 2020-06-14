import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ResultContext } from "./ResultContext";

import { Descriptions } from "antd";

export default function Result() {
  const history = useHistory();
  const [result] = useContext(ResultContext);

  if (!result) {
    history.push("/");
    return <div></div>;
  }

  // 根据result.type不同，显示不同内容

  if (result.type === "Account") {
    return (
      <div>
        <Descriptions title={"类型： " + result.type} bordered>
          <Descriptions.Item
            label="DID"
            span={2}
          >
            z1VFy8hB9ndynkWAAH9P1a2L5WaU7AvtKGy
          </Descriptions.Item>
          <Descriptions.Item label="Stakes">0</Descriptions.Item>
          <Descriptions.Item label="Balance" span={2}>
            8,340,000,000.000000
          </Descriptions.Item>
          <Descriptions.Item label="Received stakes">0</Descriptions.Item>
          <Descriptions.Item label="Valid TXs">3</Descriptions.Item>
          <Descriptions.Item label="Assets">0</Descriptions.Item>
        </Descriptions>
        <button
          type="button"
          style={{ marginTop: "20px" }}
          onClick={() => history.push("/")}
        >
          返回
        </button>
      </div>
    );
  } else if (result.type === "Asset") {
    return (
      <div>
        <Descriptions column={2} title={"类型： " + result.type} bordered>
          <Descriptions.Item
            label="Created At:"
            span={2}
          >
            Jun 15th, 2020 14:51 pm
          </Descriptions.Item>
          <Descriptions.Item label="Updated At" span={2}>
            Jun 15th, 2020 14:51 pm
          </Descriptions.Item>

          <Descriptions.Item
            label="Created By:"
            span={2}
          >
            z1VFy8hB9ndynkWAAH9P1a2L5WaU7AvtKGy
          </Descriptions.Item>
          <Descriptions.Item
            label="Owned By:"
            span={2}
          >
            z1VFy8hB9ndynkWAAH9P1a2L5WaU7AvtKGy
          </Descriptions.Item>
          <Descriptions.Item label="Readonly?:">Yes</Descriptions.Item>
          <Descriptions.Item label="Transferable?:">No</Descriptions.Item>
        </Descriptions>
        <button
          type="button"
          style={{ marginTop: "20px" }}
          onClick={() => history.push("/")}
        >
          返回
        </button>
      </div>
    );
  } else if (result.type === "Transaction") {
    return (
      <div>
        {/* TODO： 确定是不是Tx的格式 */}
        <Descriptions column={2} title={"类型也许是： " + result.type} bordered>
          <Descriptions.Item
            label="Token Hash:"
            span={2}
          >
            8AD41A8B38A17AF40ED1A37ED0C9335809434062E92F26F510660E868037C078
          </Descriptions.Item>
          <Descriptions.Item
            label="Sender:"
            span={2}
          >
            z1VFy8hB9ndynkWAAH9P1a2L5WaU7AvtKGy
          </Descriptions.Item>
          <Descriptions.Item
            label="Receiver:"
            span={2}
          >
            z1VFy8hB9ndynkWAAH9P1a2L5WaU7AvtKGy
          </Descriptions.Item>
          <Descriptions.Item label="Payload Assets Tokent" span={2}>
            0.000189 ABT
          </Descriptions.Item>
        </Descriptions>
        <button
          type="button"
          style={{ marginTop: "20px" }}
          onClick={() => history.push("/")}
        >
          返回
        </button>
      </div>
    );
  } else {
    return <div><h2>暂不支持该搜索</h2></div>;
  }
}
