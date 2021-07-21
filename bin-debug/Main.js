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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._randomPoint = new egret.Point();
        _this.score = 0; //分数
        _this.v1 = 20;
        _this.v2 = 0;
        _this.ang = 0;
        _this.ang2 = 0;
        _this.c = 0.017453292; //2PI/360
        _this._distance = new egret.Point();
        _this._touchePoint = new egret.Point();
        _this._isyaoed = false; //是否进过圈了
        _this._inArc = false; //是否在圈里
        _this._moveEnd = true; //移动结束状态
        _this._touchStatus = false; //当前触摸状态，按下时，值为true
        _this.shape1 = new Ball();
        _this.shape2 = new Ball();
        _this.shape3 = new egret.Shape();
        _this.line1 = new egret.Shape();
        _this.line2 = new egret.Shape();
        _this.line3 = new egret.Shape();
        _this.iszhudong = true; //是否主动状态
        _this.balls = []; //所有球的列表
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    Main.prototype.addToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _b.sent();
                        //this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        this.drawTip();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _b.sent();
                        _a = this;
                        return [4 /*yield*/, platform.getMyScore()];
                    case 4:
                        _a.score = _b.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.drawTip = function () {
        var text = new egret.TextField();
        text.text = "          游戏规则\n\n\n1、控制黑球进洞变为红球\n2、控制红球撞击白球得1分\n3、红球再进洞视为淹死扣1分\n4、速度过快将反弹无法进洞\n\n\n      点击开始游戏";
        text.bold = true;
        text.touchEnabled = true;
        text.textColor = 0xffffff;
        text.size = 40;
        this.addChild(text);
        text.width = 400;
        text.x = 320 - text.textWidth / 2;
        text.y = 400 - text.textHeight / 2;
        text.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            this.removeChild(text);
            this.drawBase();
        }, this);
    };
    Main.prototype.drawBase = function () {
        RES.getResByUrl("resource/assets/cartoon-font.fnt", this.onLoadFontComplete, this, RES.ResourceItem.TYPE_FONT);
        //很厉害的解决微信小游戏闪屏
        //this.stage.frameRate = 80;
        this.stage.frameRate = 40;
        //背景色
        var shape0 = new egret.Shape();
        ;
        this.addChild(shape0);
        //FF0000
        shape0.graphics.beginFill(0x228B22, 1);
        shape0.graphics.lineStyle(5, 0x228B22);
        shape0.graphics.drawRect(0, 0, this.stage.stageWidth + 40, this.stage.stageHeight + 50);
        shape0.graphics.endFill();
        shape0.touchEnabled = false;
        shape0.cacheAsBitmap = true;
        this.setChildIndex(shape0, this.numChildren - 1);
        //圆1
        var shape1 = this.shape1 = new Ball(30, 0x000000, 0, 0, 0.1);
        this.addChild(shape1);
        this.balls.push(shape1);
        shape1.x = this.stage.stageWidth / 2 - 2 * shape1.banjing;
        shape1.y = this.stage.stageHeight - 2 * shape1.banjing;
        shape1.touchEnabled = true;
        shape1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        this.setChildIndex(shape1, this.numChildren - 1);
        shape1.cacheAsBitmap = true;
        /*   for (var i = 0; i < 2; ++i) {
               let shapeX = new Ball(5 + Math.ceil(45 * Math.random()), Ball.getRandomColor());
               this.balls.push(shapeX);
               this.addChild(shapeX);
               let rpos = this.getRandomPos(shapeX.banjing);
               shapeX.x = rpos.x;
               shapeX.y = rpos.y;
               shapeX.cacheAsBitmap = true;
           }*/
        //圆2
        var shape2 = this.shape2 = new Ball(30, 0xFFFFF0, 0, 0, 0.4);
        this.addChild(shape2);
        this.balls.push(shape2);
        shape2.x = this.stage.stageWidth / 2 + shape2.banjing;
        shape2.y = this.stage.stageHeight - 2 * shape2.banjing;
        shape2.touchEnabled = true;
        this.setChildIndex(shape2, this.numChildren - 2);
        shape2.cacheAsBitmap = true;
        //圆3
        var shape3 = this.shape3;
        this.addChild(shape3);
        shape3.graphics.beginFill(0x556B2F, 1);
        shape3.graphics.lineStyle(5, 0xFFFFFF);
        shape3.graphics.drawCircle(0, 0, 50);
        shape3.graphics.endFill();
        shape3.x = this.stage.stageWidth / 2;
        shape3.y = 100;
        shape3.touchEnabled = false;
        this.setChildIndex(shape3, this.numChildren - 3);
        shape3.cacheAsBitmap = true;
        //线1
        var line1 = this.line1;
        line1.graphics.lineStyle(10, 0xff00ff);
        line1.graphics.moveTo(0, 0);
        line1.graphics.lineTo(this.stage.stageWidth, 0);
        line1.graphics.endFill();
        line1.x = 0;
        line1.y = 150;
        this.addChild(line1);
        this.setChildIndex(line1, this.numChildren - 3);
        this.removeChild(this.line1);
        line1.cacheAsBitmap = true;
        //线2
        var line2 = this.line2;
        line2.graphics.lineStyle(10, 0xFFFF00);
        line2.graphics.moveTo(0, 0);
        line2.graphics.lineTo(this.stage.stageWidth, 0);
        line2.graphics.endFill();
        line2.x = 0;
        line2.y = this.stage.stageHeight - 110;
        this.addChild(line2);
        this.setChildIndex(line2, this.numChildren - 3);
        line2.cacheAsBitmap = true;
        //线3
        var line3 = this.line3;
        line3.graphics.lineStyle(5, 0xff00ff);
        line3.graphics.moveTo(0, 0);
        line3.graphics.lineTo(50, 0);
        line3.graphics.endFill();
        line3.x = this.shape1.x;
        line3.y = this.shape1.y;
        this.addChild(line3);
        this.setChildIndex(line3, this.numChildren - 3);
        line3.rotation = -90;
        this.removeChild(this.line3);
        //line3.cacheAsBitmap=true;
        this.addEventListener(egret.Event.ENTER_FRAME, this.commonTimeFunc, this);
    };
    Main.prototype.getRandomPos = function (r) {
        return {
            x: r + Math.floor((this.stage.stageWidth - 2 * r) * Math.random()),
            y: r + Math.floor((this.stage.stageHeight - 2 * r) * Math.random())
        };
    };
    Main.prototype.commonTimeFunc = function (evt) {
        //进圈监测
        if (this.balls[0].v > 0) {
            if (Math.abs(this.shape1.x - this.shape3.x) < 20 && Math.abs(this.shape1.y - this.shape3.y) < 20 && !this._inArc) {
                if (this.balls[0].v < 15) {
                    this._moveEnd = true;
                    this.shape1.x = this.shape3.x;
                    this.shape1.y = this.shape3.y;
                    this.balls[0].v = 0;
                    this._inArc = true;
                    //改变颜色
                    this.shape1.graphics.clear();
                    if (this._isyaoed) {
                        this.shape1.graphics.lineStyle(5, 0x696969);
                        this.shape1.graphics.beginFill(0x696969, 1);
                        this.shape1.touchEnabled = false;
                        if (this.score) {
                            this.score--;
                        }
                        this.updateBitmapTextContent();
                        this.updateBitmapTextContent1("-1");
                        this._sound5.play(this._sound5.length, 1);
                        egret.setTimeout(function () {
                            this.resetGame();
                        }, this, 2000);
                    }
                    else {
                        this.shape1.graphics.lineStyle(5, 0xFF0000);
                        this.shape1.graphics.beginFill(0xFF0000, 1);
                        this._sound5.play(this._sound5.length, 1);
                    }
                    this.shape1.graphics.drawCircle(0, 0, 30);
                    this.shape1.graphics.endFill();
                    this._isyaoed = !this._isyaoed;
                }
                else {
                    this.balls[0].ang = this.balls[0].ang + 180;
                }
            }
            if (Math.abs(this.shape1.x - this.shape3.x) > 20 || Math.abs(this.shape1.y - this.shape3.y) > 20) {
                this._inArc = false;
            }
        }
        //碰撞检测
        // if (this.balls[0].v > 0 || this.balls[1].v > 0) {
        if (this.balls[0].v > 0) {
            var bResult = (this.shape1.x - this.shape2.x) * (this.shape1.x - this.shape2.x) + (this.shape1.y - this.shape2.y) * (this.shape1.y - this.shape2.y) <= 3600;
            if (bResult) {
                this.balls[1].ang = this.balls[0].ang;
                this.balls[0].ang = this.balls[0].ang + 180;
                if (this.balls[0].v == 0) {
                    this.balls[0].v = this.balls[1].v / 2;
                    this.iszhudong = false;
                }
                else {
                    this.balls[1].v = 2 * this.balls[0].v;
                }
                this.shape2.scaleX = 0.8;
                this.shape2.rotation = this.balls[1].ang;
                this._sound2.play(1, 1);
                if (this._isyaoed && this.iszhudong) {
                    this.score++;
                    this.updateBitmapTextContent();
                    this.updateBitmapTextContent1("+1");
                    this.balls[0].getScored = true;
                    this._sound4.play(this._sound4.length, 1);
                }
            }
        }
        for (var i = 0; i < this.balls.length; ++i) {
            if (this.balls[i].v > 0) {
                if (this.balls[i].ang == 0) {
                    this.balls[i].ang = 10;
                }
                this.balls[i].y = this.balls[i].y + this.balls[i].v * (Math.sin(this.balls[i].ang * this.c));
                this.balls[i].x = this.balls[i].x + this.balls[i].v * (Math.cos(this.balls[i].ang * this.c));
                //撞墙
                if (this.balls[i].y < this.balls[i].banjing) {
                    this.balls[i].y = this.balls[i].banjing;
                    this.balls[i].ang = -this.balls[i].ang;
                }
                if (this.balls[i].x < this.balls[i].banjing) {
                    this.balls[i].x = this.balls[i].banjing;
                    this.balls[i].ang = 180 - this.balls[i].ang;
                }
                if (this.balls[i].y > this.stage.stageHeight - this.balls[i].banjing) {
                    this.balls[i].y = this.stage.stageHeight - this.balls[i].banjing;
                    this.balls[i].ang = -this.balls[i].ang;
                }
                if (this.balls[i].x > this.stage.stageWidth - this.balls[i].banjing) {
                    this.balls[i].x = this.stage.stageWidth - this.balls[i].banjing;
                    this.balls[i].ang = 180 - this.balls[i].ang;
                }
                //摩擦减速
                this.balls[i].v -= this.balls[i].f;
                if (this.balls[1].scaleX < 1) {
                    this.balls[1].scaleX += 0.1;
                }
                if (this.balls[i].v < 0) {
                    this.balls[i].v = 0;
                    this.balls[i].scaleX = 1;
                    if (i == 0) {
                        if (this.balls[0].getScored) {
                            this.resetGame();
                            this._moveEnd = true;
                            this.balls[0].getScored = false;
                        }
                        else {
                            if (this.iszhudong) {
                                this.getStageRandom();
                            }
                        }
                    }
                }
            }
        }
        this.line3.x = this.balls[0].x;
        this.line3.y = this.balls[0].y;
    };
    Main.prototype.mouseUp = function (evt) {
        console.log("Mouse Up.");
        if (this._touchStatus) {
            //动态计算距离，速度时间
            /*this.timer = new egret.Timer(15, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);*/
            this.iszhudong = true;
            //初始速度计算
            this.balls[0].v = 10 + Math.floor(10 * (1 - this.balls[0].scaleX));
            //this.timer.start();
            this._moveEnd = false;
            this.removeChild(this.line3);
            this._sound1.play(1, 1);
            //碰撞检测
            // var bResult:boolean=this.shape1.hitTestPoint(this.shape2.x, this.shape2.y, false);
        }
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    Main.prototype.resetGame = function () {
        this.shape1.graphics.clear();
        this.shape1.graphics.beginFill(0x000000, 1);
        this.shape1.graphics.lineStyle(5, 0x000000);
        this.shape1.graphics.drawCircle(0, 0, 30);
        this.shape1.graphics.endFill();
        this.shape1.touchEnabled = true;
        this.shape1.x = this.stage.stageWidth / 2 - 60;
        this.shape1.y = this.stage.stageHeight - 60;
        this.shape2.x = this.stage.stageWidth / 2 + 60;
        this.shape2.y = this.stage.stageHeight - 60;
        this.line3.x = this.shape1.x;
        this.line3.y = this.shape1.y;
        this._isyaoed = false;
        this._moveEnd = true;
    };
    Main.prototype.radomShape2 = function () {
        if (Math.abs(this._randomPoint.x - this.shape3.x) < 80 && Math.abs(this._randomPoint.y - this.shape3.y) < 80) {
            this.getStageRandom();
        }
        console.info('大海');
        /*let tw = egret.Tween.get(this.shape2);
        tw.wait(500).to({ "x": this._randomPoint.x, "y": this._randomPoint.y }, 1000, egret.Ease.quartOut).call(() => {
            this._moveEnd = true;
        });*/
        var ang = 0;
        ang = Math.atan2((this._randomPoint.y - this.shape2.y), (this._randomPoint.x - this.shape2.x)) / this.c;
        this.shape2.ang = ang;
        this.shape2.v = 30;
        this._moveEnd = true;
    };
    Main.prototype.getStageRandom = function () {
        this._randomPoint.x = 30 + Math.floor((this.stage.stageWidth - 60) * Math.random());
        this._randomPoint.y = 30 + Math.floor((this.stage.stageHeight - 60) * Math.random());
        this.radomShape2();
    };
    Main.prototype.timerFunc3 = function (event) {
        if (this._touchStatus) {
            this.shape1.scaleX -= 0.01;
            this.shape1.rotation = this.balls[0].ang;
            if (this.shape1.scaleX < 0.4) {
                this.shape1.scaleX = 0.4;
            }
        }
        else {
            this.shape1.scaleX += 0.05;
            this.shape1.rotation = this.balls[0].ang;
            if (this.shape1.scaleX > 1) {
                this.shape1.scaleX = 1;
                this.timer3.stop();
            }
        }
        //event.updateAfterEvent();
    };
    Main.prototype.mouseDown = function (evt) {
        if (this._moveEnd) {
            console.log("Mouse Down.");
            this._touchStatus = true;
            this._touchePoint.x = evt.stageX;
            this._touchePoint.y = evt.stageY;
            this.balls[0].ang = this.getTouchAngle(this.balls[0]);
            this.line3.rotation = this.balls[0].ang;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.addChild(this.line3);
            //延迟计算幅度
            // egret.setTimeout(function () {
            //     this.timer3 = new egret.Timer(15, 0);
            //     this.timer3.addEventListener(egret.TimerEvent.TIMER, this.timerFunc3, this);
            //     //this.timer3.start();
            // }, this, 200);
        }
    };
    Main.prototype.mouseMove = function (evt) {
        if (this._touchStatus) {
            this._touchePoint.x = evt.stageX;
            this._touchePoint.y = evt.stageY;
            var ann = this.balls[0].ang = this.getTouchAngle(this.balls[0]);
            this.line3.rotation = ann;
            console.info(ann);
        }
    };
    Main.prototype.getTouchAngle = function (sp) {
        var ang = 0;
        ang = Math.atan2((this._touchePoint.y - sp.y), (this._touchePoint.x - sp.x)) / this.c;
        return ang;
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, _sound1, sound2, sound4, sound5, sound3, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        _sound1 = this._sound1 = new egret.Sound();
                        this._sound1 = RES.getRes("fashe_mp3");
                        sound2 = this._sound2 = new egret.Sound();
                        this._sound2 = RES.getRes("pengzhuang_mp3");
                        sound2.addEventListener(egret.Event.COMPLETE, function (e) {
                            this._sound2.play(this._sound2.length, 1);
                        }, this);
                        sound4 = this._sound4 = new egret.Sound();
                        this._sound4 = RES.getRes("win_mp3");
                        sound5 = this._sound5 = new egret.Sound();
                        this._sound5 = RES.getRes("jinquan_mp3");
                        sound3 = this._sound3 = new egret.Sound();
                        sound3.load("resource/assets/background" + Math.floor(3 * Math.random()) + ".mp3");
                        sound3.addEventListener(egret.Event.COMPLETE, function (e) {
                            this._sound3.play(this._sound3.length, 99999999);
                        }, this);
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.onLoadFontComplete = function (font) {
        this._bitmapText = new egret.BitmapText();
        this._bitmapText.font = font;
        this._bitmapText.x = 10;
        this._bitmapText.y = 10;
        this._bitmapText.scaleX = this._bitmapText.scaleY = 2;
        this.addChild(this._bitmapText);
        this.updateBitmapTextContent();
        this._bitmapText1 = new egret.BitmapText();
        this._bitmapText1.font = font;
        this._bitmapText1.lineSpacing = 10;
        this._bitmapText1.x = this.stage.stageWidth / 2 - 70;
        this._bitmapText1.y = 230;
        this._bitmapText1.scaleX = this._bitmapText1.scaleY = 4;
        this.addChild(this._bitmapText1);
        this._bitmapText1.alpha = 0;
        this.updateBitmapTextContent1(" ");
    };
    Main.prototype.updateBitmapTextContent1 = function (str) {
        this._bitmapText1.text = str;
        var tw = egret.Tween.get(this._bitmapText1);
        tw.to({ "alpha": 1 }, 200);
        tw.wait(2000);
        tw.to({ "alpha": 0 }, 200);
    };
    Main.prototype.updateBitmapTextContent = function () {
        this._bitmapText.text = this.score.toString();
        platform.setMyscore(this.score);
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map