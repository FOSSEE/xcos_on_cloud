function DLR() {

    DLR.prototype.define = function DLR() {
        this.x0 = 0;
        this.A = -1;
        this.B = 1;
        this.C = 1;
        this.D = 0;
        this.num="1";
        this.den="1+z";
        var model = scicos_model();
        model.sim = list(new ScilabString(["dsslti4"]), new ScilabDouble([4]));
        model.in = new ScilabDouble([1]);
        model.out = new ScilabDouble([1]);
        model.evtin = new ScilabDouble([1]);
        model.dstate = new ScilabDouble([this.x0]);
        model.rpar = new ScilabDouble([this.A], [this.B], [this.C], [this.D]);
        model.blocktype = new ScilabString(["d"]);
        model.dep_ut = new ScilabBoolean([false, false]);

        var exprs = new ScilabString(["1"], ["1+z"]);
        this.displayParameter = [["1"], ["1+z"]];
        var gr_i = new ScilabString(["xstringb(orig(1),orig(2),\"DLR\",sz(1),sz(2));"]);
        this.x = new standard_define(new ScilabDouble([3, 2]), model, exprs, gr_i);
        return new BasicBlock(this.x);
    }
    DLR.prototype.details = function DLR() {
        return this.x;
    }
    DLR.prototype.get=function DLR(){
        var options={
                num:["Numerator (z)",this.num.toString()],
                den:["Denominator (z)",this.den.toString()],
        }
        return options
    }
    DLR.prototype.set=function DLR(){
        this.num=arguments[0]["num"]
        this.den=arguments[0]["den"]
        var a=[];
        var b=[];
        var j=0;
        var k=0;
        var l=0;
        var m1;
        var m2;
        for(var i=0;i<this.num.length;i++)
        {
            if(this.num.charAt(i)=='^')
            {
                k=1;
                break;
            }
        }
        if(k==0)
        {
            for(var i=0;i<this.num.length;i++)
            {
                if(this.num.charAt(i)=='z')
                {
                    l=1;
                    break;
                }
            }
            if(l==0)
                m1=0;
            else
                m1=1;
        }
        else{
        for(var i=0;i<this.num.length;i++)
        {
            if(this.num.charAt(i)=='^')
            {
                a[j++]=this.num[i+1];
            }
        }
        m1=a[0];
        for(var i=1;i<j;i++)
        {
            if(a[i]>m1)
                m1=a[i];
        }
        }
        j=0;
        k=0;
        l=0;
        for(var i=0;i<this.den.length;i++)
        {
            if(this.den.charAt(i)=='^')
            {
                k=1;
                break;
            }
        }
        if(k==0)
        {
            for(var i=0;i<this.den.length;i++)
            {
                if(this.den.charAt(i)=='z')
                {
                    l=1;
                    break;
                }
            }
            if(l==0)
                m2=0;
            else
                m2=1;
        }
        else{
        for(var i=0;i<this.den.length;i++)
        {
            if(this.den.charAt(i)=='^')
            {
                b[j++]=this.den[i+1];
            }
        }
        m2=b[0];
        for(var i=1;i<j;i++)
        {
            if(b[i]>m2)
                m2=b[i];
        }
        }
        if(m1>m2){
            alert("Transfer function must be proper");
            DLR.get();
        }
        this.value = cont_frm(this.num,this.den);
        var exprs = new ScilabString([this.num.toString()],[this.den.toString()])
        this.x.graphics.exprs = exprs
        var ns = size(this.A,1);
        var ns1 = size(this.A,2);
	this.x.model.rpar = new ScilabDouble(...this.value);
        //if ns1<=ns then
            //x0=x0(1:ns1)
        //else
           // x0(ns1,1)=0
        //end
        this.x.model.dstate=new ScilabDouble(this.x0)
        //this.x.model.rpar=rpar
        //if norm(D,1)<>0 then
            //mmm=[%t %f];
        //else
            //mmm=[%f %f];
        //end
        //if or(model.dep_ut<>mmm) then
            //model.dep_ut=mmm,
        //end
        this.x.model.dep_ut = new ScilabBoolean(false,false)
        this.x.model.firing=[]
        this.displayParameter = [[this.num], [this.den]];
        return new BasicBlock(this.x)
    }
    DLR.prototype.get_popup_title = function DLR() {
        var set_param_popup_title="Set discrete SISO transfer parameters";
        return set_param_popup_title
    }
    DLR.prototype.getDimensionForDisplay = function DLR(){
        var dimension = { width: 60, height: 40 };
        return dimension
    }
}
