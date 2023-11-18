
// ELECTRICAL MACHINES
// R.K.Srivastava
// First Impression 2011
// CENGAGE LEARNING INDIA PVT. LTD
// CHAPTER : 6 : SYNCHRONOUS MACHINES

// EXAMPLE : 6.23

// GIVEN DATA

p = 4;                          // Number of the poles in the Alternator
f = 50;                         // Frequency in Hertz
pkw = 500;                      // Alternator delivering load in kilo-watts
pkwinc = 1000;                  // Generator increases its share of the common elictrical in kilo-watts
Kj = 1.5;                       // Inertia acceleration coefficient for the combined prime mover-alternator in N-m/elec deg/second square
Kd = 12;                        // Damping torque coefficient in N-m/elec deg/second
delta1 = 9;                     // Initial value of the Power angle in degree


// CALCULATIONS

delta2 = (pkwinc/pkw)*delta1;                               // Final value (maximum value) of the Power angle in degree (considering Linear variation)
ws = (4*%pi*f)/p;                                           // Rotational speed in Radians per second
Ts = (pkw*1000)/ws;                                         // Synchornizing torque at 500kW in N-m
Ks = Ts/delta1;                                             // Synchornizing torque cofficient at 500kW in N-m/elec-deg
// Laplace transform of the swing Equation can be written as :- s^2 + ((Kd/Kj)*s) + (Ks/Kj) = 0, s^2 + (12/1.5)s + (353.86/1.5) = 0 and compring with the standard equation s^2 + s(2*zeta*Wn) + Wn^2 = 0 we get:- mentined below  (refer page no. 454 and 455)
Wn = sqrt(Ks/Kj);                                           // Natural frequency of oscillations in Radians per second
fn = Wn/(2*%pi);                                            // Frequency of natural oscillations in Hertz
zeta = (1*Kd)/(2*Wn*Kj);                                    // Damping ratio
Wd = Wn*(sqrt(1-zeta^2));                                   // Frequency of damped oscillations in radians/s
fd = Wd/(2*%pi);                                            // Frequency of damped oscillations in Hertz
ts = 5/(zeta*Wn);                                           // Settling time in second
deltamax = delta1 + 1.42*(delta2-delta1);                   // The maximum overshoot for damping ratio of 0.2604 is about 42% the maximum appoximate value of the overshoot in terms of 1% tolearance band in Electrical degree


// DISPLAY RESULTS

disp("EXAMPLE : 6.23: SOLUTION :-");
printf("\n (a.1) Final value (maximum value) of the Power angle (considering Linear variation), delta2 = %.f degree \n",delta2)
printf("\n (a.2) Natural frequency of oscillations, Ns = %.2f radians/s \n",Wn)
printf("\n (a.3) Damping ratio, zeta = %.4f \n",zeta)
printf("\n (a.4) Frequency of damped oscillations, Wd = %.2f radians/s \n",Wd)
printf("\n (a.5) Settling time, ts = %.2f seconds \n",ts)
printf("\n  (b)  The maximum overshoot for damping ratio of 0.2604 is about 42 percent the maximum appoximate value of the overshoot in terms of 1 percent tolearance band is, deltamax = %.2f degree \n",deltamax)
printf("\n\n FOR CASE (C) CANNOT BE DO IT IN THIS BECAUSE AS IT REQUIRES MATLAB SIMULINK \n")
