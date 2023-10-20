// System type with 2-DOF controller. It is used to arrive at the results Example 9.14.
// 9.16
// Procedure to split a polynomial into good and bad factors, as discussed in Sec. 9.5. The factors that have roots outside unit circle or with negative real parts are defined as bad.
// 9.12

// function [goodpoly,badpoly] = polsplit3(fac,a)
// Splits a scalar polynomial of z^{-1} into good and bad
// factors. Input is a polynomial in increasing degree of
// z^{-1}.  Optional input is a, where a <= 1.
// Factors that have roots outside a circle of radius a or
// with negative roots will be called bad and the rest
// good. If a is not specified, it will be assumed as 1.

function [goodpoly,badpoly] = polsplit3(fac,a)
if argn(2) == 1, a = 1; end
if a>1 error('good polynomial also is unstable'); end
fac1 = poly(fac(length(fac):-1:1),'z','coeff');
rts = roots(fac1);
rts = rts(length(rts):-1:1);

// extract good and bad roots
badindex = mtlb_find((abs(rts)>=a-1.0e-5)|(real(rts)<-0.05));
badpoly = coeff(poly(rts(badindex),'z'));
goodindex = mtlb_find((abs(rts)<a-1.0e-5)&(real(rts)>=-0.05));
goodpoly = coeff(poly(rts(goodindex),'z'));

// scale by equating the largest terms
[m,index] = max(abs(fac));
goodbad = convol(goodpoly,badpoly);
goodbad = goodbad(length(goodbad):-1:1);
factor1 = fac(index)/goodbad(index);
goodpoly = goodpoly * factor1;
goodpoly = goodpoly(length(goodpoly):-1:1);
badpoly = badpoly(length(badpoly):-1:1);
endfunction;
// polmul
// The command
//    [C,degA] = polmul(A,degA,B,degB)
// produces the polynomial matrix C that equals the product A*B of the
// polynomial matrices A and B.
//
// H. Kwakernaak, July, 1990


function [C,degC] = polmul(A,degA,B,degB)
[rA,cA] = polsize(A,degA);
[rB,cB] = polsize(B,degB);
if cA ~= rB
   error('polmul: Inconsistent dimensions of input matrices');
end

degC = degA+degB;
C = [];
for k = 0:degA+degB
    mi = 0;
    if k-degB > mi
       mi = k-degB;
    end
    ma = degA;
    if k < ma
       ma = k;
    end
    Ck = zeros(rA,cB);
    for i = mi:ma
        Ck = Ck + A(:,i*cA+1:(i+1)*cA)*B(:,(k-i)*cB+1:(k-i+1)*cB);
    end
    C = [C Ck];
end
endfunction
// function [rQ,cQ] = polsize(Q,degQ)
// FUNCTION polsize TO DETERMINE THE DIMENSIONS
// OF A POLYNOMIAL MATRIX
//
// H. Kwakernaak, August, 1990

function [rQ,cQ] = polsize(Q,degQ)

[rQ,cQ] = size(Q); cQ = cQ/(degQ+1);
if abs(round(cQ)-cQ) > 1e-6
   error('polsize: Degree of input inconsistent with number of columns');
else
   cQ = round(cQ);
end
endfunction
// Pole placement controller using internal model principle, as discussed in Sec. 9.4.
// 9.8

// function [Rc,Sc,Tc,gamma,phit] = pp_im(B,A,k,phi,Delta)
// Calculates 2-DOF pole placement controller.

function [Rc,Sc,Tc,gamm] = pp_im(B,A,k,phi,Delta)

// Setting up and solving Aryabhatta identity
[Ag,Ab] = polsplit3(A); dAb = length(Ab) - 1;
[Bg,Bb] = polsplit3(B); dBb = length(Bb) - 1;

[zk,dzk] = zpowk(k);

[N,dN] = polmul(Bb,dBb,zk,dzk);
dDelta = length(Delta)-1;
[D,dD] = polmul(Ab,dAb,Delta,dDelta);
dphi = length(phi)-1;

[S1,dS1,R1,dR1] = xdync(N,dN,D,dD,phi,dphi);

// Determination of control law
Rc = convol(Bg,convol(R1,Delta)); Sc = convol(Ag,S1);
Tc = Ag; gamm = sum(phi)/sum(Bb);
endfunction;
// function [Y,degY,X,degX,B,degB,A,degA] = xdync(N,degN,D,degD,C,degC,gap)
// given coefficient matrix in T1, primary redundant row information sel,
// solves XD + YN = C

// calling order changed on 16 April 2005.  Old order:
// function [B,degB,A,degA,Y,degY,X,degX] = xdync(N,degN,D,degD,C,degC,gap)

