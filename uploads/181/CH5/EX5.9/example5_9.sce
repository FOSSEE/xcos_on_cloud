// Design of an Emitter Follower
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 5-9 in page 252

clear; clc; close;

// Given data
Ri=500*10^3; // Input Resistance in ohm
Ro=20; // Output Resistance in ohm
hfe=50; // h-parameter of BJT
hie=1*10^3; // h-parameter of BJT in ohm
hoe=25*10^-6; // h-parameter of BJT in A/V
const=499*10^3; // Product of Ai and Rl in ohm
Av=0.999; // Voltage gain of circuit
const_2=10^6; // Product of Ai and Rl in ohm for Av=0.999

// Calculations
Ai=1+hfe-(const*hoe);
Rl=const/Ai;
Rs=((hfe+1)*hoe*Ro)-hie;
Ri_2=hie/(1-Av);
Rl_2=(((1+hfe)/const_2)-1)/hoe;

printf("The current gain of circuit=%0.1f \n",Ai);
printf("When Av=0.999, \n(a)Ri=%0.2e ohm \n(b)Rl=%0.2e ohm \n",Ri_2,Rl_2);

// Results
// The current gain of circuit = 38.5
// For Av = 0.999,
// (a) Ri = 1 M-ohm,
// (b) Rl = -40.0 K-ohm
