//Example 9.11
//Describing Function for a relay with hysteresis nonlinearity.

//Response of the saturation noninearity to sinusoidal input
////Describing Functin for relay with hysteresis nonlinearity.
h=0.1;
N=1;
i=1;

for a=0.1:0.025:1
    if a<h then
        Keq(i,1)=0;
        ro(i,1)=0;
        theta(i,1)=0;
    else
        Keq(i,1)=4*N/(%pi*a)*(sqrt(1-(h/a)^2)-%i*h/a);
        [r th]=polar(Keq(i,1));
        ro(i,1)=r; //magnitude
        theta(i,1)=clean(th); //angle in radians
    end
    i=i+1;
end

a=0.1:0.025:1;
a=a';
