import express from "express";
const ForgeSDK = require("@arcblock/forge-sdk");
const path = require('path');
const { toTypeInfo, types, isValid } = require('@arcblock/did');
import { Searcher } from "./searcher";

const app = express();
const port = parseInt(process.env.BLOCKLET_PORT, 10) || 4000;
const searcher = new Searcher();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/build')));

// 查询结果状态码, 0为成功，其他失败
enum SEARCH_STATUS {
    SUCCESS,    // 成功
    NO_RECORD,  // 没有结果
    UNSUPPORT,  // 不支持搜索类型
    INVALID_DID,// 非DID格式
    UNKNOWN,    // 未知错误
}

app.post('/search', async (req, res) => {
    try {
        const str = req.body.str;
        if (str.length > 40) { // TODO: 简单的当成TX
            const info = await searcher.getTx(str);
            res.json({ status: SEARCH_STATUS.SUCCESS, info });
        } else {
            if (isValidDid(str)) {
                let type = toTypeInfo(str);
                if (type.role === types.RoleType.ROLE_ACCOUNT) {
                    // 查询账号
                    const info = await searcher.getAccountState(str);
                    res.json({ status: SEARCH_STATUS.SUCCESS, info });
                } else if (type.role === types.RoleType.ROLE_ASSET) {
                    // 查询资产
                    const info = await searcher.getAssetState(str);
                    res.json({ status: SEARCH_STATUS.SUCCESS, info });
                } else {
                    // 不支持搜索类型
                    res.json({ status: SEARCH_STATUS.UNSUPPORT });
                }
            } else {
                res.json({ status: SEARCH_STATUS.INVALID_DID });
            }
        }
    } catch (error) {
        res.json({ status: SEARCH_STATUS.UNKNOWN });
    }
});

app.post('/account', async (req, res) => {
    try {
        const address = req.body.address;
        console.log(address);
        if (isValidDid(address)) {
            const info = await searcher.getAccountState(address);
            if (info)
                res.json({ status: 0, info });
            else
                res.json({ status: 1 });
        } else {
            res.json({ status: 2 });
        }
    } catch (error) {
        res.json({ status: 3 });
    }
});

app.post('/asset', async (req, res) => {
    try {
        const address = req.body.address;
        if (isValidDid(address)) {
            const info = await searcher.getAssetState(address);
            res.json({ status: 0, info });
        } else {
            res.json({ status: 1 });
        }
    } catch (error) {
        res.json({ status: 2 });
    }
});

app.post('/tx', async (req, res) => {
    try {
        const hash = req.body.hash;
        if (hash && hash.length > 0) {
            const info = await searcher.getTx(hash);
            res.json({ status: 0, info });
        } else {
            res.json({ status: 1 });
        }
    } catch (error) {
        res.json({ status: 2 });
    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const isValidDid = (address: string) => {
    if (address && address.length > 0 && isValid(address))
        return true;
    return false;
};
