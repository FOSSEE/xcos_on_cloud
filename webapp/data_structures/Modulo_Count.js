function Modulo_Count() {

    Modulo_Count.prototype.define = function Modulo_Count() {
        this.ini_c = 0;
        this.base = 3;

        var model = scicos_model();
        model.sim = list(new ScilabString(["modulo_count"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.ini_c]);
        model.ipar = new ScilabDouble([this.base]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.ini_c], [this.base]);
        var n= this.base.toString();
        this.displayParameter =[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Modulo_Count\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    Modulo_Count.prototype.internal = function Modulo_Count() {
        this.ini_c = 0;
        this.base = 3;

        var model = scicos_model();
        model.sim = list(new ScilabString(["modulo_count"]), new ScilabDouble([4]));
        model.evtin = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.ini_c]);
        model.ipar = new ScilabDouble([this.base]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.ini_c], [this.base]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"Modulo_Count\",sz(1),sz(2));"]);
        var block = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        block.graphics.style = new ScilabString(["Modulo_Count"]);
        return block;
    }
    Modulo_Count.prototype.details = function Modulo_Count() {
        return this.x;
    }
    Modulo_Count.prototype.get = function Modulo_Count() {
        var options={
            ini_c:["Initial State (zero or positive number)",this.ini_c],
            base:["Upper Limit (positive number)",this.base]
        }
        return options
    }
Modulo_Count.prototype.set = function Modulo_Count() {
    this.ini_c = parseFloat((arguments[0]["ini_c"]))
    this.base = parseFloat((arguments[0]["base"]))
    this.ini_c = Math.floor(this.ini_c)
    if(this.ini_c<0){
        alert("Wrong value for ''Initial State'' parameter: "+this.ini_c+"\nNull or positive integer expected.");
        Modulo_Count.get();
    }
    if(this.base<=0){
        alert("Wrong values for ''Upper Limit'' parameter: "+this.base+"\nStrictly positive integer expected.");
        Modulo_Count.get();
    }
    this.x.model.ipar = new ScilabDouble([this.base]);
    this.x.model.dstate = new ScilabDouble([this.ini_c]);
    var exprs = new ScilabString([this.ini_c],[this.base])
    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    Modulo_Count.prototype.get_popup_title = function Modulo_Count() {
        var set_param_popup_title="Set Modulo_Count block parameters <br> Modulo counter (0 to N counter)<br>";
        return set_param_popup_title
    }
    Modulo_Count.prototype.getDimensionForDisplay = function Modulo_Count(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
