// Find voltage across diode
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 3-28 in page 180

clear; clc; close;

// Given data
I=0.1075; // Cirremt across diode in A
Rd=1; // Internal resistance of diode in ohm

// Calculation
Vd=I*Rd;
printf("Voltage across diode = %0.4f V",Vd);

// Result
// Voltage across diode = 0.1075 V
