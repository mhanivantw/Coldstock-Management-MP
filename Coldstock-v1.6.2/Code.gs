function defaultLocations_(){const map={"CHILLER C1":"A1-1 A1-2 A1-3 A1-4 A2-1 A2-2 A2-3 A2-4 A3-1 A3-2 A3-3 A3-4 A4-1 A4-2 A4-3 A4-4 A5-3 A5-4 B1-1 B1-2 B1-3 B1-4 B2-1 B2-2 B2-3 B2-4 B3-1 B3-2 B3-3 B3-4 B4-1 B4-2 B4-3 B4-4 B5-1 B5-2 B5-3 B5-4 C1-1 C1-2 C1-3 C1-4 C2-1 C2-2 C2-3 C2-4 C3-1 C3-2 C3-3 C3-4 C4-1 C4-2 C4-3 C4-4 C5-1 C5-2 C5-3 C5-4 D1-1 D1-2 D1-3 D1-4 D2-1 D2-2 D2-3 D2-4 D3-1 D3-2 D3-3 D3-4 D4-1 D4-2 D4-3 D4-4 D5-1 D5-2 D5-3 D5-4 E1-1 E1-2 E1-3 E1-4 E2-1 E2-2 E2-3 E2-4 E3-1 E3-2 E3-3 E3-4 E4-1 E4-2 E4-3 E4-4 E5-1 E5-2 E5-3 E5-4 F1-1 F1-2 F1-3 F1-4 F2-1 F2-2 F2-3 F2-4 F3-1 F3-2 F3-3 F3-4 F4-1 F4-2 F4-3 F4-4 F5-1 F5-2 F5-3 F5-4 G3-1 G3-2 G3-3 G3-4 G4-1 G4-2 G4-3 G4-4 G5-1 G5-2 H1-1 H1-2 H1-3 H1-4 H2-1 H2-2 H2-3 H2-4 H3-1 H3-2 H3-3 H3-4 H4-1 H4-2 H4-3 H4-4 H5-1 H5-2 H5-3 H5-4 I1-1 I1-2 I1-3 I1-4 I2-1 I2-2 I2-3 I2-4 I3-1 I3-2 I3-3 I3-4 I4-1 I4-2 I4-3 I4-4 I5-1 I5-2 I5-3 I5-4 J1-1 J1-2 J1-3 J1-4 J2-1 J2-2 J2-3 J2-4 J3-1 J3-2 J3-3 J3-4 J4-1 J4-2 J4-3 J4-4 J5-1 J5-2 J5-3 J5-4 K1-1 K1-2 K1-3 K1-4 K2-1 K2-2 K2-3 K2-4 K3-1 K3-2 K3-3 K3-4 K4-1 K4-2 K4-3 K4-4 K5-1 K5-2 K5-3 K5-4 L1-1 L1-2 L1-3 L1-4 L2-1 L2-2 L2-3 L2-4 L3-1 L3-2 L3-3 L3-4 L4-1 L4-2 L4-3 L4-4 L5-1 L5-2 L5-3 L5-4","CHILLER C2":"A1-1 A1-2 A2-1 A2-2 A3-1 A3-2 A4-1 A4-2 B1-1 B1-2 B1-3 B1-4 B2-1 B2-2 B2-3 B2-4 B3-1 B3-2 B3-3 B3-4 B4-1 B4-2 B4-3 B4-4 B5-1 B5-2 B5-3 B5-4 C3-1 C3-2 C3-3 C3-4 C4-1 C4-2 C4-3 C4-4 C5-1 C5-2 C5-3 C5-4 D1-1 D1-2 D1-3 D1-4 D2-1 D2-2 D2-3 D2-4 D3-1 D3-2 D3-3 D3-4 D4-1 D4-2 D4-3 D4-4 D5-1 D5-2 D5-3 D5-4 E3-1 E3-2 E3-3 E3-4 E4-1 E4-2 E4-3 E4-4 E5-1 E5-2 E5-3 E5-4 F1-1 F1-2 F1-3 F1-4 F2-1 F2-2 F2-3 F2-4 F3-1 F3-2 F3-3 F3-4 F4-1 F4-2 F4-3 F4-4 F5-1 F5-2 F5-3 F5-4 G1-1 G1-2 G1-3 G1-4 G2-1 G2-2 G2-3 G2-4 G3-1 G3-2 G3-3 G3-4 G4-1 G4-2 G4-3 G4-4 G5-1 G5-2 G5-3 G5-4 H1-1 H1-2 H1-3 H1-4 H2-1 H2-2 H2-3 H2-4 H3-1 H3-2 H3-3 H3-4 H4-1 H4-2 H4-3 H4-4 H5-1 H5-2 H5-3 H5-4 I1-1 I1-2 I1-3 I1-4 I2-1 I2-2 I2-3 I2-4 I3-1 I3-2 I3-3 I3-4 I4-1 I4-2 I4-3 I4-4 I5-1 I5-2 I5-3 I5-4 J1-1 J1-2 J1-3 J1-4 J2-1 J2-2 J2-3 J2-4 J3-1 J3-2 J3-3 J3-4 J4-1 J4-2 J4-3 J4-4 J5-1 J5-2 J5-3 J5-4 K1-1 K1-2 K1-3 K1-4 K2-1 K2-2 K2-3 K2-4 K3-1 K3-2 K3-3 K3-4 K4-1 K4-2 K4-3 K4-4 K5-1 K5-2 K5-3 K5-4 L1-1 L1-2 L1-3 L1-4 L2-1 L2-2 L2-3 L2-4 L3-1 L3-2 L3-3 L3-4 L4-1 L4-2 L4-3 L4-4 L5-1 L5-2 L5-3 L5-4 M1-1 M1-2 M1-3 M1-4 M2-1 M2-2 M2-3 M2-4 M3-1 M3-2 M3-3 M3-4 M4-1 M4-2 M4-3 M4-4 M5-1 M5-2 N1-1 N1-2 N2-1 N2-2 N3-1 N3-2 N4-1 N4-2 N5-1 N5-2 O1-1 O1-2 O2-1 O2-2 O3-1 O3-2 O4-1 O4-2 P1-1 P1-2 P1-3 P1-4 P2-1 P2-2 P2-3 P2-4 P3-1 P3-2 P3-3 P3-4 P4-1 P4-2 P4-3 P4-4 P5-1 P5-2 P5-3 P5-4 Q1-1 Q1-2 Q1-3 Q1-4 Q2-1 Q2-2 Q2-3 Q2-4 Q3-1 Q3-2 Q3-3 Q3-4 Q4-1 Q4-2 Q4-3 Q4-4 Q5-1 Q5-2 Q5-3 Q5-4 R1-1 R1-2 R1-3 R1-4 R2-1 R2-2 R2-3 R2-4 R3-1 R3-2 R3-3 R3-4 R4-1 R4-2 R4-3 R4-4 R5-1 R5-2 R5-3 R5-4 S3-1 S3-2 S3-3 S3-4 S4-1 S4-2 S4-3 S4-4 S5-1 S5-2 S5-3 S5-4 T1-1 T1-2 T1-3 T1-4 T2-1 T2-2 T2-3 T2-4 T3-1 T3-2 T3-3 T3-4 T4-1 T4-2 T4-3 T4-4 T5-1 T5-2 T5-3 T5-4 U1-1 U1-2 U1-3 U1-4 U2-1 U2-2 U2-3 U2-4 U3-1 U3-2 U3-3 U3-4 U4-1 U4-2 U4-3 U4-4 U5-1 U5-2 U5-3 U5-4 V1-1 V1-2 V1-3 V1-4 V2-1 V2-2 V2-3 V2-4 V3-1 V3-2 V3-3 V3-4 V4-1 V4-2 V4-3 V4-4 V5-1 V5-2 V5-3 V5-4 W1-1 W1-2 W1-3 W1-4 W2-1 W2-2 W2-3 W2-4 W3-1 W3-2 W3-3 W3-4 W4-1 W4-2 W4-3 W4-4 W5-1 W5-2 W5-3 W5-4 X1-1 X1-2 X1-3 X1-4 X2-1 X2-2 X2-3 X2-4 X3-1 X3-2 X3-3 X3-4 X4-1 X4-2 X4-3 X4-4 X5-1 X5-2 X5-3 X5-4 Y1-1 Y1-2 Y1-3 Y1-4 Y2-1 Y2-2 Y2-3 Y2-4 Y3-1 Y3-2 Y3-3 Y3-4 Y4-1 Y4-2 Y4-3 Y4-4 Y5-1 Y5-2 Y5-3 Y5-4 Z1-1 Z1-2 Z1-3 Z1-4 Z2-1 Z2-2 Z2-3 Z2-4 Z3-1 Z3-2 Z3-3 Z3-4 Z4-1 Z4-2 Z4-3 Z4-4 Z5-1 Z5-2 Z5-3 Z5-4 AA1-1 AA1-2 AA1-3 AA1-4 AA2-1 AA2-2 AA2-3 AA2-4 AA3-1 AA3-2 AA3-3 AA3-4 AA4-1 AA4-2 AA4-3 AA4-4 AA5-3 AA5-4 BB1-1 BB1-2 BB2-1 BB2-2 BB3-1 BB3-2 BB4-1 BB4-2","CHILLER C3":"A1-1 A1-2 A2-1 A2-2 A3-1 A3-2 A4-1 A4-2 A5-1 A5-2 B1-1 B1-2 B1-3 B1-4 B2-1 B2-2 B2-3 B2-4 B3-1 B3-2 B3-3 B3-4 B4-1 B4-2 B4-3 B4-4 B5-1 B5-2 B5-3 B5-4 C1-1 C1-2 C1-3 C1-4 C2-1 C2-2 C2-3 C2-4 C3-1 C3-2 C3-3 C3-4 C4-1 C4-2 C4-3 C4-4 C5-1 C5-2 C5-3 C5-4 D1-1 D1-2 D1-3 D1-4 D2-1 D2-2 D2-3 D2-4 D3-1 D3-2 D3-3 D3-4 D4-1 D4-2 D4-3 D4-4 D5-1 D5-2 D5-3 D5-4 E3-1 E3-2 E3-3 E3-4 E4-1 E4-2 E4-3 E4-4 E5-1 E5-2 E5-3 E5-4 F1-1 F1-2 F1-3 F1-4 F2-1 F2-2 F2-3 F2-4 F3-1 F3-2 F3-3 F3-4 F4-1 F4-2 F4-3 F4-4 F5-1 F5-2 F5-4 F5-3 G1-1 G1-2 G2-1 G2-2 G3-1 G3-2 G4-1 G4-2 G5-1 G5-2 H1-1 H1-2 H1-3 H1-4 H2-1 H2-2 H2-3 H2-4 H3-1 H3-2 H3-3 H3-4 H4-1 H4-2 H4-3 H4-4 H5-1 H5-2 H5-3 H5-4 I1-1 I1-2 I1-3 I1-4 I2-1 I2-2 I2-3 I2-4 I3-1 I3-2 I3-3 I3-4 I4-1 I4-2 I4-3 I4-4 I5-1 I5-2 J1-1 J1-2 J2-1 J2-2 J3-1 J3-2 J4-1 J4-2 K1-1 K1-2 K1-3 K1-4 K2-1 K2-2 K2-3 K2-4 K3-1 K3-2 K3-3 K3-4 K4-1 K4-2 K4-3 K4-4 K5-1 K5-2 K5-3 K5-4 L1-1 L1-2 L1-3 L1-4 L2-1 L2-2 L2-3 L2-4 L3-1 L3-2 L3-3 L3-4 L4-1 L4-2 L4-3 L4-4 L5-1 L5-2 L5-3 L5-4 M1-1 M1-2 M1-3 M1-4 M2-1 M2-2 M2-3 M2-4 M3-1 M3-2 M3-3 M3-4 M4-1 M4-2 M4-3 M4-4 M5-1 M5-2 M5-3 M5-4 N1-1 N1-2 N1-3 N1-4 N2-1 N2-2 N2-3 N2-4 N3-1 N3-2 N3-3 N3-4 N4-1 N4-2 N4-3 N4-4 N5-1 N5-2 N5-3 N5-4 O1-1 O1-2 O1-3 O1-4 O2-1 O2-2 O2-3 O2-4 O3-1 O3-2 O3-3 O3-4 O4-1 O4-2 O4-3 O4-4 O5-1 O5-2 O5-3 O5-4 P1-1 P1-2 P1-3 P1-4 P2-1 P2-2 P2-3 P2-4 P3-1 P3-2 P3-3 P3-4 P4-1 P4-2 P4-3 P4-4 P5-1 P5-2 P5-3 P5-4 Q1-1 Q1-2 Q1-3 Q1-4 Q2-1 Q2-2 Q2-3 Q2-4 Q3-1 Q3-2 Q3-3 Q3-4 Q4-1 Q4-2 Q4-3 Q4-4 Q5-1 Q5-2 Q5-3 Q5-4 R1-1 R1-2 R1-3 R1-4 R2-1 R2-2 R2-3 R2-4 R3-1 R3-2 R3-3 R3-4 R4-1 R4-2 R4-3 R4-4 R5-3 R5-4","CSFG C1":"A1-1 A1-2 A1-3 A1-4 A2-1 A2-2 A2-3 A2-4 A3-1 A3-2 A3-3 A3-4 A4-1 A4-2 A4-3 A4-4 B1-1 B1-2 B1-3 B1-4 B2-1 B2-2 B2-3 B2-4 B3-1 B3-2 B3-3 B3-4 B4-1 B4-2 B4-3 B4-4 B5-1 B5-2 B5-3 B5-4 C1-1 C1-2 C1-3 C1-4 C2-1 C2-2 C2-3 C2-4 C3-1 C3-2 C3-3 C3-4 C4-1 C4-3 C4-4 C5-1 C5-2 C5-3 C5-4 D1-1 D1-2 D1-3 D1-4 D2-1 D2-2 D2-3 D2-4 D3-1 D3-2 D3-3 D3-4 D4-1 D4-2 D4-3 D4-4 D5-1 D5-2 D5-3 D5-4 E1-1 E1-2 E1-3 E1-4 E2-1 E2-2 E2-3 E2-4 E3-1 E3-2 E3-3 E3-4 E4-1 E4-2 E4-3 E4-4 E5-1 E5-2 E5-3 E5-4 F2-1 F2-2 F2-3 F2-4 F3-1 F3-2 F3-3 F3-4 F4-1 F4-2 F4-3 F4-4 F5-1 F5-2 F5-3 F5-4 G1-1 G1-2 G1-3 G1-4 G2-1 G2-2 G2-3 G2-4 G3-1 G3-2 G3-3 G3-4 G4-1 G4-2 G4-3 G4-4 G5-1 G5-2 G5-3 G5-4 H1-1 H1-2 H1-3 H1-4 H2-1 H2-2 H2-3 H2-4 H3-1 H3-2 H3-3 H3-4 H4-1 H4-2 H4-3 H4-4 I1-1 I1-2 I1-3 I1-4 I2-1 I2-2 I2-3 I2-4 I3-1 I3-2 I3-3 I3-4 I4-1 I4-2 I4-3 I4-4 I5-1 I5-2 I5-3 I5-4 J1-1 J1-2 J1-3 J1-4 J2-1 J2-2 J2-3 J2-4 J3-1 J3-2 J3-3 J3-4 J4-1 J4-2 J4-3 J4-4 J5-1 J5-2 J5-3 J5-4 K3-1 K3-2 K3-3 K3-4 K4-1 K4-2 K4-3 K4-4 K5-1 K5-2 K5-3 K5-4 L1-1 L1-2 L1-3 L1-4 L2-1 L2-2 L2-3 L2-4 L3-1 L3-2 L3-3 L3-4 L4-1 L4-2 L4-3 L4-4 L5-1 L5-2 L5-3 L5-4 M1-1 M1-2 M1-3 M1-4 M2-1 M2-2 M2-3 M2-4 M3-1 M3-2 M3-3 M3-4 M4-1 M4-2 M4-3 M4-4 M5-1 M5-2 M5-3 M5-4 N1-1 N1-2 N1-3 N1-4 N2-1 N2-2 N2-3 N2-4 N3-1 N3-2 N3-3 N3-4 N4-1 N4-2 N4-3 N4-4","CSFG C2":"A3-1 A3-3 A4-1 A4-3 B1-1 B1-3 B2-1 B2-3 B3-1 B3-3 B4-1 B4-3 B5-1 B5-3 C1-1 C1-3 C1-4 C2-1 C2-3 C2-4 C3-1 C3-3 C3-4 C4-1 C4-3 C5-1 C5-3 D1-1 D1-2 D1-3 D1-4 D2-1 D2-2 D2-3 D2-4 D3-1 D3-2 D3-3 D3-4 D4-1 D4-3 D5-1 D5-3 E1-1 E1-2 E1-3 E1-4 E2-1 E2-2 E2-3 E2-4 E3-1 E3-2 E3-3 E3-4 E4-1 E4-3 E5-1 E5-3 F3-1 F3-2 F3-3 F3-4 F4-1 F4-3 F5-1 F5-3 G1-1 G1-2 G1-3 G1-4 G2-1 G2-2 G2-3 G2-4 G3-1 G3-2 G3-3 G3-4 G4-1 G4-3 G5-1 G5-3 H1-1 H1-2 H1-3 H1-4 H2-1 H2-2 H2-3 H2-4 H3-1 H3-2 H3-3 H3-4 H4-1 H4-3 H5-1 H5-3 I1-1 I1-2 I2-1 I2-2 I3-1 I3-2 I4-1 J1-1 J1-2 J1-3 J1-4 J2-1 J2-2 J2-3 J2-4 J3-1 J3-2 J3-3 J3-4 J4-1 J4-2 J4-3 J4-4 K1-1 K1-2 K1-3 K1-4 K2-1 K2-2 K2-3 K2-4 K3-1 K3-2 K3-3 K3-4 K4-1 K4-2 K4-3 K4-4 K5-1 K5-2 K5-3 K5-4 L1-1 L1-2 L1-3 L1-4 L2-1 L2-2 L2-3 L2-4 L3-1 L3-2 L3-3 L3-4 L4-1 L4-2 L4-3 L4-4 L5-1 L5-2 L5-3 L5-4 M1-1 M1-2 M1-3 M1-4 M2-1 M2-2 M2-3 M2-4 M3-1 M3-2 M3-3 M3-4 M4-1 M4-2 M4-3 M4-4 M5-1 M5-2 M5-3 M5-4 N2-1 N2-2 N2-3 N2-4 N3-1 N3-2 N3-3 N3-4 N4-1 N4-2 N4-3 N4-4 N5-1 N5-2 N5-3 N5-4 O2-1 O2-2 O2-3 O2-4 O3-1 O3-2 O3-3 O3-4 O4-1 O4-2 O4-3 O4-4 O5-1 O5-2 O5-3 O5-4 P2-1 P2-2 P2-3 P2-4 P3-1 P3-2 P3-3 P3-4 P4-1 P4-2 P4-3 P4-4 P5-1 P5-2 P5-3 P5-4 Q2-1 Q2-2 Q2-3 Q2-4 Q3-1 Q3-2 Q3-3 Q3-4 Q4-1 Q4-2 Q4-3 Q4-4 Q5-1 Q5-2 Q5-3 Q5-4 R2-1 R2-2 R3-1 R3-2 R4-1 R4-2"};const out=[];Object.keys(map).forEach(room=>{map[room].split(' ').forEach((display,n)=>{const m=display.match(/^([A-Z]+)(\d+)-([1-4])$/);out.push({id:room+':'+display,room,group:room.split(' ')[0],block:m[1],bay:Number(m[2]),slot:Number(m[3]),display,order:n+1,kind:'rack',functionType:room==='CSFG C2'&&display==='L1-2'?'Bingkisan / Non-Komersial':'Reguler'});});out.push({id:room+':FLOOR',room,group:room.split(' ')[0],block:'',bay:0,slot:0,display:'LANTAI',order:9999,kind:'floor',functionType:'Reguler'});});['CSFG','CHILLER'].forEach(group=>out.push({id:'WIP-'+group,room:'PROD WIP',group,block:'',bay:0,slot:0,display:'PROD WIP',order:10000,kind:'wip',functionType:'Reguler'}));return out;}
/* Shared business rules, used unchanged in the browser and Apps Script V8. */
const WMS = (() => {
  const STATUS = ['Release','Hold','GR','Sample','Restan','Rusak'];
  const FUNCTIONS = ['Reguler','Bingkisan / Non-Komersial'];
  const SKU = [...['BG','BH','BK','BO','BOLO','BKLO','SG','SH','SK','STY'].map(code=>({code,group:'CHILLER',defaultQty:48,shelfDays:180})),...['CCN','CCN 250','PCN','SPC','CCS','CCS 250','CW'].map(code=>({code,group:'CSFG',defaultQty:30,shelfDays:0}))];
  function assert(ok,msg){if(!ok)throw new Error(msg);}
  function date(v){assert(typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v),'Tanggal harus diisi.');const d=new Date(v+'T00:00:00Z');assert(!isNaN(d)&&d.toISOString().slice(0,10)===v,'Tanggal tidak valid.');return d;}
  function expiry(kp,days){const d=date(kp);d.setUTCDate(d.getUTCDate()+Number(days));return d.toISOString().slice(0,10);}
  function short(v){date(v);return v.slice(8,10)+'.'+v.slice(5,7);}
  function session(input){assert(['CSFG','CHILLER'].includes(input.mode),'Mode tidak valid.');assert(['S1','S2','S3'].includes(input.shift),'Pilih shift.');date(input.date);const name=String(input.name||'').trim();assert(name.length>=2&&name.length<=80,'Nama SK harus 2–80 karakter.');return {name,date:input.date,shift:input.shift,mode:input.mode};}
  function item(raw,loc,skus,id,now,sessionId){
    const sku=skus.find(s=>s.code===raw.sku&&s.group===loc.group);
    assert(sku,'SKU tidak sesuai mode penyimpanan.');date(raw.kp);
    const qty=Number(raw.qty);assert(Number.isFinite(qty)&&qty>0&&Number.isInteger(qty)&&qty<=1000000,'Qty harus bilangan bulat 1–1.000.000.');
    const unit=raw.unit||'CTN';
    assert(['CTN','PACK'].includes(unit),'Satuan tidak valid.');assert(STATUS.includes(raw.status),'Status tidak valid.');
    const rawPallet=String(raw.palletNo??'').trim();assert(!rawPallet||/^[0-9]{1,20}$/.test(rawPallet),'No. Pallet hanya boleh berisi angka (maksimal 20 digit).');const palletNo=pallet(rawPallet);
    assert(loc.group!=='CSFG'||['JT','HW','AK','-'].includes(raw.spv),'Pilih kode SPV: JT, HW, AK, atau -.');
    const note=String(raw.note||'').trim();assert(note.length<=500&&!/[\r\n]/.test(note),'Keterangan maksimal 500 karakter, satu baris.');
    return {id,locationId:loc.id,sku:sku.code,kp:raw.kp,exp:expiry(raw.kp,sku.shelfDays),qty,unit,palletNo,spv:loc.group==='CSFG'?raw.spv:'',status:raw.status,note,updatedAt:now,sessionId};
  }
  function mutate(original,request,ss,uuid,now){
    const data=JSON.parse(JSON.stringify(original));
    assert(request.version===data.version,'CONFLICT: Data berubah oleh pengguna lain. Muat ulang data sebelum menyimpan.');
    const allowed=data.locations.filter(l=>l.group===ss.mode),byId=new Map(allowed.map(l=>[l.id,l]));
    if(request.action==='saveSlot'){
      const loc=byId.get(request.locationId);assert(loc,'Lokasi tidak tersedia dalam mode ini.');assert(FUNCTIONS.includes(request.functionType),'Tipe fungsi tidak valid.');
      assert(Array.isArray(request.items)&&request.items.length<=200,'Maksimal 200 item per lokasi.');
      const oldIds=new Set(data.stock.filter(i=>i.locationId===loc.id).map(i=>i.id));const used=new Set();
      const rows=request.items.map(raw=>{assert(!raw.id||oldIds.has(raw.id),'Item bukan milik lokasi ini.');const id=raw.id||uuid();assert(!used.has(id),'Duplikat item.');used.add(id);const old=data.stock.find(i=>i.id===id);return item({...raw,palletNo:raw.palletNo===undefined?old?.palletNo:raw.palletNo},loc,data.skus,id,now,ss.id);});
      data.stock=data.stock.filter(i=>i.locationId!==loc.id).concat(rows);loc.functionType=request.functionType;
    } else {
      assert(['delete','move'].includes(request.action),'Aksi tidak dikenal.');assert(Array.isArray(request.ids)&&request.ids.length>0,'Pilih item terlebih dahulu.');
      const ids=new Set(request.ids),rows=data.stock.filter(i=>ids.has(i.id));assert(rows.length===ids.size&&rows.every(i=>byId.has(i.locationId)),'Item tidak ditemukan atau di luar mode ini.');
      if(request.action==='delete')data.stock=data.stock.filter(i=>!ids.has(i.id));
      else {const to=byId.get(request.destination);assert(to,'Lokasi tujuan tidak valid.');assert(rows.every(i=>i.locationId!==to.id),'Tujuan harus berbeda dari lokasi asal.');rows.forEach(i=>{i.locationId=to.id;i.updatedAt=now;i.sessionId=ss.id;});}
    }
    data.version++;return data;
  }
  function itemText(i,mode){return `${i.sku} ${short(i.kp)}${mode==='CSFG'?' =':' '}${mode==='CSFG'?' ':''}${i.qty}${i.unit==='PACK'?' PACK':''}${mode==='CSFG'?' '+i.spv:''}${i.status==='Release'?'':(' '+i.status.toUpperCase())}${i.palletNo?' (P:'+pallet(i.palletNo)+')':''}${i.note?' '+i.note:''}`;}
  function report(data,ss,roomFilter){
    session(ss);const day=['MINGGU','SENIN','SELASA','RABU','KAMIS','JUMAT','SABTU'][date(ss.date).getUTCDay()];
    const stamp=`*${day} ${short(ss.date)}.${ss.date.slice(2,4)} ${ss.shift}*`;
    const rooms=ss.mode==='CSFG'?['CSFG C1','CSFG C2']:['CHILLER C1','CHILLER C2','CHILLER C3'];
    rooms.push('PROD WIP');const texts=[];
    for(const room of rooms){
      if(roomFilter&&roomFilter!==room)continue;
      const locs=data.locations.filter(l=>l.group===ss.mode&&l.room===room).sort((a,b)=>a.order-b.order);
      const stockAt=id=>data.stock.filter(i=>i.locationId===id);
      if(room==='PROD WIP'&&!locs.some(l=>stockAt(l.id).length))continue;
      const lines=[`*${room.replace(' C',' ')}*`,stamp,''];let lastBlock='',lastBay='';
      for(const l of locs){
        const rows=stockAt(l.id);
        if(l.kind==='rack'){
          if(l.block!==lastBlock){if(lastBlock)lines.push('');if(lastBlock||ss.mode==='CSFG')lines.push('#');lastBlock=l.block;lastBay='';}
          const bay=l.block+l.bay;if(lastBay&&bay!==lastBay)lines.push('');lastBay=bay;
          if(l.functionType!==FUNCTIONS[0])lines.push(`${l.display}= [RACK BINGKISAN & SAMPLE NON-COMMERCIAL]`);
          else if(!rows.length)lines.push(l.display+'=');
          else rows.forEach((i,n)=>lines.push((n?'          ':l.display+'= ')+itemText(i,ss.mode)));
        } else {if(l.kind==='floor')lines.push('','*LANTAI*','*');if(l.functionType!==FUNCTIONS[0])lines.push('[RACK BINGKISAN & SAMPLE NON-COMMERCIAL]');else if(rows.length)rows.forEach(i=>lines.push('- '+itemText(i,ss.mode)));else if(l.kind==='floor')lines.push('-');}
      }texts.push(lines.join('\n'));
    }return texts.join('\n\n');
  }
  // String normalization preserves large legacy identifiers without Number rounding.
  function pallet(value){return String(value??'').trim().replace(/^0+(?=\d)/,'');}
  return {STATUS,FUNCTIONS,SKU,assert,date,expiry,short,session,item,mutate,report,pallet};
})();

