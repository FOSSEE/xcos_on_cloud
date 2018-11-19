function EXTRACTBITS() {

    EXTRACTBITS.prototype.define = function EXTRACTBITS() {
        this.numb = [];
        this.Datatype=3
        this.rule=1
        this.bit=0
        this.scal=0
        var model = scicos_model();
        model.sim = list(new ScilabString(["extract_bit_32_UH0"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([3]);
        model.outtyp = new ScilabDouble([3]);
        model.ipar = new ScilabDouble([0, ...this.numb]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(3)], [sci2exp(1)], [sci2exp(0)], [sci2exp(0)]);
        this.displayParameter = ["1"];

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"EXTRACTBITS\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    EXTRACTBITS.prototype.details = function EXTRACTBITS() {
        return this.x;
    }
    EXTRACTBITS.prototype.get=function EXTRACTBITS(){
        var options={
            Datatype:["Data Type (3:int32, 4:int16, 5:int8, ...)",this.Datatype],
            rule:["Bits to extract",this.rule],
            bit:["Number of Bits or Index of Bit",this.bit.toString().replace(/,/g," ")],
            scal:["Treat Bit Field as an Integer (0:No, 1:Yes)",this.scal],
        }
        return options
    }
    EXTRACTBITS.prototype.set=function EXTRACTBITS(){
        this.Datatype = parseFloat((arguments[0]["Datatype"]))
        this.rule = parseFloat((arguments[0]["rule"]))
        this.bit = inverse((arguments[0]["bit"]))
        this.scal = parseFloat((arguments[0]["scal"]))

        if((this.rule<1)||(this.rule>5)){
                alert("Wrong value for 'Bits to Extract' parameter: "+this.rule+"\nMust be in the interval [1, 5]");
                EXTRACTBITS.get();
        }
        if((this.scal<0)||(this.scal>1)){
                alert("Wrong value for 'Treat Bit Field as an Integer' parameter: "+this.scal+"\nMust be in the interval [0, 1]");
                EXTRACTBITS.get();
        }
        this.in = [parseFloat(getData(this.x.model.in)),parseFloat(getData(this.x.model.in2))]
        if((this.rule==3)||(this.rule==4)){
            if(size(this.bit,"*")!=1){
                alert("Wrong size for 'Number of Bits or Index of Bit' parameter: "+this.bit+"\nMust be a single value.");
                EXTRACTBITS.get();
            }
            else
                this.numb=this.bit;
        }
        else if(this.rule==5){
            if(size(this.bit,"*")!=2){
                alert("Wrong size for 'Number of Bits or Index of Bit' parameter: "+this.bit+"\nMust have this form: [Start, End].");
                EXTRACTBITS.get();
            }
            else if(this.bit[0]>this.bit[1]){
                alert("Wrong values for 'Number of Bits or Index of Bit' parameter: "+this.bit+"\n''Start'' must be less than ''End''.");
                EXTRACTBITS.get();
            }
            else
                this.numb=this.bit[1]-this.bit[0];
        }
        else{
            this.bit=0;
            this.numb=[];
        }

        if((this.Datatype==3)||(this.Datatype==6))
        {
                if(this.rule==1)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_32_UH0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==3)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_32_UH1"]), new ScilabDouble([4]));
                                if(this.Datatype==6)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u32_UH1"]), new ScilabDouble([4]));
                        }

                }
                if(this.rule==2)
                        this.x.model.sim = list(new ScilabString(["extract_bit_32_LH"]), new ScilabDouble([4]));
                if(this.rule==3)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_32_MSB0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==3)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_32_MSB1"]), new ScilabDouble([4]));
                                if(this.Datatype==6)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u32_MSB1"]), new ScilabDouble([4]));
                        }

                }
                if(this.rule==4)
                        this.x.model.sim = list(new ScilabString(["extract_bit_32_LSB"]), new ScilabDouble([4]));
                if(this.rule==5)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_32_RB0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==3)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_32_RB1"]), new ScilabDouble([4]));
                                if(this.Datatype==6)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u32_RB1"]), new ScilabDouble([4]));
                        }

                }
        }
        if((this.Datatype==4)||(this.Datatype==7))
        {

                if(this.rule==1)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_16_UH0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==4)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_16_UH1"]), new ScilabDouble([4]));
                                if(this.Datatype==7)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u16_UH1"]), new ScilabDouble([4]));
                        }

                }
                if(this.rule==2)
                        this.x.model.sim = list(new ScilabString(["extract_bit_16_LH"]), new ScilabDouble([4]));
                if(this.rule==3)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_16_MSB0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==3)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_16_MSB1"]), new ScilabDouble([4]));
                                if(this.Datatype==6)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u16_MSB1"]), new ScilabDouble([4]));
                        }

                }
                if(this.rule==4)
                        this.x.model.sim = list(new ScilabString(["extract_bit_16_LSB"]), new ScilabDouble([4]));
                if(this.rule==5)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_16_RB0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==3)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_16_RB1"]), new ScilabDouble([4]));
                                if(this.Datatype==6)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u16_RB1"]), new ScilabDouble([4]));
                        }

                }
        }
        if((this.Datatype==5)||(this.Datatype==8))
        {

                if(this.rule==1)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_8_UH0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==5)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_8_UH1"]), new ScilabDouble([4]));
                                if(this.Datatype==8)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u8_UH1"]), new ScilabDouble([4]));
                        }

                }
                if(this.rule==2)
                        this.x.model.sim = list(new ScilabString(["extract_bit_8_LH"]), new ScilabDouble([4]));
                if(this.rule==3)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_8_MSB0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==5)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_8_MSB1"]), new ScilabDouble([4]));
                                if(this.Datatype==8)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u8_MSB1"]), new ScilabDouble([4]));
                        }

                }
                if(this.rule==4)
                        this.x.model.sim = list(new ScilabString(["extract_bit_8_LSB"]), new ScilabDouble([4]));
                if(this.rule==5)
                {
                        if(this.scal==0)
                                this.x.model.sim = list(new ScilabString(["extract_bit_8_RB0"]), new ScilabDouble([4]));
                        if(this.scal==1)
                        {
                                if(this.Datatype==5)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_8_RB1"]), new ScilabDouble([4]));
                                if(this.Datatype==8)
                                        this.x.model.sim = list(new ScilabString(["extract_bit_u8_RB1"]), new ScilabDouble([4]));
                        }

                }
        }

        this.x.model.intyp = new ScilabDouble([this.Datatype])
        this.x.model.outtyp = new ScilabDouble([this.Datatype])

        this.out = [[1],[1]]
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,[],[])
        this.x.model.ipar = new ScilabDouble([this.bit],[this.numb])
        var exprs = new ScilabString([sci2exp(this.Datatype)],[sci2exp(this.rule)],[sci2exp(this.bit)],[sci2exp(this.scal)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    EXTRACTBITS.prototype.get_popup_title = function EXTRACTBITS() {
        var set_param_popup_title="Set EXTRACTBITS block parameters <br> Bits Extraction <br> - Bits to Extract: <br> 1 Upper Half <br> 2 Lower Half <br> 3 Range from MSB <br> 4 Range to LSB <br> 5 Range of Bits <br> - Number of Bits or Index of bit : Index 0 is LSB. <br> If \"Bits to Extract\" is set to \"Range of bits\": [Start, End]";
        return set_param_popup_title
    }
    EXTRACTBITS.prototype.getDimensionForDisplay = function EXTRACTBITS(){
        var dimension = [80,40];
        return dimension
    }

}
