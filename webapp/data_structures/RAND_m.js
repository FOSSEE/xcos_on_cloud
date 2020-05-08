function RAND_m() {

    RAND_m.prototype.define = function RAND_m() {
        this.a = 0;
        this.b = 1;
        this.dt = 0;
        this.flag = 0;
        this.function_name = "rndblk_m";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble();
        model.in2 = new ScilabDouble();
        model.intyp = new ScilabDouble();
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble([parseFloat(Math.random() * (10000000-1))], [0 * this.a]);
        model.rpar = new ScilabDouble([this.a, this.b]);
        model.ipar = new ScilabDouble([this.flag]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(1)], [this.flag], [sci2exp([this.a])], [sci2exp([this.b])], [sci2exp([parseFloat(getData(model.dstate)[0]), parseFloat(Math.random() * 10000000)])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"RAND_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    RAND_m.prototype.details = function RAND_m() {
        return this.x;
    }
    RAND_m.prototype.get = function RAND_m() {
        if(this.typ == undefined || this.typ == null){
            this.typ = "1"
        }
        if(this.seed_c == undefined || this.seed_c == null){
            this.seed_c = "["+parseFloat(Math.random() * (10000000-1)).toString()+" "+parseFloat(Math.random() * (10000000-1)).toString()+  "]"
        }
        var options = {
            typ:["Datatype(1=real double  2=complex)",this.typ],
            flag:["flag",this.flag],
            a:["A",this.a],
            b:["B",this.b ],
            seed_c:["SEED", this.seed_c.],
        }
        return options
    }
    //update it to except imaginary numbers also
    RAND_m.prototype.set = function RAND_m() {
        this.typ = parseFloat(arguments[0]["typ"]);
        this.flag = parseFloat(arguments[0]["flag"]);
        var temp_a = arguments[0]["a"];
        var temp_b = arguments[0]["b"];
        var temp_seed_c = arguments[0]["seed_c"];
        var a_1 = inverse(temp_a);
        var b_1 = inverse(temp_b);
        var seed_c_1 = inverse(temp_seed_c);

        if(this.flag != 0 && this.flag != 1){
            alert("flag must be equal to 1 or 0");
            throw "incorrect";
        }
        this.out = size(a_1);

        if(this.typ == 1){
            this.function_name = "rndblk_m";
            this.x.model.rpar = new ScilabDouble(...a_1,...b_1);
            this.x.model.outtyp = new ScilabDouble([1]);
            this.dstate = [];
            this.dstate.push([parseFloat(seed_c_1[0])])
            for (var i = a_1.length - 1; i >= 0; i--) {
                this.dstate.push([0*parseFloat(a_1[i])])
            }
            this.x.model.dstate = new ScilabDouble(...this.dstate)
        }else if(this.typ == 2){
            alert("complex numbers not supported");
            throw "incorrect";
        }else{
            alert("Datatype is not supported");
            throw "incorrect";
        }
        this.a = temp_a;
        this.b = temp_b;
        this.seed_c = temp_seed_c;
        var io = set_io(this.x.model,this.x.graphics,[],this.out,[1],[]);
        this.x.model.sim = list(new ScilabString([this.function_name]),new ScilabDouble([4]));
        this.x.model.ipar = new ScilabDouble([this.flag]);
        var exprs = new ScilabString([sci2exp(this.typ)],[this.flag],[this.a],[this.b],[this.seed_c]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    RAND_m.prototype.get_popup_title = function RAND_m() {
        var set_param_popup_title = "Set Random generator block parameters<br>     flag = 0 : Uniform distribution A is min and A+B max <br>     flag = 1 : Normal distribution A is mean and B deviation <br> <br>    A and B must be matrix with equal sizes <br>";
        return set_param_popup_title
    }
    RAND_m.prototype.getDimensionForDisplay = function RAND_m(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
