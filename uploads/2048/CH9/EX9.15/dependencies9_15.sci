// Evaluation of continuous time controller for the case study presented in Example 9.13 on page 349.
// 9.15

//User defined function
//Forms a transfer function
//Scilab: Co efficients are given in increasing power of variable
//Matlab: Co efficients are given in decreasing power of variable
//Hence co efficients are flipped here

//Input arguments: (1) Numerator co efficients(decreasing order)
//(2) Denominator co efficients
//(3) Variable to specify domain

// Updated (30-11-06)
// System is continuous => a is not passed
// System is discrete => a = -1
// System is discretized (sampled system) => a = Ts
// Uses syslin

function trfu = tf(num,den,a)
  if argn(2) == 2
  d = 'c';
  elseif a == -1
  d = 'd';
  else
  d = a
  end;
num = clean(num);
den = clean(den);
num1 = poly(num(length(num):-1:1),'x','coeff');
den1 = poly(den(length(den):-1:1),'x','coeff');
trfu = syslin(d,num1,den1);
endfunction;



// Discretization of continuous transfer function. The result is numerator and denominator in powers of z^{-1} and the delay term k.
// 9.2
// function [B,A,k] = myc2d(G,Ts)
// Produces numerator and denominator of discrete transfer
// function in powers of z^{-1}
// G is continuous transfer function; time delays are not allowed
// Ts is the sampling time, all in consistent time units

function [B,A,k] = myc2d(G,Ts)
H = ss2tf(dscr(G,Ts));
num1 = coeff(H('num'));
den1 = coeff(H('den'));//-------------
A = den1(length(den1):-1:1);
num2 = num1(length(num1):-1:1);  //flip
nonzero = find(num1);
first_nz = nonzero(1);
B = num2(first_nz:length(num2)); //-------------
k = length(den1) - length(num1);
endfunction

// Evaluates z^-k.
// 9.6

function [zk,dzk] = zpowk(k)
zk = zeros(1,k+1); zk(1,k+1) = 1;
dzk = k;
endfunction
// Input arguments are co efficients of numerator and denominator
// polynomials in ascending powers of z^-1

// Scicos/Xcos blocks need input polynomials
// with positive powers of z

function [nume,deno] = cosfil_ip(num,den)
[Nn,Nd] = polyno(num,'z');
[Dn,Dd] = polyno(den,'z');
nume = Nn*Dd;
deno = Nd*Dn;

endfunction;

// Updated(1-8-07)
// Operations:
// Polynomial definition
// Flipping of coefficients
// Variables ------- passed as input argument (either 's' or 'z')
// Both num and den are used mostly used in scicos files,
// to get rid of negative powers of z

// Polynomials with powers of s need to
// be flipped only

function [polynu,polyde] = polyno(zc,a)
zc = clean(zc);
polynu = poly(zc(length(zc):-1:1),a,'coeff');
  if a == 'z'
  polyde = %z^(length(zc) - 1);
  else
  polyde = 1;
  end

// Scicos(4.1) Filter block shouldn't have constant/constant
  if type(polynu)==1 & type(polyde)==1
    if a == 'z'
      polynu = %z; polyde = %z;
    else
      polynu = %s; polyde = %s;
    end;
  end;

endfunction
num = 200;
den = convol([0.05 1],[0.05 1]);
den = convol([10 1],den);
G = tf(num,den); Ts = 0.005;
[B,A,k] = myc2d(G,Ts);
[zk,dzk] = zpowk(k); //int = 0;

// Sigurd's feedback controller'
numb = 0.5*convol([1 2],[0.05 1]);
denb = convol([1 0],[0.005 1]);
Gb = tf(numb,denb);
[Sb,Rb,kb] = myc2d(Gb,Ts);
[zkb,dzkb] = zpowk(kb);
Sb = convol(Sb,zkb);

// Sigurd's feed forward controller'
numf = [0.5 1];
denf = convol([0.65 1],[0.03 1]);
Gf = tf(numf,denf);
[Sf,Rf,kf] = myc2d(Gf,Ts);
[zkf,dzkf] = zpowk(kf);
Sf = convol(Sf,zkf);

// Margins
simp_mode(%f);
L = G*Gb;
Gm = g_margin(L); // ------
Pm = p_margin(L); // ------
Lnum = convol(Sb,convol(zk,B));
Lden = convol(Rb,A);
L = tf(Lnum,Lden,Ts);
DGm = g_margin(L); // ------
DPm = p_margin(L); // ------

// Noise
num1 = 100; den1 = [10 1];

// simulation parameters for
// entirely continuous simulation: g_s_cl3.xcos
// hybrid simulation: g_s_cl6.xcos
st = 1; // desired change in setpoint
st1 = 0;
t_init = 0; // simulation start time
t_final = 5; // simulation end time

num = polyno(num,'s'); den = polyno(den,'s');
Numb = polyno(numb,'s'); Denb = polyno(denb,'s');
Numf = polyno(numf,'s'); Denf = polyno(denf,'s');
Num1 = polyno(num1,'s'); Den1 = polyno(den1,'s');

[Sbp,Rbp] = cosfil_ip(Sb,Rb);
[Sfp,Rfp] = cosfil_ip(Sf,Rf);
