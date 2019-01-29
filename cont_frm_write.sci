function calculate_cont_frm(num,den,filename)
    f_temp = mopen(filename, 'wt');// Creating a text file
    H=cont_frm(num,den);
    [A,B,C,D]=abcd(H);
    cont_frm_write(A,B,C,D,f_temp);
    mclose(f_temp);
endfunction


function cont_frm_write(varargin)
    loop = argn(2);
    f_temp=varargin(loop);
    mfprintf(f_temp, '[')
    for k= 1:(loop-1)
            variable= varargin(k) // Storing variable one at a time
            [m,n] = size(variable) // reading the size of variable
    for y = 1:n // no. of rows in variables
        for z = 1:m //no. of columns in variabes
            mfprintf(f_temp, '[%d]', variable(z,y)) //Print the variable values
        end
    end
    end
    mfprintf(f_temp, ']')
endfunction
