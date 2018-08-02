function CONSTRAINT2_c() {

    CONSTRAINT2_c.prototype.define = function CONSTRAINT2_c() {
        this.x0 = 0;
        this.xd0 = 0;
        this.id = 0;

        var model = scicos_model();
        model.sim = list(new ScilabString(["constraint_c"]), new ScilabDouble([10004]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1], [1]);
        model.state = new ScilabDouble([this.x0], [this.xd0]);
        model.ipar = new ScilabDouble([this.id]);
        model.blocktype = new ScilabString(["c"]);
        model.dep_ut = new ScilabBoolean([false, true]);

        var exprs = list(new ScilabString([sci2exp(this.x0)]), new ScilabString([sci2exp(this.xd0)]), new ScilabString([sci2exp(this.id)]));
        var k = this.x0.toString();
    var n = this.xd0.toString();//Check the correctness of these parametres
    this.displayParameter = [[k],[n]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONSTRAINT2_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CONSTRAINT2_c.prototype.details = function CONSTRAINT2_c() {
        return this.x;
    }
    CONSTRAINT2_c.prototype.get = function CONSTRAINT2_c() {
        var options={
            x0:["Initial guess values of states x",this.x0],
            xd0:["Initial guess values of derivative x",this.xd0],
            id:["Id(i)=1: if x''(i) is present in the feedback, else Id(i)=0",this.id]
        }
        return options
    }
CONSTRAINT2_c.prototype.set = function CONSTRAINT2_c() {
    this.x0 = inverse(arguments[0]["x0"])
    this.xd0 = inverse(arguments[0]["xd0"])
    this.id = inverse(arguments[0]["id"])
    this.N = size(this.x0,"*")
    this.Nxd = size(this.xd0,"*")
    this.Nid = size(this.id,"*")
    if((this.N!=this.Nxd)||(this.N!=this.Nid)){
                alert("incompatible sizes, states, their derivatives, and ID should be the same size ");
                CONSTRAINT2_c.get();
    }

            if(this.N<=0){
                alert("number of states (constraints) must be > 0 ");
                CONSTRAINT2_c.get();
            }

                for(var i=0;i<this.N;i++){
                    if((this.id[i]!=0)&&(this.id[i]!=1)){
                        alert(["Id(i) must be either"+"\n0 when x''(i) is not present in the feedback"+"\n1: when x''(i) is present in the feedback"]);
                        CONSTRAINT2_c.get();
                    }
                    if (this.id[i]==0)
                        this.id[i]=-1;
                }

    this.x.model.state = new ScilabDouble(...this.x0,...this.xd0)
    this.x.model.out = new ScilabDouble([this.N],[this.N])
    this.x.model.in = new ScilabDouble([this.N])
    this.x.model.ipar = new ScilabDouble(...this.id);
    var exprs = new ScilabString()
    var k = this.x0.toString();
    var n = this.xd0.toString();//Check the correctness of these parametres
    this.displayParameter = [[k],[n]];

    this.x.graphics.exprs=exprs
    return new BasicBlock(this.x)
    }

    CONSTRAINT2_c.prototype.get_popup_title = function CONSTRAINT2_c() {
        var set_param_popup_title="Set Constraint block parameters";
        return set_param_popup_title
    }
}
