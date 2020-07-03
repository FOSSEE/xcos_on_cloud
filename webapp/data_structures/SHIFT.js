function SHIFT() {

    SHIFT.prototype.define = function SHIFT() {
        this.sgn = [[0],[0]];
        this.OPER = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["shift_32_LA"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble([3]);
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble(...this.sgn);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(0)], [sci2exp(0)]);
        var n =sci2exp(0).toString();
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"SHIFT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    SHIFT.prototype.details = function SHIFT() {
        return this.x;
    }
    SHIFT.prototype.get = function SHIFT() {
        if(this.Datatype == undefined || this.Datatype ==null)
            this.Datatype = 3
        if(this.nb == undefined || this.nb ==null)
            this.nb = 0
        if(this.np == undefined || this.np ==null)
            this.np = 0

        var options={
            Datatype:["Data Type (3:int32, 4:int16, 5:int8, ...)",this.Datatype],
            nb:[ "Number of Bits to Shift Left (Negative number to shift right)",this.nb],
            np:["Shift Type (0:Arithmetic, 1:Circular)",this.np],
        }
        return options
    }
    SHIFT.prototype.set = function SHIFT() {
        this.Datatype = parseFloat((arguments[0]["Datatype"]))
        this.nb = parseFloat((arguments[0]["nb"]))
        this.np = parseFloat((arguments[0]["np"]))
        if((this.np!=0)&&(this.np!=1)){
                alert("Wrong value for ''Shift Type' parameter: "+this.np+"\nMust be in the interval [0, 1]");
                throw "incorrect";
        }
        this.it = this.Datatype
        this.ot = this.Datatype
        if(this.Datatype == 3 || this.Datatype == 6){
            if(this.nb > 0){
                if(this.np == 0)
                    this.function_name = "shift_32_LA"
                else if(this.np == 1)
                    this.function_name = "shift_32_LC"
            }
            else if(nb < 0){
                if(this.np == 0)
                    if(this.Datatype == 3)
                        this.function_name = "shift_32_RA"
                    else if(this.Datatype == 6)
                        this.function_name = "shift_u32_RA"
                else if(this.np == 1)
                    this.function_name = "shift_32_RC"
            }
        }
        else if(this.Datatype == 4 || this.Datatype == 7){
            if(this.nb > 0){
                if(this.np == 0)
                    this.function_name = "shift_16_LA"
                else if(this.np == 1)
                    this.function_name = "shift_16_LC"
            }
            else if(nb < 0){
                if(this.np == 0)
                    if(this.Datatype == 4)
                        this.function_name = "shift_16_RA"
                    else if(this.Datatype == 7)
                        this.function_name = "shift_u16_RA"
                else if(this.np == 1)
                    this.function_name = "shift_16_RC"
            }
        }
        else if(this.Datatype == 5 || this.Datatype == 8){
            if(this.nb > 0){
                if(this.np == 0)
                    this.function_name = "shift_8_LA"
                else if(this.np == 1)
                    this.function_name = "shift_8_LC"
            }
            else if(nb < 0){
                if(this.np == 0)
                    if(this.Datatype == 5)
                        this.function_name = "shift_8_RA"
                    else if(this.Datatype == 8)
                        this.function_name = "shift_u8_RA"
                else if(this.np == 1)
                    this.function_name = "shift_8_RC"
            }
        }
        else{
            alert( "Wrong value for 'Data Type' parameter: "+this.Datatype+"\nMust be in the interval [3, 8]");
            throw "incorrect";
        }
        this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        var io = set_io(this.x.model,this.x.graphics,[[-1],[-2]],[[-1],[-2]],[],[])
        this.x.model.ipar = new ScilabDouble([this.nb]);
        var exprs = new ScilabString([sci2exp(this.Datatype)],[sci2exp(this.nb)],[sci2exp(this.np)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    SHIFT.prototype.get_popup_title = function SHIFT() {
        var set_param_popup_title="Set SHIFT block parameters <br> Shift/Rotates bits <br>";
        return set_param_popup_title
    }
    SHIFT.prototype.getDimensionForDisplay = function SHIFT(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }


}
