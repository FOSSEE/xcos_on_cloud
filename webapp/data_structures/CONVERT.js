function CONVERT() {

    CONVERT.prototype.define = function CONVERT() {
        this.sgn = 2;
        var model = scicos_model();
        model.sim = list(new ScilabString(["convert"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.out = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.out2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.outtyp = new ScilabDouble([3]);
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([this.sgn]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(1)], [sci2exp(3)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONVERT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CONVERT.prototype.details = function CONVERT() {
        return this.x;

    }
    CONVERT.prototype.get = function CONVERT() {
        if(this.it == undefined || this.it == null)
            this.it = 1

        if(this.ot == undefined || this.ot == null)
            this.ot = 3

        if(this.np == undefined || this.np == null)
            this.np = 0

        var options={
            it:["Input Type (1:double, 3:int32, 4:int16, 5:int8, ...)",this.it],
            ot:["Output Type (1:double, 3:int32, 4:int16, 5:int8, ...)",this.ot],
            np:["Do on Overflow (0:Nothing, 1:Saturate, 2:Error)",this.np],
        }
        return options
    }
    CONVERT.prototype.set = function CONVERT() {
        this.it = parseFloat((arguments[0]["it"]))
        this.ot = parseFloat((arguments[0]["ot"]))
        this.np = parseFloat((arguments[0]["np"]))

        if(this.it == 2)
            this.it = 1
        if(this.ot == 2)
            this.ot = 1
        if((this.np!=0)&&(this.np!=1)&&(this.np!=2)){
                alert("Wrong value for 'Do on Overflow' parameter: "+this.np+"\nMust be in the interval [0, 2]");
                throw "incorrect";
        }
        else if((this.it>8)||(this.it<1)){
                alert("Wrong value for 'Input Type' parameter: "+this.it+"\nMust be in the interval [1, 8]");
                throw "incorrect";
        }
        else if((this.ot>8)||(this.ot<1)){
                alert("Wrong value for 'Output Type' parameter: "+this.ot+"\nMust be in the interval [1, 8]");
                throw "incorrect";
        }
        this.x.model.sim = list(new ScilabString(["convert"]), new ScilabDouble([4]));

        var ipar = 0

        if(this.it == this.ot){
            ipar = 1
        }
        else{
            if(this.np == 0){
                if(this.it == 1){
                    if(this.ot == 3)
                        ipar = 2
                    else if(this.ot == 4)
                        ipar = 3
                    else if(this.ot == 5)
                        ipar = 4
                    else if(this.ot == 6)
                        ipar = 5
                    else if(this.ot == 7)
                        ipar = 6
                    else if(this.ot == 8)
                        ipar = 7
                }
                else if(this.it == 3){
                    if(this.ot == 1)
                        ipar = 8
                    else if(this.ot == 4)
                        ipar = 9
                    else if(this.ot == 5)
                        ipar = 10
                    else if(this.ot == 6)
                        ipar = 1
                    else if(this.ot == 7)
                        ipar = 11
                    else if(this.ot == 8)
                        ipar = 12
                }
                else if(this.it == 4){
                    if(this.ot == 1)
                        ipar = 13
                    else if(this.ot == 3)
                        ipar = 14
                    else if(this.ot == 5)
                        ipar = 15
                    else if(this.ot == 6)
                        ipar = 16
                    else if(this.ot == 7)
                        ipar = 1
                    else if(this.ot == 8)
                        ipar = 17
                }
                else if(this.it == 5){
                    if(this.ot == 1)
                        ipar = 18
                    else if(this.ot == 3)
                        ipar = 19
                    else if(this.ot == 4)
                        ipar = 20
                    else if(this.ot == 6)
                        ipar = 21
                    else if(this.ot == 7)
                        ipar = 22
                    else if(this.ot == 8)
                        ipar = 1
                }
                else if(this.it == 6){
                    if(this.ot == 1)
                        ipar = 23
                    else if(this.ot == 3)
                        ipar = 1
                    else if(this.ot == 4)
                        ipar = 24
                    else if(this.ot == 5)
                        ipar = 25
                    else if(this.ot == 7)
                        ipar = 26
                    else if(this.ot == 8)
                        ipar = 27
                }
                else if(this.it == 7){
                    if(this.ot == 1)
                        ipar = 28
                    else if(this.ot == 3)
                        ipar = 29
                    else if(this.ot == 4)
                        ipar = 1
                    else if(this.ot == 5)
                        ipar = 30
                    else if(this.ot == 6)
                        ipar = 31
                    else if(this.ot == 8)
                        ipar = 32
                }
                else if(this.it == 8){
                    if(this.ot == 1)
                        ipar = 33
                    else if(this.ot == 3)
                        ipar = 34
                    else if(this.ot == 4)
                        ipar = 35
                    else if(this.ot == 5)
                        ipar = 1
                    else if(this.ot == 6)
                        ipar = 36
                    else if(this.ot == 7)
                        ipar = 37
                }
            }
            if(this.np == 1){
                if(this.it == 1){
                    if(this.ot == 3)
                        ipar = 38
                    else if(this.ot == 4)
                        ipar = 39
                    else if(this.ot == 5)
                        ipar = 40
                    else if(this.ot == 6)
                        ipar = 41
                    else if(this.ot == 7)
                        ipar = 42
                    else if(this.ot == 8)
                        ipar = 43
                }
                else if(this.it == 3){
                    if(this.ot == 1)
                        ipar = 8
                    else if(this.ot == 4)
                        ipar = 44
                    else if(this.ot == 5)
                        ipar = 45
                    else if(this.ot == 6)
                        ipar = 46
                    else if(this.ot == 7)
                        ipar = 47
                    else if(this.ot == 8)
                        ipar = 48
                }
                else if(this.it == 4){
                    if(this.ot == 1)
                        ipar = 13
                    else if(this.ot == 3)
                        ipar = 14
                    else if(this.ot == 5)
                        ipar = 49
                    else if(this.ot == 6)
                        ipar = 50
                    else if(this.ot == 7)
                        ipar = 51
                    else if(this.ot == 8)
                        ipar = 52
                }
                else if(this.it == 5){
                    if(this.ot == 1)
                        ipar = 18
                    else if(this.ot == 3)
                        ipar = 19
                    else if(this.ot == 4)
                        ipar = 20
                    else if(this.ot == 6)
                        ipar = 53
                    else if(this.ot == 7)
                        ipar = 54
                    else if(this.ot == 8)
                        ipar = 55
                }
                else if(this.it == 6){
                    if(this.ot == 1)
                        ipar = 23
                    else if(this.ot == 3)
                        ipar = 56
                    else if(this.ot == 4)
                        ipar = 57
                    else if(this.ot == 5)
                        ipar = 58
                    else if(this.ot == 7)
                        ipar = 59
                    else if(this.ot == 8)
                        ipar = 60
                }
                else if(this.it == 7){
                    if(this.ot == 1)
                        ipar = 28
                    else if(this.ot == 3)
                        ipar = 29
                    else if(this.ot == 4)
                        ipar = 61
                    else if(this.ot == 5)
                        ipar = 62
                    else if(this.ot == 6)
                        ipar = 31
                    else if(this.ot == 8)
                        ipar = 63
                }
                else if(this.it == 8){
                    if(this.ot == 1)
                        ipar = 33
                    else if(this.ot == 3)
                        ipar = 34
                    else if(this.ot == 4)
                        ipar = 35
                    else if(this.ot == 5)
                        ipar = 64
                    else if(this.ot == 6)
                        ipar = 36
                    else if(this.ot == 7)
                        ipar = 37
                }
            }
            else if(this.np == 2){
                if(this.it == 1){
                    if(this.ot == 3)
                        ipar = 65
                    else if(this.ot == 4)
                        ipar = 66
                    else if(this.ot == 5)
                        ipar = 67
                    else if(this.ot == 6)
                        ipar = 68
                    else if(this.ot == 7)
                        ipar = 69
                    else if(this.ot == 8)
                        ipar = 70
                }
                else if(this.it == 3){
                    if(this.ot == 1)
                        ipar = 8
                    else if(this.ot == 4)
                        ipar = 71
                    else if(this.ot == 5)
                        ipar = 72
                    else if(this.ot == 6)
                        ipar = 73
                    else if(this.ot == 7)
                        ipar = 74
                    else if(this.ot == 8)
                        ipar = 75
                }
                else if(this.it == 4){
                    if(this.ot == 1)
                        ipar = 13
                    else if(this.ot == 3)
                        ipar = 14
                    else if(this.ot == 5)
                        ipar = 76
                    else if(this.ot == 6)
                        ipar = 77
                    else if(this.ot == 7)
                        ipar = 78
                    else if(this.ot == 8)
                        ipar = 79
                }
                else if(this.it == 5){
                    if(this.ot == 1)
                        ipar = 18
                    else if(this.ot == 3)
                        ipar = 19
                    else if(this.ot == 4)
                        ipar = 20
                    else if(this.ot == 6)
                        ipar = 80
                    else if(this.ot == 7)
                        ipar = 81
                    else if(this.ot == 8)
                        ipar = 82
                }
                else if(this.it == 6){
                    if(this.ot == 1)
                        ipar = 23
                    else if(this.ot == 3)
                        ipar = 83
                    else if(this.ot == 4)
                        ipar = 84
                    else if(this.ot == 5)
                        ipar = 85
                    else if(this.ot == 7)
                        ipar = 86
                    else if(this.ot == 8)
                        ipar = 87
                }
                else if(this.it == 7){
                    if(this.ot == 1)
                        ipar = 28
                    else if(this.ot == 3)
                        ipar = 29
                    else if(this.ot == 4)
                        ipar = 88
                    else if(this.ot == 5)
                        ipar = 89
                    else if(this.ot == 6)
                        ipar = 31
                    else if(this.ot == 8)
                        ipar = 90
                }
                else if(this.it == 8){
                    if(this.ot == 1)
                        ipar = 33
                    else if(this.ot == 3)
                        ipar = 34
                    else if(this.ot == 4)
                        ipar = 35
                    else if(this.ot == 5)
                        ipar = 91
                    else if(this.ot == 6)
                        ipar = 36
                    else if(this.ot == 7)
                        ipar = 37
                }
            }
        }
        this.x.model.intyp = new ScilabDouble([this.it])
        this.x.model.outtyp = new ScilabDouble([this.ot])
        this.x.model.ipar = new ScilabDouble([ipar])
        var exprs = new ScilabString([sci2exp(this.it)],[sci2exp(this.ot)],[sci2exp(this.np)])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    CONVERT.prototype.get_popup_title = function CONVERT() {
        var set_param_popup_title="Set CONVERT block parameters <br> Type conversion";
        return set_param_popup_title
    }
    CONVERT.prototype.getDimensionForDisplay = function CONVERT(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }

}
