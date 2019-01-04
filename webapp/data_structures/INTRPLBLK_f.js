function INTRPLBLK_f() {

    INTRPLBLK_f.prototype.define = function INTRPLBLK_f() {
        this.a = [[0],[1]];

        this.b = [[0],[1]];

        var model = scicos_model();
        model.sim = new ScilabString(["intrpl"]);
        model.in = new ScilabDouble(1);
        model.out = new ScilabDouble(1);
        model.rpar = new ScilabDouble(...colon_operator(this.a),...colon_operator(this.b));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true,false]);

        var exprs = new ScilabString([sci2exp(this.a)], [sci2exp(this.b)]);

        var gr_i = ["xstringb(orig(1),orig(2),\"INTRPLBLK_f\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([2,2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    INTRPLBLK_f.prototype.details = function INTRPLBLK_f() {
        return this.x;
    }
INTRPLBLK_f.prototype.get = function INTRPLBLK_f() {
        var options={
            a:["X coord.",sci2exp(this.a)],
            b:["Y coord.",sci2exp(this.b)],
        }
        return options
    }
INTRPLBLK_f.prototype.set = function INTRPLBLK_f() {
    this.a = MatrixInverse(arguments[0]["a"])
    this.b = MatrixInverse(arguments[0]["b"])
    if(size(this.a,"*")!=size(this.b,"*")){
        alert("X and Y must have the same size");
        INTRPLBLK_f.get();
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
                INTRPLBLK_f.get();
            }
    }
    /*if(size(this.b,1)>1){
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
        }*/
    this.x.model.rpar = new ScilabDouble(...colon_operator(this.a),...colon_operator(this.b))
    var exprs = new ScilabString([sci2exp(this.a)],[sci2exp(this.b)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    INTRPLBLK_f.prototype.get_popup_title = function INTRPLBLK_f() {
        var set_param_popup_title="Set Interpolation block parameters";
        return set_param_popup_title
    }
    INTRPLBLK_f.prototype.getDimensionForDisplay = function INTRPLBLK_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
