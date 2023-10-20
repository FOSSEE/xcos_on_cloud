//------------------------------------------------------------------
//------------------------------------------------------------------
//A function written by Deepti Khimani.
//Usage:-
//p=zpk_dk(sl)
//[p, z]=zpk_dk(sl)
//[p, z, k]=zpk_dk(sl)
//p:- Poles of the system
//z:- zeros of the system
//k:- DC gain of the system
//------------------------------------------------------------------
//------------------------------------------------------------------

function[pl,zr,k]=zpk_dk(sysmodel)
    [lhs,rhs]=argn(0)

    if rhs == 0 then
     disp(["p=zpk_dk(sl)";"[p, z]=zpk_dk(sl)";"[p, z, k]=zpk_dk(sl)"]);
     disp(["p:- Poles of the system";"z:- zeros of the system"]);
     disp("k:- DC gain of the system");
     return;
    end

    if typeof(sysmodel)=="rational" then
        sys=tf2ss(sysmodel);
        pl=spec(sys.A);
        zr=trzeros(sys);
        temp1=poly(zr,'s','roots')/poly(pl,'s','roots');
        temp2=sysmodel/temp1;
        temp3=tf2ss(temp2);
        k=temp3.D;
    elseif typeof(sysmodel)=="state-space" then
        pl=spec(sysmodel.A);
        zr=trzeros(sysmodel);
        g=ss2tf(sysmodel);
        temp1=poly(zr,'s','roots')/poly(pl,'s','roots');
        temp2=g/temp1;
        temp3=tf2ss(temp2);
        k=temp3.D
    else
        error("Wrong type of input argument.")
    end
endfunction

//Example 7.32
// Redesign of the Dc servo compensator using SRL

// State space representation
//Transfer function model for DC Servo
s=poly(0,'s');
num=10;
den=s*(s+2)*(s+8);
Gs=syslin('c',num/den);

// State space representation
F=[-10 1 0;-16 0 1;0 0 0]
G=[0 0 10]';
H=[1 0 0];
J=0;
n=sqrt(length(F));
//Desired poles for the DC Servo system.
Pc=[-2+1.56*%i -2-1.56*%i -8.04]


// State feedback gain
K=ppol(F,G,Pc)
disp(K,'K=',"State feedback gain")

//Estimator - error roots are at
Pe=[-4+4.49*%i -4-4.49*%i -9.169]
Lt=ppol(F',H',Pe);
L=clean(Lt');
disp(L,'L=',"Observer gain")
//Error in book, Gain values are different in book.
//------------------------------------------------------------------
//Compensator Design
DK=-K*inv(s*eye(n,n)-F+G*K+L*H)*L;
DK=syslin('c',DK)
[pl,zr,Kp]=zpk_dk(DK);
Dc=poly(zr,'s','roots')/poly(pl,'s','roots')
//------------------------------------------------------------------
//symmetric root locus
G_s=horner(Gs,-s);
evans(Gs*G_s)
zoom_rect([-10 -5 10 5])
f=gca();
f.x_location = "origin"
f.y_location = "origin"
xset("color",2);
h=legend('');
h.visible = "off"
//Title, labels and grid to the figure
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
title('Symmetric root locus','fontsize',3);
//------------------------------------------------------------------
//root locus
figure,
evans(Gs*Dc) //Correct root locus
zoom_rect([-11 -6 1 6])
f=gca();
f.x_location = "origin"
f.y_location = "origin"
xset("color",2);
h=legend('');
h.visible = "off"
//Title, labels and grid to the figure
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
title('Root locus for pole assignment from the SRL','fontsize',3);
//------------------------------------------------------------------
//Discrete-time controller
nc=94.5*conv([7.98 1],[2.52 1])
dc=conv([59.5348 8.56 1],[10.6 1])
sysDc=poly(nc,'s','coeff')/poly(dc,'s','coeff');
sysDc_ss=syslin('c',tf2ss(sysDc));
ts=0.1;
sysDd=dscr(sysDc_ss,ts)
Gdz=ss2tf(sysDd);

disp(sysDc,"Continuous-time compensator")
disp(Gdz,"Discrete-time compensator")
//------------------------------------------------------------------
//step responses
importXcosDiagram(".\Ex7_32_model.xcos")

xcos_simulate(scs_m,4);
scs_m.props.context
figure,
plot(yt.time,yt.values(:,1),2)
plot(yt.time,yt.values(:,2),'r--')
xlabel('Time (sec)');
ylabel('y');
title("Comaprison of step responses for continuous and discrete...
 controllers",'fontsize',3)
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
legend("continuous controller","digital controller",4)

//Control inputs
figure,
plot(ut.time,ut.values(:,1),2)
plot(ut.time,ut.values(:,2),'r--')
xlabel('Time (sec)');
ylabel('u');
title("Comaprison of control signals for continuous and discrete...
 controllers",'fontsize',3)
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
legend("continuous controller","digital controller")
//------------------------------------------------------------------
