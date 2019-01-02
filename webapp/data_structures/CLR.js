function CLR() {

    CLR.prototype.define = function CLR() {
        this.x0 = 0;
	this.num=1;
	this.den="1+s";
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString(["1"], ["1+s"]);

        this.displayParameter = [["1"], ["1+s"]];
        var gr_i = [];
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CLR.prototype.get = function CLR() {
        var options={
            num:["Numerator (s)",this.num],
            den:["Denominator (s)",this.den],
        }
        return options
    }
    CLR.prototype.set = function CLR() {
        this.num = arguments[0]["num"]
        this.den = arguments[0]["den"]
	this.value=cont_frm(this.num,this.den);
	var model = scicos_model();
        model.sim = list(new ScilabString(["csslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.state = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble(...this.value);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);
        var exprs = new ScilabString([this.num.toString()], [this.den.toString()]);
        this.displayParameter = [[this.num], [this.den]];
        var gr_i = [];
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);

    }
    CLR.prototype.details = function CLR() {
        return this.x;
    }
    CLR.prototype.get_popup_title = function CLR() {
        var set_param_popup_title="Set continuous SISO transfer parameters";
        return set_param_popup_title
    }
    CLR.prototype.getDimensionForDisplay = function CLR(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
