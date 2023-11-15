//Example 7.34
// Servomechanism, increasing the velocity constant through
// zero assignment.

// State space representation
//Transfer function model for DC Servo
s=poly(0,'s');
num=1;
den=s*(s+1);
Gs=syslin('c',num/den);

// State space representation
F=[0 1;0 -1]
G=[0 1]';
H=[1 0];
J=0;
n=sqrt(length(F));
//Desired poles for the DC Servo system.
Pc=[-2 -2]

// State feedback gain
//------------------------------------------------------------------
//------------------------------------------------------------------
//A function written by Deepti Khimani.
//Usage:-
//[K, lambda]=acker_dk(a, b, pl)
//K=acker_dk(a, b, pl)
//a:- System matrix.
//b:- input matrix.
//p:- Desired poles.
//K:-State feedback gain for the control law u=-Kx.
//lambda:- Eigen values of (a-b*k)
//------------------------------------------------------------------
//------------------------------------------------------------------

function [K, lambda]=acker_dk(a, b, pl)
        [lhs,rhs]=argn(0)

    if rhs == 0 then
        disp(["K=acker_dk(a, b, pl)";"[K, lambda]=acker_dk(a, b, pl)"]);
        disp(["a:- System matrix";"b:- input matrix";"p:- Desired poles"]);
        disp(["K:-State feedback gain for the control law u=-Kx";...
 "lambda:- Eigen values of (a-b*k)"]);
        return;
    end
[ra ca]=size(a);
[rb cb]=size(b);
l=length(pl);

CO=cont_mat(a,b);

if ra~=l then
    error(["Dimension error:";"number of desired poles must equal...
 to order of the system"]);
elseif ra~=ca then
    error(["Dimension error:";"system matrix should be...
 a sqaure matrix"]);
elseif rb~=ra then
    error (["Dimension error:","Input matrix should have...
 as many rows as a system matrix."]);
elseif rank(CO)<ra then
    error("system is not controllable");
end
//------------------------------------------------------------------
//controllable canonical form
[Ac,Bc,T,ind]=canon(a,b);

//CO=zeros(ra,cb);
for i=1:ra
    CO(:,ra+1-i)=Ac^(i-1)*Bc;
end
//------------------------------------------------------------------
chr_eq=poly(pl,'s');
des_chr_coeff=coeff(chr_eq);

des_chr_coeff=des_chr_coeff(1:ra);
alpha_c=Ac^ra;

for k=1:ra
    alpha_c=alpha_c + des_chr_coeff(k)*Ac^(k-1)
end
//------------------------------------------------------------------
//State feedback gain
temp=zeros(1,ra);
temp(1)=1;
K=temp*inv(CO)*alpha_c;
K=K/T;
lambda=spec(a-b*K);
endfunction
//------------------------------------------------------------------
K=acker_dk(F,G,Pc)//Gain computed in book is incorrect.
disp(K,'K=',"State feedback gain")
//------------------------------------------------------------------
//Overall transfer function with reduced order estimator.
Gred=8.32*(0.096+s)/(0.1 +s)/(8 + 4*s+s^2)
Gred=syslin('c',Gred)
disp(Gred,'Ys/Rs',"Overall transfer function with reduced...
 order estimator")

//Compensator
D=(0.096+s)*(s+1)/(4.08 +s)/(0.0196+s)
Ds=syslin('c',D*8.32)
disp(Ds,'Ds=',"Compensator transfer function")
//------------------------------------------------------------------
//root locus
evans(D*Gs,100) //Correct root locus
//------------------------------------------------------------------
//step response of the system with lag compensation
t=0:0.1:5;
ylag=csim('step',t,8.32*Gs*D/(1+8.32*Gs*D));
//------------------------------------------------------------------
//Discrete-time controller
sysDc_ss=syslin('c',tf2ss(Ds));
ts=0.1;
sysDd=dscr(sysDc_ss,ts)
Gdz=ss2tf(sysDd)

disp(Gdz,"Discrete-time compensator")
