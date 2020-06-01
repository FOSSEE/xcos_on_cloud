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
        var options = {
            a:["X coord.",this.a],
            b:["Y coord.",this.b],
            c:["Z values",this.c],
        }
        return options
    }
    INTRP2BLK_f.prototype.set = function INTRP2BLK_f() {
        var temp_a = arguments[0]["a"];
        var temp_b = arguments[0]["b"];
        var temp_c = arguments[0]["c"];
        var a_1 = inverse(temp_a);
        var b_1 = inverse(temp_b);
        var c_1 = inverse(temp_c);
        if((size(a_1,"*") != size(c_1,"c")) || (size(b_1,"*") != size(c_1,"r"))){
            alert("incompatible dimension");
            throw "incorrect";
        }
        if(size(a_1,1) > 1){
            var m = 0;
            for(var i = 0; i < size(a_1,1)-1; i++)
            {
                if((a_1[i+1][0]-a_1[i][0]) <= 0){
                    m = 1;
                    break;
                }

            }
            if(m == 1){
                alert("X must be strictly increasing");
                throw "incorrect";
            }
        }
        if(size(b_1,1) > 1){
            var n = 0;
            for(var i = 1;i < size(b_1,1)-1; i++)
            {
                if((b_1[i+1][0]-b_1[i][0]) <= 0)
                {
                    n = 1;
                    break;
                }
            }

            if(n == 1){
                alert("Y must be strictly increasing");
                throw "incorrect";
            }
        }
        this.a = temp_a;
        this.b = temp_b;
        this.c = temp_c;
        this.x.model.rpar = new ScilabDouble(...colon_operator(a_1),...colon_operator(b_1),...colon_operator(c_1));
        this.x.model.ipar = new ScilabDouble([a_1.length],[b_1.length]);
        var exprs = new ScilabString([this.a],[this.b],[this.c]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    INTRP2BLK_f.prototype.get_popup_title = function INTRP2BLK_f() {
        var set_param_popup_title = "Set Interpolation block parameters";
        return set_param_popup_title
    }
    INTRP2BLK_f.prototype.getDimensionForDisplay = function INTRP2BLK_f(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
