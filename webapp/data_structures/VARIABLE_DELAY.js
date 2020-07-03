function VARIABLE_DELAY() {

    VARIABLE_DELAY.prototype.define = function VARIABLE_DELAY() {
        this.nin = 1;
        this.T = 1;
        this.init = 0;
        this.N = 1024;

        var model = scicos_model();
        model.sim = list(new ScilabString(["variable_delay"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.nin], [1]);
        model.out = new ScilabDouble([this.nin]);
        model.rpar = new ScilabDouble([this.T, this.init]);
        model.ipar = new ScilabDouble([this.N]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.T], [this.init], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"VARIABLE_DELAY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    VARIABLE_DELAY.prototype.details = function VARIABLE_DELAY() {
        return this.x;
    }
    VARIABLE_DELAY.prototype.get = function VARIABLE_DELAY() {
        var options={
            T:["Max delay",this.T],
            init:["initial input",this.init],
            N:["Buffer size",this.N],
        }
        return options
    }
    VARIABLE_DELAY.prototype.set = function VARIABLE_DELAY() {
        this.T = parseFloat((arguments[0]["T"]))
        this.init = parseFloat((arguments[0]["init"]))
        this.N = parseFloat((arguments[0]["N"]))
        if(this.N<2){
                alert("Buffer must be larger than 2");
                throw "incorrect";
        }
            if(this.T<=0){
                alert("Delay must be positive");
                throw "incorrect";
            }
        var io = check_io(this.x.model,this.x.graphics,[[-1],[1]],[-1],[],[])
        this.x.model.rpar = new ScilabDouble([this.T],[this.init])
        this.x.model.ipar = new ScilabDouble([this.N]);
        var exprs = new ScilabString([this.T],[this.init],[this.N])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    VARIABLE_DELAY.prototype.get_popup_title = function VARIABLE_DELAY() {
        var set_param_popup_title="Set delay parameters";
        return set_param_popup_title
    }
    VARIABLE_DELAY.prototype.getDimensionForDisplay = function VARIABLE_DELAY(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
