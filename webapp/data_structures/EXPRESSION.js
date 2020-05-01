function EXPRESSION () {

    EXPRESSION.prototype.define = function EXPRESSION() {
        this.inarray = [[1], [1]];
        this.out = [[1]];
        this.exx = "(u1>0)*sin(u2)^2";
        this.usenz = 1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["evaluate_expr"]), new ScilabDouble([4]));
        model.in = new ScilabDouble(...this.inarray);
        model.out = new ScilabDouble([this.out]);
	    model.rpar = new ScilabDouble([0], [2]);
	    model.ipar = new ScilabDouble([2], [1], [6], [1], [5], [18], [2], [2], [5], [101], [6], [2], [5], [15], [5], [3]);
	    model.nzcross = new ScilabDouble([[1]]);
	    model.nmode = new ScilabDouble([1]);
	    model.dep_ut = new ScilabBoolean([true,false]);
	    this.in = (size(this.inarray,"*"));
	    var exprs = new ScilabString([this.in],[this.exx],[this.usenz]);
	    this.displayParameter = [[this.exx]];
	    var gr_i = [];
	    this.x = new standard_define(new ScilabDouble([5,2]),model,exprs,gr_i);
	    return new BasicBlock(this.x)
    }
    EXPRESSION.prototype.details = function EXPRESSION() {
        return this.x;
    }
    EXPRESSION.prototype.set = function EXPRESSION() {
        var temp_in = (arguments[0]["in"] || arguments[0]["inp"]);
        var in_1 = inverse(temp_in);
        this.exx = arguments[0]["exx"];
        this.usenz = parseFloat(arguments[0]["usenz"]);

        if(this.exx.length == 0){
            this.exx = "0";
        }
        if(in_1 == 0){
            alert("Variable u1 is not defined.");
            throw "incorrect";
        }
        if(in_1 == 1){
            this.nini = 8;
        }else{
            this.nini = in_1;
        }
        this.head = "%foo(";
        for(var i = 1; i <= this.nini-1; i++){
            this.head = this.head + "u" + i.toString() + ",";
        }
        this.head = this.head + "u" + this.nini.toString() + ")";
        var get_values = get_expr_output_for_DefineandSet(this.head,this.exx);
        var ok = get_values.ok;
        var ok1 = get_values.ok1;
        if(ok != "true"){
            alert("Answer given for scilab expression is incorrect : \n\n" + ok.split(":")[0]);
            throw "incorrect value";
        }
        if(in_1 > 1){
            this.inp = []
            for (var i = 1; i <= in_1; i++ ){
                this.inp.push([-1*i])
            }
            var io = check_io(this.x.model,this.x.graphics,this.inp,[1],[],[])
        }else{
            var io = check_io(this.x.model,this.x.graphics,[-1],[1],[],[])
        }
        if(ok1 == "true"){
            this.ipar = get_values.ipar;
            this.rpar = get_values.rpar;
            this.nz = get_values.nz;
            this.x.model.rpar = new ScilabDouble(...this.rpar);
            this.x.model.ipar = new ScilabDouble(...this.ipar);
            if(this.usenz != 0){
                this.x.model.nzcross = new ScilabDouble([this.nz]);
                this.x.model.nmode = new ScilabDouble([this.nz]);
            }else{
                this.x.model.nzcross = 0;
                this.x.model.nmode = 0;
            }
        }
        this.in = temp_in;
        var exprs = new ScilabString([this.in],[this.exx],[this.usenz]);
	    this.displayParameter = [[this.exx]];
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    EXPRESSION.prototype.get = function EXPRESSION() {
         var options = {
            in:["number of inputs",this.in],
            exx:["scilab expression",this.exx.toString()],
            usenz:["use zero-crossing (0: no, 1 yes)",this.usenz],
        }
        return options
    }
    EXPRESSION.prototype.get_popup_title = function EXPRESSION() {
        var set_param_popup_title = "Give a scalar scilab expression using inputs u1, u2,... <br>If only one input, input is vector [u1,u2,...] (max 8) <br>ex: (dd*u1+sin(u2)>0)*u3 <br> Note that here dd must be defined in context";
        return set_param_popup_title
    }
    EXPRESSION.prototype.getDimensionForDisplay = function EXPRESSION(){
        var dimension = { width: 100, height: 40 };
        return dimension
    }

}
