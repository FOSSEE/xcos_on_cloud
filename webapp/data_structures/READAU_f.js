function READAU_f() {

    READAU_f.prototype.define = function READAU_f() {
        this.frmt = "uc ";
        this.fname = "test.au";
        this.lunit = 0;
        this.N = 20;
        this.M = 1;
        this.tmask = [];
        this.swap = 0;
        this.offset = 1;
        this.outmask = 1;
        this.ievt = 0;
        this.nout = size(this.outmask, "*");
        var model = scicos_model();
        model.sim = list(new ScilabString(["readau"]), new ScilabDouble([2]));
        model.out = new ScilabDouble([this.nout]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([1], [1], [this.lunit], ...zeros(this.N * this.M, 1));
        model.ipar = new ScilabDouble([this.fname.length], ..._str2code(this.frmt), [this.ievt], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(this.fname), [this.outmask]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString([this.fname], [this.N], [this.swap]);

        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"READAU_f\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([5, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    READAU_f.prototype.details = function READAU_f() {
        return this.x;
    }
    READAU_f.prototype.get = function READAU_f() {
        var options={
            fname1:["Input File Name",this.fname1],
            N:["Buffer size",this.N],
            swap:["Swap Mode (0:No, 1:Yes)",this.swap]
        }
        return options
    }
    READAU_f.prototype.set = function READAU_f() {
        this.fname1 = arguments[0]["fname1"]
        this.N = parseFloat((arguments[0]["N"]))
        this.swap = parseFloat((arguments[0]["swap"]))
       // if alreadyran&fname1<>fname then
               // block_parameter_error(gettext("Simulation running !!! You cannot modify Input file name"), ..
                //gettext("End current simulation first."));
                // Remove this test user can't modify time in dialog
                //     elseif alreadyran&size(tmask1)<>size(tmask) then
                //       message(['You cannot modify time management when running';'End current simulation first'])
            if(this.fname1==""){
                alert("Wrong value for 'Input File Name' parameter."+"\nYou must provide a filename.");
                READAU_f.get();
            }
            if(this.N<1){
                alert("Wrong value for 'Buffer size' parameter: "+this.N+"\nMust be greater than 1");
                READAU_f.get();
            }
            //elseif alreadyran & (N <> ipar(6)) then
               // block_parameter_error(msprintf(gettext("You cannot modify ''%s'' when running."), gettext("Buffer Size")), gettext("End current simulation first."));
            if((this.swap!=0)&&(this.swap!=1)){
                alert("Wrong value for 'Swap Mode' parameter: "+this.swap+"\nMust be in the interval [0, 1]");
                READAU_f.get();
            }
        this.M = 1
        this.frmt1 = "uc"
        this.outmask = 1
        this.tmask1 = []
        this.offset = 1


        var io = check_io(this.x.model,this.x.graphics,[],[1],[1],[])
        var ipar = new ScilabDouble([this.fname1.length], ..._str2code(this.frmt), [0], [this.N], [this.M], [this.swap], [this.offset], ..._str2code(this.fname1), this.tmask1, [this.outmask]);
        var dstate = new ScilabDouble([-1],[-1],[this.lunit],...zeros(this.N*this.M,1))
        this.x.model.dstate = dstate
        this.x.model.ipar = ipar
        var exprs = new ScilabString([this.fname1],[this.N],[this.swap])
        this.x.graphics.exprs=exprs
        return new BasicBlock(this.x)
    }

    READAU_f.prototype.get_popup_title = function READAU_f() {
        var set_param_popup_title="Set READAU_f block parameters <br>(Read Audio File)<br>Read is done on a binary '.au' file";
        return set_param_popup_title
    }
}
