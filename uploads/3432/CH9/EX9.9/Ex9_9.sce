//Example 9.9
//Describing Function for a saturation nonlinearity.

//Response of the saturation nonlinearity to sinusoidal input
//Describing Functin for saturation nonlinearity.
k=1;
N=1;
i=1;
Keq=[];

for a=0:0.2:10
    if k*a/N > 1 then
    Keq(i,1)=2/%pi*(k*asin(N/a/k)+N/a*sqrt(1-(N/k/a)^2))
    else
    Keq(i,1)=k
    end
    i=i+1;
end

a=0:0.2:10;
a=a';
