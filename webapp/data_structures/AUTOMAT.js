function AUTOMAT() {

    AUTOMAT.prototype.define = function AUTOMAT() {
        this.NMode = 2;
        this.Minitial = 1;
        this.NX = 1;
        this.X0 = [0.0];
        this.XP = [[1],[1]];
        this.C1 = [2];
        this.C2 = [1];

        var exprs = new ScilabString([this.NMode.toString()], [this.Minitial.toString()], [this.NX.toString()], [sci2exp(this.X0)], [sci2exp(this.XP)], [sci2exp(this.C1)], [sci2exp(this.C2)]);
        var ipar = new ScilabDouble([this.NMode], [this.Minitial], [this.NX], ...this.XP, this.C1, this.C2);
        var rpar = new ScilabDouble(this.X0);

        var model = scicos_model();
        model.sim = list(new ScilabString(["automat"]), new ScilabDouble([10004]));
        model.in = new ScilabDouble([2 * this.NX + 1], [2 * this.NX + 1]);
        model.out = new ScilabDouble([2], [2 * this.NX]);
        model.state = new ScilabDouble(...ones(2 * this.NX, 1));
        model.nzcross = new ScilabDouble([1]);
        model.blocktype = new ScilabString(["c"]);
        model.evtout = new ScilabDouble([1]);
        model.firing = new ScilabDouble([-1]);
        model.dep_ut = new ScilabBoolean([false, true]);
        model.ipar = ipar;
        model.rpar = rpar;

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"AUTOMAT\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([4, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);

    }

    AUTOMAT.prototype.details = function AUTOMAT() {
        return this.x;
    }
    AUTOMAT.prototype.get=function AUTOMAT(){
        var options = {
            NMode:["Number (finite-state) Modes",this.NMode],
            Minitial:["Initial Mode",this.Minitial],
            NX:["Number of continuous-time states",this.NX],
            X0:["Continuous-time states intial values",this.X0],
            XP:["Xproperties of continuous-time states in each Mode",this.XP],
            C1:["Jump from Mode 1:[..;M_final(Guard=In(1).i);..]",this.C1],
            C2:["Jump from Mode 2:[..;M_final(Guard=In(2).i);..]",this.C2],
        }
        return options
    }
    AUTOMAT.prototype.set=function AUTOMAT(){
        this.NMode = parseFloat(arguments[0]["NMode"]);
        this.Minitial = parseFloat(arguments[0]["Minitial"]);
        this.NX = parseFloat(arguments[0]["NX"]);
        this.X0 = arguments[0]["X0"];
        this.XP = arguments[0]["XP"];
        this.C1 = arguments[0]["C1"];
        this.C2 = arguments[0]["C2"];
        var X0_1 = inverse(this.X0);
        var XP_1 = inverse(this.XP);
        var C1_1 = inverse(this.C1);
        var C2_1 =  inverse(this.C2);
        if(this.NX != size(X0_1,"*")){
            alert("the size of intial continuous-time states should be NX="+this.NX);
            throw "inorrect";
        }
        var rXP = size(XP_1,1);
        var cXP = size(XP_1,2);
        if(cXP != this.NX){
            alert("Xproperty matrix is not valid: it should have NX="+this.NX+" columns");
            throw "inorrect";
        }
        else if(rXP != this.NMode && rXP > 1){
            alert("Xproperty matrix is not valid: it should have NMode="+this.NMode+" or 1 row(s)");
            throw "inorrect";
        }
        else if(rXP == 1){
            //for i=1:NMode-1
                XP_1[rXP] = XP_1[0];// xproprties are identical in modes.
            //end
        }
        var YP = math.matrix(transpose(XP_1));
        XP_1 = YP.resize([this.NMode*this.NX,1]);
        var ipar = [[this.NMode],[this.Minitial],[this.NX],[XP_1]];
        var Y0 = math.matrix(X0_1);
        var rpar = Y0.resize([this.NX,1]);// put X0 in a column vector;
        var INP = ones(this.NMode,1);
        var OUT;
        if(this.NX > 0){
            OUT = [[2],[2*this.NX]];
        }else{
            OUT = [2];
        }
        MaxModes = 1;
        nzcross = 0;
        /*if(MaxModes>this.NMode){
            alert("Number of Modes should be "+MaxModes+"\nA destination Mode in Mode#"+imax+"''s targets is invalid!");
            AUTOMAT.get();
        }
        if(MaxModes<this.NMode){
            alert("There is an unused Mode or the Number of Modes should be "+MaxModes);
            AUTOMAT.get();
        }*/
        var io = check_io(this.x.model,this.x.graphics,[INP],[OUT],[],[1]);
        this.x.model.nzcross = nzcross;
        this.x.model.state = ones(2*this.NX,1);
        this.x.graphics.gr_i[0][0] = "txt=[''Automaton'';''nM=" + this.NMode + ",nX=" + this.NX + "''];"
        var exprs = new ScilabString([this.NMode],[this.Minitial],[this.NX],[this.X0],[this.XP],[this.C1],[this.C2]);
        this.x.graphics.exprs = exprs;
        this.x.model.ipar = ipar;
        this.x.model.rpar = rpar;
        return new BasicBlock(this.x);
    }

    AUTOMAT.prototype.get_popup_title = function AUTOMAT() {
        var set_param_popup_title = "Set parameters";
        return set_param_popup_title
    }
    AUTOMAT.prototype.getDimensionForDisplay = function AUTOMAT(){
        var dimension = { width: 80, height: 40 };
        return dimension
    }

}
