function BOUNCE() {

    BOUNCE.prototype.define = function BOUNCE() {
        this.n = 2;
        this.k = 0;
        this.ipar = [];
        for (var i = 1; i <= this.n; i++) {
            for (var j = i + 1; j <= this.n; j++) {
                this.ipar[this.k] = [i];
                this.k++;
                this.ipar[this.k] = [j];
                this.k++;
            }
        }
        this.walls = [[0],[5],[0],[5]];
        this.xt = [[2],[2.5]];
        this.xd = [[0],[0]];
        this.y = [[3],[5]];
        this.yd = [[0],[0]];
        this.g = 9.81;
        this.C = 0;
        this.rpar1 = ones(this.n, 1);
        this.rpar2 = this.rpar1;
        this.state = [...math.transpose(this.xt), ...math.transpose(this.xd), ...math.transpose(this.y), ...math.transpose(this.yd)];

        var model = scicos_model();
        model.sim = list(new ScilabString(["bounce_ball"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([this.n], [this.n]);
        model.state = new ScilabDouble(...colon_operator(this.state));
        model.rpar = new ScilabDouble(...this.rpar1, ...this.rpar2, ...this.walls, [this.g], [this.C]);
        model.ipar = new ScilabDouble(...this.ipar);
        model.nzcross = new ScilabDouble([this.n * (this.n - 1) / 2 + 4 * this.n]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([sci2exp(this.rpar1)], [sci2exp(this.rpar2)], [sci2exp(this.walls)], [sci2exp(this.xt)], [sci2exp(this.xd)], [sci2exp(this.y)], [sci2exp(this.yd)]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);

        return new BasicBlock(this.x);
    }
    BOUNCE.prototype.get = function BOUNCE() {
        var options = {
            rpar1:["Mass",this.rpar1],
            rpar2:["Radius",this.rpar2],
	        walls:["(xmin,xmax,ymin,ymax",this.walls],
	        xt:["Xpos",this.xt],
	        xd:["Xdpos",this.xd],
	        y:["Ypos",this.y],
	        yd:["Ydpos",this.yd],
	        g:["g(gravity) ",this.g],
	        C:["C (aerodynamic coeff) ",this.C],
        }
    return options


    }
    BOUNCE.prototype.set = function BOUNCE() {
        this.rpar1 = arguments[0]["rpar1"];
        this.rpar2 = arguments[0]["rpar2"];
        this.walls = arguments[0]["walls"];
	    this.xt = arguments[0]["xt"];
	    this.xd = arguments[0]["xd"];
	    this.y = arguments[0]["y"];
	    this.yd = arguments[0]["yd"];
	    var rpar1_1 = inverse(this.rpar1);
	    var rpar2_1 = inverse(this.rpar2);
	    var walls_1 = inverse(this.walls);
	    var xt_1 = inverse(this.xt);
	    var xd_1 = inverse(this.xd);
	    var y_1 = inverse(this.y);
	    var yd_1 = inverse(this.yd);
        this.g = parseFloat(arguments[0]["g"]);
        this.C = parseFloat(arguments[0]["C"]);
        this.state = [...math.transpose(xt_1), ...math.transpose(xd_1), ...math.transpose(y_1), ...math.transpose(yd_1)];
	    var model = scicos_model();
	    model.in = new ScilabDouble();
	    model.out = new ScilabDouble([this.n], [this.n]);
        model.state = new ScilabDouble(...colon_operator(this.state));
        model.rpar = new ScilabDouble(...rpar1_1, ...rpar2_1, ...walls_1, [this.g], [this.C]);
        model.ipar = new ScilabDouble(...this.ipar);
        model.nzcross = new ScilabDouble([this.n * (this.n - 1) / 2 + 4 * this.n]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

	    var exprs = new ScilabString([this.rpar1], [this.rpar2], [this.walls], [this.xt], [this.xd], [this.y], [this.yd],[this.g],[this.C]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);

        return new BasicBlock(this.x)
    }

    BOUNCE.prototype.details = function BOUNCE() {
        return this.x;
    }

    BOUNCE.prototype.get_popup_title = function BOUNCE() {
        var set_param_popup_title = "Set BOUNCE Block";
        return set_param_popup_title
    }
    BOUNCE.prototype.getDimensionForDisplay = function BOUNCE(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
