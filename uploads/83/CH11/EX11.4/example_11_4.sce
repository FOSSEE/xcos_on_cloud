//Chapter 11
//Example 11.4
//page 412
//To find L-L fault current and voltage of healthy phase
X1eq=0.09*%i;
X2eq=0.075*%i;
Z0=0.99+(%i*0.1);
Ea=1;Ia0=0;

//to calculate Ia1
Ia1=Ea/(X1eq+X2eq);

//to calculate fault current
If=(-%i*sqrt(3))*(-%i*6.06);
Va1=Ea-(Ia1*X1eq);
Va0=(-Ia0*Z0);
Va2=Va1;

//voltage in healthy phase
Va=Va1+Va2+Va0;

//displaying the result
printf('\nIa1=-j%0.2f',abs(Ia1));
printf('\nIf=%0.3f',If);
printf('\nVa1=Va2=%0.3f',Va1);
printf('\nVa0=%d',Va0);
printf('\nVa=Va1+Va2+Va0=%0.2f\n\n',Va);
