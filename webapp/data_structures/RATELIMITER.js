function RATELIMITER() {

    RATELIMITER.prototype.define = function RATELIMITER() {
        this.minp = -1;
        this.maxp = 1;
        this.rpar = [[this.maxp], [this.minp]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["ratelimiter"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.rpar);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.maxp], [this.minp]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RATELIMITER\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RATELIMITER.prototype.details = function RATELIMITER() {
        return this.x;
    }
    RATELIMITER.prototype.get = function RATELIMITER() {
        var options={
            maxp:["max slope",this.maxp],
            minp:["min slope",this.minp],
        }
        return options
    }
    RATELIMITER.prototype.set = function RATELIMITER() {
    this.maxp = parseFloat((arguments[0]["maxp"]))
    this.minp = parseFloat((arguments[0]["minp"]))
    if((this.maxp<=this.minp)||(this.maxp<=0)||(this.minp>=0)){
                alert("We must have max_slope> 0 > min_slope.");
                RATELIMITER.get();
    }
    var rpar = new ScilabDouble([this.maxp],[this.minp])
    this.x.model.rpar = new ScilabDouble(...this.rpar);
    var exprs = new ScilabString([this.maxp],[this.minp])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    RATELIMITER.prototype.get_popup_title = function RATELIMITER() {
        var set_param_popup_title="Set rate limiter parameters";
        return set_param_popup_title
    }
    RATELIMITER.prototype.getDimensionForDisplay = function RATELIMITER(){
        var dimension = { width: 70, height: 40 };
        return dimension
    }
}
