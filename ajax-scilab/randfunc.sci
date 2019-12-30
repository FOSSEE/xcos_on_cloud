function randfunc(filename,inputvalue)
    f_temp = mopen(filename, 'wt'); // Creating a text file
    string_to_pass = strcat(["cmd_values = ", inputvalue]); //storing value in cmd_values
    ok = execstr(string_to_pass,'errcatch');
    if (ok~=0) then
        mfprintf(f_temp, '%s',  lasterror()); //catch error message if any
    else
        [m,n] = size(cmd_values)
        mfprintf(f_temp, '[[');
        for y = 1:m // no. of rows in variables
            for z = 1:n //no. of columns in variabes
                if z == n then
                mfprintf(f_temp, '%g', cmd_values(y,z)); //Print the variable values
                else
                mfprintf(f_temp, '%g,', cmd_values(y,z)); //Print the variable values
                end
            end
            if y ~= m then
                mfprintf(f_temp, '],[')
            end
        end
        mfprintf(f_temp, ']]');
        mclose(f_temp)
    end
endfunction
