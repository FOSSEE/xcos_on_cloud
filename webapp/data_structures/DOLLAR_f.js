function DOLLAR_f() {

    DOLLAR_f.prototype.define = function DOLLAR_f() {
        this.z = 0;
        this.inh = 0;
        this.in1 = 1;

        var model = scicos_model();
        model.sim = new ScilabString(["dollar"]);
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1 - this.inh]);
        model.dstate = new ScilabDouble([this.z]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.z], [this.inh]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DOLLAR_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DOLLAR_f.prototype.details = function DOLLAR_f() {
        return this.x;
    }
    DOLLAR_f.prototype.get = function DOLLAR_f() {
    if(this.a == undefined || this.a == null){
        this.a = "0"
    }
        var options={
            a:["initial condition",this.a.toString().replace(/,/g," ")],
            inh:["Inherit (no:0, yes:1)",this.inh.toString().replace(/,/g," ")],
        }
        return options
    }
    DOLLAR_f.prototype.set = function DOLLAR_f() {
    this.a = inverse(arguments[0]["a"])
    this.inh = inverse(arguments[0]["inh"])
    this.out = size(this.a,"*")

    var io =check_io(this.x.model,this.x.graphics,[-1],[-1],ones(1-this.inh,1),[])

    if(this.out == 0){
        this.out = []
        this.x.model.in = new ScilabDouble()
        this.x.model.out = new ScilabDouble()
    }else{
        this.in = this.out
        this.x.model.in = new ScilabDouble([this.in]);
        this.x.model.out = new ScilabDouble([this.out])
    }
    this.x.model.dstate = new ScilabDouble(...this.a);
    var exprs = new ScilabString([this.a.toString().replace(/,/g, " ")],[this.inh.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    DOLLAR_f.prototype.get_popup_title = function DOLLAR_f() {
        var set_param_popup_title="Set 1/z block parameters";
        return set_param_popup_title
    }
    DOLLAR_f.prototype.getDimensionForDisplay = function DOLLAR_f(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
