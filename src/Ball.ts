class Ball extends egret.Shape {
    
    public banjing:number=30;
    public ang:number = 20;
    public v:number=0;
    public weight:number=1;
    public f:number=0.1;
    public getScored:boolean=false;
    public constructor(banjing: number = 30, color: number=0x000000, x: number = 0, y: number = 0,f:number=0.2) {
        super();
        this.f=f;
        this.banjing=banjing;
        this.graphics.beginFill(color, 1);
        //this.graphics.lineStyle(5, color);
        this.graphics.drawCircle(x, y, banjing);
        this.graphics.endFill();
    }
    static getRandomColor(): number {
       /* var a, b = [], c = "0x";
        for (var i = 0; i < 6; i++) {
            a = Math.ceil(Math.random() * 16).toString(16).toLocaleUpperCase();
            b[i] = a;
            c += b[i];
        }
        return c;*/
        return 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100)
    }
    //private 
}