function Counter() {

    Counter.prototype.define = function Counter() {
        this.minim = 0;
        this.maxim = 2;
        this.rule = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["counter"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([0]);
        model.ipar = new ScilabDouble([this.rule], [this.maxim], [this.minim]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.minim], [this.maxim], [this.rule]);
        this.displayParameter=[[this.minim],[this.maxim]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Counter\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    Counter.prototype.details = function Counter() {
        return this.x;
    }
    Counter.prototype.get = function Counter() {
        var options={
            minim:["Minimum",this.minim],
            maxim:["MAximum",this.maxim],
            rule:["Rule (1:Increment, 2:Decrement)",this.rule]
        }
        return options
    }
Counter.prototype.set = function Counter() {
    this.minim = parseFloat((arguments[0]["minim"]))
    this.maxim = parseFloat((arguments[0]["maxim"]))
    this.rule = parseFloat((arguments[0]["rule"]))
    this.maxim = Math.floor(this.maxim)
    this.minim = Math.floor(this.minim)
    if(this.maxim<this.minim){
        alert("Wrong values for ''Maximum'' and ''Minimum'' parameters: "+this.minim+" "+this.maxim+"\n''Minimum'' must be less than ''Maximum''.");
        Counter.get();
    }
    if((this.rule!=1)&&(this.rule!=2)){
        alert("Wrong value for ''Rule'' parameter: "+this.rule+"\nMust be in the interval [1,2]");
        Counter.get();
    }
    this.x.model.dstate = new ScilabDouble([0]);
    this.x.model.ipar = new ScilabDouble([this.rule],[this.maxim],[this.minim])
    var exprs = new ScilabString([this.minim],[this.maxim],[this.rule])
    this.displayParameter=[[this.minim],[this.maxim]];
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    Counter.prototype.get_popup_title = function Counter() {
        var set_param_popup_title="Set Counter block parameters<br> Integer counter generator<br>";
        return set_param_popup_title
    }
    Counter.prototype.getDimensionForDisplay = function Counter(){
        var dimension = [60,40];
        return dimension
    }
}
