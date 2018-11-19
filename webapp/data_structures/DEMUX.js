function DEMUX() {

    DEMUX.prototype.define = function DEMUX() {
        this.out = 2;

        var model = scicos_model();
        model.sim = list(new ScilabString(["multiplex"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([0]);

        var arr = [];
        arr.push(math.range(-1, -this.out, -1, true)._data);
        model.out = new ScilabDouble(...math.transpose(arr));
        model.ipar = new ScilabDouble([this.out]);
        model.blocktype = new ScilabString(["c"]);
        model.firing = new ScilabDouble();
        model.dep_ut = new ScilabBoolean([true, false]);

        var exprs = new ScilabString([this.out]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DEMUX\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([.5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }

    DEMUX.prototype.get=function DEMUX(){
        var options={
            out:["number of output ports or vector of sizes",this.out.toString()]
        }
        return options
    }
    DEMUX.prototype.set=function DEMUX(){
        this.out=inverse(arguments[0]["out"])
var model = scicos_model();
        if(size(this.out,"*")==1){
                if((this.out<2)||(this.out>31)){
                    alert("Block must have at least 2 and at most 31 output ports");
                    DEMUX.get();
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
                if((size(this.out,"*")<2)||(this.out==0)||(size(this.out,"*")>31)){
                    alert("Block must have at least 2 and at most 31 output ports"+"\nsize 0 is not allowed")
                    DEMUX.get();
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

    DEMUX.prototype.details = function DEMUX() {
        return this.x;
    }

    DEMUX.prototype.get_popup_title = function DEMUX() {
        var set_param_popup_title="Set DEMUX block parameters";
        return set_param_popup_title
    }
    DEMUX.prototype.getDimensionForDisplay = function DEMUX(){
        var dimension = [10,40];
        return dimension
    }

}
