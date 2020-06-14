const ForgeSDK = require("@arcblock/forge-sdk");
/*
 * 仅支持3条链的简易搜索
 */
export class Searcher {

    constructor() {
        this._connect('playground', 'https://playground.network.arcblockio.cn/api');
        this._connect('xenon', 'https://xenon.abtnetwork.io/api');
        this._connect('zinc', 'https://zinc.abtnetwork.io/api');
    }

    private _connect(name: string, url: string) {
        ForgeSDK.connect(url, { name, default: false });
    }

    async getAccountState(address: string) {
        let res: any = { type: 'Account' };
        try {
            let [playground, xenon, zinc] = await Promise.allSettled([
                ForgeSDK.getAccountState({ address, conn: 'playground' } as any),
                ForgeSDK.getAccountState({ address, conn: 'xenon' } as any),
                ForgeSDK.getAccountState({ address, conn: 'zinc' } as any)
            ]);
            if (playground.status === 'fulfilled')
                res.playground = playground.value.info;
            if (xenon.status === 'fulfilled')
                res.xenon = xenon.value.info;
            if (zinc.status === 'fulfilled')
                res.zinc = zinc.value.info;
            return res;
        } catch (error) {
            // TODO:错误处理
            console.error(error);
            return res;
        }
    }

    async getTx(hash: string) {
        let res: any = { type: 'Transaction' };
        try {
            let [playground, xenon, zinc] = await Promise.allSettled([
                ForgeSDK.getTx({ hash, conn: 'playground' } as any),
                ForgeSDK.getTx({ hash, conn: 'xenon' } as any),
                ForgeSDK.getTx({ hash, conn: 'zinc' } as any)
            ]);
            if (playground.status === 'fulfilled')
                res.playground = playground.value.info;
            if (xenon.status === 'fulfilled')
                res.xenon = xenon.value.info;
            if (zinc.status === 'fulfilled')
                res.zinc = zinc.value.info;
            return res;
        } catch (error) {
            // TODO:错误处理
            console.error(error);
            return res;
        }
    }

    async getAssetState(address: string) {
        console.log(address);
        let res: any = { type: 'Asset' };
        try {
            let [playground, xenon, zinc] = await Promise.allSettled([
                ForgeSDK.getAssetState({ address, conn: 'playground' } as any),
                ForgeSDK.getAssetState({ address, conn: 'xenon' } as any),
                ForgeSDK.getAssetState({ address, conn: 'zinc' } as any)
            ]);
            if (playground.status === 'fulfilled')
                res.playground = playground.value.info;
            if (xenon.status === 'fulfilled')
                res.xenon = xenon.value.info;
            if (zinc.status === 'fulfilled')
                res.zinc = zinc.value.info;
            return res;
        } catch (error) {
            // TODO:错误处理
            console.error(error);
            return res;
        }
    }
}