function callFunctionAcctoMethod(filename,head,exx)
        head = strsubst(head," ","");
        exx = strsubst(exx," ","");
        f_temp = mopen(filename, 'wt');
        cal_exp=strcat(["deff(""",head,""",""",exx,""")"]);
        ok=execstr(cal_exp,'errcatch')
        if (ok~=0) then
            mfprintf(f_temp, '{""msg"":""Incorrect expression : %s""}',  lasterror());
        else
            [ok,%ok1,ipar,rpar,%nz]=compiler_expression(%foo)
            writeValueToFileFromVars(ok,%ok1,ipar,rpar,%nz,f_temp)
        end
        mclose(f_temp)
endfunction


function writeValueToFileFromVars(ok,ok1,ipar,rpar,nz,f_temp)
    mfprintf(f_temp, '{');
    if (ok == %t) then
        mfprintf(f_temp, '""ok"":""%s""', 'true');
    else
        mfprintf(f_temp, '""ok"":""%s""', lasterror());
    end
    if (ok == %t) then
        mfprintf(f_temp, ',""ok1"":""%s""', 'true');
    else
        mfprintf(f_temp, ',""ok1"":""%s""', lasterror());
    end
    if ((ok == %t) & (ok1 == %t)) then
        mfprintf(f_temp, ',""ipar"":[');
        for i = 1:length(ipar)
            if (i == length(ipar)) then
                mfprintf(f_temp, '[%d]',  ipar(i));
            else
                mfprintf(f_temp, '[%d],',  ipar(i));
            end
        end
        mfprintf(f_temp, ']');
        mfprintf(f_temp, ',""rpar"":[');
        for i = 1:length(rpar)
            if (i == length(rpar)) then
                mfprintf(f_temp, '[%d]',  rpar(i));
            else
                mfprintf(f_temp, '[%d],',  rpar(i));
            end
        end
        mfprintf(f_temp, ']');
        mfprintf(f_temp, ',""nz"":[');
        for i = 1:length(nz)
            if (i == length(nz)) then
                mfprintf(f_temp, '[%d]',  nz(i));
            else
                mfprintf(f_temp, '[%d],',  nz(i));
            end
        end
        mfprintf(f_temp, ']');
    end
    mfprintf(f_temp, '}');
endfunction

