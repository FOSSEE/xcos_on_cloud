function INTEGRAL_m() {

    INTEGRAL_m.prototype.define = function INTEGRAL_m() {
        this.lowp = -1;
        this.maxp = 1;
        var minp = -1;
        this.rpar = [];

        var model = scicos_model();
        model.state = new ScilabDouble([0]);
        model.sim = list(new ScilabString(["integral_func"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.rpar = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([0], [0], [0], [this.maxp], [minp]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTEGRAL_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTEGRAL_m.prototype.get = function INTEGRAL_m() {
        if(this.x0 == undefined || this.x0 == null){
            this.x0 = 0;
        }
        if(this.reinit == undefined || this.reinit == null){
            this.reinit = 0;
        }
        if(this.satur == undefined || this.satur == null){
            this.satur = 0;
        }

        var options = {
            x0:["Initial Condition",this.x0],
            reinit:["With re-initialization (1:yes, 0:no)",this.reinit],
            satur:["With saturation (1:yes, 0:no)",this.satur],
            maxp:["Upper limit",this.maxp],
            lowp:["Lower limit",this.lowp],
        }
        return options
    }
    INTEGRAL_m.prototype.set = function INTEGRAL_m() {
        var temp_x0 = arguments[0]["x0"];
        this.reinit = parseFloat(arguments[0]["reinit"]);
        this.satur = parseFloat(arguments[0]["satur"]);
        var temp_maxp = arguments[0]["maxp"];
        var temp_lowp = arguments[0]["lowp"];
        var x0_1 = inverse(temp_x0);
        var maxp_1 = inverse(temp_maxp);
        var lowp_1 = inverse(temp_lowp);
        var rpar = "";
        var Datatype = 1;
        if(!temp_x0.includes("%i")){
            Datatype = 1;
        }else{
            Datatype = 2;
        }
        if(this.reinit != 0){
            this.reinit = 1;
        }
        if(this.satur != 0){
            this.satur = 1;
            if(Datatype == 1){
                if(size(maxp_1,"*") == 1){
                    var n = maxp_1[0];
                    maxp_1 = ones(parseInt(x0_1[0]),1);
                    for (var i = maxp_1.length - 1; i >= 0; i--) {
                        maxp_1[i] = n*maxp_1[i];
                    }
                }
                if(size(lowp_1,"*") == 1){
                    var n = lowp_1[0];
                    lowp_1 = ones(parseInt(x0_1[0]),1);
                    for (var i = lowp_1.length - 1; i >= 0; i--) {
                        lowp_1[i] = n*lowp_1[i];
                    }
                }
                if((size(x0_1,1) != size(maxp_1,1)) || (size(x0_1,1) != size(lowp_1,1))){
                    alert("x0 and Upper limit and Lower limit must have same size");
                    throw "incorrect";
                }else if(parseFloat(maxp_1) >= parseFloat(lowp_1)){
                    alert("Upper limits must be > Lower limits");
                    throw "incorrect";
                }else if(parseFloat(x0_1) < parseFloat(maxp_1) || parseFloat(x0_1) > parseFloat(lowp_1) ){
                    alert("Initial condition x0 should be inside the limits")
                    throw "incorrect";
                }else{
                    rpar = new ScilabDouble(...maxp_1,...lowp_1);
                    this.x.model.nzcross = new ScilabDouble([size(x0_1,"*")]);
                    this.x.model.nmode = new ScilabDouble([size(x0_1,"s*")]);
                }

            }
            if(Datatype == 2){
                if(size(maxp_1,"*") == 1){
                    var n = maxp_1[0];
                    maxp_1 = ones(parseInt(x0_1[0]),1);
                    for (var i = maxp_1.length - 1; i >= 0; i--) {
                        var temp_img = (n*maxp_1[i]);
                        const b = math.complex("i"+temp_img.toString());
                        var value = b.re;
                        maxp_1[i] = n*maxp_1[i] + value;
                    }
                }
                if(size(lowp,"*")==1){
                    var n = lowp_1[0];
                    lowp_1 = ones(parseInt(x0_1[0]),1);
                    for (var i = lowp_1.length - 1; i >= 0; i--) {
                        var temp_img = (n*lowp_1[i]);
                        const b = math.complex("i"+temp_img.toString());
                        var value = b.re;
                        lowp_1[i] = n*lowp_1[i] + value;
                    }
                }
                if (size(x0_1) != size(maxp_1) || size(x0_1) != size(lowp_1)){
                    alert("x0 and Upper limit and Lower limit must have same size");
                    throw "incorrect";
                }else if ((parseFloat(maxp_1) >= parseFloat(lowp_1)) || (parseFloat(imag(maxp_1)) >= parseFloat(imag(lowp_1)))){
                    alert("Upper limits must be > Lower limits");
                    throw "incorrect";
                }else if ((parseFloat(x0_1) < parseFloat(maxp_1)) || (parseFloat(x0_1) > parseFloat(lowp_1)) || (parseFloat(imag(x0_1)) < parseFloat(imag(maxp_1))) || (parseFloat(imag(x0_1)) > parseFloat(imag(lowp_1)))){
                    alert("Initial condition x0 should be inside the limits");
                    throw "incorrect";
                }else{
                    rpar = new ScilabDouble(...maxp_1,...lowp_1, imag(...maxp_1),imag(...lowp_1));
                    this.x.model.nzcross = new ScilabDouble([2*size(x0_1,"*")]);
                    this.x.model.nmode = new ScilabDouble([2*size(x0_1,"s*")]);
                }
            }
        }else{
            rpar = new ScilabDouble();
            this.x.model.nzcross = new ScilabDouble([0]);
            this.x.model.nmode = new ScilabDouble([0]);
        }

        this.x.model.rpar = rpar;
        if(Datatype == 1){
            this.x.model.state = new ScilabDouble(...x0_1);
            this.x.model.sim = list(new ScilabString(["integral_func"]), new ScilabDouble([4]));
            this.x.model.intyp = new ScilabDouble([1], ...ones(this.reinit,1));
            this.x.model.outtyp = new ScilabDouble([1]);
        }else{
            this.x.model.state = new ScilabDouble([...x0_1, imag(...x0_1)]);
            this.x.model.sim = list(new ScilabString(["integral_func"]), new ScilabDouble([4]));
            var one_reint = [...ones(this.reinit,1)];
            for(var i = 0;i < one_reint.length ; i++){
                one_reint[i] = 2*one_reint[i];
            }
            this.x.model.intyp = new ScilabDouble([2], ...one_reint);
            this.x.model.outtyp = new ScilabDouble([2]);
        }
        var inp1 = [1,...ones(this.reinit,1)];
        for (var i = inp1.length - 1; i >= 0; i--) {
            inp1[i] = inp1[i]*size(x0_1,1);
        }
        var inp2 = [1,...ones(this.reinit,1)];
        for (var i = inp2.length - 1; i >= 0; i--) {
            inp2[i] = inp2[i]*size(x0_1,2);
        }
        this.in = [...inp1,...inp2];
        this.out = size(x0_1);
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(this.reinit,1),[]);
        this.x0 = temp_x0;
        this.maxp =  temp_maxp;
        this.lowp =  temp_lowp;
        var exprs = new ScilabString([this.x0],[this.reinit],[this.satur],[this.maxp],[this.lowp]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x);
    }
    INTEGRAL_m.prototype.details = function INTEGRAL_m() {
        return this.x;
    }

    INTEGRAL_m.prototype.get_popup_title = function INTEGRAL_m() {
        var set_param_popup_title = "Set Integral block parameters";
        return set_param_popup_title
    }
    INTEGRAL_m.prototype.getDimensionForDisplay = function INTEGRAL_m(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
