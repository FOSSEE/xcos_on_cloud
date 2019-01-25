function callFunctionAcctoMethod(filename,head,exx)
        head = strsubst(head," ","");
        exx = strsubst(exx," ","");
        f_temp = mopen(filename, 'wt');
        cal_exp=strcat(["deff(",head,",",exx,")"]);
        ok=execstr(cal_exp,"errcatch")==0
        if (ok==%t) then
            mfprintf(f_temp, 'Incorrect expression : %s',  lasterror());
        else
            [ok,%ok1,ipar,rpar,%nz]=compiler_expression(%foo)
            writeValueToFileFromVars(ok,%ok1,ipar,rpar,%nz,f_temp)
        end
        mclose(f_temp)
endfunction


function writeValueToFileFromVars(varargin)
    loop = argn(2);
    f_temp=varargin(loop);
    for k= 1:(loop-1)
            variable = varargin(k)
            if (variable==%t) then
                mfprintf(f_temp, '%s',  "true");
            elseif (variable==%f) then
                mfprintf(f_temp, '%s',  lasterror());
                break
            else 
                mfprintf(f_temp, '[[');
                for i = 1:length(variable)
                    if (i == length(variable)) then
                        mfprintf(f_temp, '%d]]',  variable(i));
                    else
                        mfprintf(f_temp, '%d],[',  variable(i));
                    end
                end
            end
            mfprintf(f_temp, '\n');
    end
endfunction

