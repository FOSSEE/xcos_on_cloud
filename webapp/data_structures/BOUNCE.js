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
	this.mass=[[1],[1]];
	this.radius=[[1],[1]];
        this.walls = [[0],[5],[0],[5]];
        this.x1 = [[2],[2.5]];
        this.xd = [[0],[0]];
        this.y1 = [[3],[5]];
        this.yd = [[0],[0]];
        this.g = 9.81;
        this.c = 0;
        this.rpar1 = ones(this.n, 1);
        this.rpar2 = this.rpar1;
        this.state = [...math.transpose(this.x1), ...math.transpose(this.xd), ...math.transpose(this.y1), ...math.transpose(this.yd)];

        var model = scicos_model();
        model.sim = list(new ScilabString(["bounce_ball"]), new ScilabDouble([4]));
        model.in = new ScilabDouble();
        model.out = new ScilabDouble([this.n], [this.n]);
        model.state = new ScilabDouble(...colon_operator(this.state));
        model.rpar = new ScilabDouble(...this.rpar1, ...this.rpar2, ...this.walls, [this.g], [this.c]);
        model.ipar = new ScilabDouble(...this.ipar);
        model.nzcross = new ScilabDouble([this.n * (this.n - 1) / 2 + 4 * this.n]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([sci2exp(this.rpar1)], [sci2exp(this.rpar2)], [sci2exp(this.mass)], [sci2exp(this.radius)], [sci2exp(this.walls)], [sci2exp(this.x1)], [sci2exp(this.xd)], [sci2exp(this.y1)], [sci2exp(this.yd)]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);

        return new BasicBlock(this.x);
    }
    BOUNCE.prototype.get = function BOUNCE() {
    var options={
        mass:["Mass",this.mass.toString().replace(/,/g," ")],
        radius:["Radius",this.radius.toString().replace(/,/g," ")],
	walls:["(xmin,xmax,ymin,ymax",this.walls.toString().replace(/,/g," ")],
	x1:["Xpos",this.x1.toString().replace(/,/g," ")],
	xd:["Xdpos",this.xd.toString().replace(/,/g," ")],
	y1:["Ypos",this.y1.toString().replace(/,/g," ")],
	yd:["Ydpos",this.yd.toString().replace(/,/g," ")],
	g:["g(gravity) ",this.g],
	c:["C (aerodynamic coeff) ",this.c],

         }
    return options


    }
    BOUNCE.prototype.set = function BOUNCE() {
        this.mass = inverse(arguments[0]["mass"])
        this.radius = inverse(arguments[0]["radius"])
        this.walls = inverse(arguments[0]["walls"])
	this.x1 = inverse(arguments[0]["x1"])
	this.xd = inverse(arguments[0]["xd"])
	this.y1 = inverse(arguments[0]["y1"])
	this.yd = inverse(arguments[0]["yd"])
        this.g=parseFloat(arguments[0]["g"])
        this.c=parseFloat(arguments[0]["c"])
	this.rpar1 = ones(this.n, 1);
        this.rpar2 = this.rpar1;
        this.state = [...math.transpose(this.x1), ...math.transpose(this.xd), ...math.transpose(this.y1), ...math.transpose(this.yd)];
	var model = scicos_model();
	model.rpar = new ScilabDouble(...this.rpar1, ...this.rpar2, ...this.walls, [this.g], [this.c]);
        model.ipar = new ScilabDouble(...this.ipar);
	model.in = new ScilabDouble();
	model.out = new ScilabDouble([this.n], [this.n]);
        model.state = new ScilabDouble(...colon_operator(this.state));
        model.rpar = new ScilabDouble(...this.rpar1, ...this.rpar2, ...this.walls, [this.g], [this.c]);
        model.ipar = new ScilabDouble(...this.ipar);
        model.nzcross = new ScilabDouble([this.n * (this.n - 1) / 2 + 4 * this.n]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

	var exprs = new ScilabString([sci2exp(this.rpar1)], [sci2exp(this.rpar2)], [sci2exp(this.mass)], [sci2exp(this.radius)], [sci2exp(this.walls)], [sci2exp(this.x1)], [sci2exp(this.xd)], [sci2exp(this.y1)], [sci2exp(this.yd)]);
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BOUNCE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);

    return new BasicBlock(this.x)
    }

    BOUNCE.prototype.details = function BOUNCE() {

        return this.x;
    }

    BOUNCE.prototype.get_popup_title = function BOUNCE() {
        var set_param_popup_title="Set BOUNCE Block";
        return set_param_popup_title
    }
}
