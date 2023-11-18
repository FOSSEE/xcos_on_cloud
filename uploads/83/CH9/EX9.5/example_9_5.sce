//Chapter 9
//Example 9.5
//page 347
//To calculate short circuit solution
//referring to figures 9.19 in the text book,we get directly the fault current
V4o=1.0;
Zf=%i*0.13560;
If=V4o/Zf;
printf('\nIf= -j%0.5f pu\n\n',abs(If));

//From Fig9.19d
I1=If*((%i*0.19583)/(%i*0.37638));
I2=If*((%i*0.18055)/(%i*0.37638));
printf('I1 = -j%0.5f pu \n\nI2 = -j%0.5f pu\n\n',abs(I1),abs(I2));

//voltage changes for bus 1,2 and 3
deltaV1=0-(%i*0.15)*I1;
deltaV2=0-(%i*0.15)*I2;
printf('DeltaV1=%0.5f pu\n\nDeltaV2=%0.5f pu\n\n',deltaV1,deltaV2);

//reffering to book
V1f=1+deltaV1;
V2f=1+deltaV2;
printf('V1f= %0.5f pu\n\nV2f=%0.5f pu\n\n',V1f,V2f);
I13=(V1f-V2f)/(%i*0.15+%i*0.1);
printf('I13=j%0.5f pu\n\n',abs(I13));
deltaV3=0-((%i*0.15)*(I1)+(%i*0.15)*(I13));
Vf3=1+deltaV3;
printf('DeltaV3=%0.5f pu\n\n',deltaV3);
printf('Vf3=%0.5f pu\n\n',Vf3);
Vf4=0;
printf('Vf4=%d\n\n',Vf4);
//short circuit MVA at bus 4
SC_MVA_4=abs(If)*100;
printf('Short circuit MVA at bus4 =%0.3f MVA',SC_MVA_4);
