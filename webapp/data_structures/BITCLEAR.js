function BITCLEAR() {
    BITCLEAR.prototype.define = function BITCLEAR() {
        this.Datatype=3;
        this.bit=0;
        var model = scicos_model();
        model.sim = list(new ScilabString(["bit_clear_32"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble([3]);
        model.opar = list(int32([0]));
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(0)]);
        var n =sci2exp(0).toString();
        this.displayParameter=[n];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"BITCLEAR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    BITCLEAR.prototype.details = function BITCLEAR() {
        return this.x;
    }
    BITCLEAR.prototype.get=function BITCLEAR(){
        var options={
            Datatype:["Data Type (3:int32, 4:int16, 5:int8, ...)",this.Datatype],
            bit:["Index of Bit (0 is least significant)",this.bit],
        }
        return options
    }
    BITCLEAR.prototype.set=function BITCLEAR(){
        this.Datatype = parseInt((arguments[0]["Datatype"]))
        this.bit = parseInt((arguments[0]["bit"]))
        if(Math.floor(this.bit)!=this.bit){
               alert("Wrong type for 'Index of Bit' parameter:"+this.bit+"\nMust be integer.");
                BITCLEAR.get();
        }
        if((this.Datatype == 3)||(this.Datatype == 6)){
            if((this.bit>31)||(this.bit < 0)){
                alert("Wrong value for 'Index of Bit' parameter:"+this.bit+"\nMust be in the interval [0, 31]");
                BITCLEAR.get();
            }
        }
        else if((this.Datatype==4)||(this.Datatype==7)){
                if(this.bit > 15 ||this.bit < 0){
                    alert("Wrong value for 'Index of Bit' parameter: "+this.bit+"\nMust be in the interval [0, 15]");
                    BITCLEAR.get();
                }
        }
        else if((this.Datatype==5)||(this.Datatype==8)){

                if(this.bit > 7 ||this.bit < 0){
                    alert("Wrong value for 'Index of Bit' parameter: "+this.bit+"\nMust be in the interval [0, 7]");
                    BITCLEAR.get();
                }
        }
        else{
                alert("Wrong value for 'Data Type' parameter: "+this.Datatype+"\nMust be in the interval [3, 8]");
                BITCLEAR.get();
        }
        if(this.Datatype == 3 || this.Datatype == 6){
            this.bit = Uint32Array.of(this.bit)

            this.n = (Math.pow(2,32)-1)-Math.pow(2,this.bit)

            this.n = uint32(this.n)

            this.x.model.sim = list(new ScilabString(["bit_clear_32"]), new ScilabDouble([4]));
        }
        else if(this.Datatype == 4 || this.Datatype == 7){
            this.bit = Uint16Array.of(this.bit)
            this.n = (Math.pow(2,16)-1)-Math.pow(2,this.bit)
            this.n = uint16(this.n)
            this.x.model.sim = list(new ScilabString(["bit_clear_16"]), new ScilabDouble([4]));
        }
        else if(this.Datatype == 5 || this.Datatype == 8){
            this.bit = Uint8Array.of(this.bit)
            this.n = (Math.pow(2,8)-1)-Math.pow(2,this.bit)
            this.n = uint8(this.n)
            this.x.model.sim = list(new ScilabString(["bit_clear_8"]), new ScilabDouble([4]));
        }
	this.displayParameter=[this.bit];

        this.x.model.intyp = new ScilabDouble([this.Datatype])
        this.x.model.outtyp = new ScilabDouble([this.Datatype])
        this.in = [parseFloat(getData(this.x.model.in)),parseFloat(getData(this.x.model.in2))]
        this.out = [[1],[1]]
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
        this.x.model.opar = list(new ScilabDouble([this.n]))
        var exprs = new ScilabString([sci2exp(this.Datatype)],[sci2exp(this.bit)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)

    }
    BITCLEAR.prototype.get_popup_title = function BITCLEAR() {
        var set_param_popup_title="Set BITCLEAR block parameters <br> Clear a bit";
        return set_param_popup_title
    }
    BITCLEAR.prototype.getDimensionForDisplay = function BITCLEAR(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }

}
