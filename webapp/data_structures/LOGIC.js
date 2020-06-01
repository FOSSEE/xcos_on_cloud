function LOGIC() {

    LOGIC.prototype.define = function LOGIC() {
        this.mat = [[0],[0],[0],[1]];

        var model = scicos_model();
        model.sim = list(new ScilabString(["logic"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([5, 5]);
        model.outtyp = new ScilabDouble([5]);
        model.opar = list(int8(...this.mat));
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([sci2exp(this.mat)], [sci2exp(0)]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGIC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    LOGIC.prototype.details = function LOGIC() {
        return this.x;
    }
    LOGIC.prototype.get = function LOGIC() {
        if(this.herit == undefined || this.herit == null){
            this.herit = 0;
        }
        //have to add it because this code stores all vectors as n*1 matrix
        if(this.row == undefined || this.row == null ){
            this.row = "4";
        }
        if(this.col == undefined || this.col == null ){
            this.col = "1";
        }

        var options = {
            mat:["Truth Table (matrix of outputs)",this.mat],
            herit:["Accepts Inherited Events (0:No, 1:Yes)",sci2exp(this.herit)],
            row:["number of rows in mat",this.row],
            col:["number of columns in mat",this.col]
        }
        return options
    }
    LOGIC.prototype.set = function LOGIC() {
        var temp_mat = arguments[0]["mat"];
        var mat_1 = inverse(temp_mat);
        this.herit = parseFloat(arguments[0]["herit"]);
        this.row = parseFloat(arguments[0]["row"]);
        this.col = parseFloat(arguments[0]["col"]);


        this.nin = Math.log(this.row)/Math.log(2);
        this.nout = this.col;
        var u1 = Math.floor(this.nin);
        //if (herit<>0) then herit=1;end; The test below verify the value of parameter
        var f = 0;
        for(var j = this.row-1; j >= 0; j--){
            for(var k = this.col-1; k >= 0; k--){
                if(mat_1[j][k] != 1 && mat_1[j][k] != 0){
                    f++;
                }
            }
        }
        if(u1 != this.nin){
            alert("Wrong size for 'Truth Table' parameter: "+size(mat_1,1)+"\nNumber of rows must be a power of two.");
            throw "incorrect";
        }
        else if(f != 0){
            alert("Wrong value for ''Truth Table' parameter.\nElements must be in the interval [0, 1]");
            throw "incorrect";
        }
        else if( this.herit < 0 || this.herit > 1){
            alert("Wrong value for 'Accepts Inherited Events' parameter: "+this.herit+"\nMust be in the interval [0, 1]");
            throw "incorrect";
        }
        this.in = [...ones(this.nin,1),...ones(this.nin,1)];
        this.out = [...ones(this.nout,1),...ones(this.nout,1)];

        this.it = ones(this.nin,1);
        for (var i = this.it.length - 1; i >= 0; i--) {
            this.it[i] = 5*this.it[i];
        }
        this.x.model.intyp = new ScilabDouble(...this.it);
        this.ot = ones(this.nout,1);
        for (var i = this.ot.length - 1; i >= 0; i--) {
            this.ot[i] = 5*this.ot[i];
        }
        this.mat = temp_mat;
        var model = scicos_model();
        model.sim = list(new ScilabString(["logic"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1], [1]);
        model.in2 = new ScilabDouble([1], [1]);
        model.out = new ScilabDouble([1]);
        model.out2 = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.intyp = new ScilabDouble([5, 5]);
        model.outtyp = new ScilabDouble([5]);
        model.opar = list(int8(...mat_1));
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabBoolean([false]);
        model.dep_ut = new ScilabBoolean([true, false]);
        this.x.model.outtyp = new ScilabDouble(...this.ot);
        var io = set_io(this.x.model,this.x.graphics,this.in,this.out,ones(1-this.herit,1),[]);
        this.x.model.opar = list(int8(...mat_1));
        var exprs = new ScilabString([this.mat],[sci2exp(this.herit)]);
        this.x.graphics.exprs = exprs;
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"LOGIC\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([2, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x)
    }

    LOGIC.prototype.get_popup_title = function LOGIC() {
        var set_param_popup_title="Set LOGIC block parameters <br> Combinatorial logic <br> Rows of the matrix are the output values<br> Number of rows must be a power of two. <br> Number of columns gives the number of outputs.<br>";
        return set_param_popup_title
    }
    LOGIC.prototype.getDimensionForDisplay = function LOGIC(){
        var dimension = { width: 40, height: 40 };
        return dimension
    }

}
