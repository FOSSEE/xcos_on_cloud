function DEBUG() {

    DEBUG.prototype.define = function DEBUG() {
	this.instruct="xcos_debug_gui(flag,block);";
        var model = scicos_model();
        model.sim = list(new ScilabString(["%debug_scicos"]), new ScilabDouble([99]));
        model.blocktype = new ScilabString(["d"]);
	var n =this.instruct;
        this.displayParameter=[n];
        var exprs = list(new ScilabString([""]), new ScilabString([this.instruct]));
	 var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEBUG\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([8, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
     DEBUG.prototype.get = function DEBUG() {
        var options={
            instruct:["Enter scilab instructions for debugging,input are block and flag output is block",this.instruct],
        }
        return options
    }
     DEBUG.prototype.set = function DEBUG() {
        this.instruct = (arguments[0]["instruct"])
	var n =this.instruct;
        this.displayParameter=[n];
        //var exprs = list(new ScilabString([""]), new ScilabString([this.instruct]));
	// var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEBUG\",sz(1),sz(2));"]);
        //this.x = new standard_define(new ScilabDouble([8, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x)
    }
    DEBUG.prototype.details = function DEBUG() {
        return this.x;
    }
    DEBUG.prototype.get_popup_title = function DEBUG() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
}
