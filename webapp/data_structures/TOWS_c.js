function TOWS_c() {

    TOWS_c.prototype.define = function TOWS_c() {
        var nu = -1;
        this.nz = 128;
        this.varnam = "A";
        this.herit = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["tows_c"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([nu]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([-1]);
        model.out = new ScilabDouble();
        model.evtin = new ScilabDouble([1]);
        model.evtout = new ScilabDouble();
        model.rpar = new ScilabDouble();
        model.ipar = new ScilabDouble([this.nz], [this.varnam.length], ascii(this.varnam));
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"TOWS_c\",sz(1),sz(2));"]);;

        var exprs = new ScilabString([this.nz], [this.varnam], [this.herit]);
        var n = this.nz.toString();
        this.displayParameter = [[this.varnam],[n]];
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    TOWS_c.prototype.details = function TOWS_c() {
        return this.x;
    }
    TOWS_c.prototype.get = function TOWS_c() {
        var options={
            nz:["Size of buffer",this.nz],
            varnam:["Scilab variable name",this.varnam],
            herit:["Inherit (no:0, yes:1)",this.herit],
        }
        return options
    }
    TOWS_c.prototype.set = function TOWS_c() {
        var nz1 = arguments[0]["nz"];
        var varnam1 = arguments[0]["varnam"];
        var herit1 = arguments[0]["herit"];

        var regex_char = /[a-zA-Z]/g; //check character
        var regex_special_char = /[!@#$%&_=]/g; //check character
        var regex_math_char = /[^*-+]/g; //check character
        var regex_semicolon_comma = /[,;]+/; //check semicolon and comma
        var regex_parentheses = /[\])}[{(]/g; // check for brackets
        var regex_num = /^\d+$/; //check number only
        var regex_special_withmath_char = /[@%^&*-+=]/g; //check character


        nz1 = nz1.trim().replace(regex_parentheses, '');
        if (!regex_num.test(nz1)) {
            var chararray = nz1.match(regex_char);
            if (chararray != null) {
                if (nz1.includes("%pi")){
                    nz1.replace("%pi", Math.PI);
                }else{
                    alert("Answer given for Size of buffer is incorrect:\nUndefined variable:"+nz1);
                    throw "incorrect";
                }
            }
            var specialarray = nz1.match(regex_special_char);
            if (specialarray != null) {
                if (nz1.includes("%pi")){
                    nz1.replace("%pi", Math.PI);
                }else{
                    if(specialarray.includes("&")){
                        alert("Answer given for Size of buffer\nhas incorrect type vec.");
                        throw "incorrect";
                    }else{
                        alert("Answer given for Size of buffer \nis incorrect: Missing operator, comma, or semicolon.");
                        throw "incorrect";
                    }
                }
            }
            var semi_comma_array = nz1.match(regex_semicolon_comma);
            if (semi_comma_array != null) {
                alert("Answer given for Size of buffer\nhas invalid dimension:\nwaiting for dimension 1.");
                throw "incorrect";
            }
        }
        var lastchar = nz1.slice(-1);
        var exist_last_char = regex_math_char.test(lastchar);
        if(!exist_last_char){
            alert("Answer given for Size of buffer\nis incorrect: Invalid factor..");
            throw "incorrect";
        }
        var nz2 = getValueOfImaginaryInput(nz1);
        if(nz2<=0){
            alert("Size of buffer must be positive");
            throw "incorrect";
        }

        var chararray = varnam1.match(regex_char);
        if (chararray != null) {
            if(regex_special_withmath_char.test(varnam1)){
                alert("Invalid variable name. \nPlease choose another variable name.");
                throw "incorrect";
            }
            if(regex_parentheses.test(varnam1)){
                alert("Invalid variable name. \nPlease choose another variable name.");
                throw "incorrect";
            }
            if(regex_semicolon_comma.test(varnam1)){
                alert("Invalid variable name. \nPlease choose another variable name.");
                throw "incorrect";
            }
        }else{
            alert("Invalid variable name. \nPlease choose another variable name.");
            throw "incorrect";
        }

        herit1 = herit1.trim().replace(regex_parentheses, '');
        if (!regex_num.test(herit1)) {
            var chararray = herit1.match(regex_char);
            if (chararray != null) {
                if (herit1.includes("%pi")){
                    herit1.replace("%pi", Math.PI);
                }else{
                    alert("Answer given for Inherit (no:0, yes:1) is incorrect:\nUndefined variable:"+herit1);
                    throw "incorrect";
                }
            }
            var specialarray = herit1.match(regex_special_char);
            if (specialarray != null) {
                if (herit1.includes("%pi")){
                    herit1.replace("%pi", Math.PI);
                }else{
                    if(specialarray.includes("&")){
                        alert("Answer given for Inherit (no:0, yes:1)\nhas incorrect type vec.");
                        throw "incorrect";
                    }else{
                        alert("Answer given for Inherit (no:0, yes:1)\nis incorrect: Missing operator, comma, or semicolon.");
                        throw "incorrect";
                    }
                }
            }
            var semi_comma_array = herit1.match(regex_semicolon_comma);
            if (semi_comma_array != null) {
                alert("Answer given for Inherit (no:0, yes:1)\nhas invalid dimension:\nwaiting for dimension 1.");
                throw "incorrect";
            }
        }
        var herit2 = parseFloat(getValueOfImaginaryInput(herit1));
        if (herit2 != 0){
            herit2 = 1;
        }
        nz2 = parseFloat(nz2);
        this.nz = nz1;
        this.varnam = varnam1;
        this.herit = herit1;
        this.x.model.intyp = new ScilabDouble([-1]);
        var io = set_io(this.x.model,this.x.graphics,[[-1],[-2]],[],ones(1-herit2,1),[]);
        if(herit2 == 1){
            this.x.model.blocktype = new ScilabString(["x"]);
        }else{
            this.x.model.blocktype = new ScilabString(["d"]);
        }
        this.x.model.ipar = new ScilabDouble([nz2],[this.varnam.length],...ascii(this.varnam));
        var exprs = new ScilabString([this.nz],[this.varnam],[this.herit]);
        this.displayParameter = [[this.varnam],[this.nz]];
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }


    TOWS_c.prototype.get_popup_title = function TOWS_c() {
        var set_param_popup_title="Set Xcos Buffer Block";
        return set_param_popup_title
    }
    TOWS_c.prototype.getDimensionForDisplay = function TOWS_c(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }
}
