function get_str2code_for_variablename(filename,varnam)
    f_temp = mopen(filename, 'wt');
    variable = _str2code(varnam);
    for i = 1:length(variable)
        if (i == length(variable)) then
            mfprintf(f_temp, '%d',  variable(i));
        else
            mfprintf(f_temp, '%d ',  variable(i));
        end
    end
    mclose(f_temp);
endfunction
