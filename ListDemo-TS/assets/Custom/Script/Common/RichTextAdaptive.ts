// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const HtmlTextParser = require("../../libs/html-text-parser")
const _htmlTextParser = new HtmlTextParser();

const { ccclass, property, menu, requireComponent } = cc._decorator;

@ccclass
@menu("自定义组件/Common/RichTextAdaptive")
@requireComponent(cc.RichText)
export default class RichTextAdaptive extends cc.Component {
    private _string: string = ""
    get string(): string {
        return this._string;
    }

    set string(value: string) {
        if (this._string === value) {
            return;
        }
        this._string = value;
        this.checkMaxWidth()
        this.label.string = this._string
    }

    @property(cc.Integer)
    maxWidth: number = 0;

    private label: cc.RichText = null;

    private lastWidth: number = -1;

    start() {
        // if (CC_EDITOR) {
        //     return
        // }
        this.label = this.getComponent(cc.RichText)
        if (!this.label) {
            console.error(`error : LabelAdaptive, there is no component "cc.Label"`)
            this.enabled = false
            return
        }
        // this.label.overflow = cc.Label.Overflow.RESIZE_HEIGHT
        this._string = this.label.string
        this.checkMaxWidth()
    }

    checkMaxWidth(): boolean {
        if (!this.enabledInHierarchy) return false;

        console.log("--------------- HtmlTextParser", JSON.stringify(_htmlTextParser))
        let newTextArray = _htmlTextParser.parse(this.string);
        console.log("--------------- newTextArray", JSON.stringify(newTextArray))

// for (let i = 0; i < newTextArray.length; ++i) {
//             let richTextElement = newTextArray[i];
//             let text = richTextElement.text;
//             //handle <br/> <img /> tag
//             if (text === "") {
//                 if (richTextElement.style && richTextElement.style.newline) {
//                     continue;
//                 }
//                 if (richTextElement.style && richTextElement.style.isImage && this.label.imageAtlas) {
//                     this.label._addRichTextImageElement(richTextElement);
//                     continue;
//                 }
//             }
//             let multilineTexts = text.split("\n");

//             for (let j = 0; j < multilineTexts.length; ++j) {
//                 let labelString = multilineTexts[j];
//                 if (labelString === "") {
//                     //for continues \n
//                     if (this._isLastComponentCR(text)
//                         && j === multilineTexts.length - 1) {
//                         continue;
//                     }
//                     this._updateLineInfo();
//                     lastEmptyLine = true;
//                     continue;
//                 }
//                 lastEmptyLine = false;

//                 if (this.maxWidth > 0) {
//                     let labelWidth = this._measureText(i, labelString);
//                     this._updateRichTextWithMaxWidth(labelString, labelWidth, i);

//                     if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
//                         this._updateLineInfo();
//                     }
//                 }
//                 else {
//                     label = this._addLabelSegment(labelString, i);
//                     labelSize = label.getContentSize();

//                     this._lineOffsetX += labelSize.width;
//                     if (this._lineOffsetX > this._labelWidth) {
//                         this._labelWidth = this._lineOffsetX;
//                     }

//                     if (multilineTexts.length > 1 && j < multilineTexts.length - 1) {
//                         this._updateLineInfo();
//                     }
//                 }
//             }
//         }
//         if (!lastEmptyLine) {
//             this._linesWidth.push(this._lineOffsetX);
//         }

//         if (this.maxWidth > 0) {
//             this._labelWidth = this.maxWidth;
//         }
//         this._labelHeight = (this._lineCount + textUtils.BASELINE_RATIO) * this.lineHeight;

//         // trigger "size-changed" event
//         this.node.setContentSize(this._labelWidth, this._labelHeight);

//         this._updateRichTextPosition();
//         this._layoutDirty = false;
        return false
    }

    private test = 0
    onTestClick() {
        this.test++
        if (this.test % 5 === 0)
            this.string = "bagagke"
        if (this.test % 5 === 1)
            this.string = "!#en Content string of label. !#zh 标签显示的文本内容。"
        if (this.test % 5 === 2)
            this.string = "!#en"
        if (this.test % 5 === 3)
            this.string = "!#en Horizontal Alignment of label. !#zh 文本内容的水平对齐方式。"
        if (this.test % 5 === 4)
            this.string = "bagagke\nkdadka kdakdk adkadka55 44545454ad kdakdk 45455dfadad\ndkdkaddkadakdkadkad"
    }
}
