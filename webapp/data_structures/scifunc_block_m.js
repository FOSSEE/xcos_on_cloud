function scifunc_block_m() {

    scifunc_block_m.prototype.define = function scifunc_block_m() {
        this.in1 = 1;
        this.out = 1;
        this.clkin = [];
        this.clkout = [];
        this.x0 = [];
        this.z0 = [];
        this.typ = "c";
        this.auto = [];
        this.rpar = [];
        this.it = 1;
        this.exprs = [];

        var model = scicos_model();
        model.sim = list(new ScilabString(["scifunc"]), new ScilabDouble([3]));
        model.in = new ScilabDouble([this.in1]);
        model.in2 = new ScilabDouble([this.in1]);
        model.intyp = new ScilabDouble([this.it]);
        model.out = new ScilabDouble([this.out]);
        model.out2 = new ScilabDouble([this.out]);
        model.outtyp = new ScilabDouble([this.it]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([0]);
        model.opar = list();
        model.blocktype = new ScilabString([this.typ]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);
        var n = "scifunc";
        this.displayParameter = [n];
        var exprs = list(new ScilabString([sci2exp([this.in1, this.in1])], [sci2exp([this.out, this.out])], [sci2exp(this.clkin)], [sci2exp(this.clkout)], [sci2exp(this.x0)], [sci2exp(this.z0)], [sci2exp(this.rpar)], [sci2exp(this.auto)], [sci2exp(0)]), list(new ScilabString(["y1=sin(u1)"]), new ScilabString([" "]), new ScilabString([" "]), new ScilabString(["y1=sin(u1)"]), new ScilabString([" "]), new ScilabString([" "]), new ScilabString([" "])));

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"scifunc_block_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    scifunc_block_m.prototype.details = function scifunc_block_m() {
        return this.x;
    }

    scifunc_block_m.prototype.get = function scifunc_block_m() {
        //calling get and passing the labels
        if(this.popup2value == undefined || this.popup2value == ""){
            this.popup2value = "y1=sin(u1)"
        }
        if(this.popup3value == undefined || this.popup3value == ""){
            this.popup3value = "xd = []"
        }
        if(this.popup4value == undefined || this.popup4value == ""){
            this.popup4value = ""
        }
        if(this.popup5value == undefined || this.popup5value == ""){
            this.popup5value = "y1=sin(u1)";
        }
        if(this.popup6value == undefined || this.popup6value == ""){
            this.popup6value = ""
        }
        if(this.popup7value == undefined || this.popup7value == ""){
            this.popup7value = ""
        }
        if(this.popup7value == undefined || this.popup7value == ""){
            this.popup7value = ""
        }
        if(this.popup8value == undefined || this.popup8value == ""){
            this.popup8value = ""
        }

        var options ={
            in1 : ["input port sizes", this.in1],//i
            out : ["output port sizes", this.out],//o
            clkin : ["input event port sizes", this.clkin],//ci
            clkout : ["output event port sizes", this.clkout],//co
            x0 : ["initial continuous state", this.x0],
            z0 : ["initial discrete state", this.z0],
            rpar : ["system parameters vector", this.rpar],
            auto : ["initial firing vector(<0 for no firing)", this.auto],
            it : ["is block always active(0:no, 1:yes)", this.it],
        }
        return options
    }

    scifunc_block_m.prototype.set = function scifunc_block_m() {
        this.in1 = MatrixInverse((arguments[0]["in1"]))
        this.out = MatrixInverse((arguments[0]["out"]))
        this.clkin = MatrixInverse((arguments[0]["clkin"]))
        this.clkout = MatrixInverse((arguments[0]["clkout"]))
        this.x0 = MatrixInverse((arguments[0]["x0"]))
        this.z0 = MatrixInverse((arguments[0]["z0"]))
        this.rpar = MatrixInverse((arguments[0]["rpar"]))
        this.auto = MatrixInverse((arguments[0]["auto"]))
        this.it = MatrixInverse((arguments[0]["it"]))
        if(arguments[0]["out"] != ""){
            this.popup2value = ((arguments[0]["popup2value"]))
            var to_display = this.popup2value[0];

            if(this.out.length == 2 && this.popup2value.length == 1){
                this.popup2value_disp = new ScilabString([this.popup2value[0].toString()])
            }
            if(this.out.length == 2 && this.popup2value.length == 2){
                this.popup2value_disp = new ScilabString([this.popup2value[0].toString()],[this.popup2value[1].toString()])
            }
            if(this.out.length == 3){
                this.popup2value_disp = new ScilabString([this.popup2value[0].toString()],[this.popup2value[1].toString()],[this.popup2value[2].toString()])
            }
            if(this.out.length == 4){
                this.popup2value_disp = new ScilabString([this.popup2value[0].toString()],[this.popup2value[1].toString()],[this.popup2value[2].toString()],[this.popup2value[3].toString()])
            }
            if(this.out.length == 5){
                this.popup2value_disp = new ScilabString([this.popup2value[0].toString()],[this.popup2value[1].toString()],[this.popup2value[2].toString()],[this.popup2value[3].toString()],[this.popup2value[4].toString()])
            }
            if(this.out.length == 6){
                this.popup2value_disp = new ScilabString([this.popup2value[0].toString()],[this.popup2value[1].toString()],[this.popup2value[2].toString()],[this.popup2value[3].toString()],[this.popup2value[4].toString()],[this.popup2value[5].toString()])
            }
            if(this.out.length == 7){
                this.popup2value_disp = new ScilabString([this.popup2value[0].toString()],[this.popup2value[1].toString()],[this.popup2value[2].toString()],[this.popup2value[3].toString()],[this.popup2value[4].toString()],[this.popup2value[5].toString()],[this.popup2value[6].toString()])
            }
        }
        this.null = "";
        if(arguments[0]["out"] == ""){
            this.popup2value_disp = new ScilabString([this.null.toString()])
        }

        if(!arguments[0]["x0"] == ""){
            this.popup3value = ((arguments[0]["popup3value"]))
        }

        if(arguments[0]["z0"] != ""){
            this.popup4value = ((arguments[0]["popup4value"]))

            if(this.popup4value[0] == "" && this.popup4value[1] == ""){
                this.popup4value_disp = new ScilabString([this.popup4value[0].toString()])
            }
            if(this.popup4value[0] != "" && this.popup4value[1] ==""){
                this.popup4value_disp = new ScilabString([this.popup4value[0].toString()])
            }
            if(this.popup4value[1] != "" && this.popup4value[0] == ""){
                this.popup4value_disp = new ScilabString([this.popup4value[1].toString()])
            }
            if(this.popup4value[0] != "" && this.popup4value[1] != ""){
                this.popup4value_disp = new ScilabString([this.popup4value[0].toString()],[this.popup4value[1].toString()])
            }
        }
        if(arguments[0]["z0"] == ""){
            this.popup4value_disp = new ScilabString([this.null.toString()])
        }

        if(arguments[0]["clkin"] != "" && arguments[0]["clkout"] != ""){
            this.popup5value = ((arguments[0]["popup5value"]))

            if(this.popup5value[1] == "" && this.popup5value[2] == ""){
                this.popup5value_disp = new ScilabString([this.popup5value[0].toString()],[this.popup5value[3].toString()])
            }
            if(this.popup5value[1] != "" && this.popup5value[2] == ""){
                this.popup5value_disp = new ScilabString([this.popup5value[0].toString()],[this.popup5value[1].toString()],[this.popup5value[3].toString()])
            }
            if(this.popup5value[1] == "" && this.popup5value[2] != ""){
                this.popup5value_disp = new ScilabString([this.popup5value[0].toString()],[this.popup5value[2].toString()],[this.popup5value[3].toString()])
            }
            if(this.popup5value[1] != "" && this.popup5value[2] != ""){
                this.popup5value_disp = new ScilabString([this.popup5value[0].toString()],[this.popup5value[1].toString()],[this.popup5value[2].toString()],[this.popup5value[3].toString()])
            }
        }

        if(arguments[0]["clkin"] == "" && arguments[0]["clkout"] == ""){
            this.popup5value_disp = new ScilabString([this.null.toString()])
        }


        this.popup6value = ((arguments[0]["popup6value"]))
        if(this.popup6value[0] == "" && this.popup6value[1] == ""){
            this.popup6value_disp = new ScilabString([this.popup6value[0].toString()])
        }
        if(this.popup6value[0] != "" && this.popup6value[1] == ""){
            this.popup6value_disp = new ScilabString([this.popup6value[0].toString()])
        }
        if(this.popup6value[1] != "" && this.popup6value[0] == ""){
            this.popup6value_disp = new ScilabString([this.popup6value[1].toString()])
        }
        if(this.popup6value[0] != "" && this.popup6value[1] != ""){
            this.popup6value_disp = new ScilabString([this.popup6value[0].toString()],[this.popup6value[1].toString()])
        }

        this.popup7value = ((arguments[0]["popup7value"]))
        if(this.popup7value[0] == "" && this.popup7value[1] == ""){
            this.popup7value_disp = new ScilabString([this.popup7value[0].toString()])
        }
        if(this.popup7value[0] != "" && this.popup7value[1] ==""){
            this.popup7value_disp = new ScilabString([this.popup7value[0].toString()])
        }
        if(this.popup7value[1] != "" && this.popup7value[0] == ""){
            this.popup7value_disp = new ScilabString([this.popup7value[1].toString()])
        }
        if(this.popup7value[0] != "" && this.popup7value[1] != ""){
            this.popup7value_disp = new ScilabString([this.popup7value[0].toString()],[this.popup7value[1].toString()])
        }

        var len = this.out.length;
        this.popup8value = ((arguments[0]["popup8value"]))

        if(this.popup8value[0] == "" && this.popup8value[1] == ""){
            if(len == 2){
                if(this.popup8value.length == 3){
                    this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()])
                }
                else{
                    this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()])
                }
            }
            if(len == 3){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()])
            }
            if(len == 4){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()])
            }
            if(len == 5){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()])
            }
            if(len == 6){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()])
            }
            if(len == 7){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()],[this.popup8value[8].toString()])
            }
        }
        if(this.popup8value[0] == "" && this.popup8value[1] != 0){
            if(len == 1){
                this.popup8value_disp = new ScilabString([this.popup8value[1].toString()],[this.popup8value[2].toString()])
            }
            if(len == 2){
                this.popup8value_disp = new ScilabString([this.popup8value[1].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()])
            }
            if(len == 3){
                this.popup8value_disp = new ScilabString([this.popup8value[1].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()])
            }
            if(len == 4){
                this.popup8value_disp = new ScilabString([this.popup8value[1].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()])
            }
            if(len == 5){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()])
            }
            if(len == 6){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()])
            }
            if(len == 7){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()],[this.popup8value[8].toString()])
            }

        }
        if(this.popup8value[0] != "" && this.popup8value[1] == ""){
            if(len == 1){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()])
            }
            if(len == 2){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()])
            }
            if(len == 3){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()])
            }
            if(len == 4){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()])
            }
            if(len == 5){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()])
            }
            if(len == 6){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()])
            }
            if(len == 7){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()],[this.popup8value[8].toString()])
            }
        }
        if(this.popup8value[0] != "" && this.popup8value[1] != ""){
            if(len == 1){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[1].toString()],[this.popup8value[2].toString()])
            }
            if(len == 2){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[1].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()])
            }
            if(len == 3){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[1].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()])
            }
            if(len == 4){
                this.popup8value_disp = new ScilabString([this.popup8value[0].toString()],[this.popup8value[1].toString()],[this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()])
            }
            if(len == 5){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()])
            }
            if(len == 6){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()])
            }
            if(len == 7){
                this.popup8value_disp = new ScilabString([this.popup8value[2].toString()],[this.popup8value[3].toString()],[this.popup8value[4].toString()],[this.popup8value[5].toString()],[this.popup8value[6].toString()],[this.popup8value[7].toString()],[this.popup8value[8].toString()])
            }
        }

        if(this.rpar != ""){
            this.x.model.rpar = new ScilabDouble([this.rpar])
        }
        if(this.rpar == ""){
            this.x.model.rpar = new ScilabDouble()
        }
        if(this.x0 != ""){
            this.x.model.state = new ScilabDouble([this.x0])
        }
        if(this.z0 != ""){
            this.x.model.dstate = new ScilabDouble([this.z0])
        }
        this.it_set = ones(size(this.in1,1),1);
        this.ot = ones(size(this.out,1),1);

        var n = to_display;
        this.displayParameter = [n];
        var io = set_io(this.x.model,this.x.graphics,list(this.in1,...this.it_set),list(this.out,...this.ot),this.clkin,this.clkout);
        this.x.model.opar = list(this.popup2value_disp, new ScilabString([this.popup3value.toString()]), this.popup4value_disp, this.popup5value_disp, this.popup6value_disp, this.popup7value_disp, this.popup8value_disp)
        var exprs = list(new ScilabString([sci2exp(this.in1)], [sci2exp(this.out)], [sci2exp(this.clkin)], [sci2exp(this.clkout)], [sci2exp(this.x0)], [sci2exp(this.z0)], [sci2exp(this.rpar)], [sci2exp(this.auto)], [sci2exp(this.it)]), list(this.popup2value_disp, new ScilabString([this.popup3value.toString()]), this.popup4value_disp, this.popup5value_disp, this.popup6value_disp, this.popup7value_disp, this.popup8value_disp))
        this.x.graphics.exprs = exprs
        return new BasicBlock(this.x)
    }

    scifunc_block_m.prototype.get_popup_title = function scifunc_block_m() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
}
