function DEMUX_f() {

    DEMUX_f.prototype.define = function DEMUX_f() {
        this.out = 2;
        var arr = [];
        arr.push(math.range(-1, -this.out, -1, true)._data);

        var model = scicos_model();
        model.sim = list(new ScilabString(["demux"]), new ScilabDouble([1]));
        model.in = new ScilabDouble([0]);
        model.out = new ScilabDouble(...math.transpose(arr));
        model.ipar = new ScilabDouble([this.out]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.out]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEMUX_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DEMUX_f.prototype.get=function DEMUX_f(){
        var options={
            out:["number of output ports or vector of sizes",this.out.toString()]
        }
        return options
    }
    DEMUX_f.prototype.set=function DEMUX_f(){
        this.out=inverse(arguments[0]["out"])
        if(size(this.out,"*")==1){
                if((this.out<2)||(this.out>8)){
                    alert("Block must have at least 2 and at most 8 output ports");
                    DEMUX_f.get();
                }
                else{
                    var n=this.out[0]
                    this.inp=[]
                    for(var i=1;i<=n;i++)
                    {
                        this.inp.push([-1*i])
                    }
                    var io=check_io(this.x.model,this.x.graphics,0,this.inp,[],[])
                }
        }
        else{
                if((size(this.out,"*")<2)||(this.out==0)||(size(this.out,"*")>8)){
                    alert("Block must have at least 2 and at most 8 output ports"+"\nsize 0 is not allowed")
                    DEMUX_f.get();
                }
                else{
                    this.nin=sum(this.out)
                    var io=check_io(this.x.model,this.x.graphics,this.nin,this.out,[],[])
                }
        }
	this.x.model.in = new ScilabDouble([0]);
        var exprs=new ScilabString(this.out.toString())
        this.x.graphics.exprs=exprs
        this.x.model.ipar=new ScilabDouble(...this.out)
        return new BasicBlock(this.x)
    }
    DEMUX_f.prototype.details = function DEMUX_f() {
        return this.x;
    }
    DEMUX_f.prototype.get_popup_title = function DEMUX_f() {
        var set_param_popup_title="Set DEMUX block parameters";
        return set_param_popup_title
    }
    DEMUX_f.prototype.getDimensionForDisplay = function DEMUX_f(){
        var dimension = { width: 10, height: 40 };
        return dimension
    }
}
