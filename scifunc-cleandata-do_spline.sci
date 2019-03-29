function callFunctioncleandata(filename,xye)
    f_temp = mopen(filename, 'wt'); // Creating a text file
    xye_split = strsplit(xye,',');  //split string for ','
    ary_size = size(xye_split);     // get size of array which will be 6 1
    n = ary_size(1);                // retrive only size of element ie. 6
    arry_xye = [];
    for i = 1:n
        arry_xye(1)(i) = strtod(xye_split(i));  //convert string to double and add to array
    end
    [xy] = cleandata([arry_xye]);  //pass new array to cleandata and save return value in xy
    [m,n] = size(xy) // reading the size of variable
    mfprintf(f_temp, '[');
    for y = 1:m // no. of rows in variables
        for z = 1:n //no. of columns in variabes
            if z == n then
            mfprintf(f_temp, '%d', xy(y,z)); //Print the variable values
            else
            mfprintf(f_temp, '%d,', xy(y,z)); //Print the variable values
            end
        end
        if y ~= m then
            mfprintf(f_temp, '],[')
        end
    end
    mfprintf(f_temp, ']');
    mclose(f_temp)
endfunction

function callFunction_do_Spline(filename,N,order,x,y)
    f_temp = mopen(filename, 'wt'); // Creating a text file
    [Xdummy,Ydummy,orpar] =Do_Spline(strtod(N),strtod(order),strtod(x),strtod(y));  //pass new array to do_spline and save return value in [Xdummy,Ydummy,orpar]
    Do_Spline_write(Xdummy,Ydummy,orpar,f_temp);
    mclose(f_temp)
endfunction

function Do_Spline_write(varargin)
    loop = argn(2);
    f_temp=varargin(loop);
    for k= 1:(loop-1)
            mfprintf(f_temp, '[');
            variable= varargin(k) // Storing variable one at a time
            [m,n] = size(variable) // reading the size of variable
    for y = 1:n // no. of rows in variables
        for z = 1:m //no. of columns in variabes
            mfprintf(f_temp, '%d ', variable(z,y)) //Print the variable values
        end
    end
    mfprintf(f_temp, ']\n');
    end
endfunction

