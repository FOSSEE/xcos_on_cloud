PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "list_of_category" (
	"id" INTEGER NOT NULL  ,
	"category_name" VARCHAR(50) NOT NULL  ,
	"category_id" INTEGER NULL  ,
	"maincategory" VARCHAR(255) NOT NULL  ,
	PRIMARY KEY ("id")
);
INSERT INTO list_of_category VALUES(2,'Control Theory & Control Systems',2,'Computer Science/Information Technology');
INSERT INTO list_of_category VALUES(8,'Electrical Technology',8,'Physics');
INSERT INTO list_of_category VALUES(10,'Analog Electronics',0,'');
INSERT INTO list_of_category VALUES(15,'Power Systems',0,'');
CREATE TABLE IF NOT EXISTS "textbook_companion_chapter" (
	"id" INTEGER NOT NULL  ,
	"preference_id" INTEGER NOT NULL  ,
	"number" INTEGER NOT NULL  ,
	"name" VARCHAR(255) NOT NULL  ,
	"cloud_chapter_err_status" VARCHAR(255) NOT NULL DEFAULT '0' ,
	PRIMARY KEY ("id")
);
INSERT INTO textbook_companion_chapter VALUES(471,154,5,'Analysis Methods','0');
INSERT INTO textbook_companion_chapter VALUES(472,154,6,'Amplifiers and Operational Amplifiers','0');
INSERT INTO textbook_companion_chapter VALUES(489,154,8,'First order Circuits','0');
INSERT INTO textbook_companion_chapter VALUES(490,154,9,'Higher order circuits and Complex frequency','0');
INSERT INTO textbook_companion_chapter VALUES(722,181,3,'Diode Circuits','0');
INSERT INTO textbook_companion_chapter VALUES(723,83,9,'Symmetrical Fault Analysis','0');
INSERT INTO textbook_companion_chapter VALUES(725,83,11,'Unsymmetrical Fault Analysis','0');
INSERT INTO textbook_companion_chapter VALUES(771,215,3,'Voltage and Current laws','1');
INSERT INTO textbook_companion_chapter VALUES(772,215,4,'Basic Nodal and Mesh Analysis','1');
INSERT INTO textbook_companion_chapter VALUES(841,293,3,'Elementary network theory','0');
INSERT INTO textbook_companion_chapter VALUES(864,293,12,'Simplifying logical functions','1');
INSERT INTO textbook_companion_chapter VALUES(868,293,2,'The circuit elements','0');
INSERT INTO textbook_companion_chapter VALUES(870,293,5,'Circuit dynamics and forced responses','0');
INSERT INTO textbook_companion_chapter VALUES(885,215,6,'Network Theorems and useful Circuit Analysis Techniques','0');
INSERT INTO textbook_companion_chapter VALUES(886,215,8,'Basic RL and RC circuits','1');
INSERT INTO textbook_companion_chapter VALUES(887,215,10,'Sinusoidal Steady state Analysis','0');
INSERT INTO textbook_companion_chapter VALUES(888,215,17,'Two Port Networks','0');
INSERT INTO textbook_companion_chapter VALUES(890,215,12,'Polyphase Circuits','0');
INSERT INTO textbook_companion_chapter VALUES(896,215,18,'Fourier Circuit Analysis','0');
INSERT INTO textbook_companion_chapter VALUES(900,215,7,'Capacitors and Inductors','1');
INSERT INTO textbook_companion_chapter VALUES(901,215,9,'The RLC Circuit','0');
INSERT INTO textbook_companion_chapter VALUES(902,215,13,'Magnetically coupled circuits','0');
INSERT INTO textbook_companion_chapter VALUES(6195,2048,7,'Structures and Specifications','0');
INSERT INTO textbook_companion_chapter VALUES(6196,2048,9,'Pole Placement Controllers','1');
INSERT INTO textbook_companion_chapter VALUES(6256,2048,10,'Special Cases of Pole Placement Control','1');
INSERT INTO textbook_companion_chapter VALUES(6264,2048,11,'Minimum Variance Control','1');
INSERT INTO textbook_companion_chapter VALUES(6329,2777,6,'Synchronous Machines','0');
INSERT INTO textbook_companion_chapter VALUES(7393,3432,8,'Digital Control','1');
INSERT INTO textbook_companion_chapter VALUES(7396,3432,9,'Nonlinear Systems','0');
INSERT INTO textbook_companion_chapter VALUES(7400,3432,6,'The Frequency Response Design Method','0');
INSERT INTO textbook_companion_chapter VALUES(7412,3432,7,'State Space Design','0');
INSERT INTO textbook_companion_chapter VALUES(8676,3885,3,'TIME RESPONSE ANALYSIS','0');
INSERT INTO textbook_companion_chapter VALUES(8699,3885,7,'STATE SPACE ANALYSIS','0');
CREATE TABLE IF NOT EXISTS "textbook_companion_example" (
	"id" INTEGER NOT NULL  ,
	"chapter_id" INTEGER NOT NULL  ,
	"approver_uid" INTEGER NOT NULL  ,
	"number" VARCHAR(10) NOT NULL  ,
	"caption" VARCHAR(255) NOT NULL  ,
	"approval_date" INTEGER NOT NULL  ,
	"approval_status" INTEGER NOT NULL  ,
	"timestamp" INTEGER NOT NULL  ,
	"cloud_err_status" INTEGER NOT NULL DEFAULT '0' ,
	PRIMARY KEY ("id")
);
INSERT INTO textbook_companion_example VALUES(5158,472,130,'6.9','Analysis of circuits containing ideal op amps',0,1,1309362342,1);
INSERT INTO textbook_companion_example VALUES(5160,472,130,'6.15','Circuits containing several Op amps',0,1,1309362512,1);
INSERT INTO textbook_companion_example VALUES(5246,489,130,'8.2','Capacitor Discharge in a Resistor',0,1,1309535122,1);
INSERT INTO textbook_companion_example VALUES(5247,489,130,'8.3','Establishing a DC Voltage across a Capacitor',0,1,1309535226,1);
INSERT INTO textbook_companion_example VALUES(5248,489,130,'8.4','The Source free RL Circuit',0,1,1309535307,1);
INSERT INTO textbook_companion_example VALUES(5249,489,130,'8.5','Complex first order RL and RC Circuits',0,1,1309535452,1);
INSERT INTO textbook_companion_example VALUES(5250,489,130,'8.6','Complex first order RL and RC Circuits',0,1,1309535592,1);
INSERT INTO textbook_companion_example VALUES(5251,489,130,'8.7','DC Steady state in Inductors and Capacitors',0,1,1309535679,1);
INSERT INTO textbook_companion_example VALUES(5252,489,130,'8.8','DC Steady state in Inductors and Capacitors',0,1,1309535743,1);
INSERT INTO textbook_companion_example VALUES(5253,489,130,'8.9','Transitions at Switching Time',0,1,1309535810,1);
INSERT INTO textbook_companion_example VALUES(5255,490,130,'9.1','Series RLC Circuit',0,1,1309540329,1);
INSERT INTO textbook_companion_example VALUES(5256,490,130,'9.2','Series RLC Circuit',0,1,1309540421,1);
INSERT INTO textbook_companion_example VALUES(5257,490,130,'9.5','Parallel RLC circuit',0,1,1309540478,1);
INSERT INTO textbook_companion_example VALUES(5838,471,130,'5.1','The branch current method',0,1,1309925190,1);
INSERT INTO textbook_companion_example VALUES(5839,471,130,'5.6','Network reduction',0,1,1309925250,1);
INSERT INTO textbook_companion_example VALUES(5840,471,130,'5.7','Superposition',0,1,1309925404,1);
INSERT INTO textbook_companion_example VALUES(5845,472,130,'6.11','Noninverting circuit',0,1,1309945119,1);
INSERT INTO textbook_companion_example VALUES(7451,723,744,'9.1','Fault Current Calculation',1313828312,1,1313055412,0);
INSERT INTO textbook_companion_example VALUES(7452,723,744,'9.2','Subtransient and Momentary current Calculation',1313828312,1,1313057634,0);
INSERT INTO textbook_companion_example VALUES(7454,723,744,'9.4','Maximum MVA Calculation',1313828312,1,1313058604,0);
INSERT INTO textbook_companion_example VALUES(7455,723,744,'9.5','Short Circuit Solution',1313828312,1,1313059105,0);
INSERT INTO textbook_companion_example VALUES(7457,723,744,'9.7','Current Injection Method',1313828312,1,1313059564,0);
INSERT INTO textbook_companion_example VALUES(7464,725,744,'11.1','LG and 3Phase faults Comparision',1313828225,1,1313072438,0);
INSERT INTO textbook_companion_example VALUES(7552,725,744,'11.2','Grounding Resistor voltage and Fault Current',1313828225,1,1313160119,0);
INSERT INTO textbook_companion_example VALUES(7554,725,744,'11.4','LL Fault Current',1313828226,1,1313161168,0);
INSERT INTO textbook_companion_example VALUES(7555,725,744,'11.5','Double line to ground Fault',1313828226,1,1313169472,0);
INSERT INTO textbook_companion_example VALUES(7763,723,744,'9.3','Subtransient Current Calculation',1314421114,1,1313912673,0);
INSERT INTO textbook_companion_example VALUES(7765,725,744,'11.3','Fault and subtransient currents of the system',1314421015,1,1313912934,0);
INSERT INTO textbook_companion_example VALUES(8149,722,744,'3.30','Calculate R Il max',1315834683,1,1315650145,0);
INSERT INTO textbook_companion_example VALUES(8150,722,744,'3.28','Find voltage across diode',1315834683,1,1315650666,0);
INSERT INTO textbook_companion_example VALUES(8151,722,744,'3.8','Calculate the dc load current',1315834683,1,1315651088,0);
INSERT INTO textbook_companion_example VALUES(8152,722,744,'3.27','Find currents and voltages',1315834683,1,1315651595,0);
INSERT INTO textbook_companion_example VALUES(8269,771,2299,'3.1','Kirchoff current law',0,1,1316320880,1);
INSERT INTO textbook_companion_example VALUES(8270,771,2299,'3.2','Kirchoff voltage law',0,1,1316320945,1);
INSERT INTO textbook_companion_example VALUES(8271,771,2299,'3.3','Kirchoff voltage law',0,1,1316321010,1);
INSERT INTO textbook_companion_example VALUES(8272,771,2299,'3.6','The single node pair circuit',0,1,1316321087,1);
INSERT INTO textbook_companion_example VALUES(8273,771,2299,'3.9','Series and Parallel connected sources',0,1,1316321180,1);
INSERT INTO textbook_companion_example VALUES(8274,772,2299,'4.1','Nodal analysis',0,1,1316321624,1);
INSERT INTO textbook_companion_example VALUES(8275,772,2299,'4.2','Nodal analysis',0,1,1316321673,1);
INSERT INTO textbook_companion_example VALUES(8276,772,2299,'4.5','The supernode',0,1,1316321758,1);
INSERT INTO textbook_companion_example VALUES(8277,772,2299,'4.7','Mesh analysis',0,1,1316321853,1);
INSERT INTO textbook_companion_example VALUES(8278,772,2299,'4.8','Mesh analysis',0,1,1316321894,1);
INSERT INTO textbook_companion_example VALUES(8279,772,2299,'4.9','Mesh analysis',0,1,1316321937,1);
INSERT INTO textbook_companion_example VALUES(8280,772,2299,'4.10','Mesh analysis',0,1,1316321975,1);
INSERT INTO textbook_companion_example VALUES(8281,772,2299,'4.11','The Supermesh',0,1,1316322043,1);
INSERT INTO textbook_companion_example VALUES(9206,841,1478,'3.5','Determine the current which flows through R2',0,1,1324755423,1);
INSERT INTO textbook_companion_example VALUES(9207,841,1478,'3.6','Find the power dissipation in R1',0,1,1324755798,1);
INSERT INTO textbook_companion_example VALUES(9208,841,1478,'3.7','Find the current which flows through R2',0,1,1324756072,1);
INSERT INTO textbook_companion_example VALUES(9210,841,1478,'3.9','Find the magnitude and direction of each of the branch currents',0,1,1324758239,1);
INSERT INTO textbook_companion_example VALUES(9546,864,1478,'12.2','Prove the given theoram',0,1,1325068381,1);
INSERT INTO textbook_companion_example VALUES(9547,864,1478,'12.3.a','Design a digital logic circuit that provides logic 1 whenever majority votes yes',0,1,1325069741,1);
INSERT INTO textbook_companion_example VALUES(9548,864,1478,'12.3.b','Modify part A so that only NAND gates are used',0,1,1325070335,1);
INSERT INTO textbook_companion_example VALUES(9590,870,1478,'5.1','Find the expression for the current flowing through the circuit',0,1,1325315194,1);
INSERT INTO textbook_companion_example VALUES(9591,870,1478,'5.3','Determine the voltage which appears across each capacitor at steady state',0,1,1325315352,1);
INSERT INTO textbook_companion_example VALUES(9592,870,1478,'5.5','Find the complete solution for the charge on the capacitor and show a plot of the response',0,1,1325315492,1);
INSERT INTO textbook_companion_example VALUES(9593,870,1478,'5.6','Describe the dynamic behaviour of the given circuit',0,1,1325315674,1);
INSERT INTO textbook_companion_example VALUES(9594,870,1478,'5.7','Obtain the critically damped response for the circuit',0,1,1325315856,1);
INSERT INTO textbook_companion_example VALUES(9596,870,1478,'5.2','Find the expression for the current flowing through the circuit and the total energy dissipated in the resistor',0,1,1325320527,0);
INSERT INTO textbook_companion_example VALUES(9598,868,1478,'2.10','Design an opamp circuit solution of the given equation',0,1,1325322638,1);
INSERT INTO textbook_companion_example VALUES(9600,870,1478,'5.8','Repeat the previous example for the case where the resistance R is changed',0,1,1325324003,1);
INSERT INTO textbook_companion_example VALUES(9601,841,1478,'3.10','Find the value of the node pair voltages V1 and V2',0,1,1325324454,1);
INSERT INTO textbook_companion_example VALUES(9602,841,1478,'3.11','Find the branch current flowing through R2',0,1,1325324606,1);
INSERT INTO textbook_companion_example VALUES(9605,841,1478,'3.14','Find the value of the output voltage',0,1,1325325480,1);
INSERT INTO textbook_companion_example VALUES(9606,841,1478,'3.15','Find the current delivered to the source by the network',0,1,1325325609,1);
INSERT INTO textbook_companion_example VALUES(9746,772,2299,'4.6','The supernode',0,1,1326632006,1);
INSERT INTO textbook_companion_example VALUES(9747,772,2299,'4.12','The Supermesh',0,1,1326632084,1);
INSERT INTO textbook_companion_example VALUES(9748,885,2299,'6.1','The Superposition principle',0,1,1326632243,1);
INSERT INTO textbook_companion_example VALUES(9749,885,2299,'6.3','The Superposition principle',0,1,1326632303,1);
INSERT INTO textbook_companion_example VALUES(9750,885,2299,'6.4','The Superposition principle',0,1,1326632346,1);
INSERT INTO textbook_companion_example VALUES(9751,885,2299,'6.5','The Superposition principle',0,1,1326632395,1);
INSERT INTO textbook_companion_example VALUES(9752,885,2299,'6.6','The Superposition principle',0,1,1326632444,1);
INSERT INTO textbook_companion_example VALUES(9753,885,2299,'6.8','The Superposition principle',0,1,1326632532,1);
INSERT INTO textbook_companion_example VALUES(9754,885,2299,'6.11','Thevenin and Norton Equivalent circuit',0,1,1326633663,1);
INSERT INTO textbook_companion_example VALUES(9755,885,2299,'6.14','Thevenin and Norton Equivalent circuit',0,1,1326633944,1);
INSERT INTO textbook_companion_example VALUES(9756,885,2299,'6.15','Thevenin and Norton Equivalent circuit',0,1,1326633995,1);
INSERT INTO textbook_companion_example VALUES(9757,886,2299,'8.1','The Source free RL Circuit',0,1,1326634190,1);
INSERT INTO textbook_companion_example VALUES(9758,886,2299,'8.2','The Source free RL Circuit',0,1,1326634235,1);
INSERT INTO textbook_companion_example VALUES(9759,886,2299,'8.4','A more General Perspective',0,1,1326634339,1);
INSERT INTO textbook_companion_example VALUES(9760,886,2299,'8.3','The Source free RC Circuit',0,1,1326634417,1);
INSERT INTO textbook_companion_example VALUES(9761,886,2299,'8.8','Natural and Forced Response',0,1,1326634507,1);
INSERT INTO textbook_companion_example VALUES(9762,886,2299,'8.10','Driven RC circuits',0,1,1326634571,1);
INSERT INTO textbook_companion_example VALUES(9763,887,2299,'10.1','Forced Response to sinusoidal functions',0,1,1326634823,1);
INSERT INTO textbook_companion_example VALUES(9764,887,2299,'10.6','Impedance',0,1,1326634934,1);
INSERT INTO textbook_companion_example VALUES(9765,887,2299,'10.7','Nodal and Mesh analysis',0,1,1326635004,1);
INSERT INTO textbook_companion_example VALUES(9766,887,2299,'10.8','Nodal and Mesh analysis',0,1,1326635059,1);
INSERT INTO textbook_companion_example VALUES(9767,887,2299,'10.9','Superposition Source Transformations and Thevenin theorem',0,1,1326635149,1);
INSERT INTO textbook_companion_example VALUES(9768,887,2299,'10.10','Superposition Source Transformations and Thevenin theorem',0,1,1326635204,1);
INSERT INTO textbook_companion_example VALUES(9769,887,2299,'10.11','Superposition Source Transformations and Thevenin theorem',0,1,1326635268,1);
INSERT INTO textbook_companion_example VALUES(9773,888,2299,'17.4','Admittance parameters',0,1,1326635474,1);
INSERT INTO textbook_companion_example VALUES(9787,890,2299,'12.1','Single phase three wire systems',0,1,1326774955,1);
INSERT INTO textbook_companion_example VALUES(9856,896,2299,'18.2','Complete Response to periodic Forcing Functions',0,1,1327086771,1);
INSERT INTO textbook_companion_example VALUES(9857,896,2299,'18.8','The physical significance of system function',0,1,1327086920,1);
INSERT INTO textbook_companion_example VALUES(9908,771,2299,'3.4','Kirchoff voltage law',0,1,1327345210,1);
INSERT INTO textbook_companion_example VALUES(9909,771,2299,'3.5','The Single Loop Circuit',0,1,1327345314,1);
INSERT INTO textbook_companion_example VALUES(9910,771,2299,'3.11','Resistors in series and parallel',0,1,1327345385,1);
INSERT INTO textbook_companion_example VALUES(9911,771,2299,'3.13','Voltage and Current division',0,1,1327345461,1);
INSERT INTO textbook_companion_example VALUES(9912,771,2299,'3.14','Voltage and Current division',0,1,1327345501,1);
INSERT INTO textbook_companion_example VALUES(9913,885,2299,'6.13','Thevenin and Norton Equivalent circuit',0,1,1327346404,1);
INSERT INTO textbook_companion_example VALUES(9914,885,2299,'6.16','Maximum power transfer',0,1,1327346471,1);
INSERT INTO textbook_companion_example VALUES(9918,885,2299,'6.20','Compensation Theorem',0,1,1327346650,1);
INSERT INTO textbook_companion_example VALUES(9919,885,2299,'6.21','Compensation Theorem',0,1,1327346697,1);
INSERT INTO textbook_companion_example VALUES(9921,885,2299,'6.23','Source Transformations',0,1,1327346801,1);
INSERT INTO textbook_companion_example VALUES(9922,885,2299,'6.24','Source Transformations',0,1,1327346845,1);
INSERT INTO textbook_companion_example VALUES(9928,900,2299,'7.11','Modeling Capacitors and Inductors',0,1,1327347498,1);
INSERT INTO textbook_companion_example VALUES(9929,886,2299,'8.11','Driven RC circuits',0,1,1327347603,1);
INSERT INTO textbook_companion_example VALUES(9931,901,2299,'9.2','The Overdamped parallel circuit',0,1,1327348047,1);
INSERT INTO textbook_companion_example VALUES(9933,901,2299,'9.3','The Overdamped parallel circuit',0,1,1327348328,1);
INSERT INTO textbook_companion_example VALUES(9934,901,2299,'9.6','The Underdamped parallel RLC circuit',0,1,1327348415,1);
INSERT INTO textbook_companion_example VALUES(9935,901,2299,'9.8','The Source free series RLC Circuit',0,1,1327348594,1);
INSERT INTO textbook_companion_example VALUES(9936,901,2299,'9.7','The Source free series RLC Circuit',0,1,1327348714,1);
INSERT INTO textbook_companion_example VALUES(9937,901,2299,'9.9','The Complete response of RLC circuit',0,1,1327348781,1);
INSERT INTO textbook_companion_example VALUES(9944,902,2299,'13.7','The Ideal Transformer',0,1,1327378065,1);
INSERT INTO textbook_companion_example VALUES(67179,6195,11445,'7.6','Verification of performance of lead controller on antenna system',0,1,1398790758,0);
INSERT INTO textbook_companion_example VALUES(67180,6195,11445,'7.7','Illustration of system type',0,1,1398793769,1);
INSERT INTO textbook_companion_example VALUES(67190,6196,11445,'9.1','Pole placement controller for magnetically suspended ball problem',0,1,1398880314,1);
INSERT INTO textbook_companion_example VALUES(67196,6196,11445,'9.7','Simulation of closed loop system with an unstable controller',0,1,1398882888,0);
INSERT INTO textbook_companion_example VALUES(67230,6196,11445,'9.9','Pole placement controller with internal model of a step for the magnetically suspended ball problem',0,1,1398949865,0);
INSERT INTO textbook_companion_example VALUES(67247,6196,11445,'9.10','Pole placement controller IBM Lotus Domino server',0,1,1398950819,1);
INSERT INTO textbook_companion_example VALUES(67262,6196,11445,'9.11','Pole placement controller for motor problem',0,1,1398952030,1);
INSERT INTO textbook_companion_example VALUES(67346,6196,11445,'9.14','Controller design',0,1,1398966307,1);
INSERT INTO textbook_companion_example VALUES(67374,6196,11445,'9.15','Evaluation of continuous time controller',0,1,1398968614,1);
INSERT INTO textbook_companion_example VALUES(67375,6196,11445,'9.16','System type with 2 DOF controller',0,1,1398969167,0);
INSERT INTO textbook_companion_example VALUES(67376,6196,11445,'9.17','Illustrating the benefit of cancellation',0,1,1398969595,0);
INSERT INTO textbook_companion_example VALUES(67377,6196,11445,'9.18','Anti windup control of IBM Lotus Domino server',0,1,1398970089,0);
INSERT INTO textbook_companion_example VALUES(67378,6196,11445,'9.19','Demonstration of usefulness of negative PID parameters',0,1,1398971651,0);
INSERT INTO textbook_companion_example VALUES(67379,6196,11445,'9.21','DC motor with PID control tuned through pole placement technique',0,1,1398972112,0);
INSERT INTO textbook_companion_example VALUES(67888,6256,11445,'10.1','Effect of delay in control performance',0,1,1400561018,1);
INSERT INTO textbook_companion_example VALUES(67889,6256,11445,'10.2','Smith predictor for paper machine control',0,1,1400561579,1);
INSERT INTO textbook_companion_example VALUES(68048,6264,11445,'11.4','1st control problem by MacGregor',0,1,1401101713,1);
INSERT INTO textbook_companion_example VALUES(68708,6329,2921,'6.23','To find maximum value of power angle and maximum value of overshoot',0,1,1402076736,0);
INSERT INTO textbook_companion_example VALUES(79344,7393,2921,'8.1','Digital Controller using tustin approximation',0,1,1435744970,1);
INSERT INTO textbook_companion_example VALUES(79346,7393,2921,'8.2','Design of a Space Station Attitude Digital Controller using Discrete Equivalents',0,1,1435745371,1);
INSERT INTO textbook_companion_example VALUES(79351,7396,2921,'9.5','Changing Overshoot and Saturation nonlinearity',0,1,1435745730,1);
INSERT INTO textbook_companion_example VALUES(79357,7396,2921,'9.6','Stability of conditionally stable system using root locus',0,1,1435745976,1);
INSERT INTO textbook_companion_example VALUES(79365,7396,2921,'9.7','Analysis and design of the system with limit cycle using the root locus',0,1,1435746428,1);
INSERT INTO textbook_companion_example VALUES(79366,7396,2921,'9.8','Antiwindup compensation for a PI controller',0,1,1435746730,1);
INSERT INTO textbook_companion_example VALUES(79371,7396,2921,'9.9','Describing Function for a saturation nonlinearity',0,1,1435746961,1);
INSERT INTO textbook_companion_example VALUES(79375,7396,2921,'9.11','Describing Function for a relay with hysteresis non linearity',0,1,1435747183,1);
INSERT INTO textbook_companion_example VALUES(79383,7396,2921,'9.13','Determination of stability with a hysteresis nonlinearity',0,1,1435747643,1);
INSERT INTO textbook_companion_example VALUES(79437,7400,2921,'6.14','Lead compensation for DC motor',0,1,1435752315,0);
INSERT INTO textbook_companion_example VALUES(79469,7412,2921,'7.32','Redesign of the Dc servo compensator using SRL',0,1,1435758684,0);
INSERT INTO textbook_companion_example VALUES(79471,7412,2921,'7.34','Servomechanism increasing the velocity constant through zero assignment',0,1,1435759371,0);
INSERT INTO textbook_companion_example VALUES(79472,7412,2921,'7.35','Integral Control of a Motor Speed System',0,1,1435759749,1);
INSERT INTO textbook_companion_example VALUES(91523,8676,16187,'3.1','RESPONSE OF THE SYSTEM',1511333535,1,1511333535,0);
INSERT INTO textbook_companion_example VALUES(91524,8676,16187,'3.2','RESPONSE OF THE SYSTEM',1511333592,1,1511333592,0);
INSERT INTO textbook_companion_example VALUES(91527,8676,16187,'3.6','RESPONSE OF THE SYSTEM',1511333760,1,1511333760,0);
INSERT INTO textbook_companion_example VALUES(91528,8676,16187,'3.7','RESPONSE OF THE SYSTEM',1511333802,1,1511333802,0);
INSERT INTO textbook_companion_example VALUES(91949,8699,16187,'7.10','STATE MODEL',1511673797,1,1511673797,0);
INSERT INTO textbook_companion_example VALUES(91950,8699,16187,'7.11','STATE MODEL',1511673839,1,1511673839,0);
INSERT INTO textbook_companion_example VALUES(91951,8699,16187,'7.12','STATE MODEL',1511673883,1,1511673883,0);
CREATE TABLE IF NOT EXISTS "textbook_companion_example_files" (
	"id" INTEGER NOT NULL  ,
	"example_id" INTEGER NOT NULL  ,
	"filename" VARCHAR(255) NOT NULL  ,
	"filepath" VARCHAR(500) NOT NULL  ,
	"filemime" VARCHAR(255) NOT NULL  ,
	"filesize" INTEGER NOT NULL  ,
	"filetype" VARCHAR(1) NOT NULL  ,
	"caption" VARCHAR(100) NOT NULL DEFAULT 'None' ,
	"timestamp" INTEGER NOT NULL  ,
	"xcos_cloud_example_file_error_status" TINYINT NOT NULL DEFAULT '0' ,
	PRIMARY KEY ("id")
);
INSERT INTO textbook_companion_example_files VALUES(7441,5158,'ch6_9.xcos','154/CH6/EX6.9/ch6_9.xcos','application/octet-stream',239667,'X','',1309362342,0);
INSERT INTO textbook_companion_example_files VALUES(7447,5160,'ch6_15.xcos','154/CH6/EX6.15/ch6_15.xcos','application/octet-stream',143863,'X','',1309362512,0);
INSERT INTO textbook_companion_example_files VALUES(7609,5246,'ch8_2.xcos','154/CH8/EX8.2/ch8_2.xcos','application/octet-stream',66003,'X','',1309535122,0);
INSERT INTO textbook_companion_example_files VALUES(7611,5247,'ch8_3.xcos','154/CH8/EX8.3/ch8_3.xcos','application/octet-stream',70580,'X','',1309535226,0);
INSERT INTO textbook_companion_example_files VALUES(7614,5248,'ch8_4.xcos','154/CH8/EX8.4/ch8_4.xcos','application/octet-stream',131927,'X','',1309535307,0);
INSERT INTO textbook_companion_example_files VALUES(7617,5249,'ch8_5.xcos','154/CH8/EX8.5/ch8_5.xcos','application/octet-stream',115484,'X','',1309535452,0);
INSERT INTO textbook_companion_example_files VALUES(7620,5250,'ch8_6.xcos','154/CH8/EX8.6/ch8_6.xcos','application/octet-stream',230517,'X','',1309535592,0);
INSERT INTO textbook_companion_example_files VALUES(7623,5251,'ch8_7.xcos','154/CH8/EX8.7/ch8_7.xcos','application/octet-stream',145546,'X','',1309535679,0);
INSERT INTO textbook_companion_example_files VALUES(7625,5252,'ch8_8.xcos','154/CH8/EX8.8/ch8_8.xcos','application/octet-stream',94986,'X','',1309535743,0);
INSERT INTO textbook_companion_example_files VALUES(7628,5253,'ch8_9.xcos','154/CH8/EX8.9/ch8_9.xcos','application/octet-stream',156375,'X','',1309535810,0);
INSERT INTO textbook_companion_example_files VALUES(7631,5255,'ch9_1.xcos','154/CH9/EX9.1/ch9_1.xcos','application/octet-stream',61697,'X','',1309540329,0);
INSERT INTO textbook_companion_example_files VALUES(7633,5256,'ch9_2.xcos','154/CH9/EX9.2/ch9_2.xcos','application/octet-stream',61800,'X','',1309540421,0);
INSERT INTO textbook_companion_example_files VALUES(7635,5257,'ch9_5.xcos','154/CH9/EX9.5/ch9_5.xcos','application/octet-stream',69821,'X','',1309540478,0);
INSERT INTO textbook_companion_example_files VALUES(8414,5838,'ch5_1.xcos','154/CH5/EX5.1/ch5_1.xcos','application/octet-stream',122534,'X','',1309925190,0);
INSERT INTO textbook_companion_example_files VALUES(8417,5839,'ch5_6.xcos','154/CH5/EX5.6/ch5_6.xcos','application/octet-stream',207870,'X','',1309925250,0);
INSERT INTO textbook_companion_example_files VALUES(8420,5840,'ch5_7.xcos','154/CH5/EX5.7/ch5_7.xcos','application/octet-stream',111414,'X','',1309925404,0);
INSERT INTO textbook_companion_example_files VALUES(8441,5845,'ch6_11.xcos','154/CH6/EX6.11/ch6_11.xcos','application/octet-stream',85826,'X','',1309945119,0);
INSERT INTO textbook_companion_example_files VALUES(11534,7451,'example_9_1.sce','83/CH9/EX9.1/example_9_1.sce','application/octet-stream',1512,'S','',1313055412,0);
INSERT INTO textbook_companion_example_files VALUES(11537,7451,'example_9_1_3phase_plot.xcos','83/CH9/EX9.1/example_9_1_3phase_plot.xcos','application/octet-stream',369961,'X','',1313055412,0);
INSERT INTO textbook_companion_example_files VALUES(11538,7452,'example_9_2.sce','83/CH9/EX9.2/example_9_2.sce','application/octet-stream',1459,'S','',1313057634,0);
INSERT INTO textbook_companion_example_files VALUES(11541,7452,'example_9_2.xcos','83/CH9/EX9.2/example_9_2.xcos','application/octet-stream',153243,'X','',1313057634,0);
INSERT INTO textbook_companion_example_files VALUES(11546,7454,'example_9_4.sce','83/CH9/EX9.4/example_9_4.sce','application/octet-stream',1022,'S','',1313058604,0);
INSERT INTO textbook_companion_example_files VALUES(11549,7454,'example_9_4.xcos','83/CH9/EX9.4/example_9_4.xcos','application/octet-stream',139098,'X','',1313058604,0);
INSERT INTO textbook_companion_example_files VALUES(11550,7455,'example_9_5.sce','83/CH9/EX9.5/example_9_5.sce','application/octet-stream',982,'S','',1313059105,0);
INSERT INTO textbook_companion_example_files VALUES(11553,7455,'example_9_5.xcos','83/CH9/EX9.5/example_9_5.xcos','application/octet-stream',140972,'X','',1313059105,0);
INSERT INTO textbook_companion_example_files VALUES(11556,7457,'example_9_7.sce','83/CH9/EX9.7/example_9_7.sce','application/octet-stream',758,'S','',1313059564,0);
INSERT INTO textbook_companion_example_files VALUES(11559,7457,'example_9_7.xcos','83/CH9/EX9.7/example_9_7.xcos','application/octet-stream',149939,'X','',1313059564,0);
INSERT INTO textbook_companion_example_files VALUES(11576,7464,'example_11_1.sce','83/CH11/EX11.1/example_11_1.sce','application/octet-stream',769,'S','',1313072438,0);
INSERT INTO textbook_companion_example_files VALUES(11579,7464,'example_11_1.xcos','83/CH11/EX11.1/example_11_1.xcos','application/octet-stream',138431,'X','',1313072438,0);
INSERT INTO textbook_companion_example_files VALUES(11764,7552,'example_11_2.sce','83/CH11/EX11.2/example_11_2.sce','application/octet-stream',556,'S','',1313160119,0);
INSERT INTO textbook_companion_example_files VALUES(11767,7552,'example_11_2.xcos','83/CH11/EX11.2/example_11_2.xcos','application/octet-stream',140592,'X','',1313160119,0);
INSERT INTO textbook_companion_example_files VALUES(11772,7554,'example_11_4.sce','83/CH11/EX11.4/example_11_4.sce','application/octet-stream',521,'S','',1313161168,0);
INSERT INTO textbook_companion_example_files VALUES(11775,7554,'example_11_4.xcos','83/CH11/EX11.4/example_11_4.xcos','application/octet-stream',108196,'X','',1313161168,0);
INSERT INTO textbook_companion_example_files VALUES(11776,7555,'example_11_5.sce','83/CH11/EX11.5/example_11_5.sce','application/octet-stream',795,'S','',1313169472,0);
INSERT INTO textbook_companion_example_files VALUES(11779,7555,'example_11_5.xcos','83/CH11/EX11.5/example_11_5.xcos','application/octet-stream',126969,'X','',1313169472,0);
INSERT INTO textbook_companion_example_files VALUES(12094,7763,'example_9_3.sce','83/CH9/EX9.3/example_9_3.sce','application/octet-stream',1315,'S','',1313912673,0);
INSERT INTO textbook_companion_example_files VALUES(12097,7763,'example_9_3.xcos','83/CH9/EX9.3/example_9_3.xcos','application/octet-stream',130479,'X','',1313912673,0);
INSERT INTO textbook_companion_example_files VALUES(12100,7765,'example_11_3.sce','83/CH11/EX11.3/example_11_3.sce','application/octet-stream',2587,'S','',1313912934,0);
INSERT INTO textbook_companion_example_files VALUES(12103,7765,'example_11_3.xcos','83/CH11/EX11.3/example_11_3.xcos','application/octet-stream',161629,'X','',1313912934,0);
INSERT INTO textbook_companion_example_files VALUES(12873,8149,'example3_30.sce','181/CH3/EX3.30/example3_30.sce','application/octet-stream',471,'S','',1315650145,0);
INSERT INTO textbook_companion_example_files VALUES(12875,8149,'example3_30.xcos','181/CH3/EX3.30/example3_30.xcos','text/xml',78113,'X','',1315650145,0);
INSERT INTO textbook_companion_example_files VALUES(12876,8150,'example3_28.sce','181/CH3/EX3.28/example3_28.sce','application/octet-stream',372,'S','',1315650666,0);
INSERT INTO textbook_companion_example_files VALUES(12878,8150,'example3_28.xcos','181/CH3/EX3.28/example3_28.xcos','text/xml',67853,'X','',1315650666,0);
INSERT INTO textbook_companion_example_files VALUES(12879,8151,'example3_8.sce','181/CH3/EX3.8/example3_8.sce','application/octet-stream',893,'S','',1315651088,0);
INSERT INTO textbook_companion_example_files VALUES(12881,8151,'example3_8.xcos','181/CH3/EX3.8/example3_8.xcos','text/xml',81187,'X','',1315651088,0);
INSERT INTO textbook_companion_example_files VALUES(12882,8152,'example3_27.sce','181/CH3/EX3.27/example3_27.sce','application/octet-stream',509,'S','',1315651595,0);
INSERT INTO textbook_companion_example_files VALUES(12884,8152,'example3_27.xcos','181/CH3/EX3.27/example3_27.xcos','text/xml',87535,'X','',1315651595,0);
INSERT INTO textbook_companion_example_files VALUES(13069,8269,'ex3_1.xcos','215/CH3/EX3.1/ex3_1.xcos','application/octet-stream',75887,'X','',1316320880,0);
INSERT INTO textbook_companion_example_files VALUES(13081,8274,'ex4_1.xcos','215/CH4/EX4.1/ex4_1.xcos','application/octet-stream',81171,'X','',1316321624,0);
INSERT INTO textbook_companion_example_files VALUES(13084,8275,'ex4_2.xcos','215/CH4/EX4.2/ex4_2.xcos','application/octet-stream',161398,'X','',1316321673,0);
INSERT INTO textbook_companion_example_files VALUES(13086,8276,'ex4_5.xcos','215/CH4/EX4.5/ex4_5.xcos','application/octet-stream',103203,'X','',1316321758,0);
INSERT INTO textbook_companion_example_files VALUES(13088,8277,'ex4_7.xcos','215/CH4/EX4.7/ex4_7.xcos','application/octet-stream',87167,'X','',1316321853,0);
INSERT INTO textbook_companion_example_files VALUES(13091,8278,'ex4_8.xcos','215/CH4/EX4.8/ex4_8.xcos','application/octet-stream',134278,'X','',1316321894,0);
INSERT INTO textbook_companion_example_files VALUES(13093,8279,'ex4_9.xcos','215/CH4/EX4.9/ex4_9.xcos','application/octet-stream',81324,'X','',1316321937,0);
INSERT INTO textbook_companion_example_files VALUES(13095,8280,'ex4_10.xcos','215/CH4/EX4.10/ex4_10.xcos','application/octet-stream',87615,'X','',1316321975,0);
INSERT INTO textbook_companion_example_files VALUES(14236,9206,'eg3_5.xcos','293/CH3/EX3.5/eg3_5.xcos','application/octet-stream',79085,'X','',1324755423,0);
INSERT INTO textbook_companion_example_files VALUES(14238,9207,'eg3_6.xcos','293/CH3/EX3.6/eg3_6.xcos','application/octet-stream',88619,'X','',1324755798,0);
INSERT INTO textbook_companion_example_files VALUES(14240,9208,'eg3_7.xcos','293/CH3/EX3.7/eg3_7.xcos','application/octet-stream',112133,'X','',1324756072,0);
INSERT INTO textbook_companion_example_files VALUES(14243,9210,'eg3_9.xcos','293/CH3/EX3.9/eg3_9.xcos','application/octet-stream',87352,'X','',1324758239,0);
INSERT INTO textbook_companion_example_files VALUES(14602,9546,'eg12_2.xcos','293/CH12/EX12.2/eg12_2.xcos','application/octet-stream',261939,'X','',1325068381,0);
INSERT INTO textbook_companion_example_files VALUES(14604,9547,'eg12_3a.xcos','293/CH12/EX12.3.a/eg12_3a.xcos','application/octet-stream',403407,'X','',1325069741,0);
INSERT INTO textbook_companion_example_files VALUES(14606,9548,'eg12_3b.xcos','293/CH12/EX12.3.b/eg12_3b.xcos','application/octet-stream',403339,'X','',1325070335,0);
INSERT INTO textbook_companion_example_files VALUES(14659,9590,'eg5_1.xcos','293/CH5/EX5.1/eg5_1.xcos','application/octet-stream',104912,'X','',1325315194,0);
INSERT INTO textbook_companion_example_files VALUES(14661,9591,'eg5_3.xcos','293/CH5/EX5.3/eg5_3.xcos','application/octet-stream',110017,'X','',1325315352,0);
INSERT INTO textbook_companion_example_files VALUES(14663,9592,'eg5_5.xcos','293/CH5/EX5.5/eg5_5.xcos','application/octet-stream',111889,'X','',1325315492,0);
INSERT INTO textbook_companion_example_files VALUES(14665,9593,'eg5_6.xcos','293/CH5/EX5.6/eg5_6.xcos','application/octet-stream',105107,'X','',1325315674,0);
INSERT INTO textbook_companion_example_files VALUES(14667,9594,'eg5_7.xcos','293/CH5/EX5.7/eg5_7.xcos','application/octet-stream',105187,'X','',1325315856,0);
INSERT INTO textbook_companion_example_files VALUES(14669,9596,'eg5_2.sce','293/CH5/EX5.2/eg5_2.sce','application/octet-stream',464,'S','',1325320527,0);
INSERT INTO textbook_companion_example_files VALUES(14671,9596,'eg5_2.xcos','293/CH5/EX5.2/eg5_2.xcos','application/octet-stream',91872,'X','',1325320527,0);
INSERT INTO textbook_companion_example_files VALUES(14674,9598,'eg2_10.xcos','293/CH2/EX2.10/eg2_10.xcos','application/octet-stream',331620,'X','',1325322638,0);
INSERT INTO textbook_companion_example_files VALUES(14678,9600,'eg5_8.xcos','293/CH5/EX5.8/eg5_8.xcos','application/octet-stream',105197,'X','',1325324003,0);
INSERT INTO textbook_companion_example_files VALUES(14680,9601,'eg3_10.xcos','293/CH3/EX3.10/eg3_10.xcos','application/octet-stream',102737,'X','',1325324454,0);
INSERT INTO textbook_companion_example_files VALUES(14683,9602,'eg3_11.xcos','293/CH3/EX3.11/eg3_11.xcos','application/octet-stream',75615,'X','',1325324896,0);
INSERT INTO textbook_companion_example_files VALUES(14687,9605,'eg3_14.xcos','293/CH3/EX3.14/eg3_14.xcos','application/octet-stream',73987,'X','',1325325480,0);
INSERT INTO textbook_companion_example_files VALUES(14689,9606,'eg3_15.xcos','293/CH3/EX3.15/eg3_15.xcos','application/octet-stream',82066,'X','',1325325609,0);
INSERT INTO textbook_companion_example_files VALUES(14845,9748,'ex6_1.xcos','215/CH6/EX6.1/ex6_1.xcos','application/octet-stream',89723,'X','',1326632243,0);
INSERT INTO textbook_companion_example_files VALUES(14847,9749,'ex6_3.xcos','215/CH6/EX6.3/ex6_3.xcos','application/octet-stream',106187,'X','',1326632303,0);
INSERT INTO textbook_companion_example_files VALUES(14849,9750,'ex6_4.xcos','215/CH6/EX6.4/ex6_4.xcos','application/octet-stream',100991,'X','',1326632346,0);
INSERT INTO textbook_companion_example_files VALUES(14851,9751,'ex6_5.xcos','215/CH6/EX6.5/ex6_5.xcos','application/octet-stream',83588,'X','',1326632395,0);
INSERT INTO textbook_companion_example_files VALUES(14853,9752,'ex6_6.xcos','215/CH6/EX6.6/ex6_6.xcos','application/octet-stream',106455,'X','',1326632444,0);
INSERT INTO textbook_companion_example_files VALUES(14855,9753,'ex6_8.xcos','215/CH6/EX6.8/ex6_8.xcos','application/octet-stream',133966,'X','',1326632532,0);
INSERT INTO textbook_companion_example_files VALUES(14857,9754,'ex6_11.xcos','215/CH6/EX6.11/ex6_11.xcos','application/octet-stream',62515,'X','',1326633663,0);
INSERT INTO textbook_companion_example_files VALUES(14859,9755,'ex6_14.xcos','215/CH6/EX6.14/ex6_14.xcos','application/octet-stream',128133,'X','',1326633944,0);
INSERT INTO textbook_companion_example_files VALUES(14861,9756,'ex6_15.xcos','215/CH6/EX6.15/ex6_15.xcos','application/octet-stream',66503,'X','',1326633995,0);
INSERT INTO textbook_companion_example_files VALUES(15163,9929,'ex8_11.xcos','215/CH8/EX8.11/ex8_11.xcos','application/octet-stream',74236,'X','',1327347603,0);
INSERT INTO textbook_companion_example_files VALUES(22339,8281,'ex4_11.xcos','215/CH4/EX4.11/ex4_11.xcos','application/octet-stream',98108,'X','',1341016189,0);
INSERT INTO textbook_companion_example_files VALUES(22340,9747,'ex4_12.xcos','215/CH4/EX4.12/ex4_12.xcos','application/octet-stream',166575,'X','',1341017710,0);
INSERT INTO textbook_companion_example_files VALUES(22341,9746,'ex4_6.xcos','215/CH4/EX4.6/ex4_6.xcos','application/octet-stream',257175,'X','',1341018044,0);
INSERT INTO textbook_companion_example_files VALUES(22342,9928,'ex7_11.xcos','215/CH7/EX7.11/ex7_11.xcos','application/octet-stream',71515,'X','',1341018201,0);
INSERT INTO textbook_companion_example_files VALUES(22343,9757,'ex8_1.xcos','215/CH8/EX8.1/ex8_1.xcos','application/octet-stream',60329,'X','',1341018437,0);
INSERT INTO textbook_companion_example_files VALUES(22344,9760,'ex8_3.xcos','215/CH8/EX8.3/ex8_3.xcos','application/octet-stream',64755,'X','',1341018584,0);
INSERT INTO textbook_companion_example_files VALUES(22347,9759,'ex8_4.xcos','215/CH8/EX8.4/ex8_4.xcos','application/octet-stream',91662,'X','',1341019049,0);
INSERT INTO textbook_companion_example_files VALUES(22350,9944,'ex13_7.xcos','215/CH13/EX13.7/ex13_7.xcos','application/octet-stream',74066,'X','',1341019156,0);
INSERT INTO textbook_companion_example_files VALUES(24820,8270,'ex3_2.xcos','215/CH3/EX3.2/ex3_2.xcos','application/octet-stream',66754,'X','',1342529168,0);
INSERT INTO textbook_companion_example_files VALUES(24821,8271,'ex3_3.xcos','215/CH3/EX3.3/ex3_3.xcos','application/octet-stream',72929,'X','',1342529199,0);
INSERT INTO textbook_companion_example_files VALUES(24822,9908,'ex3_4.xcos','215/CH3/EX3.4/ex3_4.xcos','application/octet-stream',78098,'X','',1342529228,0);
INSERT INTO textbook_companion_example_files VALUES(24823,9909,'ex3_5.xcos','215/CH3/EX3.5/ex3_5.xcos','application/octet-stream',109852,'X','',1342529258,0);
INSERT INTO textbook_companion_example_files VALUES(24824,8272,'ex3_6.xcos','215/CH3/EX3.6/ex3_6.xcos','application/octet-stream',105081,'X','',1342529295,0);
INSERT INTO textbook_companion_example_files VALUES(24825,8273,'ex3_9.xcos','215/CH3/EX3.9/ex3_9.xcos','application/octet-stream',56825,'X','',1342529327,0);
INSERT INTO textbook_companion_example_files VALUES(24826,9910,'ex3_11.xcos','215/CH3/EX3.11/ex3_11.xcos','application/octet-stream',73728,'X','',1342529354,0);
INSERT INTO textbook_companion_example_files VALUES(24827,9911,'ex3_13.xcos','215/CH3/EX3.13/ex3_13.xcos','application/octet-stream',71695,'X','',1342529393,0);
INSERT INTO textbook_companion_example_files VALUES(24828,9912,'ex3_14.xcos','215/CH3/EX3.14/ex3_14.xcos','application/octet-stream',68908,'X','',1342529437,0);
INSERT INTO textbook_companion_example_files VALUES(24829,9913,'ex6_13.xcos','215/CH6/EX6.13/ex6_13.xcos','application/octet-stream',93776,'X','',1342529491,0);
INSERT INTO textbook_companion_example_files VALUES(24830,9914,'ex6_16.xcos','215/CH6/EX6.16/ex6_16.xcos','application/octet-stream',160071,'X','',1342529526,0);
INSERT INTO textbook_companion_example_files VALUES(24831,9918,'ex6_20.xcos','215/CH6/EX6.20/ex6_20.xcos','application/octet-stream',85049,'X','',1342529561,0);
INSERT INTO textbook_companion_example_files VALUES(24832,9919,'ex6_21.xcos','215/CH6/EX6.21/ex6_21.xcos','application/octet-stream',99564,'X','',1342529607,0);
INSERT INTO textbook_companion_example_files VALUES(24833,9921,'ex6_23.xcos','215/CH6/EX6.23/ex6_23.xcos','application/octet-stream',67425,'X','',1342529649,0);
INSERT INTO textbook_companion_example_files VALUES(24834,9922,'ex6_24.xcos','215/CH6/EX6.24/ex6_24.xcos','application/octet-stream',147692,'X','',1342529695,0);
INSERT INTO textbook_companion_example_files VALUES(24835,9758,'ex8_2.xcos','215/CH8/EX8.2/ex8_2.xcos','application/octet-stream',85652,'X','',1342529728,0);
INSERT INTO textbook_companion_example_files VALUES(24836,9761,'ex8_8.xcos','215/CH8/EX8.8/ex8_8.xcos','application/octet-stream',80057,'X','',1342529767,0);
INSERT INTO textbook_companion_example_files VALUES(24837,9762,'ex8_10.xcos','215/CH8/EX8.10/ex8_10.xcos','application/octet-stream',137884,'X','',1342529804,0);
INSERT INTO textbook_companion_example_files VALUES(24838,9931,'ex9_2.xcos','215/CH9/EX9.2/ex9_2.xcos','application/octet-stream',65706,'X','',1342529845,0);
INSERT INTO textbook_companion_example_files VALUES(24839,9933,'ex9_3.xcos','215/CH9/EX9.3/ex9_3.xcos','application/octet-stream',100708,'X','',1342529877,0);
INSERT INTO textbook_companion_example_files VALUES(24840,9934,'ex9_6.xcos','215/CH9/EX9.6/ex9_6.xcos','application/octet-stream',60928,'X','',1342529905,0);
INSERT INTO textbook_companion_example_files VALUES(24841,9936,'ex9_7.xcos','215/CH9/EX9.7/ex9_7.xcos','application/octet-stream',70296,'X','',1342529933,0);
INSERT INTO textbook_companion_example_files VALUES(24842,9935,'ex9_8.xcos','215/CH9/EX9.8/ex9_8.xcos','application/octet-stream',84813,'X','',1342529968,0);
INSERT INTO textbook_companion_example_files VALUES(24843,9937,'ex9_9.xcos','215/CH9/EX9.9/ex9_9.xcos','application/octet-stream',79766,'X','',1342530002,0);
INSERT INTO textbook_companion_example_files VALUES(24844,9763,'ex10_1.xcos','215/CH10/EX10.1/ex10_1.xcos','application/octet-stream',88380,'X','',1342530038,0);
INSERT INTO textbook_companion_example_files VALUES(24845,9764,'ex10_6.xcos','215/CH10/EX10.6/ex10_6.xcos','application/octet-stream',72369,'X','',1342530070,0);
INSERT INTO textbook_companion_example_files VALUES(24846,9765,'ex10_7.xcos','215/CH10/EX10.7/ex10_7.xcos','application/octet-stream',111815,'X','',1342530102,0);
INSERT INTO textbook_companion_example_files VALUES(24847,9766,'ex10_8.xcos','215/CH10/EX10.8/ex10_8.xcos','application/octet-stream',138216,'X','',1342530130,0);
INSERT INTO textbook_companion_example_files VALUES(24848,9767,'ex10_9.xcos','215/CH10/EX10.9/ex10_9.xcos','application/octet-stream',149001,'X','',1342530166,0);
INSERT INTO textbook_companion_example_files VALUES(24849,9768,'ex10_10.xcos','215/CH10/EX10.10/ex10_10.xcos','application/octet-stream',91601,'X','',1342530194,0);
INSERT INTO textbook_companion_example_files VALUES(24850,9769,'ex10_11.xcos','215/CH10/EX10.11/ex10_11.xcos','application/octet-stream',113988,'X','',1342530228,0);
INSERT INTO textbook_companion_example_files VALUES(24851,9787,'ex12_1.xcos','215/CH12/EX12.1/ex12_1.xcos','application/octet-stream',104078,'X','',1342530277,0);
INSERT INTO textbook_companion_example_files VALUES(24852,9773,'ex17_4.xcos','215/CH17/EX17.4/ex17_4.xcos','application/octet-stream',166785,'X','',1342530320,0);
INSERT INTO textbook_companion_example_files VALUES(24853,9856,'ex18_2.xcos','215/CH18/EX18.2/ex18_2.xcos','application/octet-stream',90454,'X','',1342530357,0);
INSERT INTO textbook_companion_example_files VALUES(24854,9857,'ex18_8.xcos','215/CH18/EX18.8/ex18_8.xcos','application/octet-stream',65330,'X','',1342530389,0);
INSERT INTO textbook_companion_example_files VALUES(96796,67179,'dependency7_6.sci','2048/CH7/EX7.6/dependency7_6.sci','application/octet-stream',1732,'S','',1398790758,0);
INSERT INTO textbook_companion_example_files VALUES(96797,67180,'Ex7_7dependency.sci','2048/CH7/EX7.7/Ex7_7dependency.sci','application/octet-stream',14267,'S','',1398793769,0);
INSERT INTO textbook_companion_example_files VALUES(96822,67196,'unstb.sce','2048/CH9/EX9.7/unstb.sce','application/octet-stream',17543,'S','',1398882925,0);
INSERT INTO textbook_companion_example_files VALUES(97066,67346,'dependencies9_14.sci','2048/CH9/EX9.14/dependencies9_14.sci','application/octet-stream',19602,'S','',1398966307,0);
INSERT INTO textbook_companion_example_files VALUES(97094,67374,'dependencies9_15.sci','2048/CH9/EX9.15/dependencies9_15.sci','application/octet-stream',4217,'S','',1398968614,0);
INSERT INTO textbook_companion_example_files VALUES(97098,67378,'Ex9_19dependency.sci','2048/CH9/EX9.19/Ex9_19dependency.sci','application/octet-stream',26038,'S','',1398971651,0);
INSERT INTO textbook_companion_example_files VALUES(97099,67379,'Ex9_21dependency.sci','2048/CH9/EX9.21/Ex9_21dependency.sci','application/octet-stream',16067,'S','',1398972112,0);
INSERT INTO textbook_companion_example_files VALUES(97750,67230,'dependencies9_9.sci','2048/CH9/EX9.9/dependencies9_9.sci','application/octet-stream',17235,'S','',1400232954,0);
INSERT INTO textbook_companion_example_files VALUES(97751,67247,'dependencies9_10.sci','2048/CH9/EX9.10/dependencies9_10.sci','application/octet-stream',16237,'S','',1400233046,0);
INSERT INTO textbook_companion_example_files VALUES(97754,67247,'Ex9_10.xcos','2048/CH9/EX9.10/Ex9_10.xcos','application/octet-stream',317468,'X','',1400235571,0);
INSERT INTO textbook_companion_example_files VALUES(97755,67196,'Ex7_7.xcos','2048/CH9/EX9.7/stb_disc.xcos','application/octet-stream',318516,'X','',1400235993,0);
INSERT INTO textbook_companion_example_files VALUES(97756,67196,'basic_disc.xcos','2048/CH9/EX9.7/basic_disc.xcos','application/octet-stream',298308,'X','',1400236338,0);
INSERT INTO textbook_companion_example_files VALUES(97757,67230,'Ex9_9.xcos','2048/CH9/EX9.9/Ex9_9.xcos','application/octet-stream',311212,'X','',1400237024,0);
INSERT INTO textbook_companion_example_files VALUES(97760,67262,'dependencies9_11.sci','2048/CH9/EX9.11/dependencies9_11.sci','application/octet-stream',16967,'S','',1400240943,0);
INSERT INTO textbook_companion_example_files VALUES(97763,67262,'Ex9_11.xcos','2048/CH9/EX9.11/Ex9_11.xcos','application/octet-stream',312414,'X','',1400240943,0);
INSERT INTO textbook_companion_example_files VALUES(97896,67346,'Ex9_14.xcos','2048/CH9/EX9.14/Ex9_14.xcos','application/octet-stream',343934,'X','',1400478415,0);
INSERT INTO textbook_companion_example_files VALUES(97905,67374,'Ex9_15_1.xcos','2048/CH9/EX9.15/Ex9_15_1.xcos','application/octet-stream',338211,'X','',1400490214,0);
INSERT INTO textbook_companion_example_files VALUES(97909,67374,'Ex9_15_2.xcos','2048/CH9/EX9.15/Ex9_15_2.xcos','application/octet-stream',351405,'X','',1400498360,0);
INSERT INTO textbook_companion_example_files VALUES(97910,67375,'dependencies9_16.sci','2048/CH9/EX9.16/dependencies9_16.sci','application/octet-stream',15676,'S','',1400498988,0);
INSERT INTO textbook_companion_example_files VALUES(102820,67375,'Ex9_16.xcos','2048/CH9/EX9.16/Ex9_16.xcos','application/octet-stream',326993,'X','',1403895058,0);
INSERT INTO textbook_companion_example_files VALUES(102821,67376,'dependencies9_17.sci','2048/CH9/EX9.17/dependencies9_17.sci','application/octet-stream',15120,'S','',1403896321,0);
INSERT INTO textbook_companion_example_files VALUES(102822,67376,'Ex9_17.xcos','2048/CH9/EX9.17/Ex9_17.xcos','application/octet-stream',326357,'X','',1403896321,0);
INSERT INTO textbook_companion_example_files VALUES(102823,67377,'Ex9_18dependency.sci','2048/CH9/EX9.18/Ex9_18dependency.sci','application/octet-stream',19080,'S','',1403936716,0);
INSERT INTO textbook_companion_example_files VALUES(105874,67179,'Ex7_6.xcos','2048/CH7/EX7.6/Ex7_6.xcos','application/octet-stream',344366,'X','',1406367313,0);
INSERT INTO textbook_companion_example_files VALUES(106149,68708,'Ex6_23.sce','2777/CH6/EX6.23/Ex6_23.sce','application/octet-stream',3122,'S','',1406555063,0);
INSERT INTO textbook_companion_example_files VALUES(106609,67190,'Ex9_1.sci','2048/CH9/EX9.1/Ex9_1.sci','application/octet-stream',17232,'S','',1406716026,0);
INSERT INTO textbook_companion_example_files VALUES(106856,68708,'Ex6_23.xcos','2777/CH6/EX6.23/Ex6_23.xcos','application/octet-stream',64114,'X','',1407173863,0);
INSERT INTO textbook_companion_example_files VALUES(106859,67180,'Ex7_7.xcos','2048/CH7/EX7.7/Ex7_7.xcos','application/octet-stream',326589,'X','',1407177274,0);
INSERT INTO textbook_companion_example_files VALUES(106860,67190,'Ex9_1_2.xcos','2048/CH9/EX9.1/Ex9_1_2.xcos','application/octet-stream',314890,'X','',1407181584,0);
INSERT INTO textbook_companion_example_files VALUES(106861,67190,'Ex9_1_1.xcos','2048/CH9/EX9.1/Ex9_1_1.xcos','application/octet-stream',297720,'X','',1407181584,0);
INSERT INTO textbook_companion_example_files VALUES(106873,67377,'Ex9_18.xcos','2048/CH9/EX9.18/Ex9_18.xcos','application/octet-stream',401330,'X','',1407351644,0);
INSERT INTO textbook_companion_example_files VALUES(106876,67378,'Ex9_19.xcos','2048/CH9/EX9.19/Ex9_19.xcos','application/octet-stream',332908,'X','',1407355925,0);
INSERT INTO textbook_companion_example_files VALUES(107378,67379,'Ex9_21_1.xcos','2048/CH9/EX9.21/Ex9_21_1.xcos','application/octet-stream',344355,'X','',1407781715,0);
INSERT INTO textbook_companion_example_files VALUES(107379,67379,'Ex9_21_2.xcos','2048/CH9/EX9.21/Ex9_21_2.xcos','application/octet-stream',341116,'X','',1407781715,0);
INSERT INTO textbook_companion_example_files VALUES(107381,67888,'Ex10_1dependency.sci','2048/CH10/EX10.1/Ex10_1dependency.sci','application/octet-stream',15785,'S','',1407784520,0);
INSERT INTO textbook_companion_example_files VALUES(107382,67888,'Ex10_1.xcos','2048/CH10/EX10.1/Ex10_1.xcos','application/octet-stream',324207,'X','',1407784520,0);
INSERT INTO textbook_companion_example_files VALUES(107383,67889,'Ex10_2dependency.sci','2048/CH10/EX10.2/Ex10_2dependency.sci','application/octet-stream',16194,'S','',1407787623,0);
INSERT INTO textbook_companion_example_files VALUES(107386,67889,'Ex10_2.xcos','2048/CH10/EX10.2/Ex10_2.xcos','application/octet-stream',343077,'X','',1407787623,0);
INSERT INTO textbook_companion_example_files VALUES(107387,68048,'Ex11_4dependency.sci','2048/CH11/EX11.4/Ex11_4dependency.sci','application/octet-stream',18457,'S','',1407790856,0);
INSERT INTO textbook_companion_example_files VALUES(107390,68048,'Ex11_4.xcos','2048/CH11/EX11.4/Ex11_4.xcos','application/octet-stream',324209,'X','',1407790856,0);
INSERT INTO textbook_companion_example_files VALUES(118626,79344,'Ex8_1.sce','3432/CH8/EX8.1/Ex8_1.sce','application/octet-stream',369,'S','',1435744970,0);
INSERT INTO textbook_companion_example_files VALUES(118629,79344,'Ex8_1_model.xcos','3432/CH8/EX8.1/Ex8_1_model.xcos','application/octet-stream',151132,'X','',1435744970,0);
INSERT INTO textbook_companion_example_files VALUES(118631,79346,'Ex8_2.sce','3432/CH8/EX8.2/Ex8_2.sce','application/octet-stream',768,'S','',1435745371,0);
INSERT INTO textbook_companion_example_files VALUES(118634,79346,'Ex8_2_model.xcos','3432/CH8/EX8.2/Ex8_2_model.xcos','application/octet-stream',214295,'X','',1435745371,0);
INSERT INTO textbook_companion_example_files VALUES(118639,79351,'Ex9_5.sce','3432/CH9/EX9.5/Ex9_5.sce','application/octet-stream',242,'S','',1435745730,0);
INSERT INTO textbook_companion_example_files VALUES(118642,79351,'Ex9_5_model.xcos','3432/CH9/EX9.5/Ex9_5_model.xcos','application/octet-stream',81764,'X','',1435745730,0);
INSERT INTO textbook_companion_example_files VALUES(118648,79357,'Ex9_6.sce','3432/CH9/EX9.6/Ex9_6.sce','application/octet-stream',259,'S','',1435745976,0);
INSERT INTO textbook_companion_example_files VALUES(118651,79357,'Ex9_6_model.xcos','3432/CH9/EX9.6/Ex9_6_model.xcos','application/octet-stream',74536,'X','',1435745976,0);
INSERT INTO textbook_companion_example_files VALUES(118659,79365,'Ex9_7.sce','3432/CH9/EX9.7/Ex9_7.sce','application/octet-stream',442,'S','',1435746428,0);
INSERT INTO textbook_companion_example_files VALUES(118662,79365,'Ex9_7_model.xcos','3432/CH9/EX9.7/Ex9_7_model.xcos','application/octet-stream',76734,'X','',1435746428,0);
INSERT INTO textbook_companion_example_files VALUES(118663,79365,'Ex9_7_model_notch.xcos','3432/CH9/EX9.7/Ex9_7_model_notch.xcos','application/octet-stream',82264,'X','',1435746428,0);
INSERT INTO textbook_companion_example_files VALUES(118664,79366,'Ex9_8.sce','3432/CH9/EX9.8/Ex9_8.sce','application/octet-stream',169,'S','',1435746730,0);
INSERT INTO textbook_companion_example_files VALUES(118667,79366,'Ex9_8_model.xcos','3432/CH9/EX9.8/Ex9_8_model.xcos','application/octet-stream',130057,'X','',1435746730,0);
INSERT INTO textbook_companion_example_files VALUES(118672,79371,'Ex9_9.sce','3432/CH9/EX9.9/Ex9_9.sce','application/octet-stream',364,'S','',1435746961,0);
INSERT INTO textbook_companion_example_files VALUES(118675,79371,'Ex9_9_model.xcos','3432/CH9/EX9.9/Ex9_9_model.xcos','application/octet-stream',70241,'X','',1435746961,0);
INSERT INTO textbook_companion_example_files VALUES(118679,79375,'Ex9_11.sce','3432/CH9/EX9.11/Ex9_11.sce','application/octet-stream',538,'S','',1435747183,0);
INSERT INTO textbook_companion_example_files VALUES(118682,79375,'Ex9_11_model.xcos','3432/CH9/EX9.11/Ex9_11_model.xcos','application/octet-stream',69777,'X','',1435747183,0);
INSERT INTO textbook_companion_example_files VALUES(118692,79383,'Ex9_13.sce','3432/CH9/EX9.13/Ex9_13.sce','application/octet-stream',408,'S','',1435747643,0);
INSERT INTO textbook_companion_example_files VALUES(118695,79383,'Ex9_13_model.xcos','3432/CH9/EX9.13/Ex9_13_model.xcos','application/octet-stream',71765,'X','',1435747643,0);
INSERT INTO textbook_companion_example_files VALUES(118766,79437,'Ex6_14.sce','3432/CH6/EX6.14/Ex6_14.sce','application/octet-stream',146,'S','',1435752315,0);
INSERT INTO textbook_companion_example_files VALUES(118769,79437,'Ex6_14_model.xcos','3432/CH6/EX6.14/Ex6_14_model.xcos','application/octet-stream',151898,'X','',1435752315,0);
INSERT INTO textbook_companion_example_files VALUES(118831,79469,'Ex7_32.sce','3432/CH7/EX7.32/Ex7_32.sce','application/octet-stream',2663,'S','',1435758684,0);
INSERT INTO textbook_companion_example_files VALUES(118834,79469,'Ex7_32_model.xcos','3432/CH7/EX7.32/Ex7_32_model.xcos','application/octet-stream',151641,'X','',1435758790,0);
INSERT INTO textbook_companion_example_files VALUES(118836,79471,'Ex7_34.sce','3432/CH7/EX7.34/Ex7_34.sce','application/octet-stream',3425,'S','',1435759371,0);
INSERT INTO textbook_companion_example_files VALUES(118839,79471,'Ex7_34_model.xcos','3432/CH7/EX7.34/Ex7_34_model.xcos','application/octet-stream',186059,'X','',1435759371,0);
INSERT INTO textbook_companion_example_files VALUES(118840,79472,'Ex7_35.sce','3432/CH7/EX7.35/Ex7_35.sce','application/octet-stream',599,'S','',1435759749,0);
INSERT INTO textbook_companion_example_files VALUES(118843,79472,'Ex7_35_model.xcos','3432/CH7/EX7.35/Ex7_35_model.xcos','application/octet-stream',234065,'X','',1435759749,0);
INSERT INTO textbook_companion_example_files VALUES(137587,91523,'Ex3_1.xcos','3885/CH3/EX3.1/Ex3_1.xcos','application/octet-stream',78386,'X','None',1511333535,0);
INSERT INTO textbook_companion_example_files VALUES(137588,91524,'Ex3_2.sci','3885/CH3/EX3.2/Ex3_2.sci','application/octet-stream',390,'S','None',1511333592,0);
INSERT INTO textbook_companion_example_files VALUES(137589,91524,'Ex3_2.xcos','3885/CH3/EX3.2/Ex3_2.xcos','application/octet-stream',73764,'X','None',1511333592,0);
INSERT INTO textbook_companion_example_files VALUES(137592,91527,'Ex3_6.sci','3885/CH3/EX3.6/Ex3_6.sci','application/octet-stream',1155,'S','None',1511333760,0);
INSERT INTO textbook_companion_example_files VALUES(137593,91527,'Ex3_6.xcos','3885/CH3/EX3.6/Ex3_6.xcos','application/octet-stream',73478,'X','None',1511333760,0);
INSERT INTO textbook_companion_example_files VALUES(137595,91528,'Ex3_7.sci','3885/CH3/EX3.7/Ex3_7.sci','application/octet-stream',781,'S','None',1511333911,0);
INSERT INTO textbook_companion_example_files VALUES(137596,91528,'Ex3_7.xcos','3885/CH3/EX3.7/Ex3_7.xcos','application/octet-stream',73779,'X','None',1511333911,0);
INSERT INTO textbook_companion_example_files VALUES(138022,91949,'Ex7_10.sci','3885/CH7/EX7.10/Ex7_10.sci','application/octet-stream',267,'S','None',1511673797,0);
INSERT INTO textbook_companion_example_files VALUES(138023,91949,'Ex7_10.xcos','3885/CH7/EX7.10/Ex7_10.xcos','application/octet-stream',74418,'X','None',1511673797,0);
INSERT INTO textbook_companion_example_files VALUES(138024,91950,'Ex7_11.sci','3885/CH7/EX7.11/Ex7_11.sci','application/octet-stream',270,'S','None',1511673839,0);
INSERT INTO textbook_companion_example_files VALUES(138025,91950,'Ex7_11.xcos','3885/CH7/EX7.11/Ex7_11.xcos','application/octet-stream',74374,'X','None',1511673839,0);
INSERT INTO textbook_companion_example_files VALUES(138026,91951,'Ex7_12.sci','3885/CH7/EX7.12/Ex7_12.sci','application/octet-stream',328,'S','None',1511673883,0);
INSERT INTO textbook_companion_example_files VALUES(138027,91951,'Ex7_12.xcos','3885/CH7/EX7.12/Ex7_12.xcos','application/octet-stream',74446,'X','None',1511673883,0);
INSERT INTO textbook_companion_example_files VALUES(140414,91523,'Ex3_1.sci','3885/CH3/EX3.1/Ex3_1.sci','application/octet-stream',352,'S','None',1530710031,0);
CREATE TABLE IF NOT EXISTS "textbook_companion_preference" (
	"id" INTEGER NOT NULL  ,
	"proposal_id" INTEGER NOT NULL DEFAULT '0' ,
	"pref_number" INTEGER NOT NULL DEFAULT '0' ,
	"book" VARCHAR(100) NOT NULL DEFAULT 'None' ,
	"author" VARCHAR(100) NOT NULL DEFAULT 'None' ,
	"isbn" VARCHAR(25) NOT NULL DEFAULT 'None' ,
	"publisher" VARCHAR(50) NOT NULL DEFAULT 'None' ,
	"edition" VARCHAR(2) NOT NULL DEFAULT 'No' ,
	"year" INTEGER NOT NULL DEFAULT '0' ,
	"category" INTEGER NOT NULL DEFAULT '0' ,
	"approval_status" INTEGER NOT NULL DEFAULT '0' ,
	"nonaicte_book" INTEGER NOT NULL DEFAULT '0' ,
	"pLike" INTEGER NOT NULL DEFAULT '0' ,
	"pDislike" INTEGER NOT NULL DEFAULT '0' ,
	"cloud_pref_err_status" INTEGER NOT NULL DEFAULT '0' ,
	PRIMARY KEY ("id")
);
INSERT INTO textbook_companion_preference VALUES(83,64,1,'Modern Power System Analysis','D. P. Kothari And I. J. Nagrath','0070494894','Tata McGraw - Hill Education, New Delhi','3',2003,15,1,0,0,0,0);
INSERT INTO textbook_companion_preference VALUES(154,87,3,'Electric Circuits','M. Navhi And J. A. Edminister','0070601739','Tata McGraw - Hill Publishing Co. Ltd., New Delhi','4',2007,8,1,0,0,0,0);
INSERT INTO textbook_companion_preference VALUES(181,96,3,'Basic Electronics','D. De','9788131710685','Pearson Education India, New Delhi','1',2010,10,1,0,0,0,0);
INSERT INTO textbook_companion_preference VALUES(215,108,1,'Engineering Circuit Analysis','W. Hayt, J. Kemmerly And S. Durbin','0070611054','Tata McGraw - Hill Education, New Delhi','6',2008,8,1,0,0,0,0);
INSERT INTO textbook_companion_preference VALUES(293,134,1,'Electrical Engineering Fundamentals','V. Del Toro','9780132475525','Prentice - Hall International','2',2009,8,1,0,0,0,0);
INSERT INTO textbook_companion_preference VALUES(2048,719,1,'Digital Control','K. M. Moudgalya','978-81-265-2206-4','Wiley, India','1',2009,2,1,0,0,0,0);
INSERT INTO textbook_companion_preference VALUES(2777,962,1,'Electrical Machines','R. K. Srivastava','9788131511701','Cengage Learning, New Delhi','1',2011,8,1,0,0,0,0);
INSERT INTO textbook_companion_preference VALUES(3432,1197,1,'Feedback Control of Dynamic Systems','G. F. Franklin, J. D. Powell and A. Emami-Naeini','978-81-317-2142-1','Pearson Education and Dorling Kindersley','5',2010,2,1,1,0,0,0);
INSERT INTO textbook_companion_preference VALUES(3885,1546,1,'Control Systems','A Nagoor Kani','978-8900121230','Rba Publications, Chennai','3',2015,2,1,1,0,0,0);
CREATE TABLE IF NOT EXISTS "textbook_companion_proposal" (
	"id" INTEGER NOT NULL  ,
	"uid" INTEGER NOT NULL DEFAULT '0' ,
	"approver_uid" INTEGER NOT NULL DEFAULT '0' ,
	"full_name" VARCHAR(50) NOT NULL DEFAULT 'None' ,
	"mobile" VARCHAR(15) NOT NULL DEFAULT '0' ,
	"gender" VARCHAR(10) NOT NULL DEFAULT 'None' ,
	"how_project" VARCHAR(50) NOT NULL DEFAULT 'None' ,
	"course" VARCHAR(50) NOT NULL DEFAULT 'None' ,
	"branch" VARCHAR(50) NOT NULL DEFAULT 'None' ,
	"university" VARCHAR(100) NOT NULL DEFAULT 'None' ,
	"city" VARCHAR(500) NOT NULL DEFAULT 'None' ,
	"pincode" INTEGER NOT NULL DEFAULT '0' ,
	"state" VARCHAR(500) NOT NULL DEFAULT 'None' ,
	"country" VARCHAR(500) NOT NULL DEFAULT 'None' ,
	"faculty" VARCHAR(100) NOT NULL DEFAULT 'None' ,
	"reviewer" VARCHAR(100) NOT NULL DEFAULT 'None' ,
	"reference" VARCHAR(5000) NOT NULL DEFAULT 'None' ,
	"completion_date" INTEGER NOT NULL DEFAULT '0' ,
	"creation_date" INTEGER NOT NULL DEFAULT '0' ,
	"approval_date" INTEGER NOT NULL DEFAULT '0' ,
	"proposal_status" INTEGER NOT NULL DEFAULT '0' ,
	"message" VARCHAR(255) NOT NULL DEFAULT 'None' ,
	"scilab_version" VARCHAR(20) NOT NULL DEFAULT 'None' ,
	"operating_system" VARCHAR(50) NOT NULL DEFAULT 'None' ,
	"teacher_email" VARCHAR(20) NOT NULL DEFAULT 'None' ,
	"reason" VARCHAR(500) NOT NULL DEFAULT 'None' ,
	"failed_reminder" INTEGER NOT NULL DEFAULT '0' ,
	"book_published" INTEGER NOT NULL DEFAULT '0' ,
	"proposal_type" INTEGER NOT NULL DEFAULT '0' ,
	"samplefilepath" VARCHAR(500) NOT NULL DEFAULT 'None' ,
	"proposed_completion_date" INTEGER NOT NULL DEFAULT '0' ,
	PRIMARY KEY ("id")
);
INSERT INTO textbook_companion_proposal VALUES(64,748,744,'Brahmesh Jain S D','','','Professor/Teacher','B.E','Electrical Engineering','Sri Jayachamarajendra College Of Engineering','Mysore',570006,'Karnataka','India','Prof. R S Anandamurthy','TechPassion','None',1358188200,1304769748,1391970600,3,'','scilab 5.4','linux','','None',0,0,0,'None',1358188200);
INSERT INTO textbook_companion_proposal VALUES(87,335,130,'Dhaivat Udayan Mandavia','','','Scilab Website','B.E. (pursuing)','Electronics Engineering','B. V. B. C. E. T., Hubli','Hubli-Dharwad',580031,'Karnataka','India','Prof. Sujata Kotabagi, B. V. B. C. E. T., Hubli','sonanya tatikola, IITB','None',1380565800,1308763443,1391970600,3,'','','','','None',0,0,0,'None',1380565800);
INSERT INTO textbook_companion_proposal VALUES(96,962,744,'Adithya R.k','','','Friend','B.E (pursuing)','Electronics Engineering','The National Institute Of Engineering','Mysore',570008,'Karnataka','India','M.S Vijaykumar','TechPassion','None',1380911400,1309432342,1391970600,3,'','','','','None',0,0,0,'None',1380911400);
INSERT INTO textbook_companion_proposal VALUES(108,335,744,'Dhaivat Udayan Mandavia','','','Scilab Website','B.E','Electronics Engineering','B.V.B.College of Engineering and Technology','Hubli-Dharwad',580031,'Karnataka','India','Prof.sujata Kotabagi','','None',1383157800,1310790982,1391970600,3,'','','','','None',0,0,0,'None',1383157800);
INSERT INTO textbook_companion_proposal VALUES(134,1579,130,'Aditi Pohekar','','','Professor/Teacher','Electrical Engineering','Electrical Engineering','IIT Bombay','Mumbai',400076,'Maharashtra','India','Madhu N. Belur','Mukul R. Kulkarni','None',1369938600,1321718828,1391970600,3,'','','','','None',0,0,0,'None',1369938600);
INSERT INTO textbook_companion_proposal VALUES(719,12020,2921,'Inderpreet Arora','','F','Professor/Teacher','Digital Control','Chemical Engineering','IIT Bombay','Mumbai',400076,'Maharashtra','India','NA','Chaitanya','None',1388428200,1383060146,1383106730,3,'','5.4.1','Windows 7, Linux','','None',0,0,0,'None',1388428200);
INSERT INTO textbook_companion_proposal VALUES(962,13187,2921,'Balachandra P','','M','Professor/Teacher','Bachelor of Engineering','Electrical Engineering','Sri Jayachamarajendra College of Engineering','Mysore',570006,'Karnataka','India','None','Bhavani Jalkrish','None',1404066600,1395421284,1395653654,3,'','5.4.1','Windows 7 Ultimate','','None',0,0,0,'None',1404066600);
INSERT INTO textbook_companion_proposal VALUES(1197,13736,2921,'Mrs. Deepti Khimani','','F','Scilab Website','Feeback Control System, Control System Design','Instrumentation Engineering','Mumbai University','Mumbai',400032,'Maharashtra','India','None','Spandana','this book can be used for four subjects of instrumentation engineering of mumbai university includin',1435429800,1425447665,1425461367,3,'','5.4.1','Windows','','Extremely useful',0,0,1,'None',1435429800);
INSERT INTO textbook_companion_proposal VALUES(1546,19193,16187,'Vibin Bharath M B','','M','Not available','B.E.','Electrical Engineering','St.Xavier''s Catholic College of Engineering','Nagercoil',629003,'Tamil Nadu','India','None','None',replace(replace('https://www.drmgrdu.ac.in/engineering/files/mech/2013/b.tech%20mech-pt-2013.pdf\r\n\r\nhttps://dbatu.ac.in/wp-content/uploads/2017/07/m.tech-control-systems.pdf\r\n\r\nhttp://www.sathyabamauniversity.ac.in/documents/faculty_departments/foee/ug-regular/eee_ug_regular_full.pdf','\r',char(13)),'\n',char(10)),1532088392,1505986292,1507887370,3,'None','scilab 6.0.0','Windows','','Used in more than one University, The book has multiple editions, Extremely useful',0,0,1,'1546/SampleCodes.zip',1513708200);
CREATE TABLE IF NOT EXISTS "xcos_on_cloud_enable_book" (
	"id" INTEGER NOT NULL  ,
	"book_id" INTEGER NOT NULL  ,
	PRIMARY KEY ("id")
);
INSERT INTO xcos_on_cloud_enable_book VALUES(1,83);
INSERT INTO xcos_on_cloud_enable_book VALUES(2,154);
INSERT INTO xcos_on_cloud_enable_book VALUES(3,215);
INSERT INTO xcos_on_cloud_enable_book VALUES(4,293);
INSERT INTO xcos_on_cloud_enable_book VALUES(5,2777);
INSERT INTO xcos_on_cloud_enable_book VALUES(6,3432);
INSERT INTO xcos_on_cloud_enable_book VALUES(7,3885);
INSERT INTO xcos_on_cloud_enable_book VALUES(8,2048);
INSERT INTO xcos_on_cloud_enable_book VALUES(9,181);
CREATE INDEX "tcc_query" ON "textbook_companion_chapter" ("id", "preference_id");
CREATE INDEX "tce_query" ON "textbook_companion_example" ("id", "chapter_id");
CREATE INDEX "tcef_query" ON "textbook_companion_example_files" ("example_id", "filetype", "xcos_cloud_example_file_error_status");
CREATE INDEX "pe_query" ON "textbook_companion_preference" ("id", "proposal_id", "category", "approval_status");
CREATE INDEX "po_query" ON "textbook_companion_proposal" ("id", "proposal_status");
CREATE INDEX "xceb_query" ON "xcos_on_cloud_enable_book" ("book_id");
COMMIT;