/* A physical pallet groups immutable source items; its label is never an item ID. */
const Pallets=(()=>{
 const key=i=>i.palletId||i.itemId||i.id;
 const label=i=>i.palletLabel||WMS.pallet(i.palletNo)||'';
 function count(items){return new Set(items.filter(i=>Number(i.qty)>0).map((i,n)=>key(i)||'unidentified-'+n)).size;}
 function expand(data,ids){const set=new Set(ids),groups=new Set(data.stock.filter(i=>set.has(i.id)&&i.palletId).map(i=>i.palletId));return data.stock.filter(i=>set.has(i.id)||i.palletId&&groups.has(i.palletId));}
 function complete(data,items){const ids=new Set(items.map(i=>i.id));WMS.assert(expand(data,[...ids]).every(i=>ids.has(i.id)),'Pilih seluruh komponen pallet gabungan untuk dipindah.');}
 function merge(original,r,ss,uuid,now){
  WMS.assert(Array.isArray(r.ids)&&r.ids.length>=2&&r.ids.length<=100&&new Set(r.ids).size===r.ids.length,'Pilih 2–100 item berbeda untuk digabung.');
  const items=r.ids.map(id=>original.stock.find(i=>i.id===id));WMS.assert(items.every(Boolean),'Barang gabungan tidak ditemukan.');complete(original,items);
  const locations=new Map(original.locations.filter(l=>l.group===ss.mode).map(l=>[l.id,l])),to=locations.get(r.destination);
  WMS.assert(items.every(i=>locations.has(i.locationId))&&to&&to.kind==='rack','Pilih rak tujuan dalam gudang yang sama.');
  WMS.assert(count(items)>=2,'Barang ini sudah berada dalam satu pallet gabungan.');
  const first=items[0];WMS.assert(items.every(i=>['sku','kp','unit','status'].every(k=>i[k]===first[k])),'Gabungkan hanya produk, KP, satuan, dan status yang sama.');
  WMS.assert(items.every(i=>WMS.pallet(i.palletNo)),'Isi nomor pallet asal sebelum menggabungkan.');
  const ids=new Set(r.ids);WMS.assert(original.stock.filter(i=>i.locationId===to.id).every(i=>ids.has(i.id)),'Rak tujuan berisi barang lain. Pilih seluruh isi tujuan atau rak kosong.');
  const palletId=r.palletId||uuid();WMS.assert(/^[A-Za-z0-9-]{20,100}$/.test(palletId)&&!original.stock.some(i=>i.palletId===palletId||i.id===palletId),'ID pallet gabungan tidak valid / sudah dipakai.');
  const labels=[...new Set(items.flatMap(i=>label(i).split(',')))];const palletLabel=labels.join(',');WMS.assert(palletLabel.length<=2200,'Identitas pallet gabungan terlalu panjang.');
  const data=JSON.parse(JSON.stringify(original));
  for(const i of data.stock)if(ids.has(i.id))Object.assign(i,{palletId,palletLabel,locationId:to.id,updatedAt:now,sessionId:ss.id});
  for(const d of data.deliveryNotes||[]){if(d.state!=='DRAFT'||d.mode!==ss.mode)continue;let changed=false;
   for(const l of d.lines)if(ids.has(l.itemId)){Object.assign(l,{palletId,palletLabel,locationId:to.id,room:to.room,location:to.display});changed=true;}
   if(changed){d.revision++;d.updatedAt=now;}
  }
  data.version++;return data;
 }
 return {key,label,count,expand,complete,merge};
})();

