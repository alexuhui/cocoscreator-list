// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("自定义组件/Common/LabelEx")
export default class LabelEx extends cc.Label {

    /** 是否开启自动自动设置大小 */
    @property(cc.Boolean)
    enabledAutoSize: boolean = false;
    /** 自动设置大小的最大宽度 */
    @property({
        type: cc.Integer,
        visible() {
            return this.enabledAutoSize
        },
    })
    maxWidth: number = 0;
    private lastWidth: number = -1;

    private _tempString: string

    protected onLoad(): void {
        const ps = Object.getOwnPropertyNames(this)
        for (const key in ps) {
            if (Object.prototype.hasOwnProperty.call(ps, key)) {
                const element = ps[key];
                console.log("---- element : ", element)
            }
        }
        // let desc = Object.getOwnPropertyDescriptor(cc.Label.prototype, "string")
        // desc.set = function (value) {
        //     let oldValue = this._string;
        //     this._string = '' + value;

        //     // console.log(`------------------- prototype string set , oldValue : ${oldValue}  value : ${String(value)}`)
        //     // this.checkLbWidth()
        //     if (this.string !== oldValue) {
        //         this.setVertsDirty();
        //     }

        //     this._checkStringEmpty();
        // }
        // Object.defineProperty(cc.Label.prototype, "string", desc)
    }


    /** 检测Label的宽度变化 */
    checkLbWidth(): boolean {
        let paragraphedStrings = this._tempString.split('\n');
        let _context = this['_assemblerData']["context"]
        let _fontDesc = this["_assembler"]["_getFontDesc"]();
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
        if (maxLineWidth != this.lastWidth) {
            this.lastWidth = maxLineWidth
            this.node.width = this.lastWidth
            return true
        }
        return false
    }
}
