function MUX_f() {

    MUX_f.prototype.define = function MUX_f() {
        this.in = 2;
        var arr = [];
        arr.push(math.range(-1, -this.in, -1, true)._data);

        var model = scicos_model();
        model.sim = list(new ScilabString(["mux"]), new ScilabDouble([1]));
        model.in = new ScilabDouble(...math.transpose(arr));
        model.out = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([this.in]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.in]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MUX_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([0.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MUX_f.prototype.get = function MUX_f() {
        var options = {
            in:["number of input ports or vector of sizes",this.in]
        }
        return options
    }
    MUX_f.prototype.set = function MUX_f() {
        var temp_in = arguments[0]["in"];
        var in_1 = inverse(temp_in);

        if(size(in_1,"*")==1 ){
            if(in_1 < 2 || in_1 > 8){
                alert("Block must have at least two input ports and at most 8");
                throw "incorrect";
            }
        }else{
            if(size(in_1,"*")<2| or(in_1==0)|size(in_1,"*")>8){
                alert("Block must have at least two input ports and at most 8. Size 0 is not allowed.");
                throw "incorrect";
            }
        }
        if(size(in_1,"*") == 1){
            var n = in_1[0];
            this.inp = [];
            for (var i = 1; i <= n; i++ ) {
                this.inp.push([-1*i]);
            }
            var io = check_io(this.x.model,this.x.graphics,this.inp,0,[],[]);
        }else{
            this.nout = sum(in_1);
            var io = check_io(this.x.model,this.x.graphics,in_1,this.nout,[],[]);
        }
        this.in = temp_in;
        this.x.model.out = new ScilabDouble([0]);
        this.x.model.ipar = new ScilabDouble(...in_1);
        var exprs = new ScilabString([this.in]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    MUX_f.prototype.details = function MUX_f(){
        return this.x;
    }
    MUX_f.prototype.get_popup_title = function MUX_f(){
        var set_param_popup_title = "Set MUX block parameters";
        return set_param_popup_title
    }
    MUX_f.prototype.getDimensionForDisplay = function MUX_f(){
        var dimension = { width: 10, height: 40 };
        return dimension
    }

}
