
class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.createView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private textField: egret.TextField;
    private onAddToStage(event: egret.Event) {
        this.textField.width =this.stage.stageWidth;
        this.textField.height =this.stage.stageHeight;  
    }
    private createView(): void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        //0xff0000
        this.textField.textColor = 0xffffff;
        
        this.textField.size = 80;
        this.textField.width = 500||this.stage.stageWidth;
        this.textField.height = 300||this.stage.stageHeight;
        this.textField.textAlign = egret.HorizontalAlign.CENTER;
        this.textField.verticalAlign=egret.VerticalAlign.MIDDLE;
    }

    public onProgress(current: number, total: number): void {
        this.textField.text = `加载中...${current}/${total}`;
    }
}