function [Y,degY,X,degX,B,degB,A,degA] = xdync(N,degN,D,degD,C,degC,gap)
if argn(2) == 6
        gap = 1.0e+8;
end

[F,degF] = rowjoin(D,degD,N,degN);

[Frows,Fbcols] = polsize(F,degF); //Fbcols = block columns

[B,degB,A,degA,S,sel,degT1,Fbcols] = left_prm(N,degN,D,degD,3,gap);
//if issoln(D,degD,C,degC,B,degB,A,degA)
        [Crows,Ccols] = size(C);
        [Srows,Scols] = size(S);
        S = clean(S);
        S = S(mtlb_logical(sel),:);
        T2 =[];

        for i = 1:Crows,
                Saug = seshft(S,C(i,:),0);
                b = cindep(Saug);
                b = move_sci(b,find(sel),Srows);
                T2 =[T2; b];
        end

     [X,degX,Y,degY] = colsplit(T2,degT1,Fbcols,Frows-Fbcols);

     [X,degX] = clcoef(X,degX);
     [Y,degY] = clcoef(Y,degY);
      Y = clean(Y); X = clean(X);
endfunction
// function [P,degP] = rowjoin(P1,degP1,P2,degP2)
// MATLAB FUNCTION rowjoin TO SUPERPOSE TWO POLYNOMIAL
// MATRICES

// H. Kwakernaak, July, 1990

function [P,degP] = rowjoin(P1,degP1,P2,degP2)

[rP1,cP1] = polsize(P1,degP1);
[rP2,cP2] = polsize(P2,degP2);
if cP1 ~= cP2
  error('rowjoin: Inconsistent numbers of columns');
end

rP = rP1+rP2; cP = cP1;
if degP1 >= degP2
   degP = degP1;
else
   degP = degP2;
end

if isempty(P1)
   P = P2;
elseif isempty(P2)
   P = P1;
else
   P = zeros(rP,(degP+1)*cP);
   P(1:rP1,1:(degP1+1)*cP1) = P1;
   P(rP1+1:rP,1:(degP2+1)*cP2) = P2;
end
endfunction
// function [B,degB,A,degA,Y,degY,X,degX] = ...
// left_prm(N,degN,D,degD,job,gap)
//
// does three different things according to integers that 'job' takes
// job = 1.
// this is the default.  It is always done for all jobs.
//         -1                                  -1    -1
// Given ND  , returns coprime B and A where ND   = A  B
// It is enough if one sends the first four input arguments
// If gap is required to be sent, then one can send either 1 or a null
// entry for job
// job = 2.
// first solve for job = 1 and then solve XA + YB = I
// job = 3.
// used in solving XD + YN = C
// after finding coprime factorization, data are returned
//
// convention: the variable with prefix deg stand for degrees
// of the corresponding polynomial matrices
//
// input:
// N: right fraction numerator polynomial matrix
// D: right fraction denominator polynomial matrix
// N and D are not neccessarily coprime
// gap: variable used to zero entries; default value is 1.0e+8
//
// output
// b and A are left  coprime num. and den. polynomial matrices
// X and Y are solutions to Aryabhatta identity, only for job = 2

function [B,degB,A,degA,Y,degY,X,degX] = left_prm(N,degN,D,degD,job,gap)
if argn(2) == 4 | argn(2) == 5
   gap = 1.0e8 ;
end
// pause
if argn(2) == 4,
job = 1; end
[F,degF] = rowjoin(D,degD,N,degN);
[Frows,Fbcols] = polsize(F,degF);       // Fbcols = block columns
Fcols = Fbcols * (degF+1) ;             // actual columns of F
T1 = [];pr =[];degT1 = 0; T1rows = 0;shft = 0;
S=F; sel = ones(Frows,1); T1bcols =1;
abar = (Fbcols + 1):Frows;              // a_super_bar of B-C.Chang
while isempty(T1) | T1rows < Frows - Fbcols
      Srows = Frows*T1bcols; // max actual columns of result
      [T1,T1rows,sel,pr] = ...
           t1calc(S,Srows,T1,T1rows,sel,pr,Frows,Fbcols,abar,gap);
      [T1rows,T1cols] = size(T1);
      if T1rows < Frows - Fbcols
        T1 = [T1 zeros(T1rows,Frows)];
        T1bcols = T1bcols  + 1;         // max. block columns of result
        degT1 = degT1 + 1;              // degree of result
        shft = shft +Fbcols;
        S = seshft(S,F,shft);
        sel = [sel;sel(Srows-Frows+1:Srows)];
        rowvec = (T1bcols-1)*Frows+(Fbcols+1):T1bcols * Frows;
        abar = [abar rowvec];           // A_super_bar of B-C.chang
      end
