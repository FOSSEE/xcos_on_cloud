function EXTRACTOR() {

    EXTRACTOR.prototype.define = function EXTRACTOR() {
        this.ind = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["extractor"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);
        model.ipar = new ScilabDouble([this.ind]);

        var exprs = new ScilabString([sci2exp(this.ind)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACTOR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACTOR.prototype.details = function EXTRACTOR() {
        return this.x;
    }
    EXTRACTOR.prototype.get = function EXTRACTOR() {
        var options={
            ind:["indices to extract",sci2exp(this.ind)],
        }
        return options
    }
EXTRACTOR.prototype.set = function EXTRACTOR() {
    this.ind = MatrixInverse(arguments[0]["ind"])
    for (var i =this.ind.length - 1; i >= 0; i--) {
        this.ind[i] = Math.floor(this.ind[i])
    }
    this.x.model.ipar = new ScilabDouble(...this.ind);
    var exprs = new ScilabString([sci2exp(this.ind)])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    EXTRACTOR.prototype.get_popup_title = function EXTRACTOR() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
    EXTRACTOR.prototype.getDimensionForDisplay = function EXTRACTOR(){
        var dimension = [60,40];
        return dimension
    }
}
