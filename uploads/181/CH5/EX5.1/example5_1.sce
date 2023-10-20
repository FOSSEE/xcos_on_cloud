// Calculate BJT parameters using beta gain
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 5-1 in page 235

clear; clc; close;

// Part 1
// Given Data
beta_bjt=100; // Beta Gain of BJT
Vcc=10; // DC voltage across Collector in V
Rb=100000; // Base Resistance of BJT in ohm
Rc=2000; // Collector Resistance of BJT in ohm
Vbe=0.7; // Base-Emitter voltage of BJT

// Calculations
Ib=(Vcc-Vbe)/((beta_bjt*Rc)+Rc+Rb);
Ic=beta_bjt*Ib;

Vce=Vcc-(Ib+Ic)*Rc;

printf("Part 1 \n");
printf("(a)The value of Base Current in the BJT circuit is %0.3e A \n",Ib);
printf("(b)The value of Collector Current in the BJT circuit is %0.3e A \n",Ic);
printf("(c)The value of Collector-Emitter voltage in the circuit is %0.3f V \n",Vce);

// Part 2
// Given Data
Vce2=7; // Collector-Emitter voltage of BJT
Vcc=10; // DC voltage across Collector in V
Rc=2000; // Collector Resistance of BJT in ohm
Vbe=0.7; // Base-Emitter voltage of BJT
Rc2=2000; // Collector Resistance of BJT in ohm

// Calculations
constant=(Vcc-Vce2)/Rc;
Ib2=constant/101;
Ic2=100*Ib2;
Rb2=(Vcc-Vbe-(Rc2*constant))/Ib2;

printf("\nPart 2 \n");
printf("(a)The value of the Base Resistance of the Circuit is %0.3e ohm \n ",Rb2);

// Results
// Circuit 1: Value of Base Current of circuit = 0.031 mA
// Circuit 1: Value of Collector Current of circuit = 3.1 mA
// Circuit 1: Value of Collector-Emitter voltage of BJT circuit = 3.779 V
// Circuit 2: Value of BAse Resistance required = 424.24 K-ohm
