function CONSTRAINT_c() {

    CONSTRAINT_c.prototype.define = function CONSTRAINT_c() {

        this.x0 = [[0],[0]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["constraint_c"]), new ScilabDouble([10004]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([0]);
        model.state = new ScilabDouble(...this.x0);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([0]);
        this.displayParameter = ["0"];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONSTRAINT_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CONSTRAINT_c.prototype.details = function CONSTRAINT_c() {
        return this.x;
    }
CONSTRAINT_c.prototype.get = function CONSTRAINT_c() {
        var options={
            x0:["Initial guess values",this.x0.toString().replace(/,/g," ")],
        }
        return options
    }
CONSTRAINT_c.prototype.set = function CONSTRAINT_c() {
    this.x0 = inverse(arguments[0]["x0"])
    this.x0 = transpose(this.x0)
    this.N = size(this.x0,"*")
    if(this.N<=0){
                alert("number of states (constraints) must be > 0 ");
                CONSTRAINT_c.get();
    }
    this.x.model.state = new ScilabDouble(...this.x0,...zeros(this.N,1))
    this.x.model.out = new ScilabDouble([this.N])
    this.x.model.in = new ScilabDouble([this.N])
    this.ones = ones(this.N,1)
    for (var i = this.ones.length - 1; i >= 0; i--) {
        this.ones[i] = -1*this.ones[i];
    }
    this.x.model.ipar = new ScilabDouble(...this.ones);
    var exprs = new ScilabString([this.x0.toString().replace(/,/g, " ")])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    CONSTRAINT_c.prototype.get_popup_title = function CONSTRAINT_c() {
        var set_param_popup_title="Set Constraint block parameters";
        return set_param_popup_title
    }

}
