function IFTHEL_f() {

    IFTHEL_f.prototype.internal = function IFTHEL_f() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["ifthel"]), new ScilabDouble([-1]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble(); // changed
        model.evtout = new ScilabDouble([-1], [-1]) // 1, 1 -> -1, -1 inverse
        model.blocktype = new ScilabString(["l"]);
        model.firing = new ScilabDouble([-1], [-1]); // inverse
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nmode = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IFTHEL_f\",sz(1),sz(2));"]);
        var exprs = new ScilabString(["1"], ["1"]); // value model.in, model.nmode inverse

        var block = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3 -> 80
        block.graphics.in_implicit = new ScilabString(["E"]);
        // changed
        block.graphics.in_label = new ScilabString([""]);
        block.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        block.graphics.style = new ScilabString(["IFTHEL_f"]);
        return block;
    }

    IFTHEL_f.prototype.define = function IFTHEL_f() {
        var model = scicos_model();
        model.sim = list(new ScilabString(["ifthel"]), new ScilabDouble([-1]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble([-1]);
        model.outtyp = new ScilabDouble(); // changed
        model.evtout = new ScilabDouble([-1], [-1]) // 1, 1 -> -1, -1 inverse
        model.blocktype = new ScilabString(["l"]);
        model.firing = new ScilabDouble([-1], [-1]); // inverse
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nmode = new ScilabDouble([1]);
        model.nzcross = new ScilabDouble([1]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"IFTHEL_f\",sz(1),sz(2));"]);
        var exprs = new ScilabString(["1"], ["1"]); // value model.in, model.nmode inverse

        this.x = new standard_define(new ScilabDouble([80, 80]), model, exprs, gr_i); // 3 -> 80
        this.x.graphics.in_implicit = new ScilabString(["E"]);
        // changed
        this.x.graphics.in_label = new ScilabString([""]);
        this.x.graphics.in_style = new ScilabString(["ExplicitInputPort;align=left;verticalAlign=middle;spacing=10.0;rotation=0"]);
        this.x.graphics.style = new ScilabString(["IFTHEL_f"]);
        return new BasicBlock(this.x);
    }

    IFTHEL_f.prototype.details = function IFTHEL_f() {
        return this.x;
    }
    IFTHEL_f.prototype.get = function IFTHEL_f() {
    if(this.inh == undefined || this.inh == null)
        this.inh = "1"
    if(this.nmod == undefined || this.nmod == null)
        this.nmod = "1"
        var options={
            inh:["Inherit (1: no, 0: yes)",this.inh],
            nmod:["zero-crossing (0: no, 1: yes)",this.nmod],
        }
        return options
    }
IFTHEL_f.prototype.set = function IFTHEL_f() {
    this.inh = parseFloat((arguments[0]["inh"]))
    this.nmod = parseFloat((arguments[0]["nmod"]))
    if(this.nmod != 0)
        this.nmod = 1
    if(this.inh != 1){
        this.inh = []
        var io = check_io(this.x.model,this.x.graphics,[1],[],this.inh,[[1],[1]])
    }
    else
        var io = check_io(this.x.model,this.x.graphics,[1],[],[this.inh],[[1],[1]])
    this.x.model.evtin = new ScilabDouble([this.inh]);
    this.x.model.sim = list(new ScilabString(["ifthel"]), new ScilabDouble([-1]));
    this.x.model.nmode = new ScilabDouble([this.nmod]);
    this.x.model.nzcross = new ScilabDouble([this.nmod]);
    var exprs = new ScilabString([this.inh],[this.nmod])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    IFTHEL_f.prototype.get_popup_title = function IFTHEL_f() {
        var set_param_popup_title="Set parameters";
        return set_param_popup_title
    }
    IFTHEL_f.prototype.getDimensionForDisplay = function IFTHEL_f(){
        var dimension = [60,60];
        return dimension
    }
}
