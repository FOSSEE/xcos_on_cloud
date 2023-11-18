// Determine mode of operation of BJT
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 4-11 in page 212

// Given Data
Vbe=0.7; // Base-Emitter Voltage in V
beta_bjt=100; // beta gain of BJ

// Calculation
printf("Assume active mode for circuit 1\n");
Vb1=2;
Ve_1=Vb1-Vbe;
Ie1=1*10^-3;
Ic1=Ie1*(beta_bjt/(1+beta_bjt));
Ve1=6-(3*0.99);
printf("(a)Ve = %0.2f V\n(b)Ic = %0.2e A\n(c)Ve = %0.2f V\n",Ve_1,Ic1,Ve1);
printf("Thus the circuit operates in an active mode\n\n");

printf("For circuit 2,assume active mode\n");
Vcc=1;
Ve2=Vcc+Vbe;
Ie2=(6-Ve2)/(10*10^3);
Vc=0+(10*0.43);
printf("(a)Ve = %0.1f V\n(b)Ie = %0.2e A\n(c)Vc = %0.2f V\n",Ve2,Ie2,Vc);
printf("This circuit operates in a saturated mode\n\n");

printf("For circuit 3,assume active mode\n");
Ve3=-5+Vbe;
Ie3=(9.5-Ve3)/(200*10^3);
Ic=Ie3*(beta_bjt/(1+beta_bjt));
Vc3=-50+(0.492*20);
printf("(a)Ve = %0.1f V\n(b)Ie = %0.4e A\n(c)Ic = %0.3e A\n(d)Vc = %0.1f V\n",Ve3,Ie3,Ic,Vc3);
printf("The circuit operates in an active mode\n\n");

printf("For circuit 4,assume active mode\n");
Ve4=-20.7;
Ie4=(30+Ve4)/(5*10^3);
Vc4=(-Ie4*(beta_bjt/(1+beta_bjt))*(2*10^3))-10;
printf("(a)Ie = %0.2e A\n(b)Vc = %0.2f V\n",Ie4,Vc4);
printf("The circuit operates in an active mode");

// Result
// (a) Circuit 1 operates in active mode
// (b) Circuit 2 operates in saturation mode
// (c) Circuit 3 operates in active mode
// (d) Circuit 4 operates in active mode
