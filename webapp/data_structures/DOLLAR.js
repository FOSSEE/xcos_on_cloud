function DOLLAR() {

    DOLLAR.prototype.define = function DOLLAR() {
        this.z = 0;
        this.inh = 0;
        this.in1 = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["dollar4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([this.in1]);
        model.out = new ScilabDouble([this.in1]);
        model.evtin = new ScilabDouble([1 - this.inh]);
        model.dstate = new ScilabDouble([this.z]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.z], [this.inh]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DOLLAR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DOLLAR.prototype.details = function DOLLAR() {
        return this.x;
    }
    DOLLAR.prototype.get = function DOLLAR() {
        if(this.a == undefined || this.a == null){
            this.a = "0"
        }
        var options={
            a:["initial condition",this.a.toString().replace(/,/g," ")],
            inh:["Inherit (no:0, yes:1)",this.inh.toString().replace(/,/g," ")],
        }
        return options
    }
    DOLLAR.prototype.set = function DOLLAR() {
        this.a = inverse(arguments[0]["a"])
        this.inh = inverse(arguments[0]["inh"])
        this.out = [[size(this.a,1)],[size(this.a,2)]]
        if(this.out == 0)
            this.out = []
        this.in = this.out
        this.x.model.sim = list(new ScilabString(["dollar4"]), new ScilabDouble([4]))
        this.x.model.odstate = list(new ScilabDouble(...this.a))
        this.x.model.dstate = new ScilabDouble()

        //assuming "type ((a)==1)" is True
        this.x.model.intyp = new ScilabDouble([1])
        this.x.model.outtyp = new ScilabDouble([1])
        if(size(this.a,1)==1 || size(this.a,2)==1){
            this.x.model.dstate = new ScilabDouble(...this.a)
            this.x.model.odstate = list()
        }

        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(1-this.inh,1),[])
        var exprs = new ScilabString([this.a.toString().replace(/,/g, " ")],[this.inh.toString().replace(/,/g, " ")])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    DOLLAR.prototype.get_popup_title = function DOLLAR() {
        var set_param_popup_title="Set 1/z block parameters";
        return set_param_popup_title
    }
    DOLLAR.prototype.getDimensionForDisplay = function DOLLAR(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
