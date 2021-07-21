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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(banjing, color, x, y, f) {
        if (banjing === void 0) { banjing = 30; }
        if (color === void 0) { color = 0x000000; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (f === void 0) { f = 0.2; }
        var _this = _super.call(this) || this;
        _this.banjing = 30;
        _this.ang = 20;
        _this.v = 0;
        _this.weight = 1;
        _this.f = 0.1;
        _this.getScored = false;
        _this.f = f;
        _this.banjing = banjing;
        _this.graphics.beginFill(color, 1);
        //this.graphics.lineStyle(5, color);
        _this.graphics.drawCircle(x, y, banjing);
        _this.graphics.endFill();
        return _this;
    }
    Ball.getRandomColor = function () {
        /* var a, b = [], c = "0x";
         for (var i = 0; i < 6; i++) {
             a = Math.ceil(Math.random() * 16).toString(16).toLocaleUpperCase();
             b[i] = a;
             c += b[i];
         }
         return c;*/
        return 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100);
    };
    return Ball;
}(egret.Shape));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=Ball.js.map