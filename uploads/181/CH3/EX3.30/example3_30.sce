// Calculate R,I_l(max)
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 3-30 in page 181

clear; clc; close;

// Given data
V_0=50; // Zener diode voltage in V
I_L=0; // Load current in A

// Calculation
R=(150)/(40*10^-3);
printf("(a)R = %0.2e ohm\n",R);
printf("I_L = I_max when Id = Id_min = 10mA\n");
I_Lmax=40-10;
printf("(b)Maximum load current = %0.0f mA",I_Lmax);

// Result
// (a) R = 3.75 K-ohms
// (b) I_Lmax = 30 mA
