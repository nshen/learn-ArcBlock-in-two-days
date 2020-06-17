# nn-blocket 

## 代码结构

```bash
nn-block
  |
  |----- client/ # 客户端 create-react-app 生成的源码目录
  |       |----- App.tsx         # 客户端入口，使用 react-router 跳转 下边两个页面
  |       |----- Home.tsx        # 搜索框，使用 ant-design 作为 ui，发送搜索请求
  |       |----- Result.tsx      # 根据返回搜索结果的类型，显示对应的结果
  |----- src/    # 服务端 express 源码目录
          |----- index.ts        # 服务端入口，接收 post 请求，调用 searcher 搜索并返回结果
          |----- searcher.ts     # ForgeSDK 的封装，支持3条链的并发搜索

```


# 截图

![alt](./screenshots/1.png)
![alt](./screenshots/2.png)
![alt](./screenshots/3.png)
![alt](./screenshots/4.png)
![alt](./screenshots/5.png)



TODO: 目前显示结果是假的