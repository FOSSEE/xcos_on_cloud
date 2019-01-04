function TIME_DELAY() {

    TIME_DELAY.prototype.define = function TIME_DELAY() {
        this.nin = 1;
        this.T = 1;
        this.init = 0;
        this.N = 1024;

        var model = scicos_model();
        model.sim = list(new ScilabString(["time_delay"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.nin]);
        model.out = new ScilabDouble([this.nin]);
        model.rpar = new ScilabDouble([this.T, this.init]);
        model.ipar = new ScilabDouble([this.N]);
        model.blocktype = new ScilabString(["x"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([this.T], [this.init], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TIME_DELAY\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TIME_DELAY.prototype.details = function TIME_DELAY() {
        return this.x;
    }
    TIME_DELAY.prototype.get = function TIME_DELAY() {
        var options={
            T:["Delay",this.T],
            init:["initial input",this.init],
            N:["Buffer size",this.N],
        }
        return options
    }
    TIME_DELAY.prototype.set = function TIME_DELAY() {
    this.T = parseInt((arguments[0]["T"]))
    this.init = parseInt((arguments[0]["init"]))
    this.N = parseInt((arguments[0]["N"]))
    if(this.N<2){
                alert("Buffer must be larger than 2");
                TIME_DELAY.get();
    }
            if(this.T<=0){
                alert("Delay must be positive");
                TIME_DELAY.get();
            }

    var io = check_io(this.x.model,this.x.graphics,[-1],[-1],[],[])

    this.x.model.rpar = new ScilabDouble([this.T],[this.init])
    this.x.model.ipar = new ScilabDouble([this.N]);
    this.x.model.dep_ut = new ScilabBoolean(false,true)
    var exprs = new ScilabString([this.T],[this.init],[this.N])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    TIME_DELAY.prototype.get_popup_title = function TIME_DELAY() {
        var set_param_popup_title="Set delay parameters";
        return set_param_popup_title
    }
    TIME_DELAY.prototype.getDimensionForDisplay = function TIME_DELAY(){
        var dimension = { width: 70, height: 40 };
        return dimension
    }

}
