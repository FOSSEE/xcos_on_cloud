// Find currents and voltages
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 3-27 in page 179

// Given data
//Diode acts as short circuited.Both diodes are forward biased
V1=0; // Voltage at junction 1 in V
V2=0; // Voltage at junction 2 in V

//Calculation
I1=(20-V1)/(20*10^3);
I2=(V2-(-10))/(20*10^3);

printf("I1 = %0.0e A\n",I1);
printf("I2 = %0.1e A",I2);

// Result
// I1 = 1 mA
// I2 = 0.5 mA
