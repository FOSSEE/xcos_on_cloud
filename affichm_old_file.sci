function affichm(x, filename)
    [m,n] = size(x.values);
    fileid = strcat([pwd(), "/",filename,".txt"]);
    f_temp = mopen(fileid, 'at');
    mclose(f_temp);
    fid = mopen(fileid, 'wt');
    for y = 1:m
        for z = 1:n
            mfprintf(fid, '    %f', x.values(y,z));
        end
        mfprintf(fid, '\n');
    end
mclose(fid);
endfunction
