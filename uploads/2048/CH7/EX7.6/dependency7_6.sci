// Verification of performance of lead controller on antenna system, as discussed in Example 7.3.
// 7.6

// Continuous time antenna model
a = 0.1;
F = [0 1;0 -a]; g = [0; a]; c = [1 0]; d = 0;
Ga = syslin('c',F,g,c,d); [ds,num,den] = ss2tf(Ga);
Num = clean(num); Den = clean(den);
Ts = 0.2;
G = dscr(Ga,Ts);

// lead controller
beta1 = 0.8;
N = [1 -0.9802]*(1-beta1)/(1-0.9802); Rc = [1 -beta1];

// simulation parameters using g_s_cl2.cos
gamm = 1; Sc = 1; Tc = 1; C = 0; D = 1;
st = 1; st1 = 0;
t_init = 0; t_final = 20;

// u1: -4 to 11
// y1: 0 to 1.4
// Input arguments are co efficients of numerator and denominator
// polynomials in ascending powers of z^-1

// Scicos/Xcos blocks need input polynomials
// with positive powers of z

function [nume,deno] = cosfil_ip(num,den)
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
[Nn,Nd] = polyno(num,'z');
[Dn,Dd] = polyno(den,'z');
nume = Nn*Dd;
deno = Nd*Dn;

endfunction;

[Tcp1,Tcp2] = cosfil_ip(Tc,1); // Tc/1
[Np,Rcp] = cosfil_ip(N,Rc); // N/Rc
[Scp1,Scp2] = cosfil_ip(Sc,1); // Sc/1
[Cp,Dp] = cosfil_ip(C,D); // C/D
