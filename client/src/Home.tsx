import React, { useState, useContext } from "react";
import {
  useHistory,
} from "react-router-dom";

import { Input, message } from "antd";
import { ResultContext } from "./ResultContext";
const { Search } = Input;

export default function Home() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useContext(ResultContext);
  const history = useHistory();

  return (
    <div style={{ width: "600px" }}>
      <h2 style={{ marginBottom: "20px" }}>链网超级搜索框</h2>
      <Search
        size="large"
        placeholder="输入账户（Account）、交易（Transaction）、资产（Asset）搜索"
        loading={loading}
        enterButton
        onSearch={async (value) => {
          if (!value || value.length < 30) { // TODO： isVAlid
            message.info("请检查你输入的字符");
            return;
          }
          setLoading(true);
          console.log('posting...');
          const content = await post(value);
          setLoading(false);
          console.log('posted...');
          if (content.status !== 0) {
            message.info("抱歉没有找到");
            return;
          }
          setResult(content.info);
          history.push("/result");
        }}
      />
    </div>
  );
}

async function post(str: string): Promise<{ status: number; info: any; }> {
  const rawResponse = await fetch("/search", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ str: str }),
  });
  return await rawResponse.json();
}
