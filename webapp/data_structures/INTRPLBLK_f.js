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
        var options = {
            a:["X coord.",this.a],
            b:["Y coord.",this.b],
        }
        return options
    }
    INTRPLBLK_f.prototype.set = function INTRPLBLK_f() {
        var temp_a = arguments[0]["a"];
        var temp_b = arguments[0]["b"];
        var a_1 = inverse(temp_a);
        var b_1 = inverse(temp_a);
        if(size(a_1,"*") != size(b_1,"*")){
            alert("X and Y must have the same size");
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
        this.a = temp_a;
        this.b = temp_b;
        this.x.model.rpar = new ScilabDouble(...colon_operator(a_1),...colon_operator(a_1));
        var exprs = new ScilabString([this.a],[this.b]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    INTRPLBLK_f.prototype.get_popup_title = function INTRPLBLK_f() {
        var set_param_popup_title = "Set Interpolation block parameters";
        return set_param_popup_title
    }
    INTRPLBLK_f.prototype.getDimensionForDisplay = function INTRPLBLK_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
