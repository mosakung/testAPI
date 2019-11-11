import { KeyObject } from "crypto";

export default class ParamDataTest {
    private listObjs: { id: number, name: string }[]

    constructor() {
        this.listObjs = [
            { "id": 0, "name": "Available" },
            { "id": 1, "name": "Ready" },
            { "id": 10, "name": "Started" }
        ]
    }

    get() {
        return this.listObjs;
    }

    push(newObject: { id: number, name: string }) {
        this.listObjs.push(newObject);
    }

    delete(keyObject: number) {
        for (let i: number = 0; i < this.listObjs.length; i++) {
            console.log(this.listObjs[i].id, keyObject);
            if (this.listObjs[i].id == keyObject) {
                this.listObjs.splice(i, 1);
                i--;
            }
        }
    }

    lenght() {
        return this.listObjs[this.listObjs.length - 1].id;
    }
}