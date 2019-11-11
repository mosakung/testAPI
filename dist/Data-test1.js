"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamDataTest = /** @class */ (function () {
    function ParamDataTest() {
        this.listObjs = [
            { "id": 0, "name": "Available" },
            { "id": 1, "name": "Ready" },
            { "id": 10, "name": "Started" }
        ];
    }
    ParamDataTest.prototype.get = function () {
        return this.listObjs;
    };
    ParamDataTest.prototype.push = function (newObject) {
        this.listObjs.push(newObject);
    };
    ParamDataTest.prototype.delete = function (keyObject) {
        for (var i = 0; i < this.listObjs.length; i++) {
            console.log(this.listObjs[i].id, keyObject);
            if (this.listObjs[i].id == keyObject) {
                this.listObjs.splice(i, 1);
                i--;
            }
        }
    };
    ParamDataTest.prototype.lenght = function () {
        return this.listObjs[this.listObjs.length - 1].id;
    };
    return ParamDataTest;
}());
exports.default = ParamDataTest;
//# sourceMappingURL=Data-test1.js.map