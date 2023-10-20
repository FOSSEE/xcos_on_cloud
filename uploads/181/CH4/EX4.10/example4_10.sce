// Measurement of Circuit Voltage changes
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 4-10 in page 211

clear; clc; close;

// Given Data
Vb=-5; // Base Voltage of BJT in V
Rc=1*10^3; // Collector Resistance in K-ohms
Ie=2*10^-3; // Emitter Current of BJT in mA
delB=+0.4; // Change in Base Voltage

// Calculations
delE=+0.4;
delC=0;

printf("(a)Change in Emitter voltage is +%0.2f V\n",delE);
printf("(b)Change in Collector Voltage is %0.2f V\n",delC);

// Results
// (a) Change in Emitter Voltage in the Circuit = +0.4 V
// (b) Change in Collector Voltage in the Circuit = 0.0 V
