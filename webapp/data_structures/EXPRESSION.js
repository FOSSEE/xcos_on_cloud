function EXPRESSION () {

    EXPRESSION.prototype.define = function EXPRESSION() {
        this.in = [[1], [1]];
        this.out = 1;
        this.txt = "(u1>0)*sin(u2)^2";
        var model = scicos_model();
        model.sim = list(new ScilabString(["evaluate_expr"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in]);
        model.out=new ScilabDouble([this.out]);
	    model.rpar=rpar;
	    model.ipar=ipar;
	    model.nzcross=nz;
	    model.nmode=nz;
	    model.dep_ut = new ScilabBoolean([true,false]);

	    var exprs = [string(size(in1,"*"));txt;"1"];

	    var gr_i = [];
	    this.x=new standard_define(new ScilabDouble([5,2]),model,exprs,gr_i);
	    return new BasicBlock(this.x)
    }
    EXPRESSION.prototype.set = function EXPRESSION() {
        this.in = parseFloat((arguments[0]["in"]))




    }
    EXPRESSION.prototype.get = function EXPRESSION() {
         var options={
            in:["number of inputs",this.in],
            exx:["scilab expression",this.exx],
            usenz:["use zero-crossing (0: no, 1 yes)",this.usenz],
        }
        return options
    }
    EXPRESSION.prototype.details = function EXPRESSION() {
        return this.x;
    }
    EXPRESSION.prototype.get_popup_title = function EXPRESSION() {
        var set_param_popup_title="Give a scalar scilab expression using inputs u1, u2,... <br>If only one input, input is vector [u1,u2,...] (max 8) <br>ex: (dd*u1+sin(u2)>0)*u3 <br> Note that here dd must be defined in context";
        return set_param_popup_title
    }
    EXPRESSION.prototype.getDimensionForDisplay = function EXPRESSION(){
        var dimension = { width: 100, height: 40 };
        return dimension
    }

}
