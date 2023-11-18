//Example 9.13
//Determination of stability with a hysteresis nonlinearity.

//System Model
s=poly(0,'s');
num=1;
den=(s^2+s);
Gs=syslin('c',num/den);

// Nyquist Plot of Describing Function for hysteresis nonlinearity
N=1;
h=0.1;
i=1;

for omegat=0:0.05:%pi-0.1;
    a=sin(omegat);
    DF_nyq(i,1)=-%pi/4/N*(sqrt(a^2-h^2) + h * %i);
    i=i+1;
end

//Response of the system
K=2;

// the required value

r=1
