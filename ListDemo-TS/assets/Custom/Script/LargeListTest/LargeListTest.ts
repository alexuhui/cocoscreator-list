// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import List from "../../../Script/List";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LargeListTest extends cc.Component {

    @property(List)
    list: List = null;

    onLoad () {
        let data = []
        for (let i= 0; i  < 1000; i ++) {
            data.push({id : i + 1, tag : `item ${i + 1}`})
        }

        this.list.itemDatas = data
    }

    onListRender(item: any, idx: number) {
        // console.log(`${idx} : ${JSON.stringify(item)}   `)
    }
}
