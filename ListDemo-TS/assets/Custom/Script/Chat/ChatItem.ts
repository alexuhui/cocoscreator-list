// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ListItem from "../../../Script/ListItem";

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
    @property(cc.Layout)
    chatBgLayout: cc.Layout = null
    @property(cc.RichText)
    richtext: cc.RichText = null

    start() {

    }

    onRenderItem(data: any, idx: number) {
        // console.log(`${idx} : ${JSON.stringify(data)}   `)
        
        const avatarNode: any = this.avatarNode;
        const avatar: any = this.avatar;
        const timeNode: any = this.timeNode;
        const time: any = this.time;
        const chatBg: any = this.chatBg;
        const chatBgLayout: any = this.chatBgLayout;
        const richtext: any = this.richtext;

        avatarNode.active = chatBg.node.active = data.type != 3;
        timeNode.active = data.type == 3;

        let h: number;
        let minH: number = 80;
        let offset: number = 43;

        switch (data.type) {
            case 1://对方
                avatarNode.x = -170;
                avatar.spriteFrame = this.avatar1SF;
                chatBg.spriteFrame = this.bubble1SF;
                richtext.node.x = -108;
                richtext.string = data.text;
                chatBgLayout.updateLayout();
                h = chatBg.node.y + chatBg.node.height + offset;
                this.node.height = h < minH ? minH : h;
                break;
            case 2://我方
                avatarNode.x = 170;
                avatar.spriteFrame = this.avatar2SF;
                chatBg.spriteFrame = this.bubble2SF;
                richtext.node.x = -122;
                richtext.string = data.text;
                chatBgLayout.updateLayout();
                h = chatBg.node.y + chatBg.node.height + offset;
                this.node.height = h < minH ? minH : h;
                break;
            case 3://时间 或 其他啥的
                time.string = data.text;
                this.node.height = 60;
                break;
        }
    }
}
