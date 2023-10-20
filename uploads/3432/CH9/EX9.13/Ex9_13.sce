//Example 9.13
//Determination of stability with a hysteresis nonlinearity.

xdel(winsid())//close all graphics Windows
clear;
clc;
//------------------------------------------------------------------
//System Model
s=poly(0,'s');
num=1;
den=(s^2+s);
Gs=syslin('c',num/den);
//------------------------------------------------------------------
//Nyquist Plot of the system
nyquist(Gs,0.25,3)

// Nyquist Plot of Describing Function for hysteresis nonlinearity
N=1;
h=0.1;
i=1;

for omegat=0:0.05:%pi-0.1;
    a=sin(omegat);
    DF_nyq(i,1)=-%pi/4/N*(sqrt(a^2-h^2) + h * %i)
    i=i+1;
end

plot(real(DF_nyq),imag(DF_nyq),'m-.')
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
zoom_rect([-0.3  -0.3 0 0.3])
title('Nyquist plot of system and describing function to...
 determine limit cycle','fontsize',3)

//limit cycle points
plot(-0.1714,-0.0785,'ro');
xstring(-0.25,0,"limit cycle point");
xarrows([-0.2;-0.172],[0;-0.077],-1);

//------------------------------------------------------------------
//Response of the system
K=2;
r=1
figure(1);
importXcosDiagram(".\Ex9_13_model.xcos")
xcos_simulate(scs_m,4);
scs_m.props.context
plot(yt.time,yt.values)

xlabel('Time (sec.)');
ylabel('Output, y');
title("Step response displaying limit cycle oscillations",'fontsize',3);
//------------------------------------------------------------------
//figure handel settings
f=get("current_figure"); //Current figure handle
f.background=8; //make the figure window background white
l=f.children(1);
l.background=8 ;//make the text background white
id=color('grey');
xgrid(id);
//------------------------------------------------------------------
//------------------------------------------------------------------
