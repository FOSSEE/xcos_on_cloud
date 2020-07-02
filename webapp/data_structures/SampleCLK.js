function SampleCLK() {

    SampleCLK.prototype.define = function SampleCLK() {

        var model = scicos_model();
        model.sim = new ScilabString(["sampleclk"]);
        model.evtout = new ScilabDouble([1]);
        model.rpar = new ScilabDouble([1, 0]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp(0)]);

        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, ["xstringb(orig(1),orig(2),\"SampleCLK\",sz(1),sz(2));"]);
        return new BasicBlock(this.x);
    }
    SampleCLK.prototype.details = function SampleCLK() {
        return this.x;
    }
SampleCLK.prototype.get = function SampleCLK() {
    if(this.frequ == 'undefined' || this.frequ == null){
        this.frequ = 1
    }
    if(this.offset == 'undefined' || this.offset == null){
        this.offset = 0
    }
    var options={
        frequ:["Sample time",this.frequ],
        offset:["Offset",this.offset],
    }
    return options
    }
SampleCLK.prototype.set = function SampleCLK() {
    this.frequ = parseFloat((arguments[0]["frequ"]))
    this.offset = parseFloat((arguments[0]["offset"]))
    if(this.frequ<0){
        alert("Frequency must be a positive number");
        throw "incorrect";
    }

            if(Math.abs(this.offset)>this.frequ){
                alert("The |Offset| must be less than the Frequency");
                throw "incorrect";
            }
    this.x.model.rpar = new ScilabDouble([this.frequ],[this.offset])
    this.x.model.evtout = new ScilabDouble([1]);
    this.x.model.firing = new ScilabDouble([-1]);
    var exprs = new ScilabString([this.frequ],[this.offset])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }
    SampleCLK.prototype.get_popup_title = function SampleCLK() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
    SampleCLK.prototype.getDimensionForDisplay = function SampleCLK(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
