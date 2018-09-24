function CSCOPXY3D() {

    CSCOPXY3D.prototype.define = function CSCOPXY3D() {
        this.win = -1;
        this.clrs = [[1],[2],[3],[4],[5],[6],[7],[13]];
        this.siz = [[1],[1],[1],[1],[1],[1],[1],[1]];
        this.wdim = [[600],[400]];
        this.wpos = [[-1],[-1]];
        this.N = 2;
        this.param3ds = [[50],[280]];
        this.vec_x = [[-15],[15]];
        this.vec_y = [[-15],[15]];
        this.vec_z = [[-15],[15]];
        this.nbr_curves = 1;

        var model = scicos_model();
        model.sim = list(new ScilabString(["cscopxy3d"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1], [1]);
        model.in2 = new ScilabDouble([1], [1], [1]);
        model.intyp = new ScilabDouble([1], [1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble(...this.vec_x, ...this.vec_y, ...this.vec_z, ...this.param3ds);
        model.ipar = new ScilabDouble([this.win], [8], [this.N], ...this.clrs, ...this.siz, [8], ...this.wpos, ...this.wdim, [this.nbr_curves]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.nbr_curves], [this.clrs.toString().replace(/,/g, " ")], [this.siz.toString().replace(/,/g, " ")], [this.win], [sci2exp([])], [sci2exp(this.wdim)], [this.vec_x.toString().replace(/,/g, " ")], [this.vec_y.toString().replace(/,/g, " ")], [this.vec_z.toString().replace(/,/g, " ")], [this.param3ds.toString().replace(/,/g, " ")], [this.N]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CSCOPE\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CSCOPXY3D.prototype.details = function CSCOPXY3D() {
        return this.x;
    }
    CSCOPXY3D.prototype.get = function CSCOPXY3D() {

        var options={
            nbr_curves:["Number of curves",this.nbr_curves],
            clrs:["color (>0) or mark (<0)",this.clrs.toString().replace(/,/g," ")],
            siz:["Line or Mark Size",this.siz.toString().replace(/,/g," ")],
            win:["Output window number (-1 for automatic)",this.win],
            wpos:["Output window position",this.wpos.toString().replace(/,/g," ")],
            wdim:["Output window sizes",this.wdim.toString().replace(/,/g," ")],
            vec_x:["Xmin and Xmax",this.vec_x.toString().replace(/,/g," ")],
            vec_y:["Ymin and Ymax",this.vec_y.toString().replace(/,/g," ")],
            vec_z:["Zmin and Zmax",this.vec_z.toString().replace(/,/g," ")],
            param3ds:["Alpha and Theta",this.param3ds.toString().replace(/,/g," ")],
            N:["Buffer size",this.N],
        }
        return options
    }
    CSCOPXY3D.prototype.set = function CSCOPXY3D() {
        this.nbr_curves = parseFloat((arguments[0]["nbr_curves"]))
        this.clrs = inverse(arguments[0]["clrs"])
        this.siz = inverse(arguments[0]["siz"])
        this.win = parseFloat((arguments[0]["win"]))
        this.wpos = inverse(arguments[0]["wpos"])
        this.wdim = inverse(arguments[0]["wdim"])
        this.vec_x = inverse((arguments[0]["vec_x"]))
        this.vec_y = inverse((arguments[0]["vec_y"]))
        this.vec_z = inverse((arguments[0]["vec_z"]))
        this.param3ds = inverse((arguments[0]["param3ds"]))
        this.N = parseFloat((arguments[0]["N"]))
        if((size(this.wpos,"*")!=0)&&(size(this.wpos,"*")!=2)){
                alert("Window position must be [] or a 2 vector");
                CSCOPXY3D.get();
            }
            if((size(this.wdim,"*")!=0)&&(size(this.wdim,"*")!=2)){
                alert("Window dim must be [] or a 2 vector");
                CSCOPXY3D.get();
            }
            if(size(this.clrs,"*")!=size(this.siz,"*")){
                alert("Colors and Size must have same size");
                CSCOPXY3D.get();
            }
            if(this.br_curves<=0){
                alert("Number of curves cannot be negative or null");
                CSCOPXY3D.get();
            }
            if(this.win<-1){
                alert("Window number cannot be inferior than -1");
                CSCOPXY3D.get();
            }
            if(this.N<1){
                alert("Buffer size must be at least 1");
                CSCOPXY3D.get();
            }
            if(this.N<2){
                for(var i=0;i<size(this.clrs,1);i++){
                for(var j=0;j<size(this.clrs,2);j++){
                    if(this.clrs[i][j]<=0){
                        alert("Buffer size must be at least 2 or Change a color (must be >0)");
                        CSCOPXY3D.get();
                    }
                }
                }
            }
            if(this.vec_y[0]>=this.vec_y[1]){
                alert("Ymax must be higher than Ymin");
                CSCOPXY3D.get();
            }
            if(vec_x[0]>=vec_x[1]){
                alert("Xmax must be higher than Xmin");
                CSCOPXY3D.get();
            }
            if(this.vec_z[0]>=this.vec_z[1]){
                alert("Zmax must be higher than Zmin");
                CSCOPXY3D.get();
            }
        this.in = ones(3,1)
        for (var i = this.in.length - 1; i >= 0; i--) {
            this.in[i][0] = this.in[i][0]*this.nbr_curves
        }

        this.in2 = ones(3,1)
        this.x.model.intyp = new ScilabDouble(...ones(3,1))
        var io = set_io(this.x.model,this.x.graphics,[...this.in,...this.in2],[],ones(1,1),[])

        if(this.wpos.length == 0){
            this.wpos = [[-1],[-1]];
        }
        if(this.wdim.length == 0){
            this.wdim = [[-1],[-1]];
        }
        this.x.model.rpar = new ScilabDouble(...this.vec_x, ...this.vec_y, ...this.vec_z, ...this.param3ds);
        this.size_siz = size(this.siz,"*")
        var ipar = new ScilabDouble([this.win],[this.size_siz],[this.N],...this.clrs,...this.siz,[1],...this.wpos,...this.wdim,[this.nbr_curves])
        this.x.model.ipar = ipar
        var exprs = new ScilabString([this.nbr_curves],[this.clrs.toString().replace(/,/g, " ")],[this.siz.toString().replace(/,/g, " ")],[this.win],[sci2exp(this.wpos)],[sci2exp(this.wdim)],[this.vec_x.toString().replace(/,/g," ")],[this.vec_y.toString().replace(/,/g," ")],[this.vec_z.toString().replace(/,/g," ")],[this.param3ds.toString().replace(/,/g," ")],[this.N])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    CSCOPXY3D.prototype.get_popup_title = function CSCOPXY3D() {
        var set_param_popup_title="Set Scope parameters";
        return set_param_popup_title
    }

}
