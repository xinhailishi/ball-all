var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    LoadingUI.prototype.onAddToStage = function (event) {
        this.textField.width = this.stage.stageWidth;
        this.textField.height = this.stage.stageHeight;
    };
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        //0xff0000
        this.textField.textColor = 0xffffff;
        this.textField.size = 80;
        this.textField.width = 500 || this.stage.stageWidth;
        this.textField.height = 300 || this.stage.stageHeight;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign = egret.VerticalAlign.MIDDLE;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "\u52A0\u8F7D\u4E2D..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map