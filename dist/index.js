"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = parseInt(process.env.BLOCKLET_PORT, 10) || 4000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
//# sourceMappingURL=index.js.map