import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export function Searcher() {

    return (
        <div style={{
            width: '500px'
        }}>
            <Search placeholder="输入账户（Account）、交易（Transaction）、资产（Asset）搜索" loading enterButton />
        </div>
    );
};