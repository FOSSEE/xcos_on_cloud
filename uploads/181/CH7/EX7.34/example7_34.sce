// Determine Zo,draw small signal model
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 7-34 in page 338

// Given data
gm=1; // Transconductance in m-mho
rd=50*10^3; // Dynamic resistance in K-ohms
Rd=5*10^3; // Drain resistance in K-ohms

// Calculation
printf("The equivalent circuit at low-frequency small signal model is as shown in the figure\n");
Zo=(rd*Rd)/(Rd+rd);
printf("Zo = %0.2e ohms",Zo);

// Result
// Zo = 4.54 K-ohms
