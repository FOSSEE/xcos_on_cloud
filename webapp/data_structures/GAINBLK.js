function GAINBLK() {

    GAINBLK.prototype.define = function GAINBLK() {
        this.gain = 1;
        this.in1 = -1;
        this.out = -1;
        this.in2 = -2;
        this.out2 = -2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["gainblk"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.out]);
        model.in2 = new ScilabDouble([this.in2]);
        model.out2 = new ScilabDouble([this.out2]);
        model.rpar = new ScilabDouble([this.gain]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.gain)]);
        var n=this.gain.toString();
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"GAINBLK\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    GAINBLK.prototype.details = function GAINBLK() {
        return this.x;
    }
    GAINBLK.prototype.get = function GAINBLK() {
    if(this.over == undefined || this.over == null)
        this.over = 0
        var options={
            gain:["Gain",this.gain.toString().replace(/,/g," ")],
            over:["Do On Overflow(0=Nothing 1=Saturate 2=Error)",this.over],
        }
        return options
    }
GAINBLK.prototype.set = function GAINBLK() {
    this.gain = inverse(arguments[0]["gain"])
    if(this.gain.length==0){
        alert("Gain must have at least one element");
        GAINBLK.get();
    }
    this.over = parseFloat((arguments[0]["over"]))
    if((this.over<0)||(this.over>2))
    {
        alert("Do on Overflow must be 0,1,2");
        GAINBLK.get();
    }
    if(this.gain.length == 1 && this.gain[0].length == 1){
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
        this.x.model.sim = list(new ScilabString(["gainblk"]), new ScilabDouble([4]));
        this.x.model.rpar = new ScilabDouble(...this.gain)
        this.x.model.opar = list()
    }
    //code for non-constant value of gain not implemented
    else{
        alert("only constant value of gain is supported")
    }
    this.out = size(this.gain,1)
    this.in = size(this.gain,2)
    if(this.out*this.in == 1){
        var io = set_io(this.x.model,this.x.graphics,[[-1],[-2]],[[-1],[-2]],[],[])
    }
    else{
        var io = set_io(this.x.model,this.x.graphics,[[this.in],[-1]],[[this.out],[-1]],[],[])
    }
    var exprs = new ScilabString([this.gain.toString().replace(/,/g, " ")],[this.over])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    GAINBLK.prototype.get_popup_title = function GAINBLK() {
        var set_param_popup_title="Set gain block parameters";
        return set_param_popup_title
    }


}
