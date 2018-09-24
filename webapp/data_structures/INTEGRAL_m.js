function INTEGRAL_m() {

    INTEGRAL_m.prototype.define = function INTEGRAL_m() {
        this.lowp = -1;
        this.maxp = 1;
        var minp = -1;
        this.rpar = [];

        var model = scicos_model();
        model.state = new ScilabDouble([0]);
        model.sim = list(new ScilabString(["integral_func"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.in2 = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.rpar = new ScilabDouble();
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = new ScilabString([0], [0], [0], [this.maxp], [minp]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"INTEGRAL_m\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    INTEGRAL_m.prototype.get = function INTEGRAL_m() {
        if(this.x0 == undefined || this.x0 == null)
            this.x0 = 0
        if(this.reinit == undefined || this.reinit == null)
            this.reinit = 0
        if(this.satur == undefined || this.satur == null)
            this.satur = 0

        var options={
            x0:["Initial Condition",this.x0],
            reinit:["With re-initialization (1:yes, 0:no)",this.reinit],
            satur:["With saturation (1:yes, 0:no)",this.satur],
            maxp:["Upper limit",this.maxp.toString().replace(/,/g," ")],
            lowp:["Lower limit",this.lowp.toString().replace(/,/g," ")],
        }
        return options
    }
    INTEGRAL_m.prototype.set = function INTEGRAL_m() {
        this.x0 = inverse(arguments[0]["x0"])
        this.reinit = parseFloat((arguments[0]["reinit"]))
        this.satur = parseFloat((arguments[0]["satur"]))
        this.maxp = inverse(arguments[0]["maxp"])
        this.lowp = inverse(arguments[0]["lowp"])

        this.Datatype = 1 // assuming x0 is real
        if(this.reinit != 0)
            this.reint = 1

        if(this.satur != 0){
            this.satur = 1
            if(size(this.maxp,"*") == 1){
                var n = this.maxp[0]
                this.maxp = ones(parseInt(this.x0[0]),1)
                for (var i = this.maxp.length - 1; i >= 0; i--) {
                    this.maxp[i] = n*this.maxp[i]
                }
            }
            if(size(this.lowp,"*") == 1){
                var n = this.lowp[0]
                this.lowp = ones(parseInt(this.x0[0]),1)
                for (var i = this.lowp.length - 1; i >= 0; i--) {
                    this.lowp[i] = n*this.lowp[i]
                }
            }
            //try{
            /*if((size(this.x0,1)!=size(this.maxp,1))||(size(this.x0,1)!=size(this.lowp,1))){
                        alert("x0 and Upper limit and Lower limit must have same size");
                        INTEGRAL_m.get();}*/

                    /*if(this.maxp<=this.lowp){
                        alert("Upper limits must be > Lower limits");
                        INTEGRAL_m.get();
                    }
                    if((this.x0>this.maxp)||(this.x0<this.lowp)){
                        alert("Initial condition x0 should be inside the limits")
                        INTEGRAL_m.get();
                    }*/
           // }
            //catch(e){}
            var rpar = new ScilabDouble(...this.maxp,...this.lowp)
            this.x.model.nzcross = new ScilabDouble([size(this.x0,"*")])
            this.x.model.nmode = new ScilabDouble([size(this.x0,"*")])
        }
        else{
            var rpar = new ScilabDouble()
            this.x.model.nzcross = new ScilabDouble([0])
            this.x.model.nmode = new ScilabDouble([0])
        }



        this.x.model.rpar = rpar
        this.x.model.state = new ScilabDouble(...this.x0)
        this.x.model.sim = list(new ScilabString(["integral_func"]), new ScilabDouble([4]))
        this.x.model.intyp = new ScilabDouble([1],...ones(this.reinit,1))
        this.x.model.outtyp = new ScilabDouble([1])
        var inp1 = [1,...ones(this.reinit,1)]
        for (var i = inp1.length - 1; i >= 0; i--) {
            inp1[i] = inp1[i]*size(this.x0,1)
        }
        var inp2 = [1,...ones(this.reinit,1)]
        for (var i = inp2.length - 1; i >= 0; i--) {
            inp2[i] = inp2[i]*size(this.x0,2)
        }
        this.in = [...inp1,...inp2]
        this.out = size(this.x0)
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(this.reinit,1),[])

        var exprs = new ScilabString([this.x0.toString().replace(/,/g, " ")],[this.reinit],[this.satur],[this.maxp.toString().replace(/,/g, " ")],[this.lowp.toString().replace(/,/g, " ")])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    INTEGRAL_m.prototype.details = function INTEGRAL_m() {
        return this.x;
    }

    INTEGRAL_m.prototype.get_popup_title = function INTEGRAL_m() {
        var set_param_popup_title="Set Integral block parameters";
        return set_param_popup_title
    }
}
