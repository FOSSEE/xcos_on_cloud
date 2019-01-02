function MUX() {

    MUX.prototype.define = function MUX() {
        this.in = 2;
        var arr = [];
        arr.push(math.range(-1, -this.in, -1, true)._data);

        var model = scicos_model();
        model.sim = list(new ScilabString(["multiplex"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...math.transpose(arr));
        model.out = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([this.in]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.in]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"MUX\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    MUX.prototype.details = function MUX() {
        return this.x;
    }
    MUX.prototype.get = function MUX() {
        var options={
            in:["number of input ports or vector of sizes",this.in.toString()]
        }
        return options
    }
MUX.prototype.set = function MUX() {
    this.in = inverse(arguments[0]["in"] || arguments[0]["inp"])        // 'in' is a reserved word therefore inp is used in case of importing
    if(size(this.in,"*")==1 ){
        if(this.in<2||this.in>31){
            alert("Block must have at least two input ports and at most 31");
                MUX.get();
        }
    }
    else{
        if(size(this.in,"*")<2| or(this.in==0)|size(this.in,"*")>31){
            alert("Block must have at least two input ports and at most 31. Size 0 is not allowed.");
            MUX.get();
        }
    }
    if(size(this.in,"*") == 1){
        var n = this.in[0]
        this.inp = []
        for (var i = 1; i <= n; i++ ) {
            this.inp.push([-1*i])
        }
        var io = check_io(this.x.model,this.x.graphics,this.inp,0,[],[])
    }
    else{
        this.nout = sum(this.in)
        var io = check_io(this.x.model,this.x.graphics,this.in,this.nout,[],[])
    }
    this.x.model.out = new ScilabDouble([0]);
    this.x.model.ipar = new ScilabDouble(...this.in)
    var exprs = new ScilabString([this.in.toString()])
    this.x.graphics.exprs = exprs
    return new BasicBlock(this.x)
}
MUX.prototype.get_popup_title = function MUX() {
        var set_param_popup_title="Set MUX block parameters";
        return set_param_popup_title
    }
    MUX.prototype.getDimensionForDisplay = function MUX(){
        var dimension = { width: 10, height: 40 };
        return dimension
    }
}
