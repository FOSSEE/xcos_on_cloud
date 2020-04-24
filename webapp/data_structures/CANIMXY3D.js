function CANIMXY3D() {

    CANIMXY3D.prototype.define = function CANIMXY3D() {
        this.win = -1;
        this.N = 2;
        this.clrs = [[1],[2],[3],[4],[5],[6],[7],[13]];
        this.siz = [[1],[1],[1],[1],[1],[1],[1],[1]];
        this.wpos = [[-1],[-1]];
        this.wdim = [[-1],[-1]];
        this.param3ds = [[50],[280]];
        this.vec_x = [[-15],[15]];
        this.vec_y = [[-15],[15]];
        this.vec_z = [[-15],[15]];
        this.nbr_curves = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["canimxy3d"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1], [1], [1]);
        model.intyp = new ScilabDouble([1], [1], [1]);
        model.rpar = new ScilabDouble(...colon_operator(this.vec_x), ...colon_operator(this.vec_y), ...colon_operator(this.vec_z), ...colon_operator(this.param3ds));
        model.ipar = new ScilabDouble([this.win], [8], [this.N], ...colon_operator(this.clrs), ...colon_operator(this.siz), [8], ...colon_operator(this.wpos), ...colon_operator(this.wdim), [this.nbr_curves]);
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.nbr_curves], [this.clrs.toString().replace(/,/g, " ")], [this.siz.toString().replace(/,/g, " ")], [this.win], [this.wpos.toString().replace(/,/g, " ")], [this.wdim.toString().replace(/,/g, " ")], [this.vec_x.toString().replace(/,/g, " ")], [this.vec_y.toString().replace(/,/g, " ")], [this.vec_z.toString().replace(/,/g, " ")], [this.param3ds.toString().replace(/,/g, " ")], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CANIMXY3D\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    CANIMXY3D.prototype.details = function CANIMXY3D() {
        return this.x;
    }
    CANIMXY3D.prototype.get = function CANIMXY3D() {

        var options = {
            nbr_curves:["Number of curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs],
            siz:["line or mark size",this.siz],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos],
            wdim:["Output window sizes",this.wdim],
            vec_x:["Xmin and Xmax",this.vec_x],
            vec_y:["Ymin and Ymax",this.vec_y],
            vec_z:["Zmin and Zmax",this.vec_z],
            param3ds:["Alpha and Theta",this.param3ds],
            N:["Buffer size",this.N],
        }
        return options
    }
    CANIMXY3D.prototype.set = function CANIMXY3D() {
        this.nbr_curves = parseFloat(arguments[0]["nbr_curves"]);
        var temp_clrs = arguments[0]["clrs"];
        var temp_siz = arguments[0]["siz"];
        this.win = parseFloat(arguments[0]["win"]);
        var temp_wpos = arguments[0]["wpos"];
        var temp_wdim = arguments[0]["wdim"];
        var temp_vec_x = arguments[0]["vec_x"];
        var temp_vec_y = arguments[0]["vec_y"];
        var temp_vec_z = arguments[0]["vec_z"];
        var temp_param3ds = arguments[0]["param3ds"];
        this.N = parseFloat(arguments[0]["N"]);
        var clrs_1 = inverse(temp_clrs);
        var siz_1 = inverse(temp_siz);
        var wpos_1 = inverse(temp_wpos);
        var wdim_1 = inverse(temp_wdim);
        var vec_x_1 = inverse(temp_vec_x);
        var vec_y_1 = inverse(temp_vec_y);
        var vec_z_1 = inverse(temp_vec_z);
        var param3ds_1 = inverse(temp_param3ds);
        if(size(clrs_1,"*") != size(siz_1,"*")){
            alert("Colors and Size must have same size");
            throw "incorrect";
        }
        if(this.nbr_curves <= 0){
            alert("Number of curves cannot be negative or null");
            throw "incorrect";
        }
        if(size(clrs_1,"*") < this.nbr_curves){
            alert("You must have at least same size for clrs and the number of curves");
            throw "incorrect";
        }
        if((size(wpos_1,"*") != 0) && (size(wpos_1,"*") != 2)){
            alert("Window position must be [] or a 2 vector");
            throw "incorrect";
        }
        if((size(wdim_1,"*") != 0) && (size(wdim_1,"*") != 2)){
            alert("Window dim must be [] or a 2 vector");
            throw "incorrect";
        }
        if(this.win < -1){
            alert("Window number cannot be inferior than -1");
            throw "incorrect";
        }
        if(this.N < 1){
            alert("Buffer size must be at least 1");
            throw "incorrect";
        }
        if(this.N < 2){
            for(var i = 0;i < this.nbr_curves;i++){
                if(clrs_1[i] > 0){
                    alert("Buffer size must be at least 2 or Change a color (must be <0)");
                    throw "incorrect";
                }
            }
        }
        if(vec_y_1[0] >= vec_y_1[1]){
            alert("Ymax must be higher than Ymin");
            throw "incorrect";
        }
        if(vec_x_1[0] >= vec_x_1[1]){
            alert("Xmax must be higher than Xmin");
            throw "incorrect";
        }
        if(vec_z_1[0] >= vec_z_1[1]){
            alert("Zmax must be higher than Zmin");
            throw "incorrect";
        }
        this.in = ones(3,1);
        this.in2 = ones(3,1);
        for (var i = this.in.length - 1; i >= 0; i--) {
            this.in[i][0] = this.in[i][0]*this.nbr_curves;
        }

        this.x.model.intyp = new ScilabDouble(...ones(3,1));
        var io = set_io(this.x.model,this.x.graphics,[...this.in,...this.in2],[],ones(1,1),[]);
        if(wpos_1.length == 0){
            this.wpos = [[-1],[-1]];
        }
        if(wdim_1.length == 0){
            this.wdim = [[-1],[-1]];
        }
        this.clrs = temp_clrs;
        this.siz = temp_siz;
        this.wpos = temp_wpos;
        this.wdim = temp_wdim;
        this.vec_x = temp_vec_x;
        this.vec_y = temp_vec_y;
        this.vec_z = temp_vec_z;
        this.param3ds = temp_param3ds;
        var rpar = new ScilabDouble(...vec_x_1,...vec_y_1,...vec_z_1,...param3ds_1);
        this.size_siz = size(siz_1,"*");
        var ipar = new ScilabDouble([this.win],[this.size_siz],[this.N],...clrs_1,...siz_1,[1],...wpos_1,...wdim_1,[this.nbr_curves]);
        this.x.model.rpar = rpar;
        this.x.model.ipar = ipar;
        var exprs = new ScilabString([this.nbr_curves],[this.clrs],[this.siz],[this.win],[this.wpos],[this.wdim],[this.vec_x],[this.vec_y],[this.vec_z],[this.param3ds],[this.N]);
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    CANIMXY3D.prototype.get_popup_title = function CANIMXY3D() {
        var set_param_popup_title = "Set Scope parameters";
        return set_param_popup_title
    }
    CANIMXY3D.prototype.getDimensionForDisplay = function CANIMXY3D(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }
}
