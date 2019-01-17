function [ok,%ipar,%rpar,%nz]=compile_expr(%foo)
    ok=%t
    %lst=macr2lst(%foo);
    %mm=macrovar(%foo);
    %MM=%mm(3);
    %FF=["sin";"cos";"tan";"exp";"log";
    "sinh";"cosh";"tanh";
    "int";"round";"ceil";"floor";
    "sign";"abs";"max";"min";
    "asin";"acos";"atan";"asinh";"acosh";"atanh";
    "atan2";
    "log10";
    ]; // ops above 100
    %num_arg=[1;1;1;1;1;
    1;1;1
    1;1;1;1;
    1;1;2;2;
    1;1;1;1;1;1;
    2;
    1
    ];  //number of arguments
    %ZCR=[16,17,18,19,20,21,28,29,30,109,110,111,112,113,114,115,116];  // ops with zero-crossing
    %UU=%mm(1)
    %ipar=[]
    %rpar=[]
    %nrpar=0
    %nz=0
    %ijk=4
    while %ijk<length(%lst)
        %ijk=%ijk+1
        select evstr(%lst(%ijk)(1))
        case 2
            %jjk=find(%lst(%ijk)(2)==%FF)
            if %jjk<> [] then
                if evstr(%lst(%ijk)(4))<>%num_arg(%jjk) then
                    message(%lst(%ijk)(2)+" must have "+string(%num_arg(%jjk))+" arguments")
                    ok=%f
                    return
                else
                    %ipar=[%ipar;5;100+%jjk]
                    if or(100+%jjk==%ZCR) then
                        %nz=%nz+1,
                    end
                    %ijk=%ijk+1
                end
            else
                %jjk=find(%lst(%ijk)(2)==%MM)
                if %jjk<> [] then
                    if ~exists(%MM(%jjk)) then
                        message("Variable "+%MM(%jjk)+" is not defined.")
                        ok=%f
                        return
                    end
                    %var=evstr(%MM(%jjk))
                    if size(%var,"*")<>1 then
                        message("Variable "+%MM(%jjk)+" is not scalar.")
                        ok=%f
                        return
                    else
                        %nrpar=%nrpar+1
                        %rpar(%nrpar)=%var
                        %ipar=[%ipar;6;%nrpar]
                    end
                else
                    %jjk=find(%lst(%ijk)(2)==%UU)
                    if %jjk<> [] then
                        %ipar=[%ipar;2;%jjk]
                    else
                        message("Unknown variable "+%lst(%ijk)(2))
                        ok=%f
                    end
                    //%ipar=[%ipar;2;evstr(strsubst(%lst(%ijk)(2),'u',''))]
                end
            end
        case 5
            // case of - with one operand (-u1)
            if (evstr(%lst(%ijk)(2))==2)&(evstr(%lst(%ijk)(3))==1) then
                %ipar=[%ipar;5;99]
            else
                %ipar=[%ipar;5;evstr(%lst(%ijk)(2))]
                if or(evstr(%lst(%ijk)(2))==%ZCR) then
                    %nz=%nz+1,
                end
            end
        case 6
            //      %ipar=[%ipar;6;evstr(%lst(%ijk)(2))]
            %nrpar=%nrpar+1
            %rpar(%nrpar)=evstr(%lst(%ijk)(2))
            %ipar=[%ipar;6;%nrpar]
        end
    end
endfunction


function [ok,%ok1,ipar,rpar,%nz]=compiler_expression(%foo)
    ok=%t,%ok1=%f,ipar=[],rpar=[],%nz=[]
    if exists("%scicos_context") then
        %mm=getfield(1,%scicos_context)
        for %mi=%mm(3:$)
            if execstr(%mi+"=%scicos_context(%mi)","errcatch")<>0 then
                ok=%f
            end
        end
    end
    if ok then
        ok=execstr("[%ok1,ipar,rpar,%nz]=compile_expr(%foo)","errcatch")==0
    end
endfunction


function callFunctionAcctoMethod(methodname,filename,head,exx)
    if (methodname == 'define') then
        txt="(u1>0)*sin(u2)^2"
        deff("%foo(u1,u2)",txt)
        [%ok1,ipar,rpar,nz]=compile_expr(%foo)
        writeValueToFileFromVars(%ok1,ipar,rpar,nz,filename)
    else
        cal_exp=strcat(["deff(",head,",",exx,")"]);
        ok=execstr(cal_exp,"errcatch")==0
        if (ok==%t) then
            fileid = strcat([pwd(), "/",filename,".txt"]);
            f_temp = mopen(fileid, 'wt');
            mfprintf(f_temp, ' %s :',  "Erroneous expression");
            mfprintf(f_temp, ' %s',  lasterror());
            mclose(f_temp);
        else
            deff(head,exx)
            [ok,%ok1,ipar,rpar,%nz]=compiler_expression(%foo)
            writeValueToFileFromVars(ok,%ok1,ipar,rpar,%nz,filename)
        end
    end
endfunction


function writeValueToFileFromVars(varargin)
    loop = argn(2);
    filename=varargin(loop);
    d=string(filename+'');
    fileid = strcat([pwd(), "/",d,".txt"]);
    f_temp = mopen(fileid, 'wt');
    mclose(f_temp);
    for k= 1:(loop-1)
            fid = mopen(fileid, 'at');
            if (varargin(k)==%t) then
                mfprintf(fid, ' %s',  "true");
                mfprintf(fid, '\n');
            elseif (varargin(k)==%f) then
                mfprintf(fid, ' %s',  "false");
                mfprintf(fid, '\n');
            else 
                variable= varargin(k) // Storing variable one at a time
                for i = 1:length(variable)
                    mfprintf(fid, ' %d',  variable(i));
                end
                mfprintf(fid, '\n');
            end
    end
mclose(fid) // Closing the file
endfunction

