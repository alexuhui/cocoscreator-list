// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ListItem from "../../../Script/ListItem";
import RichTextAdaptive from "../Common/RichTextAdaptive";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/Chat/ChatItem')
export default class ChatItem extends ListItem {

    @property(cc.SpriteFrame)
    avatar1SF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    avatar2SF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    bubble1SF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    bubble2SF: cc.SpriteFrame = null;

    @property(cc.Node)
    avatarNode: cc.Node = null
    @property(cc.Sprite)
    avatar: cc.Sprite = null
    @property(cc.Node)
    timeNode: cc.Node = null
    @property(cc.Label)
    time: cc.Label = null
    @property(cc.Sprite)
    chatBg: cc.Sprite = null
    // @property(cc.Layout)
    // chatBgLayout: cc.Layout = null
    @property(cc.RichText)
    richtext: cc.RichText = null
    @property(RichTextAdaptive)
    richtextAdaptive: RichTextAdaptive = null

    start() {

    }

    onRenderItem(data: any, idx: number) {
        // console.log(`${idx} : ${JSON.stringify(data)}   `)

        this.avatarNode.active = this.chatBg.node.active = data.type != 3;
        this.timeNode.active = data.type == 3;

        let h: number;
        let minH: number = 80;
        let offset: number = 43;
        // console.log(`------------------------- data.text : ${data.text}`)
        switch (data.type) {
            case 1://对方
                this.avatarNode.x = -170;
                this.avatar.spriteFrame = this.avatar1SF;
                this.chatBg.spriteFrame = this.bubble1SF;
                // this.richtext.node.x = -108;
                this.richtextAdaptive.string = data.text;
                this.richtext.horizontalAlign = cc.macro.TextAlignment.LEFT
                this.chatBg.node.setAnchorPoint(0, 1)
                this.chatBg.node.setPosition(-128, -20)
                this.richtext.node.setAnchorPoint(0, 1)
                // this.richtext['_updateRichText']()
                h = this.chatBg.node.height + offset;
                this.node.height = h < minH ? minH : h;
                break;
            case 2://我方
                this.avatarNode.x = 170;
                this.avatar.spriteFrame = this.avatar2SF;
                this.chatBg.spriteFrame = this.bubble2SF;
                // this.richtext.node.x = -122;
                this.richtextAdaptive.string = data.text;
                this.richtext.horizontalAlign = cc.macro.TextAlignment.LEFT
                this.chatBg.node.setAnchorPoint(1, 1)
                this.chatBg.node.setPosition(128, -20)
                this.richtext.node.setAnchorPoint(1, 1)
                // this.richtext['_updateRichText']()
                h = this.chatBg.node.height + offset;
                this.node.height = h < minH ? minH : h;
                break;
            case 3://时间 或 其他啥的
                this.time.string = data.text;
                this.node.height = 60;
                break;
        }

        // console.log(`item pos : ${this.node.getPosition().toString()} itme size : ${this.node.getContentSize().toString()}  bg pos : ${this.chatBg.node.getPosition().toString()}  bg size : ${this.chatBg.node.getContentSize().toString()}`)
    }
}
