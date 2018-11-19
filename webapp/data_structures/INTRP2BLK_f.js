function INTRP2BLK_f() {

    INTRP2BLK_f.prototype.define = function INTRP2BLK_f() {
        this.a = [[0],[1]];
        this.b = [[0],[1]];
        this.c = [[0,1],[1,2]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["intrp2"]), new ScilabDouble([1]));
        model.in = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...colon_operator(this.a),...colon_operator(this.b),...colon_operator(this.c));
        model.ipar = new ScilabDouble([2], [2]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.a)], [sci2exp(this.b)], [sci2exp(this.c)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTRP2BLK_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTRP2BLK_f.prototype.details = function INTRP2BLK_f() {
        return this.x;
    }
INTRP2BLK_f.prototype.get = function INTRP2BLK_f() {
        var options={
            a:["X coord.",sci2exp(this.a)],
            b:["Y coord.",sci2exp(this.b)],
            c:["Z values",sci2exp(this.c)],
        }
        return options
    }
INTRP2BLK_f.prototype.set = function INTRP2BLK_f() {
    this.a = MatrixInverse(arguments[0]["a"])
    this.b = MatrixInverse(arguments[0]["b"])
    this.c = MatrixInverse(arguments[0]["c"])
    if((size(this.a,"*")!=size(this.c,"c"))||(size(this.b,"*")!=size(this.c,"r"))){
        alert("incompatible dimension");
        INTRP2BLK_f.get();
    }
    if(size(this.a,1)>1){
    var m=0;
    for(var i=0;i<size(this.a,1)-1;i++)
    {
        if((this.a[i+1][0]-this.a[i][0])<=0){
            m=1;
            break;
        }

    }
    if(m==1){
                alert("X must be strictly increasing");
                INTRP2BLK_f.get();
            }
    }
    if(size(this.b,1)>1){
    var n=0;
    for(var i=1;i<size(this.b,1)-1;i++)
    {
        if((this.b[i+1][0]-this.b[i][0])<=0)
        {
            n=1;
            break;
        }
    }

            if(n==1){
                alert("Y must be strictly increasing");
                INTRP2BLK_f.get();
            }
        }
    this.x.model.rpar = new ScilabDouble(...colon_operator(this.a),...colon_operator(this.b),...colon_operator(this.c))
    this.x.model.ipar = new ScilabDouble([this.a.length],[this.b.length])
    var exprs = new ScilabString([sci2exp(this.a)],[sci2exp(this.b)],[sci2exp(this.c)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    INTRP2BLK_f.prototype.get_popup_title = function INTRP2BLK_f() {
        var set_param_popup_title="Set Interpolation block parameters";
        return set_param_popup_title
    }
    INTRP2BLK_f.prototype.getDimensionForDisplay = function INTRP2BLK_f(){
        var dimension = [60,40];
        return dimension
    }

}