/* v1.5.4 is additive: keep existing location IDs, custom functions, stock and history. */
const Layout154=(()=>{
 function merge(locations){
  const ids=new Set(locations.map(l=>l.id));
  const added=defaultLocations_().filter(l=>l.room==='CHILLER C2'&&!ids.has(l.id));
  return {locations:locations.concat(added),added};
 }
 return {merge};
})();

/* Draft lines reserve quantities; issue commits physical stock + immutable history. */
const Delivery=(()=>{
  const clone=x=>JSON.parse(JSON.stringify(x)),assert=WMS.assert;
  const fields=['id','number','mode','state','date','destination','note','createdAt','createdBy','createdName','updatedAt','revision','confirmedAt','confirmedBy','confirmedName','cancelledAt','truck','shift','pickingNumber','sjNumber'];
  const lineFields=['itemId','locationId','room','location','sku','kp','exp','qty','unit','palletNo','spv','status','note','palletId','palletLabel'];
  const identity=['locationId','sku','kp','exp','unit','palletNo','spv','status','palletId','palletLabel'];
  const validId=id=>typeof id==='string'&&/^[A-Za-z0-9-]{20,100}$/.test(id);
  const clean=(v,max,label)=>{const s=String(v??'').trim();assert(s.length<=max&&!/[\r\n]/.test(s),label+' maksimal '+max+' karakter, satu baris.');return s;};
  const find=(data,id)=>(data.deliveryNotes||[]).find(d=>d.id===id);
  // Derived from all open drafts, never a second mutable balance or a shift filter.
  function reservationIndex(data,exceptId){const index=new Map();for(const d of data.deliveryNotes||[]){if(d.state!=='DRAFT'||d.id===exceptId)continue;for(const l of d.lines){const key=d.mode+':'+l.itemId;if(!index.has(key))index.set(key,[]);index.get(key).push({documentId:d.id,number:d.pickingNumber||d.number,truck:d.truck||d.destination,qty:Number(l.qty)});}}return index;}
  function availability(data,itemId,exceptId,index){const item=data.stock.find(i=>i.id===itemId),loc=item&&data.locations.find(l=>l.id===item.locationId);const allocations=loc?(index||reservationIndex(data,exceptId)).get(loc.group+':'+itemId)||[]:[];const physical=Number(item?.qty)||0,reserved=allocations.reduce((n,a)=>n+a.qty,0);return {physical,reserved,available:Math.max(0,physical-reserved),overbooked:reserved>physical,allocations};}
  function fingerprint(data,id){const d=find(data,id);return JSON.stringify(d?[[...fields.slice(0,19).map(k=>d[k]??''),...(d.sjNumber?[d.sjNumber]:[])],d.lines.map(l=>[...lineFields.slice(0,13).map(k=>l[k]??''),...(l.palletId?[l.palletId,l.palletLabel]:[])])]:null);}
  function suratJalan(value){assert(typeof value==='string','No. SJ wajib diisi dari surat jalan SAP.');const sj=clean(value,80,'No. SJ');assert(sj&&!/[\u0000-\u001f\u007f]/.test(sj),'No. SJ wajib diisi, tanpa karakter kontrol.');return sj;}
  function locations(data,request){
    const ids=request.action==='saveDelivery'?(request.lines||[]).map(l=>l.itemId):(find(data,request.documentId)?.lines||[]).map(l=>l.itemId);
    return [...new Set(data.stock.filter(i=>ids.includes(i.id)).map(i=>i.locationId))];
  }
  function mutate(original,request,ss,uuid,now){
    assert(request.version===original.version,'CONFLICT: Data berubah. Muat ulang sebelum menyimpan.');
    if(request.action==='correctItem'){
      const old=original.stock.find(i=>i.id===request.itemId),loc=old&&original.locations.find(l=>l.id===old.locationId&&l.group===ss.mode);
      assert(loc,'Item koreksi tidak ditemukan dalam gudang sesi.');
      assert(request.before&&['locationId','sku','kp','qty','palletNo','spv','note','status','updatedAt','palletId','palletLabel'].every(k=>String(request.before[k]??'')===String(old[k]??'')),'CONFLICT: Data barang berubah sejak formulir dibuka. Buka ulang Koreksi data.');
      const reason=clean(request.reason,500,'Alasan koreksi');assert(reason.length>=5,'Isi alasan koreksi minimal 5 karakter.');
      const next=WMS.item({...old,...request.item,unit:old.unit,status:old.status},loc,original.skus,old.id,now,ss.id);
      const changed=['sku','kp','qty','palletNo','spv','note'].filter(k=>String(next[k]??'')!==String(old[k]??''));
      assert(changed.length,'Tidak ada perubahan data.');
      assert(!old.palletId||!changed.some(k=>['sku','kp','palletNo'].includes(k)),'Identitas komponen pallet gabungan perlu dipisahkan dahulu; koreksi QTY/SPV/catatan tetap tersedia.');
      const allocation=availability(original,old.id);assert(next.qty>=allocation.reserved,'Jumlah koreksi lebih kecil dari alokasi picking. Kurangi atau batalkan draft terkait dahulu.');
      const identityChanged=changed.some(k=>['sku','kp','palletNo','spv'].includes(k));
      assert(!identityChanged||allocation.reserved===0,'Barang masih dialokasikan picking. Hapus dari draft sebelum koreksi identitas.');
      assert(!identityChanged||!(original.deliveryNotes||[]).some(d=>d.state==='ISSUED'&&d.lines.some(l=>l.itemId===old.id)),'Identitas sudah dipakai pengiriman. Perlu rekonsiliasi admin; riwayat SJ tidak boleh berubah. Koreksi QTY/catatan masih bisa.');
      const data=clone(original),i=data.stock.find(i=>i.id===old.id);Object.assign(i,next);
      if(old.palletId){i.palletId=old.palletId;i.palletLabel=old.palletLabel;}
      data.version++;return data;
    }
    if(request.action==='mergePallet')return Pallets.merge(original,request,ss,uuid,now);
    if(request.action==='moveBatch'){
      assert(Array.isArray(request.rows)&&request.rows.length>0&&request.rows.length<=100,'Pilih 1–100 item untuk dipindahkan.');
      const seen=new Set(),targets=new Map(),locations=new Map(original.locations.filter(l=>l.group===ss.mode).map(l=>[l.id,l]));
      const rows=request.rows.map(r=>{
        assert(r&&!seen.has(r.itemId),'Item pindah duplikat.');seen.add(r.itemId);
        const item=original.stock.find(i=>i.id===r.itemId),to=locations.get(r.destination);
        assert(item&&locations.has(item.locationId),'Item tidak ditemukan atau di luar area sesi.');
        assert(item.locationId===r.from,'CONFLICT: Lokasi asal barang berubah. Susun ulang perpindahan.');
        assert(to&&to.kind==='rack','Pilih rak tujuan dalam area sesi.');
        assert(to.id!==item.locationId,'Tujuan harus berbeda dari lokasi asal.');
        assert(!targets.has(to.id)||item.palletId&&targets.get(to.id)===item.palletId,'Setiap pallet fisik harus memiliki rak tujuan berbeda.');targets.set(to.id,item.palletId||item.id);
        assert(!original.stock.some(i=>i.locationId===to.id),'CONFLICT: Rak '+to.display+' sudah terisi. Pilih rak kosong.');
        return {item,to};
      });
      Pallets.complete(original,rows.map(r=>r.item));
      const groupTargets=new Map();for(const r of rows){const k=Pallets.key(r.item);assert(!groupTargets.has(k)||groupTargets.get(k)===r.to.id,'Pallet gabungan harus dipindahkan utuh ke satu tujuan.');groupTargets.set(k,r.to.id);}
      const data=clone(original),moved=new Map(rows.map(r=>[r.item.id,r]));
      for(const item of data.stock){const r=moved.get(item.id);if(r)Object.assign(item,{locationId:r.to.id,updatedAt:now,sessionId:ss.id});}
      // Draft allocations follow the same item ID. Never rewrite issued/cancelled history,
      // or silently repair any previously stale product/status snapshot.
      for(const d of data.deliveryNotes||[]){
        if(d.state!=='DRAFT'||d.mode!==ss.mode)continue;let changed=false;
        for(const line of d.lines){const r=moved.get(line.itemId);if(r&&line.locationId===r.item.locationId){Object.assign(line,{locationId:r.to.id,room:r.to.room,location:r.to.display});changed=true;}}
        if(changed){d.revision++;d.updatedAt=now;}
      }
      data.version++;return data;
    }
    if(request.action==='bulkReceive'){
      assert(Array.isArray(request.rows)&&request.rows.length>0&&request.rows.length<=100,'Pilih 1–100 rak kosong.');
      const used=new Set(original.stock.map(i=>i.id)),seen=new Set();let room;
      const rows=request.rows.map(raw=>{
        const loc=original.locations.find(l=>l.id===raw.locationId);
        assert(loc&&loc.kind==='rack'&&loc.group===ss.mode,'Pilih rak dalam area sesi.');
        if(room===undefined||room===null)room=loc.room;assert(loc.room===room,'Pilih rak dalam satu ruangan.');
        assert(!seen.has(loc.id),'Rak duplikat.');seen.add(loc.id);
        assert(!original.stock.some(i=>i.locationId===loc.id),'CONFLICT: Rak '+loc.display+' sudah terisi. Pilih rak kosong.');
        const id=raw.id||uuid();assert(validId(id)&&!used.has(id),'ID item tidak valid atau duplikat.');used.add(id);
        return WMS.item({...request.item,unit:'CTN',qty:raw.qty,palletNo:raw.palletNo},loc,original.skus,id,now,ss.id);
      });
      const data=clone(original);data.stock.push(...rows);data.version++;return data;
    }
    if(!['saveDelivery','issueDelivery','cancelDelivery'].includes(request.action)){
      assert(request.action!=='delete','Barang keluar harus dicatat melalui delivery note.');
      if(request.action==='saveSlot'){
        for(const old of original.stock.filter(i=>i.locationId===request.locationId)){
          const next=(request.items||[]).find(i=>i.id===old.id);
          assert(next&&Number(next.qty)>=old.qty,'Gunakan delivery note untuk mengurangi atau mengeluarkan stok.');
          assert(['sku','kp','palletNo','spv'].every(k=>String(k==='palletNo'?WMS.pallet(next[k]):next[k]??'')===String(k==='palletNo'?WMS.pallet(old[k]):old[k]??'')),'Gunakan Koreksi data untuk mengubah SKU, KP, nomor pallet, atau SPV.');
          assert((next.unit||'CTN')===old.unit,'Satuan stok tersimpan tidak dapat diubah.');
        }
      }
      if(request.action==='move')Pallets.complete(original,original.stock.filter(i=>(request.ids||[]).includes(i.id)));
      const next=WMS.mutate(original,request,ss,uuid,now);
      for(const i of next.stock){const old=original.stock.find(o=>o.id===i.id);if(old?.palletId){
       assert(['sku','kp','unit','palletNo'].every(k=>i[k]===old[k])&&i.qty===old.qty,'Identitas dan jumlah komponen gabungan tidak dapat diedit langsung. Pengeluaran melalui picking.');
       i.palletId=old.palletId;i.palletLabel=old.palletLabel;
      }}
      for(const id of new Set(next.stock.filter(i=>i.palletId).map(i=>i.palletId))){const members=next.stock.filter(i=>i.palletId===id);assert(members.every(i=>i.status===members[0].status),'Status Hold / update berlaku untuk seluruh pallet gabungan. Samakan status seluruh komponennya.');}
      return next;
    }
    const data=clone(original);if(!data.deliveryNotes)data.deliveryNotes=[];
    assert(validId(request.documentId),'ID delivery note tidak valid.');
    let d=find(data,request.documentId);
    if(d){assert(d.mode===ss.mode,'Delivery note di luar area sesi.');assert(d.state==='DRAFT','Delivery note sudah diproses dan tidak dapat diubah.');assert(request.documentRevision===d.revision,'CONFLICT: Delivery note berubah. Muat ulang.');}
    else assert(request.action==='saveDelivery'&&request.documentRevision===0,'Delivery note tidak ditemukan.');
    if(request.action==='saveDelivery'){
      WMS.date(request.date);const destination=clean(request.destination,120,'Tujuan/penerima'),note=clean(request.note,500,'Catatan');assert(destination,'Isi tujuan/penerima.');
      assert(Array.isArray(request.lines)&&request.lines.length>0&&request.lines.length<=100,'Pilih 1–100 item untuk picklist.');
      const reservations=reservationIndex(data,request.documentId),seen=new Set(),lines=request.lines.map(raw=>{
        assert(!seen.has(raw.itemId),'Item picklist duplikat.');seen.add(raw.itemId);
        const item=data.stock.find(i=>i.id===raw.itemId),loc=item&&data.locations.find(l=>l.id===item.locationId&&l.group===ss.mode);assert(loc,'Stok picklist tidak ditemukan dalam area sesi.');
        const qty=Number(raw.qty);assert(Number.isInteger(qty)&&qty>0&&qty<=item.qty,'Jumlah ambil harus 1 sampai stok tersedia.');
        const free=availability(data,item.id,request.documentId,reservations);assert(qty<=free.available,'Sisa tersedia untuk picking '+item.sku+' di '+loc.display+': '+free.available+' '+item.unit+'. '+free.reserved+' '+item.unit+' dicadangkan picking lain. Kurangi jumlah atau edit/batalkan draft terkait.');
        return {itemId:item.id,locationId:loc.id,room:loc.room,location:loc.display,sku:item.sku,kp:item.kp,exp:item.exp,qty,unit:item.unit,palletNo:item.palletNo||'',spv:item.spv,status:item.status,note:item.note,...(item.palletId?{palletId:item.palletId,palletLabel:item.palletLabel}:{})};
      });
      if(!d){const number='DN-'+ss.mode+'-'+request.date.replace(/-/g,'')+'-'+request.documentId.replace(/-/g,'').slice(0,12).toUpperCase();assert(!data.deliveryNotes.some(x=>x.number===number),'Nomor dokumen sudah ada. Buat draft baru.');d={id:request.documentId,number,mode:ss.mode,state:'DRAFT',date:request.date,destination,note,createdAt:now,createdBy:ss.id,createdName:ss.name,updatedAt:now,revision:0,confirmedAt:'',confirmedBy:'',confirmedName:'',cancelledAt:'',lines:[]};data.deliveryNotes.push(d);}
      Object.assign(d,{date:request.date,destination,note,lines});
      if(request.truck!==undefined){const truck=clean(request.truck,80,'Identitas truk');assert(truck,'Isi nomor polisi atau identitas truk.');d.truck=truck;}
      if(request.shift!==undefined){assert(['S1','S2','S3'].includes(request.shift),'Pilih shift picking.');d.shift=request.shift;}else if(!d.shift)d.shift=ss.shift;
      if(!d.pickingNumber)d.pickingNumber='PL-'+d.mode+'-'+d.date.replace(/-/g,'')+'-'+d.id.replace(/-/g,'').slice(0,12).toUpperCase();
    }else if(request.action==='issueDelivery'){
      const sjNumber=suratJalan(request.sjNumber);
      const reservations=reservationIndex(data,d.id);
      for(const line of d.lines){const item=data.stock.find(i=>i.id===line.itemId);assert(item&&identity.every(k=>(k==='palletNo'?WMS.pallet(item[k]):item[k]??'')===(k==='palletNo'?WMS.pallet(line[k]):line[k]??'')),'Isi/lokasi barang berubah sejak picklist dibuat. Perbarui draft terlebih dahulu.');assert(item.qty>=line.qty,'Stok tidak cukup untuk '+line.sku+' di '+line.location+'.');}
      for(const line of d.lines){const free=availability(data,line.itemId,d.id,reservations);assert(line.qty<=free.available,'Alokasi picking melebihi stok '+line.sku+' di '+line.location+'. Sisa tersedia '+free.available+' '+line.unit+'. Edit/batalkan draft yang bertumpang tindih sebelum selesai muat.');}
      for(const line of d.lines){const item=data.stock.find(i=>i.id===line.itemId);item.qty-=line.qty;item.updatedAt=now;item.sessionId=ss.id;}
      data.stock=data.stock.filter(i=>i.qty>0);Object.assign(d,{state:'ISSUED',sjNumber,confirmedAt:now,confirmedBy:ss.id,confirmedName:ss.name});
    }else {d.state='CANCELLED';d.cancelledAt=now;}
    d.updatedAt=now;d.revision++;data.version++;return data;
  }
  function text(d,kind){if(kind==='picking'){const body=text({...d,state:'DRAFT'},'raw');return body.replace('PICKLIST — DRAFT (BELUM MENGURANGI STOK)',d.state==='ISSUED'?'PICKING LIST — SELESAI MUAT':d.state==='CANCELLED'?'PICKING LIST — DIBATALKAN':'PICKING LIST — BELUM MENGURANGI STOK').replace(d.number,d.pickingNumber||d.number);}
    const title=d.state==='DRAFT'?'PICKLIST — DRAFT (BELUM MENGURANGI STOK)':d.state==='ISSUED'?'DELIVERY NOTE — BARANG KELUAR':'DELIVERY NOTE — DIBATALKAN';
    return [title,...(d.state==='ISSUED'?['No. SJ: '+(d.sjNumber||'Belum tercatat (dokumen lama)'),'Referensi internal: '+d.number]:[d.number]),'Tanggal: '+d.date,'Area: '+d.mode,...(d.shift?['Shift: '+d.shift]:[]),...(d.truck?['Truk: '+d.truck]:[]),...(d.state==='ISSUED'&&d.pickingNumber?['Picking list: '+d.pickingNumber]:[]),'Tujuan: '+d.destination,'Dibuat oleh: '+d.createdName,...(d.confirmedAt?['Dikonfirmasi oleh: '+d.confirmedName,'Waktu keluar: '+d.confirmedAt]:[]),'',...d.lines.map((l,n)=>`${n+1}. ${l.room} / ${l.location} | ${l.sku} | KP ${l.kp} | ${l.qty} ${l.unit}${l.spv?' | SPV '+l.spv:''} | ${l.status}${l.palletNo?' | Pallet '+Pallets.label(l)+(l.palletId?' (asal P '+WMS.pallet(l.palletNo)+')':''):''}${l.note?' | '+l.note:''}`),'',...['CTN','PACK'].map(u=>[u,d.lines.filter(l=>l.unit===u).reduce((n,l)=>n+l.qty,0)]).filter(([,n])=>n).map(([u,n])=>'Total: '+n+' '+u),...(d.note?['Catatan: '+d.note]:[])].join('\n');
  }
  return {fields,lineFields,identity,validId,find,fingerprint,locations,mutate,text,reservationIndex,availability,suratJalan};
})();

