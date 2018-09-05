function TEXT_f() {

    TEXT_f.prototype.define = function TEXT_f() {
        this.font = 2;
        this.siz = 1;
	this.tag="Text";
        var model = scicos_model();
        model.sim = new ScilabString(["Text"]);
        model.rpar = new ScilabString(["Text"]);
        model.ipar = new ScilabDouble([this.font], [this.siz]);
        var exprs = ["Text", this.font, this.siz];
	var n =this.tag;
        this.displayParameter=[n];
        var graphics = scicos_graphics();
        graphics.orig = new ScilabDouble([0, 0]);
        graphics.sz = new ScilabDouble([2, 1]);
        graphics.exprs = new ScilabString(exprs);
        this.x = mlist(["Text", "graphics", "model", "void", "gui"], new ScilabString(["Text", "graphics", "model", "void", "gui"]), graphics, model, new ScilabString([" "]), new ScilabString(["TEXT_f"]));
        return new TextBlock(this.x);
    }

TEXT_f.prototype.get = function TEXT_f() {

        var options={
            tag:["Type your text",this.tag],
        }
        return options
    }
TEXT_f.prototype.set = function TEXT_f() {
    this.tag = arguments[0]["tag"]

    var n =this.tag;

    this.displayParameter=[n];

    this.x.model.rpar = new ScilabString([this.tag]);
    var exprs = new ScilabString([this.tag, this.font, this.siz])
    this.x.graphics.exprs=exprs
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
