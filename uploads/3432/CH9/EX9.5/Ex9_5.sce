//Example 9.5
//Changing Overshoot and Saturation nonlinearity.

//System transfer function and its root locus

s=poly(0,'s');
num=(s+1)
den=(s^2);
Gs=syslin('c',num/den)

//Root locus
evans(Gs,5)
// Step response
K=1;
i=[2 4 6 8 10 12];
r=2
