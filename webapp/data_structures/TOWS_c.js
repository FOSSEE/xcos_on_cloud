function TOWS_c() {

    TOWS_c.prototype.define = function TOWS_c() {
        var nu = -1;
        this.nz = 128;
        this.varnam = "A";
        this.herit = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["tows_c"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([nu]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.out = new ScilabDouble();
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([this.nz], [this.varnam.length], ascii(this.varnam));
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TOWS_c\",sz(1),sz(2));"]);;

        var exprs = new ScilabString([this.nz], [this.varnam], [this.herit]);
        var n = this.nz.toString();
        this.displayParameter = [[this.varnam],[n]];
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TOWS_c.prototype.details = function TOWS_c() {
        return this.x;
    }
    TOWS_c.prototype.get = function TOWS_c() {
        var options={
            nz:["Size of buffer",this.nz],
            varnam:["Scilab variable name",this.varnam],
            herit:["Inherit (no:0, yes:1)",this.herit],
        }
        return options
    }
    TOWS_c.prototype.set = function TOWS_c() {
        this.nz = parseFloat((arguments[0]["nz"]))
        this.varnam = arguments[0]["varnam"]
        this.herit = parseFloat((arguments[0]["herit"]))
        if(this.nz<=0){
            alert("Size of buffer must be positive");
            TOWS_c.get();
        }
        this.x.model.intyp = new ScilabDouble([-1])
        var io = set_io(this.x.model,this.x.graphics,[[-1],[-2]],[],ones(1-this.herit,1),[])
        if(this.herit == 1){
            this.x.model.blocktype = new ScilabDouble(["x"]);
        }
        else{
            this.x.model.blocktype = new ScilabDouble(["d"]);
        }
        this.x.model.ipar = new ScilabDouble([this.nz],[this.varnam.length],[ascii(this.varnam)])
        var exprs = new ScilabString([this.nz],[this.varnam],[this.herit])
        this.displayParameter = [[this.varnam],[this.nz]];
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
        }

        TOWS_c.prototype.get_popup_title = function TOWS_c() {
        var set_param_popup_title="Set Xcos Buffer Block";
        return set_param_popup_title
    }
}
