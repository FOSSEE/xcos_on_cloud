function y1=locus3(z)
s=%s
H=syslin('c',s+2,s^2+2*s+3)
evans(H,z)
y1=0;
xgrid()
xtitle('Root locus of G(s) = (s+2)/(s^2+2*s+3)')
endfunction
