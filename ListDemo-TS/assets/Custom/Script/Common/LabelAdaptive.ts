// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property, menu, requireComponent } = cc._decorator;

@ccclass
@menu("自定义组件/Common/LabelAdaptive")
@requireComponent(cc.Label)
export default class LabelAdaptive extends cc.Component {

    // @property(cc.String)
    private _string: string = ""
    // 使用 get 关键字定义 getter
    get string(): string {
        return this._string;
    }

    // 使用 set 关键字定义 setter
    set string(value: string) {
        if (this._string === value) {
            return;
        }
        this._string = value;
        console.log("checkMaxWidth : ", this.checkMaxWidth())
        this.label.string = this._string

    }

    @property(cc.Integer)
    maxWidth: number = 0;

    private label: cc.Label = null;

    private lastWidth: number = -1;

    start() {
        this.label = this.getComponent(cc.Label)
        if (!this.label) {
            console.error(`error : LabelAdaptive, there is no component "cc.Label"`)
            this.enabled = false
            return
        }

        // // 监听文本变化事件
        // this.label.node.on('string-changed', (event) => {
        //     // 处理文本变化的逻辑
        //     console.log('文本发生了变化，新的文本是：', this.label.string, JSON.stringify(event));
        // });


        // console.log(`_assembler :------ `)
        // console.log(`_assembler._overflow : ${this.label["_assembler"]["_overflow"]} `)
        // console.log(`overflow : ${this.label.overflow} `)
        // console.log(`_context : ${this.label['_assemblerData']["context"]} `)

        this.string = this.label.string
        // console.log("checkMaxWidth : ", this.checkMaxWidth())
    }

    checkMaxWidth(): boolean {
        let paragraphedStrings = this._string.split('\n');
        let _context = this.label['_assemblerData']["context"]
        let _fontDesc = this.label["_assembler"]["_getFontDesc"]();
        console.log(`_context  : ${JSON.stringify(_context)}`)
        console.log(`_fontDesc  : ${JSON.stringify(_fontDesc)}`)
        let maxLineWidth = 0
        for (let i = 0; i < paragraphedStrings.length; ++i) {
            let metric = _context["measureText"](paragraphedStrings[i]);
            let paraLength = metric && metric.width || 0;
            maxLineWidth = maxLineWidth > paraLength ? maxLineWidth : paraLength;

            if (maxLineWidth >= this.maxWidth) {
                maxLineWidth = this.maxWidth
                break;
            }
            console.log(`paraLength  : ${paraLength}   maxLineWidth : ${maxLineWidth}`)
        }
        if (maxLineWidth != this.lastWidth)
        {
            this.lastWidth = maxLineWidth
            this.node.width = this.lastWidth
            return true
        }    
        return false
    }

    onTestClick() {
        this.string = "bagagke"
    }
}
