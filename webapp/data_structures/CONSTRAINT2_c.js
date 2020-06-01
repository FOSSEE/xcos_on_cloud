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

        var exprs = new ScilabString([sci2exp(this.x0)], [sci2exp(this.xd0)], [sci2exp(this.id)]);
        var k = this.x0.toString();
        var n = this.xd0.toString();
        this.displayParameter = [[k],[n]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"CONSTRAINT2_c\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    CONSTRAINT2_c.prototype.details = function CONSTRAINT2_c() {
        return this.x;
    }
    CONSTRAINT2_c.prototype.get = function CONSTRAINT2_c() {
        var options = {
            x0:["Initial guess values of states x",this.x0],
            xd0:["Initial guess values of derivative x",this.xd0],
            id:["Id(i)=1: if x''(i) is present in the feedback, else Id(i)=0",this.id]
        }
        return options
    }
    CONSTRAINT2_c.prototype.set = function CONSTRAINT2_c() {
        var temp_x0 = arguments[0]["x0"];
        var temp_xd0 = arguments[0]["xd0"];
        var temp_id = arguments[0]["id"];
        var x0_1 = inverse(temp_x0);
        var xd0_1 = inverse(temp_xd0);
        var id_1 = inverse(temp_id);
        this.N = size(x0_1,"*");
        this.Nxd = size(xd0_1,"*");
        this.Nid = size(id_1,"*");
        if(this.N != this.Nxd || this.N != this.Nid){
            alert("incompatible sizes, states, their derivatives, and ID should be the same size ");
            throw "incorrect";
        }
        if(this.N <= 0){
            alert("number of states (constraints) must be > 0 ");
            throw "incorrect";
        }
        for(var i = 0; i < this.N; i++){
            if(id_1[i] != 0 && id_1[i] != 1){
                alert(["Id(i) must be either"+"\n0 when x''(i) is not present in the feedback"+"\n1: when x''(i) is present in the feedback"]);
                throw "incorrect";
            }
            if (id_1[i] == 0){
                id_1[i] = -1;
            }
        }
        this.x0 = temp_x0;
        this.xd0 = temp_xd0;
        this.id = temp_id;
        this.x.model.state = new ScilabDouble(...x0_1,...xd0_1);
        this.x.model.out = new ScilabDouble([this.N],[this.N]);
        this.x.model.in = new ScilabDouble([this.N]);
        this.x.model.ipar = new ScilabDouble(...id_1);
        var exprs = new ScilabString([this.x0], [this.xd0], [this.id]);
        var k = this.x0;
        var n = this.xd0;
        this.displayParameter = [[k],[n]];
        this.x.graphics.exprs = exprs;
        return new BasicBlock(this.x)
    }

    CONSTRAINT2_c.prototype.get_popup_title = function CONSTRAINT2_c() {
        var set_param_popup_title = "Set Constraint block parameters";
        return set_param_popup_title
    }
    CONSTRAINT2_c.prototype.getDimensionForDisplay = function CONSTRAINT2_c(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
