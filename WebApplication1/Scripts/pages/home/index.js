"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var other_1 = require("@services/other/other");
function onLoad() {
    console.log('test');
    var num = 0;
    num += 20;
    num = 9;
    console.log(num);
    console.log(other_1.default.getText());
}
exports.onLoad = onLoad;
//# sourceMappingURL=index.js.map