end

[B,degB,A,degA] = colsplit(T1,degT1,Fbcols,Frows-Fbcols);
[B,degB] = clcoef(B,degB);
B = -B;
[A,degA] = clcoef(A,degA);
// pause
if job == 2
      S = S(mtlb_logical(sel),:);                      // columns
      [redSrows,Scols] = size(S);
      C = [eye(Fbcols,Fbcols) zeros(Fbcols,Scols-Fbcols)];   // append with zeros
      T2 = C/S;
      T2 = makezero(T2,gap);
      T2 = move_sci(T2,find(sel),Srows);
      [X,degX,Y,degY] = colsplit(T2,degT1,Fbcols,Frows - Fbcols);
      [X,degX] = clcoef(X,degX);
      [Y,degY] = clcoef(Y,degY);
elseif job == 3
      Y = S;
      degY = sel;
      X = degT1;
      degX = Fbcols;
else
      if job ~= 1
         error('Message from left_prm:no legal job number specified')
      end
end
endfunction



// function [T1,T1rows,sel,pr] = ...
// t1calc(S,Srows,T1,T1rows,sel,pr,Frows,Fbcols,abar,gap)
// calculates the coefficient matrix T1
// redundant row information is kept in sel: redundant rows are marked
// with zeros.  The undeleted rows are marked with ones.

function [T1,T1rows,sel,pr] = t1calc(S,Srows,T1,T1rows,sel,pr,Frows,Fbcols,abar,gap)
b = 1;                                  // vector of primary red.rows

while (T1rows < Frows - Fbcols) & or(sel==1) & ~isempty(b)
      S = clean(S);
      b = indep(S(mtlb_logical(sel),:),gap); // send selected rows of S
      if ~isempty(b)
         b = clean(b);
         b = move_sci(b,find(sel),Srows);
         j = length(b);
         while ~(b(j) & or(abar==j))   // pick largest nonzero entry
                j = j-1;                // of coeff. belonging to abar
                if ~j
                   fprintf('\nMessage from t1calc, called from left_prm\n\n')
                   error('Denominator is noninvertible')
                end
         end
         if ~or(j<pr & pmodulo(pr,Frows) == pmodulo(j,Frows)) // pr(2),pr(1)
            T1 = [T1; b];               // condition is not violated
            T1rows = T1rows +1;         // accept this vector
         end                            // else don't accept
         pr = [pr; j];                  // update prime red row info
         while j <= Srows
               sel(j) = 0;
               j = j + Frows;
         end
      end
end
endfunction
// function b = indep(S,gap)
// determines the first row that is dependent on the previous rows of S.
// The coefficients of dependence is returned in b
function b = indep( S,gap)

if argn(2) == 1
        gap = 1.0e8;
        end
[rows,cols] = size(S);
ind = 1;
i = 2;
eps = 2.2204e-016;
while ind & i <= rows
      sigma = svd(S(1:i,:));
      len = length(sigma);
      if(sigma(len)/sigma(1) < (eps*max(i,cols)))
        ind =0;
      else
        shsig = [sigma(2:len);sigma(len)];
        if or( (sigma ./shsig) > gap)
           ind = 0;
        else
           ind = 1;
           i = i+1;
        end
      end

end
if ind
        b =[];

else
        c = S(i,:)/S(1:i-1,:);
        c = makezero(c,gap);
        b = [-c 1];
end
endfunction

// function B = makezero(B,gap)
// where B is a vector and gap acts as a tolerance

function B = makezero(B,gap)

if argn(2) == 1
   gap = 1.0e8;
end
temp = B(find(B));        // non zero entries of B
temp = -gsort(-abs(temp),'g','d'); // absolute values sorted in descending order
len = length(temp);
ratio = temp(1:len-1) ./temp(2:len); // each ratio >1
min_ind = min(find(ratio>gap));
if ~isempty(min_ind)
   our_eps = temp(min_ind+1);
   zeroind = find(abs(B)<=our_eps);
   B(zeroind) = zeros(1,length(zeroind));
end
endfunction
// function result = move_sci(b,nonred,max_sci)
// Moves matrix b to matrix result with the information on where to move,
// decided by the indices of nonred.
// The matrix result will have as many rows as b has and max number of columns.
// b is augumented with zeros to have nonred number of columns;
// The columns of b put into those of result as decided by nonred.