/* Shared export rules. Receipt snapshots survive moves, edits and exhausted stock. */
const StockExport=(()=>{
 const master=[
 ['KM-037','PCN','FROZEN'],['KM-038','CCN','FROZEN'],['KM-053','SOSIS HOT','CHILLER'],['KM-054','CCN STICK','FROZEN'],
 ['KM-056','BENFARM ORI','FROZEN'],['KM-057','BAKSO ORI','CHILLER'],['KM-058','BAKSO KEJU','CHILLER'],['KM-059','BENFARM STICK','FROZEN'],
 ['KM-060','BAKSO HOT','CHILLER'],['KM-061','SOSIS GOCHUJANG','CHILLER'],['KM-062','CCN MINI','FROZEN'],['KM-063','S. ORI GT','CHILLER'],
 ['KM-064','S. HOT GT','CHILLER'],['KM-065','SOSIS KEJU 2X','CHILLER'],['KM-066','CCN SPICY','FROZEN'],['KM-067','CCN 250 GR','FROZEN'],
 ['KM-068','BAKSO GOCHUJANG','CHILLER'],['KM-069','STICK 250 GR','FROZEN'],['KM-070','CHICKEN WINGS','FROZEN'],['KM-071','SOSIS TOMYUM','CHILLER']];
 const aliases={PCN:'KM-037',CCN:'KM-038',SH:'KM-053',CCS:'KM-054',BO:'KM-057',BK:'KM-058',BH:'KM-060',SG:'KM-061',SK:'KM-065',SPC:'KM-066','CCN 250':'KM-067',BG:'KM-068','CCS 250':'KM-069',CW:'KM-070',STY:'KM-071'};
 const fields=['id','type','mode','date','shift','at','itemId','sku','kp','palletNo','qty','unit','status','locationId','room','documentId','documentNo','truck','destination','note','name','palletId','palletLabel','sjNumber','beforeJson','afterJson','reason'];
 const schema='coldstock-excel-162';
 const headers={IN:['Date','Shift','SKU','Products','Kode Produksi','QTY','No. Palet asal','Category','Status','ID Item asal','ID Trans','Gudang','Ruangan','Remarks'],OUT:['Date','Shift','SKU','Products','Kode Produksi','QTY','No. Palet asal','Label Palet','Category','No. SJ','Plat Truk','Tujuan','ID Item asal','ID Trans','ID Palet fisik','No. Dokumen internal','Gudang','Ruangan']};
 headers.KOREKSI=['Date','Shift','SKU','Products','Kode Produksi','Koreksi CTN','No. Palet asal','Category','Status','ID Item asal','ID Trans','Gudang','Ruangan','Remarks','QTY sebelum','QTY sesudah','SKU sebelum','KP sebelum','Palet sebelum','SPV sebelum','SPV sesudah','Alasan koreksi','Nama SK','Waktu koreksi','Urutan'];
 function product(sku){const value=String(sku||'').trim().toUpperCase(),code=aliases[value]||value;return master.find(m=>m[0]===code||m[1]===value)||null;}
 function capture(before,after,request,ss,operationId,at){
  const rows=[],old=new Map(before.stock.map(i=>[i.id,i]));
  if(['saveSlot','bulkReceive'].includes(request.action))for(const i of after.stock){
   const previous=old.get(i.id),qty=Number(i.qty)-(previous?Number(previous.qty):0);if(qty<=0)continue;
   const loc=after.locations.find(l=>l.id===i.locationId);WMS.assert(loc&&loc.group===ss.mode,'Penerimaan di luar gudang sesi.');
   rows.push({id:'IN-'+operationId+'-'+i.id,type:'IN',mode:ss.mode,date:ss.date,shift:ss.shift,at,itemId:i.id,sku:i.sku,kp:i.kp,palletNo:i.palletNo||'',qty,unit:i.unit,status:i.status,locationId:i.locationId,room:loc.room,documentId:'',documentNo:'',truck:'',destination:'',note:i.note||'',name:ss.name});
  }
  if(request.action==='correctItem'){
   const previous=old.get(request.itemId),i=after.stock.find(i=>i.id===request.itemId),loc=after.locations.find(l=>l.id===i.locationId);
   rows.push({id:'COR-'+operationId+'-'+i.id,type:'KOREKSI',mode:ss.mode,date:ss.date,shift:ss.shift,at,itemId:i.id,sku:i.sku,kp:i.kp,palletNo:i.palletNo||'',qty:i.qty-previous.qty,unit:i.unit,status:i.status,locationId:i.locationId,room:loc.room,note:i.note||'',name:ss.name,beforeJson:JSON.stringify(previous),afterJson:JSON.stringify(i),reason:request.reason});
  }
  if(request.action==='issueDelivery'){
   const d=(after.deliveryNotes||[]).find(d=>d.id===request.documentId);
   WMS.assert(d&&d.state==='ISSUED','Dokumen keluar belum dikonfirmasi.');
   rows.push(...outRows(d,ss.date,ss.shift,ss.name));
  }
  return rows;
 }
 function outRows(d,date,shift,name){return d.lines.map((l,n)=>({id:'OUT-'+d.id+'-'+n,type:'OUT',mode:d.mode,date,shift:shift||'',at:d.confirmedAt,itemId:l.itemId,sku:l.sku,kp:l.kp,palletNo:l.palletNo||'',qty:Number(l.qty),unit:l.unit,status:l.status,locationId:l.locationId,room:l.room,documentId:d.id,documentNo:d.number,sjNumber:d.sjNumber||'',truck:d.truck||'',destination:d.destination||'',note:l.note||'',name:name||d.confirmedName||'',palletId:l.palletId||'',palletLabel:l.palletLabel||''}));}
 function identityKey(r){return product(r.sku)?.[0]||r.sku;}
 function reportId(id,r){return id+'-'+identityKey(r);}
 function jakartaDate(at){const t=Date.parse(at);return Number.isFinite(t)?new Date(t+7*3600000).toISOString().slice(0,10):'';}
 function allRows(ledger,documents,sessions,mode){
  const result=new Map();
  for(const r of ledger||[])if(r.mode===mode){WMS.assert(!result.has(r.id),'ID transaksi ekspor duplikat. Periksa Transaction_Log.');result.set(r.id,{...r});}
  // Pre-patch DN snapshots are valid OUT evidence. Current stock is never fabricated as IN.
  for(const d of documents||[])if(d.mode===mode&&d.state==='ISSUED'){
   const actor=(sessions||[]).find(s=>s.id===d.confirmedBy),date=actor?.date||jakartaDate(d.confirmedAt);
   for(const row of outRows(d,date,actor?.shift||'',actor?.name))if(!result.has(row.id))result.set(row.id,{...row,legacy:true});
  }
  const rows=[...result.values()],groups=new Map();
  rows.forEach((r,n)=>{if(r.type==='KOREKSI')r.sequence=n+1;});
  for(const r of rows)if(r.type==='IN'){if(!groups.has(r.itemId))groups.set(r.itemId,new Set());groups.get(r.itemId).add(identityKey(r));}
  for(const r of rows)if((groups.get(r.itemId)?.size||0)>1){
   if(!['e8113d62-4f51-46f3-bb65-c70b1a9a5afe','bb6eeeed-2761-40c1-adbe-01f478f0f15d','0a9fd36c-28a9-44d8-9908-2c22e76ca3a9'].includes(r.itemId)){r.identityConflict=true;continue;}
   const basis=r.type==='KOREKSI'?JSON.parse(r.beforeJson):r;
   r.itemId=reportId(r.itemId,basis);r.identityRepaired=true;
  }
  return rows.sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.at).localeCompare(String(b.at))||a.id.localeCompare(b.id));
 }
 function select(rows,mode,f){
  WMS.assert(['IN','OUT','KOREKSI'].includes(f.type),'Pilih tab IN atau OUT.');
  if(f.from)WMS.date(f.from);if(f.to)WMS.date(f.to);
  WMS.assert(!f.from||!f.to||f.from<=f.to,'Tanggal awal tidak boleh melewati tanggal akhir.');
  return rows.filter(r=>r.mode===mode&&r.type===f.type&&(!f.from||r.date>=f.from)&&(!f.to||r.date<=f.to)&&(!f.shift||r.shift===f.shift)&&(!f.room||r.room===f.room));
 }
 function issues(rows){const messages=new Set();for(const r of rows){if(r.identityConflict)messages.add('Satu ID dipakai beberapa SKU. Rekonsiliasi riwayat dahulu: '+r.itemId);if(!product(r.sku))messages.add('SKU belum dipetakan: '+r.sku);if(r.unit!=='CTN')messages.add('Satuan '+r.unit+' belum dapat diekspor sebagai CTN.');if(!/^\d{4}-\d{2}-\d{2}$/.test(r.date))messages.add('Ada tanggal transaksi yang tidak tersedia.');if(!Number.isInteger(Number(r.qty))||(r.type!=='KOREKSI'&&Number(r.qty)<=0))messages.add('Jumlah transaksi tidak valid.');}return [...messages];}
 function values(r){const p=product(r.sku)||[r.sku,'BELUM DIPETAKAN',''],common=[r.date,String(r.shift||'').replace(/^S/,''),p[0],p[1],r.kp];if(r.type==='KOREKSI'){const b=JSON.parse(r.beforeJson),a=JSON.parse(r.afterJson);return [...common,Number(r.qty),r.palletNo,p[2],r.status,r.itemId,r.id,r.mode,r.room,r.note||'',b.qty,a.qty,product(b.sku)?.[0]||b.sku,b.kp,b.palletNo,b.spv||'',a.spv||'',r.reason,r.name,r.at,r.sequence||0];}return r.type==='IN'?[...common,Number(r.qty),r.palletNo,p[2],r.status,r.itemId||'',r.id,r.mode,r.room,r.note||'']:[...common,Number(r.qty),r.palletNo,r.palletLabel||r.palletNo,p[2],r.sjNumber||'',r.truck,r.destination,r.itemId||'',r.id,r.palletId||r.itemId||'',r.documentNo,r.mode,r.room];}
 function cell(v){if(typeof v==='number')return String(v);let s=String(v??'').replace(/[\t\r\n\u0000-\u001f\ufeff]+/g,' ').trim();if(/^[=+@"\-]/.test(s)||/^\d{16,}$/.test(s)||/^0\d+$/.test(s))s="'"+s;return s;}
 function tsv(rows,type,withHeader){const errors=issues(rows);WMS.assert(!errors.length,errors.join(' '));WMS.assert(rows.every(r=>r.type===type),'Jenis transaksi tercampur.');const lines=rows.map(values);if(withHeader)lines.unshift(headers[type]);return lines.map(row=>row.map(cell).join('\t')).join('\r\n');}
 return {schema,master,aliases,fields,headers,product,capture,outRows,allRows,select,issues,values,cell,tsv,jakartaDate,identityKey,reportId};
})();

/* Durable outbox: snapshot + transaction queue are persisted in ONE localStorage write. */
const Offline = (() => {
  const clone=x=>JSON.parse(JSON.stringify(x));
  const validId=x=>typeof x==='string'&&/^[A-Za-z0-9-]{20,100}$/.test(x);
  function fingerprint(data,id){
    if(id.startsWith('@delivery:'))return Delivery.fingerprint(data,id.slice(10));
    const loc=data.locations.find(l=>l.id===id);
    const items=data.stock.filter(i=>i.locationId===id).map(i=>['id','locationId','sku','kp','exp','qty','unit','palletNo','spv','status','note','updatedAt','sessionId'].map(k=>i[k]??'').concat(i.palletId?[i.palletId,i.palletLabel]:[]));
    items.sort((a,b)=>String(a[0]).localeCompare(String(b[0])));
    return JSON.stringify([loc?['id','room','group','block','bay','slot','display','order','kind','functionType'].map(k=>loc[k]):null,items]);
  }
  function touched(data,request){
    if(request.action==='mergePallet'){
      const ids=new Set(request.ids||[]),out=new Set(data.stock.filter(i=>ids.has(i.id)).map(i=>i.locationId));out.add(request.destination);
      for(const d of data.deliveryNotes||[])if(d.state==='DRAFT'&&d.lines.some(l=>ids.has(l.itemId)))out.add('@delivery:'+d.id);
      return [...out].sort();
    }
    if(request.action==='moveBatch'){
      const ids=new Set((request.rows||[]).map(r=>r.itemId)),out=new Set();
      for(const r of request.rows||[]){out.add(r.from);out.add(r.destination);}
      for(const i of data.stock)if(ids.has(i.id))out.add(i.locationId);
      for(const d of data.deliveryNotes||[])if(d.state==='DRAFT'&&d.lines.some(l=>ids.has(l.itemId)))out.add('@delivery:'+d.id);
      return [...out].sort();
    }
    if(request.action==='bulkReceive')return [...new Set((request.rows||[]).map(r=>r.locationId))].sort();
    if(['saveDelivery','issueDelivery','cancelDelivery'].includes(request.action))return ['@delivery:'+request.documentId,...Delivery.locations(data,request)];
    if(request.action==='correctItem')return data.stock.filter(i=>i.id===request.itemId).map(i=>i.locationId);
    if(request.action==='saveSlot')return [request.locationId];
    const ids=new Set(request.ids||[]),out=new Set(data.stock.filter(i=>ids.has(i.id)).map(i=>i.locationId));
    if(request.action==='move')out.add(request.destination);return [...out].sort();
  }
  function apply(data,op,session){
    const request=clone(op.request);request.version=data.version;
    const minted=[];
    if(request.action==='saveSlot'){
      const oldIds=new Set(data.stock.map(i=>i.id));
      request.items.forEach(i=>{WMS.assert(validId(i.id),'ID item offline tidak valid.');if(!oldIds.has(i.id)){minted.push(i.id);delete i.id;}});
    }
    return Delivery.mutate(data,request,session,()=>{const id=minted.shift();WMS.assert(id,'ID baru tidak tersedia.');return id;},op.createdAt);
  }
  function initial(data){return {schema:1,revision:0,data:clone(data),queue:[],inflight:null,cachedAt:new Date().toISOString()};}
  function enqueue(state,request,session,uuid,now){
    WMS.assert(state.queue.length<500,'Antrean mencapai 500 transaksi. SYNC terlebih dahulu.');
    WMS.assert(request.version===state.data.version,'CONFLICT: Data di tab lain berubah. Muat ulang data.');
    const req=clone(request);if(req.action==='mergePallet'&&!req.palletId)req.palletId=uuid();if(req.action==='saveSlot')req.items.forEach(i=>{if(!i.id)i.id=uuid();});
    if(req.action==='bulkReceive')req.rows.forEach(r=>{if(!r.id)r.id=uuid();});
    const op={id:uuid(),createdAt:now,actor:clone(session),request:req,expected:{}};
    touched(state.data,req).forEach(id=>{op.expected[id]=fingerprint(state.data,id);});
    const data=apply(state.data,op,session);
    return {...clone(state),revision:state.revision+1,data,queue:state.queue.concat([op])};
  }
  function freeze(state,uuid){if(state.inflight)return state;WMS.assert(state.queue.length,'Antrean kosong.');return {...clone(state),revision:state.revision+1,inflight:{id:uuid(),operations:clone(state.queue)}};}
  function acknowledge(state,response){
    WMS.assert(state.inflight&&response.batchId===state.inflight.id,'Konfirmasi sinkronisasi tidak cocok. Antrean dipertahankan.');
    const sent=state.inflight.operations.map(op=>op.id);
    WMS.assert(JSON.stringify(sent)===JSON.stringify(response.ackIds),'Konfirmasi transaksi tidak lengkap. Antrean dipertahankan.');
    const ack=new Set(sent),queue=state.queue.filter(op=>!ack.has(op.id));let data=clone(response.data);
    // A timeout can be followed by more edits. Reapply the unsent suffix, never discard it.
    for(const op of queue){for(const id of touched(data,op.request))WMS.assert(op.expected[id]===fingerprint(data,id),'CONFLICT: Transaksi baru perlu ditinjau. Antrean dipertahankan.');data=apply(data,op,op.actor);}
    return {...state,revision:state.revision+1,data,queue,inflight:null,cachedAt:new Date().toISOString()};
  }
  function read(storage,key){let raw;try{raw=storage.getItem(key);}catch{throw new Error('Penyimpanan HP tidak tersedia. Izinkan penyimpanan situs pada browser.');}if(!raw)return null;let state;try{state=JSON.parse(raw);}catch{throw new Error('Data offline tidak terbaca. Jangan hapus penyimpanan browser; pulihkan cadangan.');}WMS.assert(state.schema===1&&Array.isArray(state.queue)&&state.data&&Array.isArray(state.data.stock),'Format data offline tidak dikenal.');return state;}
  function write(storage,key,state,expectedRevision){
    const current=read(storage,key);WMS.assert((current?.revision??null)===expectedRevision,'CONFLICT: Penyimpanan berubah di tab lain. Muat ulang data.');
    try{storage.setItem(key,JSON.stringify(state));}catch{throw new Error('Penyimpanan HP penuh atau diblokir. Perubahan ini BELUM tersimpan. Form tetap terbuka; kosongkan ruang perangkat atau izinkan penyimpanan browser.');}
    return state;
  }
  return {clone,validId,fingerprint,touched,apply,initial,enqueue,freeze,acknowledge,read,write};
})();

/** Coldstock — Google Apps Script V8. Jalankan setupDatabase_ sekali di editor. */
const HEADERS_ = {
  Master_Lokasi:['Lokasi_ID','Ruangan','Kelompok','Blok','Bay','Slot','Slot_Display','Urutan','Jenis','Tipe_Fungsi'],
  Master_SKU:['SKU','Kelompok','Default_Qty','Shelf_Life_Hari'],
  Stock_Detail:['Item_ID','Lokasi_ID','SKU','KP','Exp_Date','Qty','Satuan','Kode_SPV','Status','Keterangan','Updated_At','Session_ID','No_Pallet','Physical_Pallet_ID','Pallet_Label'],
  User_Session:['Session_ID','Nama_SK','Tanggal','Shift','Mode','Created_At','Expires_At']
};
const KEYS_ = {
  Master_Lokasi:['id','room','group','block','bay','slot','display','order','kind','functionType'],
  Master_SKU:['code','group','defaultQty','shelfDays'],
  Stock_Detail:['id','locationId','sku','kp','exp','qty','unit','spv','status','note','updatedAt','sessionId','palletNo','palletId','palletLabel'],
  User_Session:['id','name','date','shift','mode','createdAt','expiresAt']
};
function doGet(){
 const source=HtmlService.createHtmlOutputFromFile('Index').getContent().replace('/* SERVER_CONFIG */','window.COLDSTOCK_DB = '+JSON.stringify(db_().getId())+';');
 const output=HtmlService.createHtmlOutput(source).setTitle('Coldstock · Manajemen Cold Storage').addMetaTag('viewport','width=device-width, initial-scale=1, viewport-fit=cover');
 const favicon=String(PropertiesService.getScriptProperties().getProperty('COLDSTOCK_FAVICON_URL')||'').trim();
 // An optional branding setting must never prevent opening the stock application.
 if(favicon){try{if(!/^https:\/\//i.test(favicon))throw new Error('Gunakan URL gambar HTTPS.');output.setFaviconUrl(favicon);}catch(error){console.warn('Favicon belum diterapkan: '+error.message);}}
 return output;
}
function db_(){const id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');const db=id?SpreadsheetApp.openById(id):SpreadsheetApp.getActiveSpreadsheet();if(!db)throw new Error('Isi SPREADSHEET_ID di Script Properties atau gunakan script terikat Google Sheets.');return db;}
function locked_(fn){const lock=LockService.getScriptLock();lock.waitLock(25000);try{return fn();}finally{lock.releaseLock();}}
function migratePalletColumn_(s){
  if(!s||s.getLastRow()===0)return;
  const headers=s.getRange(1,1,1,13).getValues()[0];
  WMS.assert(JSON.stringify(headers.slice(0,12))===JSON.stringify(HEADERS_.Stock_Detail.slice(0,12)),'Header Stock_Detail tidak sesuai. Periksa skema sebelum melanjutkan.');
  WMS.assert(!headers[12]||headers[12]==='No_Pallet','Kolom ke-13 Stock_Detail sudah digunakan. Pindahkan kolom tambahan sebelum upgrade.');
  if(!headers[12])s.getRange(1,13,1,1).setValues([['No_Pallet']]).setBackground('#173e74').setFontColor('#ffffff').setFontWeight('bold');
}
function sheet_(name){const s=db_().getSheetByName(name);if(!s)throw new Error('Database belum disiapkan. Jalankan setupDatabase_ di editor.');if(name==='Stock_Detail'){migratePalletColumn_(s);migratePhysicalPalletColumns_(s);}return s;}
function read_(name){const s=sheet_(name);if(s.getLastRow()<2)return [];return s.getRange(2,1,s.getLastRow()-1,KEYS_[name].length).getValues().filter(r=>r[0]!=='').map(row=>Object.fromEntries(KEYS_[name].map((k,n)=>[k,row[n] instanceof Date?Utilities.formatDate(row[n],'Asia/Jakarta',k==='date'||k==='kp'||k==='exp'?'yyyy-MM-dd':"yyyy-MM-dd'T'HH:mm:ssXXX"):row[n]])));}
function safeCell_(v){return typeof v==='string'&&/^[=+@-]/.test(v)?"'"+v:v;}
function write_(name,objects){const s=sheet_(name),width=KEYS_[name].length,old=s.getLastRow();if(objects.length){if(s.getMaxRows()<objects.length+1)s.insertRowsAfter(s.getMaxRows(),objects.length+1-s.getMaxRows());const range=s.getRange(2,1,objects.length,width);range.setNumberFormat('@');range.setValues(objects.map(o=>KEYS_[name].map(k=>safeCell_(o[k]===undefined?'':o[k]))));}if(old>objects.length+1)s.getRange(objects.length+2,1,old-objects.length-1,width).clearContent();}
function setupDatabase_(){return locked_(()=>{const db=db_();PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID',db.getId());Object.keys(HEADERS_).forEach(name=>{let s=db.getSheetByName(name);if(!s)s=db.insertSheet(name);if(s.getLastRow()===0){s.getRange(1,1,1,HEADERS_[name].length).setValues([HEADERS_[name]]).setBackground('#173e74').setFontColor('#ffffff').setFontWeight('bold');s.setFrozenRows(1);if(name==='Master_Lokasi')write_(name,defaultLocations_());if(name==='Master_SKU')write_(name,WMS.SKU);}else {if(name==='Stock_Detail'){migratePalletColumn_(s);migratePhysicalPalletColumns_(s);}const headers=s.getRange(1,1,1,HEADERS_[name].length).getValues()[0];WMS.assert(JSON.stringify(headers)===JSON.stringify(HEADERS_[name]),'Header '+name+' tidak sesuai. Gunakan spreadsheet baru atau migrasikan manual.');}});if(!PropertiesService.getScriptProperties().getProperty('WMS_REV'))PropertiesService.getScriptProperties().setProperty('WMS_REV','0');return 'Database siap. Stok dimulai kosong.';});}
function auth_(id){WMS.assert(typeof id==='string'&&id.length>=20,'Sesi tidak valid.');const s=read_('User_Session').find(s=>s.id===id);WMS.assert(s&&new Date(s.expiresAt).getTime()>Date.now(),'Sesi kedaluwarsa. Refresh dan mulai shift kembali.');return s;}
// Called only inside locked_ via snapshot_. Append only missing C2 IDs; retry is idempotent.
function ensureLayout154_(){
 const result=Layout154.merge(read_('Master_Lokasi'));if(!result.added.length)return result.locations;
 WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API pada Services untuk memperbarui layout Chiller 2. Data lama tetap tersimpan.');
 const s=sheet_('Master_Lokasi'),rows=result.added.map(l=>KEYS_.Master_Lokasi.map(k=>l[k]));
 const props=PropertiesService.getScriptProperties();props.setProperty('WMS_REV',String(Number(props.getProperty('WMS_REV')||0)+1));
 SpreadsheetApp.flush();Sheets.Spreadsheets.batchUpdate({requests:updateCells_(s,rows,KEYS_.Master_Lokasi.length,s.getLastRow())},db_().getId());
 return result.locations;
}
function snapshot_(){const locations=ensureLayout154_();return {deliveryNotes:readDeliveries_(),locations:locations.map(l=>({...l,bay:Number(l.bay),slot:Number(l.slot),order:Number(l.order)})),skus:read_('Master_SKU').map(s=>({...s,defaultQty:Number(s.defaultQty),shelfDays:Number(s.shelfDays)})),stock:read_('Stock_Detail').map(i=>({...i,qty:Number(i.qty)})),version:Number(PropertiesService.getScriptProperties().getProperty('WMS_REV')||0)};}
function filtered_(data,ss){const locations=data.locations.filter(l=>l.group===ss.mode),ids=new Set(locations.map(l=>l.id));return {...data,deliveryNotes:(data.deliveryNotes||[]).filter(d=>d.mode===ss.mode),locations,skus:data.skus.filter(s=>s.group===ss.mode),stock:data.stock.filter(i=>ids.has(i.locationId))};}
function startSession(input){return locked_(()=>{const ss={...WMS.session(input),id:Utilities.getUuid(),createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+12*3600000).toISOString()};const s=sheet_('User_Session');s.appendRow(KEYS_.User_Session.map(k=>safeCell_(ss[k])));SpreadsheetApp.flush();return {session:ss,data:filtered_(snapshot_(),ss)};});}
function getBootstrap(sessionId){return locked_(()=>{const ss=auth_(sessionId);return filtered_(snapshot_(),ss);});}
function mutateStock(sessionId,request){WMS.assert(['saveSlot','move'].includes(request.action),'Gunakan SYNC / delivery note untuk pengeluaran stok.');return locked_(()=>{
 const ss=auth_(sessionId),before=snapshot_(),now=new Date().toISOString(),after=Delivery.mutate(before,request,ss,()=>Utilities.getUuid(),now);
 WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API. Stok dan riwayat harus disimpan bersama.');
 const transactions=StockExport.capture(before,after,request,ss,Utilities.getUuid(),now);
 const requests=[...updateCells_(sheet_('Stock_Detail'),after.stock.map(i=>KEYS_.Stock_Detail.map(k=>i[k]??'')),KEYS_.Stock_Detail.length,1),...updateCells_(sheet_('Master_Lokasi'),after.locations.map(l=>KEYS_.Master_Lokasi.map(k=>l[k]??'')),KEYS_.Master_Lokasi.length,1),...transactionRequests_(transactions)];
 PropertiesService.getScriptProperties().setProperty('WMS_REV',String(after.version));SpreadsheetApp.flush();
 try{Sheets.Spreadsheets.batchUpdate({requests},db_().getId());}catch(error){throw new Error('Simpan gagal. Muat ulang dan periksa data: '+error.message);}
 return filtered_(after,ss);
});}
function generateWaText(sessionId,room){return locked_(()=>{const ss=auth_(sessionId);WMS.assert(!room||['CSFG C1','CSFG C2','CHILLER C1','CHILLER C2','CHILLER C3','PROD WIP'].includes(room),'Ruangan tidak valid.');return WMS.report(snapshot_(),ss,room);});}

function migratePhysicalPalletColumns_(s){
 const headers=HEADERS_.Stock_Detail;
 if(s.getMaxColumns&&s.getMaxColumns()<headers.length)s.insertColumnsAfter(s.getMaxColumns(),headers.length-s.getMaxColumns());
 const row=s.getRange(1,1,1,headers.length).getValues()[0];
 for(let n=13;n<headers.length;n++)WMS.assert(!row[n]||row[n]===headers[n],'Kolom '+(n+1)+' Stock_Detail sudah dipakai. Pindahkan kolom custom sebelum update.');
 for(let n=13;n<headers.length;n++)if(!row[n])s.getRange(1,n+1,1,1).setValues([[headers[n]]]);
}

/* Atomic batch commit + durable receipt. Requires the Sheets v4 advanced service. */
function connectionStatus(){return {online:true};}
function syncLog_(){
  const db=db_();let s=db.getSheetByName('Sync_Log');
  if(!s){s=db.insertSheet('Sync_Log');s.getRange(1,1,1,6).setValues([['Batch_ID','Payload_SHA256','Mode','Operation_IDs','Synced_At','Revision']]);s.setFrozenRows(1);SpreadsheetApp.flush();}
  return s;
}
function receipt_(s,id){if(s.getLastRow()<2)return null;return s.getRange(2,1,s.getLastRow()-1,6).getValues().find(r=>r[0]===id)||null;}
function digest_(payload){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,JSON.stringify(payload)).map(b=>(b&255).toString(16).padStart(2,'0')).join('');}
function updateCells_(sheet,rows,width,startRow){
  const end=Math.max(startRow+rows.length,sheet.getLastRow()),requests=[];
  if(end>sheet.getMaxRows())requests.push({appendDimension:{sheetId:sheet.getSheetId(),dimension:'ROWS',length:end-sheet.getMaxRows()}});
  if(end>startRow)requests.push({updateCells:{range:{sheetId:sheet.getSheetId(),startRowIndex:startRow,endRowIndex:end,startColumnIndex:0,endColumnIndex:width},rows:rows.map(row=>({values:row.map(v=>({userEnteredValue:typeof v==='number'?{numberValue:v}:{stringValue:String(v??'')}}))})),fields:'userEnteredValue'}});
  return requests;
}
function syncOfflineBatch(sessionId,batch){return locked_(()=>{
  const current=auth_(sessionId);
  WMS.assert(batch&&Offline.validId(batch.id)&&Array.isArray(batch.operations)&&batch.operations.length>0&&batch.operations.length<=500,'Batch offline tidak valid (1–500 transaksi).');
  WMS.assert(JSON.stringify(batch).length<=3000000,'Batch terlalu besar. Unduh cadangan antrean dan hubungi pengelola.');
  const hash=digest_(batch),log=syncLog_(),receipt=receipt_(log,batch.id);
  if(receipt){WMS.assert(receipt[1]===hash&&receipt[2]===current.mode,'ID batch telah digunakan untuk isi yang berbeda.');return {batchId:batch.id,ackIds:JSON.parse(receipt[3]),data:filtered_(snapshot_(),current),replayed:true};}
  WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API pada Services di editor Apps Script, lalu deploy versi baru. Antrean tetap tersimpan di HP.');
  const before=snapshot_();let data=before;const ids=new Set(),sessions=read_('User_Session'),newSessions=[],transactions=[];
  for(const op of batch.operations){
    WMS.assert(op&&Offline.validId(op.id)&&!ids.has(op.id),'ID transaksi duplikat/tidak valid.');ids.add(op.id);
    const actor={...WMS.session(op.actor),id:op.actor.id};WMS.assert(actor.mode===current.mode&&Offline.validId(actor.id),'Sesi transaksi tidak sesuai mode.');
    WMS.assert(typeof op.createdAt==='string'&&/^\d{4}-\d{2}-\d{2}T/.test(op.createdAt)&&Number.isFinite(Date.parse(op.createdAt)),'Waktu transaksi tidak valid.');
    const known=sessions.concat(newSessions).find(s=>s.id===actor.id);
    if(known)WMS.assert(['name','date','shift','mode'].every(k=>known[k]===actor[k]),'Identitas sesi transaksi berubah.');
    else newSessions.push({...actor,createdAt:op.createdAt,expiresAt:'1970-01-01T00:00:00.000Z'}); // Historical identity, never grants an active token.
    const touched=Offline.touched(data,op.request);WMS.assert(touched.length>0,'Transaksi tidak memiliki lokasi.');
    for(const id of touched){
      if(id.startsWith('@delivery:')){const doc=Delivery.find(data,id.slice(10));WMS.assert(!doc||doc.mode===current.mode,'Delivery note di luar mode sesi.');}
      else WMS.assert(data.locations.some(l=>l.id===id&&l.group===current.mode),'Lokasi di luar mode sesi.');
      if(op.expected?.[id]!==Offline.fingerprint(data,id))return {conflict:true,locationId:id,message:(id.startsWith('@delivery:')?'Delivery note ':'Lokasi ')+id+' berubah di Google Sheets. Antrean HP tetap disimpan; tinjau sebelum melanjutkan.'};
    }
    const prior=data;data=Offline.apply(data,op,actor);
    transactions.push(...StockExport.capture(prior,data,op.request,actor,op.id,op.createdAt));
  }
  // One API request applies stock, location function, historical sessions AND receipt together.
  // A lost response is safe: retrying the same immutable batch finds the receipt.
  const revision=before.version+1;data.version=revision;
  const stockRows=data.stock.map(i=>KEYS_.Stock_Detail.map(k=>i[k]??''));
  const locRows=data.locations.map(i=>KEYS_.Master_Lokasi.map(k=>i[k]??''));
  const requests=[...updateCells_(sheet_('Stock_Detail'),stockRows,KEYS_.Stock_Detail.length,1),...updateCells_(sheet_('Master_Lokasi'),locRows,KEYS_.Master_Lokasi.length,1)];
  requests.push(...deliveryRequests_(data),...transactionRequests_(transactions));
  if(newSessions.length){const s=sheet_('User_Session');requests.push(...updateCells_(s,newSessions.map(i=>KEYS_.User_Session.map(k=>i[k]??'')),KEYS_.User_Session.length,s.getLastRow()));}
  requests.push(...updateCells_(log,[[batch.id,hash,current.mode,JSON.stringify([...ids]),new Date().toISOString(),revision]],6,log.getLastRow()));
  PropertiesService.getScriptProperties().setProperty('WMS_REV',String(revision));
  SpreadsheetApp.flush();
  Sheets.Spreadsheets.batchUpdate({requests},db_().getId());
  return {batchId:batch.id,ackIds:[...ids],data:filtered_(data,current),replayed:false};
});}

/* Two normalized sheets keep history after stock reaches zero; created without resetting existing data. */
function deliverySheets_(){
  const specs=[['Delivery_Notes',Delivery.fields],['Delivery_Lines',['documentId','lineNo',...Delivery.lineFields]]];
  return specs.map(([name,headers])=>{let s=db_().getSheetByName(name);if(!s){s=db_().insertSheet(name);s.getRange(1,1,1,headers.length).setValues([headers]);s.setFrozenRows(1);SpreadsheetApp.flush();}else {const actual=s.getRange(1,1,1,headers.length).getValues()[0];if(name==='Delivery_Notes'){const legacy=16;WMS.assert(JSON.stringify(actual.slice(0,legacy))===JSON.stringify(headers.slice(0,legacy)),'Header '+name+' tidak sesuai. Jangan hapus kolom lama.');for(let n=legacy;n<headers.length;n++){WMS.assert(!actual[n]||actual[n]===headers[n],'Kolom tambahan '+name+' sudah digunakan. Pindahkan kolom custom sebelum upgrade.');}for(let n=legacy;n<headers.length;n++)if(!actual[n])s.getRange(1,n+1,1,1).setValues([[headers[n]]]); }else {
 WMS.assert(JSON.stringify(actual.slice(0,15))===JSON.stringify(headers.slice(0,15)),'Header '+name+' tidak sesuai. Jangan hapus atau ubah kolomnya.');
 for(let n=15;n<headers.length;n++)WMS.assert(!actual[n]||actual[n]===headers[n],'Kolom tambahan Delivery_Lines sudah dipakai.');
 for(let n=15;n<headers.length;n++)if(!actual[n])s.getRange(1,n+1,1,1).setValues([[headers[n]]]);
 }}return s;});
}
function readDeliveries_(){
  const [notes,lines]=deliverySheets_(),rows=(s,width)=>s.getLastRow()<2?[]:s.getRange(2,1,s.getLastRow()-1,width).getValues().filter(r=>r[0]!=='');
  const docs=rows(notes,Delivery.fields.length).map(row=>({...Object.fromEntries(Delivery.fields.map((k,n)=>[k,k==='revision'?Number(row[n]):String(row[n]??'')])),lines:[]}));
  const index=new Map(docs.map(d=>[d.id,d]));
  for(const row of rows(lines,Delivery.lineFields.length+2).sort((a,b)=>Number(a[1])-Number(b[1]))){const d=index.get(String(row[0]));WMS.assert(d,'Baris delivery note tidak memiliki dokumen induk.');d.lines.push(Object.fromEntries(Delivery.lineFields.map((k,n)=>[k,k==='qty'?Number(row[n+2]):String(row[n+2]??'')])));}
  return docs;
}
function deliveryRequests_(data){const [notes,lines]=deliverySheets_();return [...updateCells_(notes,(data.deliveryNotes||[]).map(d=>Delivery.fields.map(k=>d[k]??'')),Delivery.fields.length,1),...updateCells_(lines,(data.deliveryNotes||[]).flatMap(d=>d.lines.map((l,n)=>[d.id,n,...Delivery.lineFields.map(k=>l[k]??'')])),Delivery.lineFields.length+2,1)];}

/* Append-only receipt ledger committed atomically with stock and sync receipts. */
function transactionSheet_(){
 const db=db_();let s=db.getSheetByName('Transaction_Log');
 if(s&&s.getMaxColumns&&s.getMaxColumns()<StockExport.fields.length)s.insertColumnsAfter(s.getMaxColumns(),StockExport.fields.length-s.getMaxColumns());
 if(!s){s=db.insertSheet('Transaction_Log');if(s.getMaxColumns&&s.getMaxColumns()<StockExport.fields.length)s.insertColumnsAfter(s.getMaxColumns(),StockExport.fields.length-s.getMaxColumns());s.getRange(1,1,1,StockExport.fields.length).setValues([StockExport.fields]);s.setFrozenRows(1);SpreadsheetApp.flush();}
 else {
  const h=StockExport.fields,row=s.getRange(1,1,1,h.length).getValues()[0];
  WMS.assert(JSON.stringify(row.slice(0,21))===JSON.stringify(h.slice(0,21)),'Header Transaction_Log tidak sesuai. Jangan menimpa riwayat.');
  for(let n=21;n<h.length;n++)WMS.assert(!row[n]||row[n]===h[n],'Kolom tambahan Transaction_Log sudah digunakan.');
  for(let n=21;n<h.length;n++)if(!row[n])s.getRange(1,n+1,1,1).setValues([[h[n]]]);
 }
 return s;
}
function transactionRequests_(rows){if(!rows.length)return [];const s=transactionSheet_();return updateCells_(s,rows.map(r=>StockExport.fields.map(k=>r[k]??'')),StockExport.fields.length,s.getLastRow());}
function readTransactions_(){const s=transactionSheet_();if(s.getLastRow()<2)return [];return s.getRange(2,1,s.getLastRow()-1,StockExport.fields.length).getValues().filter(r=>r[0]).map(row=>Object.fromEntries(StockExport.fields.map((k,n)=>[k,k==='qty'?Number(row[n]):row[n] instanceof Date?Utilities.formatDate(row[n],'Asia/Jakarta',k==='date'||k==='kp'?'yyyy-MM-dd':"yyyy-MM-dd'T'HH:mm:ssXXX"):String(row[n]??'')])));}
function getStockExport(sessionId){return locked_(()=>{const ss=auth_(sessionId);return {schema:StockExport.schema,mode:ss.mode,rows:StockExport.allRows(readTransactions_(),readDeliveries_(),read_('User_Session'),ss.mode),asOf:new Date().toISOString()};});}

/* Editor-only, narrowly scoped repair approved for the three explicitly confirmed pairs.
   No global ID rewrite, no inferred outbound, no deletion of receipt evidence. */
function pallet104Plan_(caseNo=0){
 const cases=[{id:'e8113d62-4f51-46f3-bb65-c70b1a9a5afe',rows:[['KM-038',16,'104','Hold'],['KM-037',14,'104','Hold']]},{id:'bb6eeeed-2761-40c1-adbe-01f478f0f15d',rows:[['KM-038',10,'79','Release'],['KM-054',20,'76','Release']]},{id:'0a9fd36c-28a9-44d8-9908-2c22e76ca3a9',rows:[['KM-038',15,'3','Release'],['KM-054',15,'97','Release']]}],spec=cases[caseNo];
 WMS.assert(spec,'Kasus rekonsiliasi tidak dikenal.');
 const sourceId=spec.id,data=snapshot_(),records=readTransactions_(),old=data.stock.find(i=>i.id===sourceId);
 const ids=spec.rows.map(r=>sourceId+'-'+r[0]);
 if(!old){WMS.assert(ids.every(id=>data.stock.some(i=>i.id===id)),'Item lama tidak ditemukan. Periksa stok aktif sebelum rekonsiliasi.');return {already:true};}
 WMS.assert(!ids.some(id=>data.stock.some(i=>i.id===id)),'ID hasil sudah ada sebagian. Periksa rekonsiliasi dahulu.');
 WMS.assert(!old.palletId,'Item sudah tergabung; rekonsiliasi manual diperlukan.');
 WMS.assert(!(data.deliveryNotes||[]).some(d=>d.state!=='CANCELLED'&&d.lines.some(l=>l.itemId===sourceId)),'Ada picking/SJ terkait. Rekonsiliasi pengiriman dahulu, jangan ubah snapshot SJ.');
 const receipts=records.filter(r=>r.type==='IN'&&r.itemId===sourceId);
 WMS.assert(receipts.length===2&&receipts.every(r=>r.kp==='2026-09-28'),'Riwayat tidak sama dengan data trial yang disetujui.');
 const matched=spec.rows.map(x=>receipts.find(r=>StockExport.product(r.sku)?.[0]===x[0]&&r.qty===x[1]&&WMS.pallet(r.palletNo)===x[2]&&r.status===x[3]));
 WMS.assert(matched.every(Boolean)&&old.qty===30,'Jumlah/identitas tidak lagi sama dengan pasangan trial total30. Periksa kondisi terkini.');
 WMS.assert(!records.some(r=>r.itemId===sourceId&&r.type!=='IN'),'Sudah ada OUT/koreksi; perlu rekonsiliasi khusus.');
 const now=new Date().toISOString(),items=matched.map(r=>({...old,id:StockExport.reportId(sourceId,r),sku:r.sku,kp:r.kp,exp:WMS.expiry(r.kp,0),qty:r.qty,palletNo:r.palletNo,status:r.status,note:r.note,updatedAt:now}));
 return {data,old,items,now,sourceId};
}
function previewRepairPallet104_(){const p=pallet104Plan_();console.log(JSON.stringify(p.already?{already:true}:{before:p.old,after:p.items}));}
function repairLegacyPair_(caseNo){return locked_(()=>{
 const p=pallet104Plan_(caseNo);if(p.already){console.log('Pasangan sudah dipisah.');return;}
 WMS.assert(typeof Sheets!=='undefined','Aktifkan Google Sheets API.');
 const stock=p.data.stock.filter(i=>i.id!==p.sourceId).concat(p.items),record={id:'REPAIR-'+p.sourceId,type:'REPAIR',mode:'CSFG',date:p.now.slice(0,10),at:p.now,itemId:p.sourceId,qty:0,unit:'CTN',beforeJson:JSON.stringify(p.old),afterJson:JSON.stringify(p.items),reason:'Dua produk berbeda, total30 CTN. Konfirmasi pemilik project.',name:'Apps Script editor'};
 const requests=[...updateCells_(sheet_('Stock_Detail'),stock.map(i=>KEYS_.Stock_Detail.map(k=>i[k]??'')),KEYS_.Stock_Detail.length,1),...transactionRequests_([record])];
 PropertiesService.getScriptProperties().setProperty('WMS_REV',String(p.data.version+1));SpreadsheetApp.flush();Sheets.Spreadsheets.batchUpdate({requests},db_().getId());console.log('Selesai: pasangan barang terpisah. Total tetap30. Muat ulang app pada semua HP.');
});}
function repairPallet104_(){return repairLegacyPair_(0);}
function previewRepairPallet79And76_(){const p=pallet104Plan_(1);console.log(JSON.stringify(p.already?{already:true}:{before:p.old,after:p.items}));}
function repairPallet79And76_(){return repairLegacyPair_(1);}
function previewRepairPallet3And97_(){const p=pallet104Plan_(2);console.log(JSON.stringify(p.already?{already:true}:{before:p.old,after:p.items}));}
function repairPallet3And97_(){return repairLegacyPair_(2);}
