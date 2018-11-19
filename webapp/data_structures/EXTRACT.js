function EXTRACT() {

    EXTRACT.prototype.define = function EXTRACT() {
        this.function_name = "extract";
        this.funtyp = 4;

        var model = scicos_model();
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([this.funtyp]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble();
        model.evtout = new ScilabDouble();
        model.state = new ScilabDouble();
        model.dstate = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([1, 1, 1, 1]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var label = new ScilabString([sci2exp(1)], [sci2exp([1])], [sci2exp([1])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, label, gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACT.prototype.details = function EXTRACT() {
        return this.x;
    }
    EXTRACT.prototype.get = function EXTRACT() {
        if(this.typ == undefined || this.typ == null)
            this.typ = "1"
        if(this.a == undefined || this.a == null){
            this.a = "1"
        }
        if(this.b == undefined || this.b == null){
            this.b = "1"
        }
        var options={
            typ:["Datatype (1=real double  2=Complex)",this.typ],
            a:["Lines to extract",this.a.toString().replace(/,/g," ")],
            b:["Columns to extract",this.b.toString().replace(/,/g," ")],
        }
        return options
    }
    EXTRACT.prototype.set = function EXTRACT() {
        this.typ = parseFloat((arguments[0]["typ"]))
        this.a = inverse(arguments[0]["a"])
        this.b = inverse(arguments[0]["b"])
        if(this.typ == 1){
            this.function_name = "extract"
            this.x.model.intyp = new ScilabDouble([1])
            this.x.model.outtyp = new ScilabDouble([1])
        }
        else if(this.typ == 2){
            this.function_name = "extractz"
            this.x.model.intyp = new ScilabDouble([2])
            this.x.model.outtyp = new ScilabDouble([2])
        }
        else{
                alert("Datatype is not supported");
                EXTRACT.get();
        }
        this.ma = size(this.a,1)
        this.mb = size(this.b,1)
        if((this.ma==0)||(this.mb==0)){
            alert("empty field");
            EXTRACT.get();
        }
            for(var i=this.ma-1;i>=0;i--){
                if(this.a[i]<=0){
                    alert("invalid index");
                    EXTRACT.get();
                }
            }
            for(j=this.mb-1;j>=0;j--){
                if(this.b[j]<=0){
                    alert("invalid index");
                    EXTRACT.get();
                }
            }
        this.x.model.ipar = new ScilabDouble(...this.a,...this.b,[this.ma],[this.mb])
        this.in = [parseFloat(getData(this.x.model.in)),parseFloat(getData(this.x.model.in2))]
        this.out = [[this.ma],[this.mb]]
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
        model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        this.x.graphics.exprs = label
        var exprs = new ScilabString([this.typ],[this.a.toString().replace(/,/g, " ")],[this.b.toString().replace(/,/g, " ")])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    EXTRACT.prototype.get_popup_title = function EXTRACT() {
        var set_param_popup_title="Set EXTRACT Block";
        return set_param_popup_title
    }
    EXTRACT.prototype.getDimensionForDisplay = function EXTRACT(){
        var dimension = [60,40];
        return dimension
    }

}
