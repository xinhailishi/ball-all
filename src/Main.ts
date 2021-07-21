
class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }

    private _randomPoint: egret.Point = new egret.Point();
    private _sound5: egret.Sound; //输的声音
    private _sound4: egret.Sound; //赢的声音
    private _sound3: egret.Sound; //背景音乐
    private _sound2: egret.Sound; //碰撞声音
    private _sound1: egret.Sound; //发射声音
    private timer: egret.Timer;
    private timer2: egret.Timer;
    private timer3: egret.Timer;
    private score: number = 0; //分数
    private v1: number = 20;
    private v2: number = 0;
    private ang: number = 0;
    private ang2: number = 0;
    private c: number = 0.017453292; //2PI/360
    private _distance: egret.Point = new egret.Point();
    private _touchePoint: egret.Point = new egret.Point();
    private _isyaoed: boolean = false;     //是否进过圈了
    private _inArc: boolean = false;       //是否在圈里
    private _moveEnd: boolean = true;       //移动结束状态
    private _touchStatus: boolean = false;              //当前触摸状态，按下时，值为true
    private textfield: egret.TextField;
    private shape1: Ball = new Ball();
    private shape2: Ball = new Ball();
    private shape3: egret.Shape = new egret.Shape();
    private line1: egret.Shape = new egret.Shape();
    private line2: egret.Shape = new egret.Shape();
    private line3: egret.Shape = new egret.Shape();
    private _bitmapText: egret.BitmapText;
    private _bitmapText1: egret.BitmapText;

    private iszhudong: boolean = true;//是否主动状态

    private balls: Array<Ball> = [];//所有球的列表

    private addToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {

        await this.loadResource();
        //this.createGameScene();
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);

        this.drawTip();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        this.score = await platform.getMyScore();
        console.log(userInfo);

    }
    private drawTip(): void {
        var text: egret.TextField = new egret.TextField();
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


    }

    private drawBase(): void {
        RES.getResByUrl("resource/assets/cartoon-font.fnt", this.onLoadFontComplete, this,
            RES.ResourceItem.TYPE_FONT);

        //很厉害的解决微信小游戏闪屏
        //this.stage.frameRate = 80;
         this.stage.frameRate = 40;
        //背景色
        var shape0: egret.Shape = new egret.Shape();;
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
        var shape1: Ball = this.shape1 = new Ball(30, 0x000000, 0, 0, 0.1);
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
        var shape2: Ball = this.shape2 = new Ball(30, 0xFFFFF0, 0, 0, 0.4);
        this.addChild(shape2);
        this.balls.push(shape2);

        shape2.x = this.stage.stageWidth / 2 + shape2.banjing;
        shape2.y = this.stage.stageHeight - 2 * shape2.banjing;
        shape2.touchEnabled = true;
        this.setChildIndex(shape2, this.numChildren - 2);
        shape2.cacheAsBitmap = true;


        //圆3
        var shape3: egret.Shape = this.shape3;
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
        let line1 = this.line1;
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
        let line2 = this.line2;
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
        let line3 = this.line3;
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
    }
    private getRandomPos(r) {
        return {
            x: r + Math.floor((this.stage.stageWidth - 2 * r) * Math.random()),
            y: r + Math.floor((this.stage.stageHeight - 2 * r) * Math.random())
        }
    }
    private commonTimeFunc(evt: egret.Event) {

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

                    } else {
                        this.shape1.graphics.lineStyle(5, 0xFF0000);
                        this.shape1.graphics.beginFill(0xFF0000, 1);
                        this._sound5.play(this._sound5.length, 1);
                    }
                    this.shape1.graphics.drawCircle(0, 0, 30);
                    this.shape1.graphics.endFill();
                    this._isyaoed = !this._isyaoed;
                } else {
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
            var bResult: boolean = (this.shape1.x - this.shape2.x) * (this.shape1.x - this.shape2.x) + (this.shape1.y - this.shape2.y) * (this.shape1.y - this.shape2.y) <= 4900
            if (bResult) {
                this.balls[1].ang = this.balls[0].ang;
                this.balls[0].ang = this.balls[0].ang + 180;

                if (this.balls[0].v == 0) {
                    this.balls[0].v = this.balls[1].v / 2;
                    this.iszhudong=false;
                } else {
                    this.balls[1].v = 2 * this.balls[0].v;
                }


                this.shape2.scaleX = 0.8;
                this.shape2.rotation = this.balls[1].ang;
                //this._sound2.play(1, 1);
                if (this._isyaoed&&this.iszhudong) {
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
                    this.balls[i].ang = 10
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
                        } else {
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

    }


    private mouseUp(evt: egret.TouchEvent) {
        console.log("Mouse Up.");
        if (this._touchStatus) {
            //动态计算距离，速度时间
            /*this.timer = new egret.Timer(15, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);*/
            this.iszhudong=true;
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
    }
    private resetGame() {
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

    }
    private radomShape2() {
        if (Math.abs(this._randomPoint.x - this.shape3.x) < 80 && Math.abs(this._randomPoint.y - this.shape3.y) < 80) {
            this.getStageRandom();
        }
        console.info('大海');
        /*let tw = egret.Tween.get(this.shape2);
        tw.wait(500).to({ "x": this._randomPoint.x, "y": this._randomPoint.y }, 1000, egret.Ease.quartOut).call(() => {
            this._moveEnd = true;
        });*/
        var ang: number = 0;
        ang = Math.atan2((this._randomPoint.y - this.shape2.y), (this._randomPoint.x - this.shape2.x)) / this.c;
        this.shape2.ang = ang;
        this.shape2.v = 30;
        this._moveEnd = true;

    }
    private getStageRandom() {
        this._randomPoint.x = 30 + Math.floor((this.stage.stageWidth - 60) * Math.random());
        this._randomPoint.y = 30 + Math.floor((this.stage.stageHeight - 60) * Math.random());
        this.radomShape2();
    }
    private timerFunc3(event: egret.TimerEvent) {
        if (this._touchStatus) {
            this.shape1.scaleX -= 0.01;
            this.shape1.rotation = this.balls[0].ang;
            if (this.shape1.scaleX < 0.4) {
                this.shape1.scaleX = 0.4;
            }
        } else {
            this.shape1.scaleX += 0.05;
            this.shape1.rotation = this.balls[0].ang;
            if (this.shape1.scaleX > 1) {
                this.shape1.scaleX = 1;
                this.timer3.stop();
            }
        }
        //event.updateAfterEvent();
    }

    private mouseDown(evt: egret.TouchEvent) {
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
            //     this.timer3 = new egret.Timer(300, 0);
            //     this.timer3.addEventListener(egret.TimerEvent.TIMER, this.timerFunc3, this);
            //     this.timer3.start();
            // }, this, 200);

        }
    }

    private mouseMove(evt: egret.TouchEvent) {
        if (this._touchStatus) {
            this._touchePoint.x = evt.stageX;
            this._touchePoint.y = evt.stageY;
            var ann: number = this.balls[0].ang = this.getTouchAngle(this.balls[0]);
            this.line3.rotation = ann;
            console.info(ann);
        }
    }
    private getTouchAngle(sp: egret.Shape): number {
        var ang: number = 0;
        ang = Math.atan2((this._touchePoint.y - sp.y), (this._touchePoint.x - sp.x)) / this.c;
        return ang;
    }
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);


            var _sound1: egret.Sound = this._sound1 = new egret.Sound();
            this._sound1 = RES.getRes("fashe_mp3");


            var sound2: egret.Sound = this._sound2 = new egret.Sound();
            this._sound2 = RES.getRes("pengzhuang_mp3");
            sound2.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
                this._sound2.play(this._sound2.length, 1);
            }, this);

            var sound4: egret.Sound = this._sound4 = new egret.Sound();
            this._sound4 = RES.getRes("win_mp3");

            var sound5: egret.Sound = this._sound5 = new egret.Sound();
            this._sound5 = RES.getRes("jinquan_mp3");

            var sound3: egret.Sound = this._sound3 = new egret.Sound();
            sound3.load("resource/assets/background" + Math.floor(3 * Math.random()) + ".mp3");
            sound3.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
                this._sound3.play(this._sound3.length, 99999999);
            }, this);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }


    private onLoadFontComplete(font: egret.BitmapFont): void {
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
    }
    private updateBitmapTextContent1(str: string) {
        this._bitmapText1.text = str;
        let tw = egret.Tween.get(this._bitmapText1);
        tw.to({ "alpha": 1 }, 200);
        tw.wait(2000);
        tw.to({ "alpha": 0 }, 200);


    }
    private updateBitmapTextContent() {
        this._bitmapText.text = this.score.toString();
        platform.setMyscore(this.score);

    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;


    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}