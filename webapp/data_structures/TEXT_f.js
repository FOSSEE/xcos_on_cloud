function TEXT_f() {

    TEXT_f.prototype.define = function TEXT_f() {
        this.font = 2;
        this.siz = 1;
	this.txt="Text";
        var model = scicos_model();
        model.sim = new ScilabString(["Text"]);
        model.rpar = new ScilabString(["Text"]);
        model.ipar = new ScilabDouble([this.font], [this.siz]);
        var exprs = new ScilabString(["Text"], [this.font], [this.siz]);
        this.displayParameter=[this.txt];
        var graphics = scicos_graphics();
        graphics.orig = new ScilabDouble([0, 0]);
        graphics.sz = new ScilabDouble([2, 1]);
        graphics.exprs = exprs;
        this.x = mlist(["Text", "graphics", "model", "void", "gui"], new ScilabString(["Text", "graphics", "model", "void", "gui"]), graphics, model, new ScilabString([" "]), new ScilabString(["TEXT_f"]));
        return new TextBlock(this.x);
    }

TEXT_f.prototype.get = function TEXT_f() {

        var options={
            txt:["Type your text",this.txt],
        }
        return options
    }
TEXT_f.prototype.set = function TEXT_f() {
    this.txt = arguments[0]["txt"]

    this.displayParameter=[this.txt];

    this.x.model.rpar = new ScilabString([this.txt]);
    var exprs = new ScilabString([this.txt], [this.font], [this.siz]);
    this.x.graphics.exprs = exprs;
    return new TextBlock(this.x)
    }

    TEXT_f.prototype.details = function TEXT_f() {
        return this.x;
    }

    TEXT_f.prototype.get_popup_title = function TEXT_f() {
        var set_param_popup_title="Set Text block parameters";
        return set_param_popup_title
    }

}
