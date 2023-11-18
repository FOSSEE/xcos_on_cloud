// Find voltage gain A1 and A2
// Basic Electronics
// By Debashis De
// First Edition, 2010
// Dorling Kindersley Pvt. Ltd. India
// Example 7-12 in page 321

// Given data
Rd=30*10^3; // Drain resistance in K-ohm
Rs=2*10^3; // Source resistance in K-ohm
mu=19; // Constant for FET
rd=10*10^3; // Dynamic resistance in K-ohm

// Calculation
A1=(-mu*(Rd+rd+((mu+1)*Rs))*Rd)/((rd+Rd)*(Rd+rd+(2*(mu+1)*Rs)));
A2=(mu*(mu+1)*Rs*Rd)/((rd+Rd)*(Rd+rd+(2*(mu+1)*Rs)));
printf("(a)For the given values of Rd,Rs,rd and mu we have:\n");
printf("A1 = %0.2f\nA2 = %0.2f\n\n",A1,A2);
printf("(b)If Rs-->infinity,\n");
A_1=(-mu*Rd)/(2*(rd+Rd));
printf("A1 = %0.2f = -A2\nOr A1 = -A2 = %0.2f",A_1,A_1);

// Result
// (a) A1 = -9.5; A2 = 4.75
// (b) A1 = -A2 = -7.13