function result = move_sci(b,nonred,max_sci)
[brows,bcols] = size(b);
b = [b zeros(brows,length(nonred)-bcols)];
result = zeros(brows,max_sci);
result(:,nonred') = b;
endfunction
// colsplit
// The command
//   [P1,degP1,P2,degP2] = colsplit(P,degP,p1,p2)
// produces two polynomial matrix P1 and P2. P1 consists of the first
// p1 columns of P and P2 consists of the remaining p2 columns of P.

// H. Kwakernaak, July, 1990


function [P1,degP1,P2,degP2] = colsplit(P,degP,p1,p2)

if isempty(P)
   P1 = []; P2 = [];
   degP1 = 0; degP2 = 0;
   return;
end

[rP,cP] = polsize(P,degP);
if p1 < 0 | p1 > cP | p2 < 0 | p2 > cP | p1+p2 ~= cP
   error('colsplit: Inconsistent numbers of columns');
end
rP1 = rP; rP2 = rP; cP1 = p1; cP2 = p2;
degP1= degP; degP2 = degP;

if p1 == 0
   P1 == []; P2 = P;
elseif p2 == 0
   P1 = P; P2 = [];
else
   P1 = zeros(rP1,(degP1+1)*cP1); P2 = zeros(rP2,(degP2+1)*cP2);
   for i = 1:degP+1
       P1(:,(i-1)*cP1+1:i*cP1) = P(:,(i-1)*cP+1:(i-1)*cP+cP1);
       P2(:,(i-1)*cP2+1:i*cP2) = P(:,(i-1)*cP+cP1+1:i*cP);
   end
end
endfunction;
// H. Kwakernaak, July, 1990
// Modified by Kannan Moudgalya in Nov. 1992

function [P,degP] = clcoef(Q,degQ)

[rQ,cQ] = polsize(Q,degQ);

if and(and(Q==0))
  P = zeros(rQ,cQ);
  degP = 0;
else
  P = Q; degP = degQ; rP = rQ; cP = cQ;
  j = degP+1;
  while j >= 0
  X = P(:,(j-1)*cP+1:j*cP)
    if max(sum(abs(X'))) < (1e-8)*max(sum(abs(P)))
       P = P(:,1:(j-1)*cP);
       degP = degP-1;
    else
       j = 0;
    end
    j = j-1;
  end
end
endfunction
// function b = cindep( S,gap)
// Used in XD + YN = C. All rows except the last of are assumed to
// be independent.  The aim is to check if the last row is dependent on the
// rest and if so how.  The coefficients of dependence are sent in b.
function b = cindep( S,gap)

if argn(2) == 1
        gap = 1.0e8;
end
eps = 2.2204e-016;
[rows,cols] = size(S);
if rows > cols
   ind = 0;
else
   sigma = svd(S);
   len = length(sigma);
   if (sigma(len)/sigma(1) <= (eps*max(i,cols)))
      ind = 0;                  //not independent
   else
      if or(sigma(1:len-1) ./sigma(2:len)>=gap)
         ind = 0;               // not dependent
      else
         ind = 1;               //independent
      end
   end
end
if ind
   b = [];
else
   b = S(rows,:)/S(1:rows-1,:);
   b = makezero(b,gap);
end
endfunction


// function C = seshft(A,B,N)
//given A and B matrices, returns C = [<-A-> 0
//                                    0  <-B->] with B shifted east by N cols

function C = seshft(A,B,N)
[Arows,Acols] = size(A);
[Brows,Bcols] = size(B);
if N >= 0
   B = [zeros(Brows,N) B];
   Bcols = Bcols + N;
elseif N < 0
   A = [zeros(Arows,abs(N)) A];
   Acols = Acols +abs(N);
end
  if Acols < Bcols
        A = [A zeros(Arows,Bcols-Acols)];
  elseif Acols > Bcols
        B = [B zeros(Brows,Acols-Bcols)];
  end
  C = [A
       B];
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
B = 1; A = [1 -1]; k = 1; zk = zpowk(k); Ts = 1;
phi = [1 -0.5];

Delta = 1; // Choice of internal model of step
[Rc,Sc,Tc,gamm] = pp_im(B,A,k,phi,Delta);

// simulation parameters for stb_disc.xcos
st = 1; // desired step change
t_init = 0; // simulation start time
t_final = 20; // simulation end time
xInitial = [0 0];
C = 0; D = 1; N_var = 0;

[Tcp1,Tcp2] = cosfil_ip(Tc,1); // Tc/1
[Rcp1,Rcp2] = cosfil_ip(1,Rc); // 1/Rc
[Scp1,Scp2] = cosfil_ip(Sc,1); // Sc/1
[Bp,Ap] = cosfil_ip(B,A); // B/A
[zkp1,zkp2] = cosfil_ip(zk,1); // zk/1
[Cp,Dp] = cosfil_ip(C,D); // C/D
