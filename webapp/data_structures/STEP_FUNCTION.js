function STEP_FUNCTION() {

    STEP_FUNCTION.prototype.define = function STEP_FUNCTION() {
	this.step= 1;
	this.initial= 0;
	this.final=1;

	var scs_m_1 = scicos_diagram();
        scs_m_1.objs.push(new STEP().internal(this.step,this.initial,this.final));
        scs_m_1.objs.push(new OUT_f().internal());
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));

        var blk = scs_m_1.objs[0];
        var graphics = blk.graphics;
        var model = blk.model;
        graphics.orig = new ScilabDouble([20, -60]);
        graphics.sz = new ScilabDouble([40, 40]);
        graphics.flip = new ScilabBoolean([true]);
	graphics.exprs = new ScilabString([this.step],[sci2exp(this.initial)],[sci2exp(this.final)]);
        graphics.pein = new ScilabDouble([4]);
        graphics.peout = new ScilabDouble([4]);
        graphics.pout = new ScilabDouble([3]);
        graphics.out_implicit = new ScilabString(["E"]);
        graphics.in_style = new ScilabDouble();
        graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        graphics.in_label = new ScilabDouble();
        graphics.out_label = new ScilabString([""]);
        model.evtin = new ScilabDouble([-1]);
        model.evtout = new ScilabDouble([-1]);
        model.uid = new ScilabString([count]);
        blk.graphics = graphics;
        blk.model = model;
        blk.doc = list(new ScilabString([count++]));
        scs_m_1.objs[0] = blk;

        blk = scs_m_1.objs[1];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([120, -70]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pin = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble();
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[1] = blk;

        var lnk = scs_m_1.objs[2];
        lnk.xx = new ScilabDouble([104], [136]);
        lnk.yy = new ScilabDouble([-40], [-60]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([2, 1, 1]);
        scs_m_1.objs[2] = lnk;

        lnk = scs_m_1.objs[3];
        lnk.xx = new ScilabDouble([80], [80], [40], [40], [80], [80]);
        lnk.yy = new ScilabDouble([-64], [-120], [-120], [-40], [-40], [-16]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([1, 1, 1]);
        scs_m_1.objs[3] = lnk;

        model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.rpar = scs_m_1;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"STEP_FUNCTION\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, new ScilabDouble(), gr_i);
        return new BasicBlock(this.x);
    }
    STEP_FUNCTION.prototype.get = function STEP_FUNCTION() {
        var options={
            step:["Step Time",this.step],
            initial:["Initial Value",this.initial],
	    final:["Final Value",this.final],
        }
        return options
    }
    STEP_FUNCTION.prototype.set = function STEP_FUNCTION() {
        this.step = arguments[0]["step"]
        this.initial = MatrixInverse(arguments[0]["initial"])
	this.final = MatrixInverse(arguments[0]["final"])

	//define code (STEP_FUNCTION.SCI)
	var scs_m_1 = scicos_diagram();
        scs_m_1.objs.push(new STEP().internal(this.step,this.initial,this.final));
        scs_m_1.objs.push(new OUT_f().internal());
        scs_m_1.objs.push(scicos_link({}));
        scs_m_1.objs.push(scicos_link({}));

        var blk = scs_m_1.objs[0];
        var graphics = blk.graphics;
        var model = blk.model;
        graphics.orig = new ScilabDouble([20, -60]);
        graphics.sz = new ScilabDouble([40, 40]);
        graphics.flip = new ScilabBoolean([true]);
	graphics.exprs = new ScilabString([this.step],[sci2exp(this.initial)],[sci2exp(this.final)]);
        graphics.pein = new ScilabDouble([4]);
        graphics.peout = new ScilabDouble([4]);
        graphics.pout = new ScilabDouble([3]);
        graphics.out_implicit = new ScilabString(["E"]);
        graphics.in_style = new ScilabDouble();
        graphics.out_style = new ScilabString(["ExplicitOutputPort;align=right;verticalAlign=middle;spacing=10.0;rotation=0"]);
        graphics.in_label = new ScilabDouble();
        graphics.out_label = new ScilabString([""]);
        model.evtin = new ScilabDouble([-1]);
        model.evtout = new ScilabDouble([-1]);
        model.uid = new ScilabString([count]);
        blk.graphics = graphics;
        blk.model = model;
        blk.doc = list(new ScilabString([count++]));
        scs_m_1.objs[0] = blk;

        blk = scs_m_1.objs[1];
        graphics = blk.graphics;
        model = blk.model;
        graphics.orig = new ScilabDouble([120, -70]);
        graphics.sz = new ScilabDouble([20, 20]);
        graphics.flip = new ScilabBoolean([true]);
        graphics.exprs = new ScilabString(["1"]);
        model.ipar = new ScilabDouble([1]);
        graphics.pin = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble();
        model.uid = new ScilabString([count]);
        blk.doc = list(new ScilabString([count++]));
        blk.graphics = graphics;
        blk.model = model;
        scs_m_1.objs[1] = blk;

        var lnk = scs_m_1.objs[2];
        lnk.xx = new ScilabDouble([104], [136]);
        lnk.yy = new ScilabDouble([-40], [-60]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([2, 1, 1]);
        scs_m_1.objs[2] = lnk;

        lnk = scs_m_1.objs[3];
        lnk.xx = new ScilabDouble([80], [80], [40], [40], [80], [80]);
        lnk.yy = new ScilabDouble([-64], [-120], [-120], [-40], [-40], [-16]);
        lnk.ct = new ScilabDouble([5, -1]);
        lnk.from = new ScilabDouble([1, 1, 0]);
        lnk.to = new ScilabDouble([1, 1, 1]);
        scs_m_1.objs[3] = lnk;

        model = scicos_model();
        model.sim = new ScilabString(["csuper"]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.rpar = scs_m_1;
	//define code ends (STEP_FUNCTION.SCI)


	//new set code (STEP.SCI)
	this.initial = colon_operator(this.initial)
	this.final = colon_operator(this.final)

	if (size(this.initial,"*")!=size(this.final,"*")){
		if(size(this.initial,"*")==1)
			this.initial = this.inital*ones(this.final);
		else if(size(this.final,"*")==1)
			this.final = this.final*ones(this.initial);
		else{
			alert("Initial and Final Value have incompatible sizes");
			STEP_FUNCTION.get();
		    }
	}

	model.out2 = new ScilabDouble([1])
	model.outtyp = new ScilabDouble([1])
	var io = check_io(this.x.model,this.x.graphics,[],size(this.final,"*"),1,1)
	model.firing = new ScilabDouble([this.step])
	if (this.step==0){
		var rpar = [[this.final],[this.final]]

	}
	else {

		var rpar = [[this.initial],[this.final]]
	}

	this.x.model.rpar = rpar
	var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"STEP\",sz(1),sz(2));"]);
	this.x = new standard_define(new ScilabDouble([2,2]),model,new ScilabDouble(),gr_i);
	//var exprs = new ScilabString(["1"],...rpar);
	//this.x.graphics.exprs=exprs
	return new BasicBlock(this.x)

	//set code ends (STEP.SCI)
    }

    STEP_FUNCTION.prototype.details = function STEP_FUNCTION() {
        return this.x;
    }
    STEP_FUNCTION.prototype.get_popup_title = function STEP_FUNCTION() {
        var set_param_popup_title="Set STEP_FUNCTION block parameters<br><br> Step function";
        return set_param_popup_title
    }
}
