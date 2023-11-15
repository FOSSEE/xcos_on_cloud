//Example 9.7
//Analysis and design of the system with limit cycle using the root locus.
//System transfer function and its root locus

s=poly(0,'s');
num=0.1;
den=(s^2+0.2*s+1)*(s);
Gs=syslin('c',num/den);

//Root locus
evans(Gs,40)
//Response of the system
K=0.5;
i=[1 4 8];
r=1

//System with notch compensation
D=123*(s^2+0.18*s+0.81)/(s+10)^2;

//Root locus
evans(Gs*D,40)
//Response of the system witth notch filter
K=0.5;
i=[2 4];
r=2
