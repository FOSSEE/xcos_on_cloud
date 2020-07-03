function SCALAR2VECTOR() {

    SCALAR2VECTOR.prototype.define = function SCALAR2VECTOR() {
        this.nout = -1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["scalar2vector"]), new ScilabDouble([4]));
        model.out = new ScilabDouble([this.nout]);
        model.in = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.nout]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SCALAR2VECTOR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    SCALAR2VECTOR.prototype.details = function SCALAR2VECTOR() {
        return this.x;
    }
    SCALAR2VECTOR.prototype.get = function SCALAR2VECTOR() {
        var options={
            nout:["size of output (-1: if don''t know)",this.nout],
        }
        return options
    }
    SCALAR2VECTOR.prototype.set = function SCALAR2VECTOR() {
    this.nout = parseInt((arguments[0]["nout"]))
    this.nout = Math.floor(this.nout)
    if(this.nout!=-1 &&this.nout<=0){
        alert("size of output must be -1 or >0");
        throw "incorrect";
    }
    var io = check_io(this.x.model,this.x.graphics,[1],[this.nout],[],[])
    var exprs = new ScilabString([this.nout])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    SCALAR2VECTOR.prototype.get_popup_title = function SCALAR2VECTOR() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
    SCALAR2VECTOR.prototype.getDimensionForDisplay = function SCALAR2VECTOR(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
