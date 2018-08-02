function M_freq() {

    M_freq.prototype.define = function M_freq() {
        var model = scicos_model();
	this.frequ = [[1],[2]];
	this.offset = [[0],[0]];
        model.sim = list(new ScilabString(["m_frequ"]), new ScilabDouble([4]));
        model.evtout = new ScilabDouble([1], [1], [1]);
        model.evtin = new ScilabDouble([1]);
        model.rpar = new ScilabDouble();
        model.opar = list(new ScilabDouble([1, 1, 0], [1, 1, 1], [1, 3, 2]), new ScilabDouble([1]), new ScilabDouble([0]), new ScilabDouble([0]));
        model.blocktype = new ScilabString(["d"]);
        model.firing = new ScilabDouble([0, -1, -1]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([sci2exp([[1], [2]])], [sci2exp([[0], [0]])]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"M_freq\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }


    M_freq.prototype.details = function M_freq() {
        return this.x;
    }
    /**m_freq function is needed**/

    M_freq.prototype.get = function M_freq() {
         if(this.frequ == undefined || this.frequ == null ){
             this.frequ = [[1],[2]];
         }
         if(this.offset == undefined || this.offset == null ){
             this.offset = [[0],[0]];
         }

         var options={
             frequ:["Sample time",sci2exp(this.frequ)],
             offset:["Offset",sci2exp(this.offset)],
         }
         return options
     }
     M_freq.prototype.set = function M_freq() {
        this.frequ = MatrixInverse(arguments[0]["frequ"])
        this.offset = MatrixInverse(arguments[0]["offset"])
       // if((size(frequ,"*"))!=(size(offset,"*"))){
       //     alert("offset and frequency must have the same size");
       //     M_freq.get();
       // }
        for(var i=0;i<size(this.frequ,1);i++)
        {
            for(j=0;j<size(this.frequ,2);j++)
            {
                if(this.frequ[i][j]<=0)
                {
                    alert("Frequency must be a positive number");
                    M_freq.get();
                }
                if(Math.abs(this.offset[i][j])>this.frequ[i][j])
                {
                    alert("The |Offset| must be less than the Frequency");
                    M_freq.get();
                }
            }
        }

		var model = scicos_model();
		var mainre=mfrequ_clk(this.frequ, this.offset)
		var m=mainre[0];
		var den=mainre[1];
		var off=mainre[2];
		var count=mainre[3];
		var m1=mainre[4];
		var fir=mainre[5];

		if(this.frequ=="1,2"&&this.offset=="0,0"){
			this.m=[[1, 1, 1],[1, 3, 2]];
		}

                model.opar=list(new ScilabDouble(...this.m),new ScilabDouble([parseFloat(den)]),new ScilabDouble([off]),new ScilabInteger([count]));
		var mn=(2*m1.length)-1;

                if (mn>3){
                    this.x.graphics.sz=new ScilabDouble([40+(mn-3)*10,40]);
                        }
                else{
                   this.x.graphics.sz=new ScilabDouble([50,40]);
               }
                model.firing=new ScilabDouble(fir);

		var exprs = new ScilabString([sci2exp(this.frequ)], [sci2exp(this.offset)]);
		var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"M_freq\",sz(1),sz(2));"]);
                this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
                this.x.graphics.exprs=exprs
                var io =set_io(this.x.model,this.x.graphics,[],[],[1],ones(mn,1));
         return new BasicBlock(this.x)
     }

     M_freq.prototype.get_popup_title = function M_freq() {
        var set_param_popup_title="Set block parameters";
        return set_param_popup_title
    }
}
