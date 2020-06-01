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
        var options = {
            ind:["indices to extract",this.ind],
        }
        return options
    }
    EXTRACTOR.prototype.set = function EXTRACTOR() {
        var temp_ind = arguments[0]["ind"];
        var ind_1 = inverse(temp_ind);
        for (var i = ind_1.length - 1; i >= 0; i--) {
            ind_1[i] = Math.floor(ind_1[i]);
        }
        this.ind = temp_ind;
        this.x.model.ipar = new ScilabDouble(...ind_1);
        var exprs = new ScilabString([this.ind]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    EXTRACTOR.prototype.get_popup_title = function EXTRACTOR() {
        var set_param_popup_title = "Set block parameters";
        return set_param_popup_title
    }
    EXTRACTOR.prototype.getDimensionForDisplay = function EXTRACTOR(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
