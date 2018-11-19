function REGISTER() {

    REGISTER.prototype.define = function REGISTER() {
        //this.z0 = zeros(10, 1);
	this.z0="0;0;0;0;0;0;0;0;0;0";
        var model = scicos_model();
        model.sim = list(new ScilabString(["delay4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble(...this.z0);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.z0]);//.toString().replace(/,/g,";")

        var gr_i = ["xstringb(orig(1),orig(2),\"REGISTER\",sz(1),sz(2));"];
        this.x = new standard_define(new ScilabDouble([3,2]), model, exprs, gr_i);
        return new BasicBlock(this.x);

    }

    REGISTER.prototype.details = function REGISTER() {
        return this.x;
    }
    REGISTER.prototype.get = function REGISTER() {
        if(this.it == undefined)
            this.it = 1
        var options={
z0:["Register initial condition",this.z0],
            //z0:["Register initial condition",sci2exp(this.z0)],//.toString().replace(/,/g," ")
            it:["Datatype (1=double 3=int32 ...)",this.it]
        }
        return options
    }
    REGISTER.prototype.set = function REGISTER() {
        this.z0 = arguments[0]["z0"]
        if((size(this.z0,1)*size(this.z0,2))<1){
                alert("Register length must be at least 1");
                REGISTER.get();
        }
        this.it = parseInt((arguments[0]["it"]))
        if(this.it == 1){
            this.function_name = "delay4"
            this.x.model.dstate = new ScilabDouble(...this.z0)
            this.x.model.odstate = list()
        }
        else{
            if(this.it == 3){
                this.function_name = "delay4_i32"
                for (var i = this.z0.length - 1; i >= 0; i--) {
                    this.z0[i][0] = int32(this.z0[i][0])
                }
            }
            else if(this.it == 4){
                this.function_name = "delay4_i16"
                for (var i = this.z0.length - 1; i >= 0; i--) {
                    this.z0[i][0] = int16(this.z0[i][0])
                }
            }
            else if(this.it == 5){
                this.function_name = "delay4_i8"
                for (var i = this.z0.length - 1; i >= 0; i--) {
                    this.z0[i][0] = int8(this.z0[i][0])
                }
            }
            else if(this.it == 6){
                this.function_name = "delay4_ui32"
                for (var i = this.z0.length - 1; i >= 0; i--) {
                    this.z0[i][0] = uint32(this.z0[i][0])
                }
            }
            else if(this.it == 7){
                this.function_name = "delay4_ui16"
                for (var i = this.z0.length - 1; i >= 0; i--) {
                    this.z0[i][0] = uint16(this.z0[i][0])
                }
            }
            else if(this.it == 8){
                this.function_name = "delay4_ui8"
                for (var i = this.z0.length - 1; i >= 0; i--) {
                    this.z0[i][0] = uint8(this.z0[i][0])
                }
            }
            else
            {
                alert("Datatype is not supported");
                    REGISTER.get();
            }
            this.x.model.odstate = list(new ScilabDouble(...this.z0))
            this.x.model.dstate = new ScilabDouble()
        }
        this.x.model.sim = list(new ScilabString([this.function_name]), new ScilabDouble([4]));
        this.in = [[1],[1]]
        var io = set_io(this.x.model,this.x.graphics,this.in,this.in,[1],[])
        var exprs = new ScilabString([this.z0],[this.it])//.toString().replace(/,/g, " ")
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }
    REGISTER.prototype.get_popup_title = function REGISTER() {
        var set_param_popup_title="Set delay parameters";
        return set_param_popup_title
    }
    REGISTER.prototype.getDimensionForDisplay = function REGISTER(){
        var dimension = [60,40];
        return dimension
    }
}
