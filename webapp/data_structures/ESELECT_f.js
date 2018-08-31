function ESELECT_f() {

    ESELECT_f.prototype.define = function ESELECT_f() {
        this.out = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["eselect"]), new ScilabDouble([-2]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([-1]);
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble(...ones(this.out, 1));
        model.blocktype = new ScilabString(["l"]);
        model.firing = new ScilabDouble(...ones(this.out, 1));
        model.dep_ut = new ScilabBoolean([true, false]);
        model.nmode = new ScilabDouble([0]);
        model.nzcross = new ScilabDouble([0]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"ESELECT_f\",sz(1),sz(2));"]);;

        var exprs = new ScilabString([this.out], [1], [parseFloat(getData(model.nmode))]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    ESELECT_f.prototype.details = function ESELECT_f() {
        return this.x;
    }
    ESELECT_f.prototype.get = function ESELECT_f() {
    if(this.inh == undefined || this.inh == null){
        this.inh = "1"
    }
    if(this.nmod == undefined || this.nmod == null){
        this.nmod = "0"
    }
        var options={
            out:["number of output event ports",this.out],
            inh:["Inherit (1: no, 0: yes)",this.inh],
            nmod:["zero-crossing (0: no, 1: yes)",this.nmod],
        }
        return options
    }
ESELECT_f.prototype.set = function ESELECT_f() {
    this.out = parseFloat((arguments[0]["out"]))
    this.inh = parseFloat((arguments[0]["inh"]))
    this.nmod = parseFloat((arguments[0]["nmod"]))
    if(this.nmod != 0)
        this.nmod = 1
    if(this.inh == 0)
        this.inh = []
    else
        this.inh = 1
    this.out = Math.floor(this.out)
    if(this.out<2){
        alert("Block must have at least two output ports");
        ESELECT_f.get();
    }
    var io = check_io(this.x.model,this.x.graphics,[1],[],[this.inh],ones(this.out,1))
    this.x.model.evtout = new ScilabDouble(...ones(this.out,1))
    this.value = ones(this.out,1)
    for (var i = this.value.length - 1; i >= 0; i--) {
        this.value[i] = -1*this.value[i]
    }
    this.x.model.firing = new ScilabDouble(...this.value)
    this.x.model.nmode = new ScilabDouble([this.nmod]);
    this.x.model.nzcross = new ScilabDouble([this.nmod]);
    var exprs = new ScilabString([this.out],[this.inh],[this.nmod])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    ESELECT_f.prototype.get_popup_title = function ESELECT_f() {
        var set_param_popup_title="Set ESELECT block parameters";
        return set_param_popup_title
    }

}
