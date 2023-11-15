//Example 9.6
//Stability of conditionally stable system using root locus.
//System transfer function and its root locus

s=poly(0,'s');
num=(s+1)^2
den=(s^3);
Gs=syslin('c',num/den)
//Root locus
evans(Gs,7)
//Response of the system
K=2;
i=[1 2 3 3.475];
r=1
