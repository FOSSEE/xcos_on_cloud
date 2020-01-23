function CMAT3D () {

    CMAT3D.prototype.define = function CMAT3D() {
        this.cmin = 0;
        this.cmax = 100;
        this.colormap_string = "jetcolormap(25)";
        var colormap = get_colormap(this.colormap_string);
        var size_c = 25;
        this.vec_x = -1;
        this.vec_y = -1;
        var size_x = 1;
        var size_y = 1;
        var model = scicos_model();
        model.sim = list(new ScilabString(["cmat3d"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([-1]);
        model.in2 = new ScilabDouble([-2]);
        model.intyp = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.ipar = new ScilabDouble([this.cmin], [this.cmax], [size_c], [size_x], [size_y]);
        model.rpar = new ScilabDouble(...colon_operator(colormap), [this.x], [this.y]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean(true, false);
        var exprs = new ScilabString([this.vec_x], [this.vec_y], [this.colormap_string], [this.cmin], [this.cmax]);
        var gr_i = list(new ScilabString(["xstringb(orig(1),orig(2),\"CMAT3D\",sz(1),sz(2));"]), new ScilabDouble([8]));
        this.x = new standard_define(new ScilabDouble([80, 80]),model,exprs,gr_i);
        return new BasicBlock(this.x);
    }
    CMAT3D.prototype.get = function CMAT3D() {
        var options = {
            vec_x:["Bounds Vector X (-1 for standard)",this.vec_x],
            vec_y:["Bounds Vector Y (-1 for standard)",this.vec_y],
            colormap:["ColorMap",this.colormap_string],
            cmin:["Zmin",this.cmin],
            cmax:["Zmax",this.cmax]
        }
        return options
    }
    CMAT3D.prototype.set = function CMAT3D() {
        var colormap_string_1 = arguments[0]["colormap"];
        var regex_comma = /[,]+/; // check for commas
        var regex_char = /[a-zA-Z]/g; //check character
	    var regex_parentheses = /[\])}[{(]/g; // check for brackets
	    var regex_num = /^\d+$/; //check number only
        if(regex_comma.test(colormap_string_1)){
            alert("Answer given for ColorMap \nis incorrect: Inconsistent column/row dimensions.");
            throw "incorrect";
        }
        var size_c = 0;
        var colormap_values = [];
        var chararray = colormap_string_1.match(regex_char);
        if( chararray != null ){
            colormap_values = get_colormap(colormap_string_1);
            if (this.block_id != undefined){
                get_hex_color_code(this.block_id, colormap_values);
            }
            size_c = size(colon_operator(colormap_values),1);
        }else{
            var number = colormap_string_1.trim().replace(regex_parentheses, '');
            if(regex_num.test(number)){
                colormap_values = [parseFloat(number)];
                size_c = 1;
            }
        }
        this.colormap_string = colormap_string_1;
        var vec_x_1 = arguments[0]["vec_x"];
        var vec_y_1 = arguments[0]["vec_y"];
        this.vec_x = inverse(vec_x_1);
        this.vec_y = inverse(vec_y_1);
        if(size(this.vec_x,"*") != size(this.vec_y,"*")){
            alert("Vector X and Vector Y must have the same size");
            throw "incorrect";
        }
        var cmin_1 = parseFloat(arguments[0]["cmin"]);
	    var cmax_1 = parseFloat(arguments[0]["cmax"]);
	    if(cmax_1 <= cmin_1){
            alert("Error with minimum and maximum value");
            throw "incorrect";
        }
        this.cmin = cmin_1;
        this.cmax = cmax_1;
        var size_x = size(this.vec_x,"*");
        var ipar = new ScilabDouble([this.cmin],[this.cmax],[size_c],[size_x]);
        var rpar = new ScilabDouble(...colon_operator(colormap_values),...this.vec_x,...this.vec_y);
        this.x.model.ipar = ipar;
        this.x.model.rpar = rpar;
        var exprs = new ScilabString([this.vec_x.toString().replace(/,/g, " ")],[this.vec_y.toString().replace(/,/g, " ")],[this.colormap_string],[this.cmin],[this.cmax]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }
    CMAT3D.prototype.details = function CMAT3D() {
        return this.x
    }
    CMAT3D.prototype.setID = function CMAT3D(SetIDForBlock) {
        this.block_id = SetIDForBlock;
    }
    CMAT3D.prototype.get_popup_title = function CMAT3D() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }
    CMAT3D.prototype.getDimensionForDisplay = function CMAT3D(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
