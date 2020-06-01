function STEP_FUNCTION() {

    STEP_FUNCTION.prototype.define = function STEP_FUNCTION() {
	    this.step = 1;
	    this.initial = 0;
	    this.final = 1;

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
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble([1]);
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
        var options = {
            step:["Step Time",this.step],
            initial:["Initial Value",sci2exp(this.initial)],
	        final:["Final Value",sci2exp(this.final)],
        }
        return options
    }
    STEP_FUNCTION.prototype.set = function STEP_FUNCTION() {

        var regex_semicolon_comma = /[,;]+/;
        var regex_colon = /[;]+/;
        var regex_roundbracket = /[)(]+/;
        var regex_parentheses = /[\])}[{(]/g;

        var temp_step = arguments[0]["step"];
        var temp_initial = arguments[0]["initial"];
        var temp_final = arguments[0]["final"];
        var step1 = temp_step.trim().replace(regex_parentheses, '');
        if ((regex_semicolon_comma.test(step1)) || step1.length == 0 || step1.split(" ").length>1) {
            alert("Answer given for Step Time\nhas invalid dimension:\nwaiting for dimension 1.");
            throw "incorrect";
        }

        if(regex_semicolon_comma.test(temp_initial) && regex_roundbracket.test(temp_initial)){
            if(regex_colon.test(temp_initial)){
                alert("Answer given for Initial Value is incorrect: Waiting for right parenthesis.");
                throw "incorrect";
            }else{
                alert("Answer given for Initial Value is incorrect: Incompatible output argument..");
                throw "incorrect";
            }
        }

        if(regex_semicolon_comma.test(temp_final) && regex_roundbracket.test(temp_final)){
            if(regex_colon.test(temp_final)){
                alert("Answer given for Final Value is incorrect: Waiting for right parenthesis.");
                throw "incorrect";
            }else{
                alert("Answer given for Final Value is incorrect: Incompatible output argument..");
                throw "incorrect";
            }
        }

        var initial1 = inverse(temp_initial);
	    var final1 = inverse(temp_final);
	    this.step = temp_step;
        this.initial = temp_initial;
        this.final = temp_final;
	    var temp_initial_1 = colon_operator(initial1);
	    var temp_final_1 = colon_operator(final1);
	    if (size(temp_initial_1,"*") != size(temp_final_1,"*")){
	        if(size(temp_initial_1,"*") == 1) {
	            temp_initial_1 = temp_initial_1*ones(temp_final_1);
	        }else if(size(temp_final_1,"*") == 1){
	            temp_final_1 = temp_final_1*ones(temp_initial_1);
            }else{
	    		alert("Initial and Final Value have incompatible sizes");
                throw "incorrect";
	    	}
	    }

	    var rpar = [];
	    if (this.step == 0){
		    rpar = new ScilabDouble(...temp_final_1,...temp_final_1);
	    }else{
		    rpar = new ScilabDouble(...temp_initial_1,...temp_final_1);
	    }

	    var block = getRparObjByGui(this.x, 'STEP');
        block.graphics.exprs = new ScilabString([this.step],[this.initial],[this.final]);
        block.model.firing = new ScilabDouble([this.step]);
        block.model.rpar = rpar;
	    return new BasicBlock(this.x);
    }

    STEP_FUNCTION.prototype.details = function STEP_FUNCTION() {
        return this.x;
    }
    STEP_FUNCTION.prototype.get_popup_title = function STEP_FUNCTION() {
        var set_param_popup_title = "Set STEP_FUNCTION block parameters<br><br> Step function";
        return set_param_popup_title
    }
    STEP_FUNCTION.prototype.getDimensionForDisplay = function STEP_FUNCTION(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
