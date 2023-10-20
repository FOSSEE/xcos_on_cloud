// Calculate the dc load current
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 3-8 in page 157

clear; clc; close;

// Given data
Vm=280; // Supply voltage in V
Rl=2000; // Load resistance in ohms
Rf=500; // Internal resistance of the diodes in ohms

// Calculation
Idc=(2*Vm)/(%pi*2500);
Idc_t=Idc/2;
printf("(a)I_dc = %0.2e A\n(b)I_dc(tube) = %0.2e A\n",Idc,Idc_t);
printf("(c)Voltage across conducting diode is sinusoidal with a peak value 0.2 Vm\n");
V_rms=0.905*(280*sqrt(2));
Pdc=Idc^2*Rl;
R=(Rf/Rl)*100;
printf("Rms voltage V_rms = %0.0f V\n",V_rms);
printf("(d)DC output power = %0.1f W\n",Pdc);
printf("(e)Percentage regulation = %0.0f percent",R);

// Result
// (a) Idc = 71 mA,
// (b) Idc_tube = 35.7 mA,
// (c) V_rms = 358 V,
// (d) P_dc = 10.167W,
// (e) Percentage regulation = 25%
