///Example 8.1
// Digital Controller using tustin approximation.

//Cntroller
s=poly(0,'s');
numD=s/2+1;
denD=s/10+1;
D=10*numD/denD;
Ds=syslin('c',D);
//sampling freq. = 25 times bandwidth
Wbw=10;
Ws=25*Wbw;
fs=Ws/2/%pi;
T=1/fs; //sampling time
a=1;b=-1;
c=1;d=1;
//Digital controller
z=poly(0,'z');
Dz=horner(Ds,2/T*(a*z+b)/(c*z+d));
disp(Dz,'Digital Controller : ')
