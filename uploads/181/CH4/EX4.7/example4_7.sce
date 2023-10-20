// Calculate Labeled Currents and Voltages
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 4-7 in page 210

clear; clc; close;

// Given Data
beta_bjt=100; // beta gain of BJT
Vbe=0.7; // Base-Emitter voltage of BJT in V

//Calculation
Vcc1=10;
Vee1=-10;
Ve1=-0.7;
R1=10*10^3;
Ie1=(Vcc1-Vbe)/R1;
Ib1=Ie1/(beta_bjt+1);
Vc1=Vcc1-R1*(Ie1-Ib1);
Vcc2=10;
Vee2=-15;
Ve2=-0.7;
R2=5*10^3;
Ie2=(Vcc2-Vbe)/R2;
Ic2=(beta_bjt/(beta_bjt+1))*Ie2;
Vc2=Vee2+R2*(Ie2);
printf("Circuit 1:\n(a)Emitter Current=%0.2e A\n(b)Base Current=%0.2e A\n(c)Collector Voltage=%0.3f V\n\n",Ie1,Ib1,Vc1);
printf("Circuit 2:\n(a)Emitter Current=%0.2e A\n(b)Collector Current=%0.3e A\n(c)Collector Voltage=%0.3f V\n",Ie2,Ic2,Vc2);

// Results
// (a) Circuit 1 : Emitter Current = 0.93 mA
// (b) Circuit 1 : Base Current = 9.2 mu-A
//(c) Circuit 1 : Collector Voltage = 0.792 V

//(a) Circuit 2 : Emitter Current = 1.86 mA
//(b) Circuit 2 : Collector Current = 1.842 mA
//(c) Circuit 2 : Collector Voltage : -5.7 V
