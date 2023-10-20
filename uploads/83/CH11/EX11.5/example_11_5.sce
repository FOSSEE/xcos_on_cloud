//Chapter 11
//Example 11.5
//page 413
//To find Double line to ground fault current and voltage of healthy phase
clc;clear;

Z1eq=0.09*%i;
Z2eq=0.075*%i;
Z0=(%i*0.1);
Ea=1;
a=(-0.5+%i*sqrt(3)/2);

//to find the sequence components of healthy phase
Ia1=Ea/(Z1eq+(Z2eq*Z0/(Z2eq+Z0)));
Va1=Ea-(Ia1*Z1eq);
Va2=Va1;
Va0=Va1;

Ia2=-(Va2/Z2eq);
Ia0=-(Va0/Z0);

I=[1 1 1;a^2 a 1;a a^2 1]*[Ia1; Ia2; Ia0];

//voltage of the healthy phase
Va=3*Va1;

//displaying the results
printf('Ia1=-j%0.3f\n',abs(Ia1));
printf(' Ia2=j%0.3f\n',abs(Ia2));
printf(' Ia0=j%0.3f\n\n',abs(Ia0));

printf(' Ia=%0.3f + j%0.3f\n',real(I(1,1)),imag(I(1,1)));
printf(' Ib=%0.3f + j%0.3f\n',real(I(2,1)),imag(I(2,1)));
printf(' Ic=%0.3f + j%0.3f\n\n',real(I(3,1)),imag(I(3,1)));

printf(' Voltage of the healthy phase Va=3Va1=%0.3f',Va);