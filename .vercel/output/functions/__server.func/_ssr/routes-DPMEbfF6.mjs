import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { G as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { a as Target, c as Play, l as Pause, n as VolumeX, o as Shield, r as Volume2, s as RotateCcw, t as Zap, u as Crosshair } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DPMEbfF6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var CITIES = [
	{
		id: "dc",
		name: "Washington",
		short: "D.C.",
		lat: 38.91,
		lon: -77.04
	},
	{
		id: "ny",
		name: "New York",
		short: "NYC",
		lat: 40.71,
		lon: -74.01
	},
	{
		id: "la",
		name: "Los Angeles",
		short: "LAX",
		lat: 34.05,
		lon: -118.24
	},
	{
		id: "chi",
		name: "Chicago",
		short: "CHI",
		lat: 41.88,
		lon: -87.63
	},
	{
		id: "hou",
		name: "Houston",
		short: "HOU",
		lat: 29.76,
		lon: -95.37
	},
	{
		id: "sea",
		name: "Seattle",
		short: "SEA",
		lat: 47.61,
		lon: -122.33
	},
	{
		id: "mia",
		name: "Miami",
		short: "MIA",
		lat: 25.76,
		lon: -80.19
	},
	{
		id: "den",
		name: "Denver",
		short: "DEN",
		lat: 39.74,
		lon: -104.99
	}
];
var ORIGINS = [
	{
		id: "westpac",
		label: "WESTPAC",
		lat: 35,
		lon: 140
	},
	{
		id: "npac",
		label: "N. PACIFIC",
		lat: 52,
		lon: 158
	},
	{
		id: "arctic",
		label: "ARCTIC",
		lat: 78,
		lon: -40
	},
	{
		id: "atlantic",
		label: "ATLANTIC",
		lat: 38,
		lon: -25
	},
	{
		id: "south",
		label: "SOUTH",
		lat: 10,
		lon: -68
	},
	{
		id: "polar",
		label: "POLAR",
		lat: 82,
		lon: 170
	}
];
var SPACE_NODES = [
	{
		lat: 48,
		lon: -100
	},
	{
		lat: 42,
		lon: -78
	},
	{
		lat: 36,
		lon: -118
	},
	{
		lat: 32,
		lon: -90
	},
	{
		lat: 45,
		lon: -122
	},
	{
		lat: 28,
		lon: -81
	},
	{
		lat: 40,
		lon: -98
	},
	{
		lat: 52,
		lon: -85
	}
];
/** Equirectangular polygons [lat, lon][] — stylized but readable continents. */
var CONTINENTS = [
	[
		[70, -165],
		[68, -140],
		[70, -128],
		[60, -137],
		[58, -158],
		[54, -165],
		[60, -162],
		[68, -165],
		[70, -165]
	],
	[
		[49, -125],
		[48, -124],
		[46, -124],
		[42, -124],
		[40, -124],
		[34.5, -120.5],
		[32.5, -117.2],
		[32.5, -114.8],
		[31.3, -108],
		[31.7, -106.5],
		[29.3, -104],
		[26, -97.4],
		[27.7, -97.4],
		[29.7, -93.8],
		[29.2, -89.4],
		[30.4, -88],
		[30.3, -84.3],
		[25.1, -81],
		[25.8, -80],
		[30.4, -81.4],
		[32, -80.8],
		[35.2, -75.5],
		[37.2, -76],
		[38.4, -75],
		[40.6, -74],
		[41.3, -70],
		[42.9, -70.6],
		[44.8, -66.9],
		[45.2, -64.2],
		[47, -60],
		[46.5, -53],
		[51.5, -55.6],
		[54, -43],
		[59.8, -44],
		[67, -53],
		[76, -72],
		[83, -70],
		[78, -90],
		[73, -95],
		[68.6, -89],
		[64, -88],
		[62.5, -71],
		[58, -68],
		[55, -82],
		[52, -82],
		[48.3, -89],
		[46, -84.5],
		[43.6, -82],
		[41.7, -83],
		[45.4, -86.7],
		[46.8, -91],
		[46.7, -92.3],
		[48.2, -90],
		[49, -95],
		[49, -125]
	],
	[
		[32.5, -117],
		[29.8, -114.5],
		[27.2, -114],
		[24.4, -111.6],
		[22.9, -109.9],
		[22.3, -105.9],
		[21.5, -105.2],
		[16.6, -99],
		[14.5, -92.2],
		[17.8, -91],
		[18.5, -87.5],
		[21.5, -87.5],
		[21.3, -90],
		[22.3, -97.8],
		[25.9, -97.4],
		[29.3, -104],
		[31.7, -106.5],
		[32.5, -117]
	],
	[
		[83.6, -36],
		[81, -22],
		[70, -22],
		[60, -43],
		[60, -45],
		[70, -54],
		[76, -68],
		[83, -46],
		[83.6, -36]
	],
	[
		[12.4, -71.5],
		[10.7, -75.5],
		[8, -77.4],
		[4, -77.6],
		[1.5, -79],
		[-3.4, -80.4],
		[-13, -76.4],
		[-18.3, -71.4],
		[-21.5, -70.2],
		[-29.8, -71.4],
		[-41.5, -73.8],
		[-46.8, -75.6],
		[-52.4, -75],
		[-55.8, -68.3],
		[-50, -68.5],
		[-42, -63.7],
		[-39.2, -62.3],
		[-26.3, -48.6],
		[-22.9, -42],
		[-5.2, -35],
		[1.3, -49],
		[4.4, -51.6],
		[8.3, -59.8],
		[10.7, -62.3],
		[12.2, -68.8],
		[12.4, -71.5]
	],
	[
		[71.1, 25],
		[70.6, 30.5],
		[69, 15.5],
		[63, 7],
		[58.9, 5.5],
		[57.5, 7],
		[54.8, 8.6],
		[53, 4.8],
		[51.2, 3.5],
		[48.6, -4.8],
		[43.4, -1.8],
		[43.1, -9.3],
		[37, -9],
		[36, -5.6],
		[43.3, 3.5],
		[44.4, 8.8],
		[40.2, 18.4],
		[37.5, 15.1],
		[38.2, 15.6],
		[39.8, 18.3],
		[41.9, 19.4],
		[44.8, 19.8],
		[45.1, 13.6],
		[45.5, 13.7],
		[46.5, 16.5],
		[48, 17.1],
		[48.3, 22],
		[45.4, 28.2],
		[47.3, 29.2],
		[52.3, 31.5],
		[56, 28],
		[59.4, 28],
		[66.5, 29],
		[69.7, 31],
		[71.1, 25]
	],
	[
		[58.6, -5],
		[58.5, -3.4],
		[51.4, 1.4],
		[50, -5.2],
		[51.6, -4.9],
		[54.6, -8.2],
		[55.3, -5.6],
		[58.6, -5]
	],
	[
		[55.3, -8.2],
		[55.4, -6.2],
		[51.4, -10],
		[52.1, -6.4],
		[54.1, -10.2],
		[55.3, -8.2]
	],
	[
		[37.3, 9.9],
		[37.1, 11],
		[32.3, 15.2],
		[32.9, 21.7],
		[31.5, 25.2],
		[31.5, 32.6],
		[29.6, 32.5],
		[22, 36.9],
		[11.9, 51.3],
		[11.5, 43.3],
		[-1, 42],
		[-10.3, 40.4],
		[-26, 32.9],
		[-34.8, 24.8],
		[-34.4, 18.8],
		[-22, 14],
		[-17.4, 11.7],
		[-5.9, 12.3],
		[4.3, 9.4],
		[4.7, -7.5],
		[12.4, -16.7],
		[20.8, -17],
		[27.7, -13.2],
		[35.8, -5.9],
		[37.2, -7.4],
		[36.5, 2.2],
		[37.3, 9.9]
	],
	[
		[31.5, 32.5],
		[31.2, 35.5],
		[29.5, 35],
		[16, 41],
		[12.6, 43.3],
		[12.7, 45],
		[16.6, 53.1],
		[22.6, 59.8],
		[26, 56.3],
		[29.6, 48.6],
		[30, 47.9],
		[30.5, 41.6],
		[31.5, 32.5]
	],
	[
		[77.7, 104],
		[75.9, 140],
		[73, 170],
		[69.5, 169],
		[66, 170],
		[64.2, 178],
		[62.3, 163],
		[59.3, 155],
		[54.8, 136.8],
		[51.9, 128.4],
		[48.4, 140],
		[42.7, 133.5],
		[41.7, 129.7],
		[39.6, 124.3],
		[37.7, 126.4],
		[35.1, 129.1],
		[33.2, 126.2],
		[31.7, 121.9],
		[24.5, 118.4],
		[20, 110.6],
		[21.5, 108],
		[17, 107.2],
		[10.4, 109],
		[8.6, 104.8],
		[1.3, 104.4],
		[1.4, 103.5],
		[5.3, 97.5],
		[7.8, 98.3],
		[13, 98],
		[16, 94.3],
		[15.7, 95.8],
		[20.7, 92.2],
		[21.5, 87],
		[15.9, 81],
		[10.3, 80.3],
		[8.1, 77.3],
		[8.9, 76.8],
		[15, 74],
		[20.7, 70],
		[22, 69],
		[23.7, 68.1],
		[25.4, 66.6],
		[25.4, 61.5],
		[27, 56.8],
		[30, 49],
		[37, 54],
		[38.4, 48.8],
		[40.4, 50],
		[42, 52],
		[44, 47],
		[45, 37],
		[46.6, 38],
		[47.2, 39.2],
		[49.4, 36.6],
		[51.4, 39.4],
		[55.4, 37.4],
		[60, 30],
		[66.5, 32],
		[69, 33],
		[69.6, 31],
		[71.5, 52],
		[76.5, 68],
		[77, 88],
		[77.7, 104]
	],
	[
		[45.5, 141.9],
		[43.4, 145.8],
		[41.5, 140],
		[35.5, 139.8],
		[33.1, 133],
		[31.2, 131.3],
		[33.5, 135.8],
		[34.7, 138.2],
		[35.7, 140.9],
		[38.3, 141],
		[41.4, 141.4],
		[45.5, 141.9]
	],
	[
		[-12, 49.2],
		[-25.6, 47.1],
		[-25.6, 44],
		[-17, 43.7],
		[-12, 49.2]
	],
	[
		[-10.7, 142.5],
		[-12.2, 136.8],
		[-14.9, 129],
		[-17.8, 122.2],
		[-22.4, 114],
		[-25.6, 113.1],
		[-33.9, 115],
		[-35.1, 117.9],
		[-34.5, 123],
		[-32.3, 133.9],
		[-38.1, 140.9],
		[-38.9, 146.4],
		[-37.5, 149.9],
		[-28.2, 153.6],
		[-25.8, 153.1],
		[-18.5, 146.3],
		[-14.2, 144.2],
		[-10.7, 142.5]
	],
	[
		[-34.4, 172.7],
		[-41.4, 174.8],
		[-41.6, 172.7],
		[-39.2, 173.9],
		[-34.4, 172.7]
	],
	[
		[-40.6, 172.7],
		[-46.7, 168.5],
		[-46.4, 170.5],
		[-43.9, 172],
		[-41.3, 175.8],
		[-40.6, 172.7]
	],
	[
		[5.6, 95.3],
		[5.4, 97.5],
		[1, 100.8],
		[-5.9, 105.8],
		[-8.5, 114.4],
		[-8.2, 127],
		[-4.3, 131],
		[.8, 127.8],
		[1.5, 125],
		[.6, 117.5],
		[3.3, 117.6],
		[7, 117],
		[7, 113.8],
		[1.3, 104.6],
		[5.6, 95.3]
	]
];
var US_FILL = [
	[49, -125],
	[48.3, -123],
	[46, -124],
	[42, -124.4],
	[40.5, -124.3],
	[34.4, -120.5],
	[32.5, -117.1],
	[32.7, -114.6],
	[31.3, -111],
	[31.3, -108],
	[31.8, -106.5],
	[29.3, -104.5],
	[26.4, -97.2],
	[29.8, -93.8],
	[29.2, -89.2],
	[30.4, -84.3],
	[25.2, -80.9],
	[25.9, -80],
	[30.7, -81.4],
	[35.2, -75.5],
	[36.9, -76],
	[38.9, -74.9],
	[40.5, -74],
	[41.3, -70],
	[42.7, -70.8],
	[44.8, -66.9],
	[47.4, -68],
	[47.3, -69.8],
	[45, -71.5],
	[45, -74.3],
	[43.6, -76.8],
	[43.4, -79.2],
	[42.3, -79.8],
	[41.7, -82.5],
	[43.6, -82.7],
	[45.9, -83.6],
	[46.5, -84.6],
	[46.8, -92],
	[48, -90],
	[49, -95],
	[49, -125]
];
var CITY_LIGHTS = [
	{
		lat: 40.7,
		lon: -74,
		w: 1.4
	},
	{
		lat: 34.05,
		lon: -118.2,
		w: 1.3
	},
	{
		lat: 41.88,
		lon: -87.6,
		w: 1.15
	},
	{
		lat: 29.76,
		lon: -95.4,
		w: 1
	},
	{
		lat: 38.9,
		lon: -77,
		w: 1.05
	},
	{
		lat: 47.6,
		lon: -122.3,
		w: .9
	},
	{
		lat: 25.76,
		lon: -80.2,
		w: .95
	},
	{
		lat: 39.74,
		lon: -105,
		w: .8
	},
	{
		lat: 37.8,
		lon: -122.4,
		w: 1.1
	},
	{
		lat: 33.4,
		lon: -112,
		w: .95
	},
	{
		lat: 32.8,
		lon: -96.8,
		w: 1
	},
	{
		lat: 39.95,
		lon: -75.16,
		w: .95
	},
	{
		lat: 42.36,
		lon: -71.06,
		w: .95
	},
	{
		lat: 43.65,
		lon: -79.38,
		w: 1.05
	},
	{
		lat: 19.43,
		lon: -99.13,
		w: 1.2
	},
	{
		lat: 23.63,
		lon: -102.55,
		w: .6
	},
	{
		lat: -23.55,
		lon: -46.63,
		w: 1.3
	},
	{
		lat: -34.6,
		lon: -58.38,
		w: 1.15
	},
	{
		lat: 51.5,
		lon: -.12,
		w: 1.2
	},
	{
		lat: 48.86,
		lon: 2.35,
		w: 1.1
	},
	{
		lat: 52.52,
		lon: 13.4,
		w: 1
	},
	{
		lat: 41.9,
		lon: 12.5,
		w: .85
	},
	{
		lat: 40.4,
		lon: -3.7,
		w: .9
	},
	{
		lat: 55.75,
		lon: 37.62,
		w: 1.15
	},
	{
		lat: 41.01,
		lon: 28.98,
		w: 1
	},
	{
		lat: 30.04,
		lon: 31.24,
		w: 1.05
	},
	{
		lat: 6.52,
		lon: 3.38,
		w: 1
	},
	{
		lat: -26.2,
		lon: 28.04,
		w: .95
	},
	{
		lat: 19.07,
		lon: 72.88,
		w: 1.25
	},
	{
		lat: 28.61,
		lon: 77.21,
		w: 1.2
	},
	{
		lat: 22.57,
		lon: 88.36,
		w: 1
	},
	{
		lat: 13.08,
		lon: 80.27,
		w: .95
	},
	{
		lat: 23.81,
		lon: 90.41,
		w: 1.15
	},
	{
		lat: 13.76,
		lon: 100.5,
		w: 1.05
	},
	{
		lat: 3.14,
		lon: 101.69,
		w: .9
	},
	{
		lat: -6.2,
		lon: 106.85,
		w: 1.2
	},
	{
		lat: 14.6,
		lon: 120.98,
		w: 1.05
	},
	{
		lat: 35.68,
		lon: 139.69,
		w: 1.4
	},
	{
		lat: 37.57,
		lon: 126.98,
		w: 1.15
	},
	{
		lat: 31.23,
		lon: 121.47,
		w: 1.35
	},
	{
		lat: 39.9,
		lon: 116.4,
		w: 1.3
	},
	{
		lat: 23.13,
		lon: 113.26,
		w: 1.2
	},
	{
		lat: 22.32,
		lon: 114.17,
		w: 1
	},
	{
		lat: -33.87,
		lon: 151.21,
		w: .95
	},
	{
		lat: -37.81,
		lon: 144.96,
		w: .9
	}
];
var DOME_R = 1.09;
var SAT_R = 1.36;
var DOME_LAT = 39.8;
var DOME_LON = -98.6;
var DOME_ANGLE = .5;
var DEG = Math.PI / 180;
function vec(x = 0, y = 0, z = 0) {
	return {
		x,
		y,
		z
	};
}
function copyV(o, a) {
	o.x = a.x;
	o.y = a.y;
	o.z = a.z;
	return o;
}
function subV(o, a, b) {
	o.x = a.x - b.x;
	o.y = a.y - b.y;
	o.z = a.z - b.z;
	return o;
}
function scaleV(o, a, s) {
	o.x = a.x * s;
	o.y = a.y * s;
	o.z = a.z * s;
	return o;
}
function maddV(o, a, b, s) {
	o.x = a.x + b.x * s;
	o.y = a.y + b.y * s;
	o.z = a.z + b.z * s;
	return o;
}
function lenV(a) {
	return Math.hypot(a.x, a.y, a.z);
}
function distV(a, b) {
	return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}
function normV(o, a) {
	const l = lenV(a) || 1;
	o.x = a.x / l;
	o.y = a.y / l;
	o.z = a.z / l;
	return o;
}
function dotV(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
}
function crossV(o, a, b) {
	o.x = a.y * b.z - a.z * b.y;
	o.y = a.z * b.x - a.x * b.z;
	o.z = a.x * b.y - a.y * b.x;
	return o;
}
function lerpV(o, a, b, t) {
	o.x = a.x + (b.x - a.x) * t;
	o.y = a.y + (b.y - a.y) * t;
	o.z = a.z + (b.z - a.z) * t;
	return o;
}
function slerpV(o, a, b, t) {
	let d = dotV(a, b);
	d = d < -1 ? -1 : d > 1 ? 1 : d;
	const theta = Math.acos(d);
	if (theta < 1e-4) return lerpV(o, a, b, t);
	const sinT = Math.sin(theta);
	const sa = Math.sin((1 - t) * theta) / sinT;
	const sb = Math.sin(t * theta) / sinT;
	o.x = a.x * sa + b.x * sb;
	o.y = a.y * sa + b.y * sb;
	o.z = a.z * sa + b.z * sb;
	return o;
}
function latLonToVec(lat, lon, r, out) {
	const la = lat * DEG;
	const lo = lon * DEG;
	const cl = Math.cos(la);
	out.x = r * cl * Math.cos(lo);
	out.y = r * Math.sin(la);
	out.z = r * cl * Math.sin(lo);
	return out;
}
function clamp(n, a, b) {
	return n < a ? a : n > b ? b : n;
}
function angleBetween(a, b) {
	const d = clamp(dotV(a, b) / ((lenV(a) || 1) * (lenV(b) || 1)), -1, 1);
	return Math.acos(d);
}
var _t0 = vec();
var _t1 = vec();
var MAX_M = 40;
var MAX_I = 28;
var TRAIL = 14;
var TRAIL_STRIDE = 42;
var TOTAL_WAVES = 8;
var WAVE_NAMES = [
	"PROBE",
	"RAID",
	"SWARM",
	"GLIDE",
	"COMBINED",
	"DECOY RAIN",
	"ASSAULT",
	"FULL RAID"
];
function waveSpec(n) {
	switch (n) {
		case 1: return [{
			kind: "icbm",
			count: 3,
			origin: 0
		}];
		case 2: return [{
			kind: "icbm",
			count: 5
		}];
		case 3: return [{
			kind: "icbm",
			count: 3
		}, {
			kind: "cruise",
			count: 5
		}];
		case 4: return [{
			kind: "hypersonic",
			count: 6
		}];
		case 5: return [
			{
				kind: "icbm",
				count: 4
			},
			{
				kind: "hypersonic",
				count: 4
			},
			{
				kind: "cruise",
				count: 4
			}
		];
		case 6: return [
			{
				kind: "icbm",
				count: 4
			},
			{
				kind: "decoy",
				count: 6
			},
			{
				kind: "hypersonic",
				count: 3
			}
		];
		case 7: return [
			{
				kind: "icbm",
				count: 6
			},
			{
				kind: "hypersonic",
				count: 6
			},
			{
				kind: "cruise",
				count: 6
			}
		];
		default: return [
			{
				kind: "icbm",
				count: 8
			},
			{
				kind: "hypersonic",
				count: 8
			},
			{
				kind: "cruise",
				count: 6
			},
			{
				kind: "decoy",
				count: 4
			}
		];
	}
}
function kindSpeed(kind, wave) {
	const w = 1 + (wave - 1) * .06;
	switch (kind) {
		case "icbm": return .085 * w;
		case "hypersonic": return .145 * w;
		case "cruise": return .07 * w;
		case "decoy": return .09 * w;
	}
}
function kindDamage(kind) {
	switch (kind) {
		case "icbm": return 16;
		case "hypersonic": return 14;
		case "cruise": return 8;
		case "decoy": return 0;
	}
}
function altitude(kind, t) {
	const s = Math.sin(Math.PI * t);
	switch (kind) {
		case "icbm": return .04 + .92 * s;
		case "decoy": return .05 + .78 * s;
		case "hypersonic": return .05 + .32 * s;
		case "cruise": return .018 + .045 * s;
	}
}
function layerOf(alt) {
	if (alt > .42) return "space";
	if (alt > .14) return "mid";
	return "term";
}
function pushTrail(trail, p) {
	for (let i = 41; i >= 3; i--) trail[i] = trail[i - 3] ?? 0;
	trail[0] = p.x;
	trail[1] = p.y;
	trail[2] = p.z;
}
function placeMissile(m, t) {
	slerpV(_t0, m.fromN, m.toN, t);
	const r = 1 + altitude(m.kind, t);
	if (m.kind === "hypersonic") {
		const w = Math.sin(t * 14) * .06 * (1 - Math.abs(2 * t - 1));
		maddV(_t0, _t0, m.weave, w);
		normV(_t0, _t0);
	}
	scaleV(m.pos, _t0, r);
}
function emptyMissile(id) {
	return {
		alive: false,
		id,
		kind: "icbm",
		t: 0,
		speed: .1,
		fromN: vec(),
		toN: vec(),
		weave: vec(),
		city: 0,
		pos: vec(),
		assigned: 0,
		trail: new Float32Array(TRAIL_STRIDE)
	};
}
function emptyInterceptor(id) {
	return {
		alive: false,
		id,
		pos: vec(),
		target: -1,
		speed: 1.4,
		trail: new Float32Array(TRAIL_STRIDE)
	};
}
function createSim() {
	const domePos = latLonToVec(DOME_LAT, DOME_LON, 1, vec());
	const spaceNodes = SPACE_NODES.map((n) => latLonToVec(n.lat, n.lon, SAT_R, vec()));
	const batteries = CITIES.map((c) => latLonToVec(c.lat, c.lon, 1.02, vec()));
	return {
		mode: "idle",
		paused: false,
		auto: false,
		wave: 0,
		score: 0,
		combo: 0,
		comboT: 0,
		integrity: 100,
		rounds: 10,
		pulseReady: true,
		cities: CITIES.map(() => ({
			hits: 0,
			dead: false
		})),
		missiles: Array.from({ length: MAX_M }, (_, i) => emptyMissile(i)),
		interceptors: Array.from({ length: MAX_I }, (_, i) => emptyInterceptor(i)),
		events: [],
		vfx: [],
		trauma: 0,
		domePos,
		spaceNodes,
		batteries,
		spawnQueue: [],
		restT: 0,
		autoCd: 0,
		toSpawn: 0,
		aliveThreats: 0,
		hitsThisWave: 0
	};
}
var sim = createSim();
function resetSim() {
	const next = createSim();
	Object.assign(sim, next);
}
function emit(e) {
	sim.events.push(e);
	sim.vfx.push(e);
}
function drainVfx() {
	if (sim.vfx.length === 0) return [];
	const out = sim.vfx.slice();
	sim.vfx.length = 0;
	return out;
}
function drainEvents() {
	if (sim.events.length === 0) return [];
	const out = sim.events.slice();
	sim.events.length = 0;
	return out;
}
function allocMissile() {
	for (const m of sim.missiles) if (!m.alive) return m;
	return null;
}
function allocInterceptor() {
	for (const i of sim.interceptors) if (!i.alive) return i;
	return null;
}
function spawnOne(kind, originIdx, cityIdx) {
	const m = allocMissile();
	if (!m) return;
	const origin = ORIGINS[originIdx % ORIGINS.length];
	const city = CITIES[cityIdx % CITIES.length];
	latLonToVec(origin.lat, origin.lon, 1, m.fromN);
	latLonToVec(city.lat, city.lon, 1, m.toN);
	subV(_t0, m.toN, m.fromN);
	crossV(m.weave, m.fromN, _t0);
	normV(m.weave, m.weave);
	m.kind = kind;
	m.t = kind === "cruise" ? .04 : .1;
	m.speed = kindSpeed(kind, sim.wave);
	m.city = cityIdx;
	m.assigned = 0;
	m.alive = true;
	placeMissile(m, m.t);
	for (let i = 0; i < TRAIL; i++) pushTrail(m.trail, m.pos);
}
function beginWave(n) {
	sim.wave = n;
	sim.pulseReady = true;
	sim.hitsThisWave = 0;
	const spec = waveSpec(n);
	sim.spawnQueue.length = 0;
	let delay = .15;
	for (const part of spec) for (let i = 0; i < part.count; i++) {
		const origin = part.origin ?? Math.floor(Math.random() * ORIGINS.length);
		let city = Math.floor(Math.random() * CITIES.length);
		let guard = 0;
		while (sim.cities[city]?.dead && guard++ < 12) city = Math.floor(Math.random() * CITIES.length);
		sim.spawnQueue.push({
			kind: part.kind,
			origin,
			city,
			delay
		});
		delay += .38 + Math.random() * .55;
	}
	sim.toSpawn = sim.spawnQueue.length;
	sim.mode = "spawning";
	const bonus = n === 1 ? 10 : 4;
	sim.rounds = Math.min(18, sim.rounds + bonus);
	emit({
		kind: "wave",
		n,
		name: WAVE_NAMES[n - 1] ?? "RAID"
	});
}
function startRun(autoDefault = false) {
	resetSim();
	sim.auto = autoDefault;
	sim.mode = "spawning";
	beginWave(1);
}
function killMissile(m, layer, scored) {
	m.alive = false;
	const alt = lenV(m.pos) - 1;
	const L = layer ?? layerOf(alt);
	let pts = L === "space" ? 320 : L === "mid" ? 210 : 110;
	if (m.kind === "hypersonic") pts += 80;
	if (m.kind === "decoy") pts = 40;
	if (scored) {
		sim.combo += 1;
		sim.comboT = 1.25;
		const mult = 1 + Math.min(8, sim.combo - 1) * .15;
		const gain = Math.round(pts * mult);
		sim.score += gain;
		emit({
			kind: "intercept",
			x: m.pos.x,
			y: m.pos.y,
			z: m.pos.z,
			layer: L,
			score: gain
		});
	}
	sim.trauma = Math.min(1, sim.trauma + .28);
}
function impact(m) {
	m.alive = false;
	if (m.kind === "decoy") return;
	const city = sim.cities[m.city];
	if (city && !city.dead) {
		city.hits += 1;
		if (city.hits >= 2) city.dead = true;
	}
	sim.integrity = Math.max(0, sim.integrity - kindDamage(m.kind));
	sim.hitsThisWave += 1;
	sim.combo = 0;
	emit({
		kind: "impact",
		x: m.pos.x,
		y: m.pos.y,
		z: m.pos.z,
		city: m.city
	});
	sim.trauma = Math.min(1, sim.trauma + .55);
	if (sim.integrity <= 22) emit({ kind: "alarm" });
	if (sim.integrity <= 0) {
		sim.integrity = 0;
		sim.mode = "defeat";
		emit({ kind: "defeat" });
	}
}
function pickOrigin(m) {
	const pool = lenV(m.pos) - 1 > .2 ? sim.spaceNodes : sim.batteries;
	let best = pool[0];
	let bestD = Infinity;
	for (const p of pool) {
		const d = distV(p, m.pos);
		if (d < bestD) {
			bestD = d;
			best = p;
		}
	}
	return best;
}
function fireAt(id) {
	if (sim.mode !== "spawning" && sim.mode !== "combat") return false;
	if (sim.rounds <= 0) return false;
	const m = sim.missiles[id];
	if (!m?.alive) return false;
	if (m.assigned >= 2) return false;
	const ic = allocInterceptor();
	if (!ic) return false;
	const origin = pickOrigin(m);
	copyV(ic.pos, origin);
	ic.target = m.id;
	ic.speed = m.kind === "hypersonic" ? 1.65 : 1.42;
	ic.alive = true;
	m.assigned += 1;
	sim.rounds -= 1;
	for (let i = 0; i < TRAIL; i++) pushTrail(ic.trail, ic.pos);
	emit({
		kind: "launch",
		x: origin.x,
		y: origin.y,
		z: origin.z
	});
	return true;
}
function fireNearestToRay(origin, dir) {
	let best = -1;
	let bestScore = -Infinity;
	for (const m of sim.missiles) {
		if (!m.alive) continue;
		subV(_t0, m.pos, origin);
		maddV(_t1, origin, dir, Math.max(0, _t0.x * dir.x + _t0.y * dir.y + _t0.z * dir.z));
		const d = distV(_t1, m.pos);
		const score = 1.4 - d - (1 - m.t) * .15;
		if (d < .55 && score > bestScore) {
			bestScore = score;
			best = m.id;
		}
	}
	if (best < 0) {
		let imminent = -1;
		let eta = Infinity;
		for (const m of sim.missiles) {
			if (!m.alive || m.kind === "decoy") continue;
			const e = (1 - m.t) / m.speed;
			if (e < eta) {
				eta = e;
				imminent = m.id;
			}
		}
		if (imminent >= 0 && eta < 3.2) best = imminent;
	}
	if (best < 0) return false;
	return fireAt(best);
}
function firePulse() {
	if (!sim.pulseReady) return false;
	if (sim.mode !== "spawning" && sim.mode !== "combat") return false;
	sim.pulseReady = false;
	emit({ kind: "pulse" });
	sim.trauma = Math.min(1, sim.trauma + .72);
	for (const m of sim.missiles) {
		if (!m.alive) continue;
		const ang = angleBetween(m.pos, sim.domePos);
		const alt = lenV(m.pos) - 1;
		if (ang < .62 && alt < .38) killMissile(m, "term", m.kind !== "decoy");
	}
	return true;
}
function mostImminent() {
	let best = null;
	let eta = Infinity;
	for (const m of sim.missiles) {
		if (!m.alive || m.assigned > 0) continue;
		if (m.kind === "decoy") continue;
		const e = (1 - m.t) / m.speed;
		if (e < eta) {
			eta = e;
			best = m;
		}
	}
	return best;
}
function countAlive() {
	let n = 0;
	for (const m of sim.missiles) if (m.alive && m.kind !== "decoy") n++;
	return n;
}
function countAllAlive() {
	let n = 0;
	for (const m of sim.missiles) if (m.alive) n++;
	return n;
}
function stepSim(dt) {
	if (sim.paused) return;
	if (sim.mode === "idle" || sim.mode === "defeat" || sim.mode === "victory") {
		sim.trauma = Math.max(0, sim.trauma - dt * 1.6);
		return;
	}
	const cap = dt > .05 ? .05 : dt;
	if (sim.comboT > 0) {
		sim.comboT -= cap;
		if (sim.comboT <= 0) sim.combo = 0;
	}
	sim.trauma = Math.max(0, sim.trauma - cap * 1.7);
	if (sim.mode === "rest") {
		sim.restT -= cap;
		if (sim.restT <= 0) {
			if (sim.wave >= TOTAL_WAVES) {
				sim.mode = "victory";
				emit({ kind: "victory" });
			} else beginWave(sim.wave + 1);
		}
	}
	if (sim.mode === "spawning") {
		for (const item of sim.spawnQueue) item.delay -= cap;
		const ready = sim.spawnQueue.filter((s) => s.delay <= 0);
		sim.spawnQueue = sim.spawnQueue.filter((s) => s.delay > 0);
		for (const s of ready) spawnOne(s.kind, s.origin, s.city);
		if (sim.spawnQueue.length === 0) sim.mode = "combat";
	}
	for (const m of sim.missiles) {
		if (!m.alive) continue;
		m.t += m.speed * cap;
		if (m.kind === "decoy" && m.t >= .72) {
			m.alive = false;
			continue;
		}
		if (m.t >= 1) {
			placeMissile(m, 1);
			impact(m);
			if (sim.integrity <= 0) return;
			continue;
		}
		placeMissile(m, m.t);
		pushTrail(m.trail, m.pos);
	}
	for (const ic of sim.interceptors) {
		if (!ic.alive) continue;
		const tgt = sim.missiles[ic.target];
		if (!tgt?.alive) {
			ic.alive = false;
			continue;
		}
		subV(_t0, tgt.pos, ic.pos);
		const d = lenV(_t0);
		normV(_t1, _t0);
		const step = ic.speed * cap;
		if (d < .055 + step * .5) {
			killMissile(tgt, layerOf(lenV(tgt.pos) - 1), true);
			ic.alive = false;
			continue;
		}
		maddV(ic.pos, ic.pos, _t1, step);
		pushTrail(ic.trail, ic.pos);
	}
	if (sim.auto) {
		sim.autoCd -= cap;
		if (sim.autoCd <= 0 && sim.rounds > 0) {
			const m = mostImminent();
			if (m) {
				if ((1 - m.t) / m.speed < 5.2) {
					fireAt(m.id);
					sim.autoCd = .52;
				}
			}
		}
	}
	sim.aliveThreats = countAlive();
	const any = countAllAlive();
	if ((sim.mode === "combat" || sim.mode === "spawning") && sim.spawnQueue.length === 0 && any === 0) {
		sim.mode = "rest";
		sim.restT = 3.1;
		emit({ kind: "rest" });
	}
}
var ctx = null;
var master = null;
var sfx = null;
var music = null;
var muted = false;
var masterVal = .7;
var droneTimer = 0;
function ensure() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC({ latencyHint: "interactive" });
		master = ctx.createGain();
		sfx = ctx.createGain();
		music = ctx.createGain();
		sfx.gain.value = .85;
		music.gain.value = .22;
		sfx.connect(master);
		music.connect(master);
		master.connect(ctx.destination);
		applyMute();
	}
	return ctx;
}
function applyMute() {
	if (!master || !ctx) return;
	const v = muted ? 0 : masterVal * masterVal;
	master.gain.setTargetAtTime(v, ctx.currentTime, .03);
}
function envGain(duration, peak) {
	if (!ctx || !sfx) return null;
	const g = ctx.createGain();
	g.gain.setValueAtTime(1e-4, ctx.currentTime);
	g.gain.exponentialRampToValueAtTime(peak, ctx.currentTime + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + duration);
	g.connect(sfx);
	return g;
}
function tone(freq, duration, type, peak, slide = 0) {
	if (!ctx) return;
	const g = envGain(duration, peak);
	if (!g) return;
	const o = ctx.createOscillator();
	o.type = type;
	o.frequency.setValueAtTime(freq, ctx.currentTime);
	if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), ctx.currentTime + duration);
	o.connect(g);
	o.start();
	o.stop(ctx.currentTime + duration + .02);
}
function noise(duration, peak, hp = 400) {
	if (!ctx) return;
	const g = envGain(duration, peak);
	if (!g) return;
	const n = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
	const ch = n.getChannelData(0);
	for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
	const src = ctx.createBufferSource();
	src.buffer = n;
	const f = ctx.createBiquadFilter();
	f.type = "highpass";
	f.frequency.value = hp;
	src.connect(f);
	f.connect(g);
	src.start();
}
function startDrone() {
	if (!ctx || !music) return;
	const t = ctx.currentTime;
	const make = (freq, type, gVal) => {
		const o = ctx.createOscillator();
		const g = ctx.createGain();
		o.type = type;
		o.frequency.value = freq;
		g.gain.value = gVal;
		o.connect(g);
		g.connect(music);
		o.start(t);
	};
	make(55, "sine", .35);
	make(82.5, "sine", .22);
	make(110.2, "triangle", .08);
	droneTimer = 1;
}
var audio = {
	unlock() {
		const c = ensure();
		if (!c) return;
		if (c.state === "suspended") c.resume();
		if (!droneTimer) startDrone();
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				const ac = ensure();
				if (ac && ac.state === "suspended") ac.resume();
			}
		}, { passive: true });
	},
	setMuted(v) {
		muted = v;
		ensure();
		applyMute();
	},
	setMaster(v) {
		masterVal = v;
		ensure();
		applyMute();
	},
	launch() {
		if (!ensure()) return;
		noise(.12, .22, 800);
		tone(420, .22, "sawtooth", .07, -280);
		tone(180, .18, "sine", .08, -80);
	},
	intercept(layer) {
		if (!ensure()) return;
		const base = layer === "space" ? 880 : layer === "mid" ? 640 : 420;
		noise(.08, .18, 1200);
		tone(base, .16, "square", .05, 200);
		tone(base * .5, .22, "sine", .09, -100);
	},
	impact() {
		if (!ensure()) return;
		noise(.35, .3, 80);
		tone(70, .5, "sine", .22, -40);
		tone(38, .55, "triangle", .14, -10);
	},
	pulse() {
		if (!ensure()) return;
		tone(220, .7, "sine", .16, -140);
		tone(330, .5, "triangle", .08, -80);
		noise(.4, .16, 200);
	},
	alarm() {
		if (!ensure()) return;
		tone(620, .18, "square", .05);
		tone(480, .22, "square", .05);
	},
	ui() {
		if (!ensure()) return;
		tone(740, .06, "sine", .04);
	},
	wave() {
		if (!ensure()) return;
		tone(196, .4, "sine", .08, 80);
		tone(294, .35, "triangle", .05, 40);
	}
};
var SAVE_KEY = "gold-dome-v1";
var SAVE_VERSION = 1;
var defaults = {
	version: SAVE_VERSION,
	highScore: 0,
	bestWave: 0,
	muted: false,
	seenBriefing: false,
	shake: true
};
function loadSave() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return { ...defaults };
		const parsed = JSON.parse(raw);
		return {
			...defaults,
			...parsed,
			version: SAVE_VERSION
		};
	} catch {
		return { ...defaults };
	}
}
function persist(partial) {
	try {
		const cur = loadSave();
		localStorage.setItem(SAVE_KEY, JSON.stringify({
			...cur,
			...partial
		}));
	} catch {}
}
var toastId = 1;
var hudAcc = 0;
var alarmCd = 0;
function snapCities() {
	return CITIES.map((c, i) => {
		const s = sim.cities[i];
		return {
			name: c.name,
			short: c.short,
			dead: s.dead,
			hits: s.hits
		};
	});
}
function applyHud(set, get) {
	const high = Math.max(get().highScore, sim.score);
	const best = Math.max(get().bestWave, sim.wave);
	if (high !== get().highScore || best !== get().bestWave) persist({
		highScore: high,
		bestWave: best
	});
	set({
		wave: sim.wave,
		score: sim.score,
		combo: sim.combo,
		integrity: sim.integrity,
		rounds: sim.rounds,
		pulseReady: sim.pulseReady,
		auto: sim.auto,
		threats: sim.aliveThreats,
		cities: snapCities(),
		restT: sim.restT,
		highScore: high,
		bestWave: best
	});
}
var useGame = create((set, get) => ({
	phase: "title",
	wave: 0,
	waveName: "",
	score: 0,
	combo: 0,
	integrity: 100,
	rounds: 10,
	pulseReady: true,
	auto: false,
	muted: false,
	shake: true,
	highScore: 0,
	bestWave: 0,
	threats: 0,
	cities: CITIES.map((c) => ({
		name: c.name,
		short: c.short,
		dead: false,
		hits: 0
	})),
	restT: 0,
	flash: 0,
	flashTone: "gold",
	toasts: [],
	reducedMotion: false,
	totalWaves: 8,
	hydrate() {
		const s = loadSave();
		const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		audio.setMuted(s.muted);
		set({
			highScore: s.highScore,
			bestWave: s.bestWave,
			muted: s.muted,
			shake: s.shake,
			reducedMotion: !!reduce
		});
	},
	engage() {
		audio.unlock();
		audio.ui();
		const save = loadSave();
		persist({ seenBriefing: true });
		if (save.seenBriefing) {
			const auto = typeof window !== "undefined" && window.innerWidth < 720;
			startRun(auto);
			sim.paused = false;
			set({
				phase: "playing",
				auto,
				waveName: "PROBE"
			});
		} else set({ phase: "briefing" });
	},
	skipBriefing() {
		audio.unlock();
		audio.ui();
		persist({ seenBriefing: true });
		const auto = typeof window !== "undefined" && window.innerWidth < 720;
		startRun(auto);
		sim.paused = false;
		set({
			phase: "playing",
			auto,
			waveName: "PROBE"
		});
	},
	togglePause() {
		const { phase } = get();
		if (phase === "playing") {
			sim.paused = true;
			set({ phase: "paused" });
		} else if (phase === "paused") {
			sim.paused = false;
			set({ phase: "playing" });
		}
		audio.ui();
	},
	toggleAuto() {
		sim.auto = !sim.auto;
		set({ auto: sim.auto });
		audio.ui();
	},
	toggleMute() {
		const muted = !get().muted;
		audio.setMuted(muted);
		persist({ muted });
		set({ muted });
	},
	toggleShake() {
		const shake = !get().shake;
		persist({ shake });
		set({ shake });
		audio.ui();
	},
	interceptId(id) {
		if (get().phase !== "playing") return;
		fireAt(id);
	},
	interceptRay(origin, dir) {
		if (get().phase !== "playing") return;
		fireNearestToRay(origin, dir);
	},
	pulse() {
		firePulse();
	},
	tick(dt) {
		const { phase, flash } = get();
		if (flash > 0) set({ flash: Math.max(0, flash - dt * 3.2) });
		if (phase !== "playing") {
			if (phase === "title" || phase === "briefing") {}
			return;
		}
		stepSim(dt);
		hudAcc += dt;
		alarmCd = Math.max(0, alarmCd - dt);
		const events = drainEvents();
		const toasts = get().toasts.slice(-4);
		let nextFlash = get().flash;
		let tone = get().flashTone;
		let nextPhase = get().phase;
		let waveName = get().waveName;
		for (const e of events) {
			if (e.kind === "launch") audio.launch();
			if (e.kind === "intercept") {
				audio.intercept(e.layer);
				nextFlash = Math.min(1, nextFlash + .45);
				tone = "gold";
				toasts.push({
					id: toastId++,
					text: `+${e.score}  ${e.layer.toUpperCase()}`,
					tone: "gold"
				});
			}
			if (e.kind === "impact") {
				audio.impact();
				nextFlash = 1;
				tone = "crimson";
				toasts.push({
					id: toastId++,
					text: "LEAKER",
					tone: "warn"
				});
			}
			if (e.kind === "pulse") audio.pulse();
			if (e.kind === "wave") {
				audio.wave();
				waveName = e.name;
				toasts.push({
					id: toastId++,
					text: `WAVE ${e.n}  ${e.name}`,
					tone: "gold"
				});
			}
			if (e.kind === "rest") toasts.push({
				id: toastId++,
				text: "WAVE CLEAR",
				tone: "gold"
			});
			if (e.kind === "alarm" && alarmCd <= 0) {
				audio.alarm();
				alarmCd = 3;
			}
			if (e.kind === "defeat") {
				audio.impact();
				nextPhase = "defeat";
			}
			if (e.kind === "victory") {
				audio.wave();
				nextPhase = "victory";
			}
		}
		if (toasts.length > 5) toasts.splice(0, toasts.length - 5);
		if (events.length || hudAcc > .1 || nextPhase !== phase) {
			hudAcc = 0;
			applyHud(set, get);
			set({
				phase: nextPhase,
				flash: nextFlash,
				flashTone: tone,
				toasts,
				waveName
			});
		}
	},
	rearm() {
		audio.ui();
		audio.unlock();
		const auto = get().auto;
		startRun(auto);
		sim.paused = false;
		set({
			phase: "playing",
			waveName: "PROBE",
			flash: 0,
			toasts: []
		});
	},
	toTitle() {
		audio.ui();
		resetSim();
		set({
			phase: "title",
			wave: 0,
			score: 0,
			integrity: 100,
			threats: 0,
			toasts: [],
			flash: 0
		});
	}
}));
var rayOrigin = vec();
var rayDir = vec();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-ivory text-obsidian shadow-[0_0_0_1px_rgba(243,237,224,0.12)] hover:opacity-90",
			gold: "bg-gold text-obsidian hover:bg-gold-soft",
			ghost: "bg-transparent text-ivory shadow-[0_0_0_1px_rgba(243,237,224,0.16)] hover:bg-ivory/6",
			danger: "bg-transparent text-crimson shadow-[0_0_0_1px_rgba(179,58,58,0.45)] hover:bg-crimson/10"
		},
		size: {
			sm: "h-10 rounded-[var(--radius-sm)] px-3.5 text-sm",
			md: "h-11 rounded-[var(--radius-md)] px-5 text-sm",
			lg: "h-12 rounded-[var(--radius-md)] px-6 text-base",
			xl: "h-14 rounded-[var(--radius-lg)] px-8 text-base tracking-[0.18em]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
function IntegrityBar({ value }) {
	const low = value <= 28;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-2xs font-medium tracking-[0.22em] text-muted uppercase",
				children: "Shield"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: cn("font-display text-sm tabular-nums tracking-wide", low ? "text-crimson" : "text-gold-soft"),
				children: [Math.round(value), "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1 overflow-hidden rounded-full bg-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full transition-[width,background-color] duration-[var(--motion-fast)] ease-[var(--ease-out)]", low ? "bg-crimson" : "bg-gold"),
				style: { width: `${Math.max(2, value)}%` }
			})
		})]
	});
}
function HudChip({ label, value, warn = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-2xs font-medium tracking-[0.2em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display text-base tabular-nums leading-none tracking-wide sm:text-lg", warn ? "text-crimson" : "text-ivory"),
			children: value
		})]
	});
}
function Title() {
	const engage = useGame((s) => s.engage);
	const high = useGame((s) => s.highScore);
	const best = useGame((s) => s.bestWave);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overlay-panel flex h-full flex-col items-center justify-between px-5 py-8 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full max-w-lg items-center justify-between text-2xs tracking-[0.28em] text-muted uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Homeland Shield" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Command" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
						className: "mb-6 size-10 text-gold sm:mb-8 sm:size-12",
						strokeWidth: 1.25
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise delay-1 mb-3 text-2xs tracking-[0.42em] text-gold uppercase",
						children: "Golden Dome for America"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "rise delay-2 font-display text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.9] font-medium tracking-[0.12em] text-ivory text-balance",
						children: ["GOLD", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-gold",
							children: "DOME"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rise delay-3 mt-6 max-w-sm text-pretty text-sm leading-relaxed text-muted sm:text-base",
						children: "Layered missile defense. Space interceptors, midcourse kinetics, terminal batteries. Hold the shield."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rise delay-4 pointer-events-auto mt-10 min-w-[220px] tracking-[0.28em] uppercase",
						size: "xl",
						onClick: engage,
						children: "Engage"
					}),
					high > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "rise delay-5 mt-5 text-2xs tracking-[0.18em] text-muted uppercase",
						children: [
							"Best ",
							high.toLocaleString(),
							" · Wave ",
							best
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-center text-2xs leading-relaxed tracking-[0.08em] text-muted",
				children: "Click a threat to intercept. Drag to orbit. Scroll to zoom."
			})
		]
	});
}
function Briefing() {
	const go = useGame((s) => s.skipBriefing);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overlay-panel pointer-events-auto flex h-full items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-modal w-full max-w-md p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs tracking-[0.32em] text-gold uppercase",
					children: "Standing order"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl tracking-[0.06em] text-ivory",
					children: "Three layers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-6 space-y-4 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-soft",
							children: "01 Space"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-ivory/90",
							children: "Boost and midcourse intercepts from the constellation. Highest score."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-soft",
							children: "02 Terminal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-ivory/90",
							children: "Ground batteries under the dome. Last chance on leakers."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gold-soft",
							children: "03 Pulse"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-ivory/90",
							children: "One dome pulse per wave. Sweeps the cap. Spend it well."
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-8 w-full tracking-[0.22em] uppercase",
					size: "lg",
					onClick: go,
					children: "Take command"
				})
			]
		})
	});
}
function PlayingHud() {
	const wave = useGame((s) => s.wave);
	const waveName = useGame((s) => s.waveName);
	const score = useGame((s) => s.score);
	const combo = useGame((s) => s.combo);
	const integrity = useGame((s) => s.integrity);
	const rounds = useGame((s) => s.rounds);
	const pulseReady = useGame((s) => s.pulseReady);
	const auto = useGame((s) => s.auto);
	const muted = useGame((s) => s.muted);
	const threats = useGame((s) => s.threats);
	const cities = useGame((s) => s.cities);
	const restT = useGame((s) => s.restT);
	const total = useGame((s) => s.totalWaves);
	const pause = useGame((s) => s.togglePause);
	const toggleAuto = useGame((s) => s.toggleAuto);
	const toggleMute = useGame((s) => s.toggleMute);
	const pulse = useGame((s) => s.pulse);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 flex flex-col justify-between p-3 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-hud w-min min-w-[11.5rem] max-w-[52%] p-3 sm:min-w-[16rem] sm:p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							className: "size-4 text-gold",
							strokeWidth: 1.5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm tracking-[0.22em] text-ivory uppercase",
							children: "Gold Dome"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrityBar, { value: integrity })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "surface-icon",
						"aria-label": muted ? "Unmute" : "Mute",
						onClick: toggleMute,
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "surface-icon",
						"aria-label": "Pause",
						onClick: pause,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none flex justify-center",
				children: restT > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-hud px-4 py-2 text-2xs tracking-[0.28em] text-gold-soft uppercase",
					children: ["Wave clear · Next in ", Math.ceil(restT)]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("rounded-full px-2 py-1 text-2xs tracking-[0.14em] uppercase", c.dead ? "bg-crimson/15 text-crimson line-through" : "bg-ivory/6 text-muted"),
							children: c.short
						}, c.short))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-hud flex flex-wrap items-end justify-between gap-4 p-3 sm:p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
								label: "Wave",
								value: `${wave}/${total}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
								label: "Track",
								value: waveName || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
								label: "Score",
								value: score.toLocaleString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
								label: "Threats",
								value: threats,
								warn: threats > 8
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
								label: "Rounds",
								value: rounds,
								warn: rounds <= 2
							}),
							combo > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
								label: "Combo",
								value: `×${combo}`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: auto ? "gold" : "ghost",
							size: "md",
							className: "min-h-11 flex-1 tracking-[0.16em] uppercase",
							onClick: toggleAuto,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-4" }), "Auto"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: pulseReady ? "gold" : "ghost",
							size: "md",
							className: "min-h-11 flex-1 tracking-[0.16em] uppercase",
							disabled: !pulseReady,
							onClick: pulse,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" }), "Pulse"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden text-center text-2xs tracking-[0.14em] text-muted uppercase sm:block",
						children: "Click threats to fire · Space pause · A auto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-2xs tracking-[0.14em] text-muted uppercase sm:hidden",
						children: "Tap inbound tracks to intercept"
					})
				]
			})
		]
	});
}
function PauseModal() {
	const resume = useGame((s) => s.togglePause);
	const toTitle = useGame((s) => s.toTitle);
	const shake = useGame((s) => s.shake);
	const toggleShake = useGame((s) => s.toggleShake);
	const muted = useGame((s) => s.muted);
	const toggleMute = useGame((s) => s.toggleMute);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overlay-panel pointer-events-auto flex h-full items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-modal w-full max-w-sm p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs tracking-[0.32em] text-gold uppercase",
					children: "Hold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl text-ivory",
					children: "Paused"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							className: "tracking-[0.18em] uppercase",
							onClick: resume,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Resume"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "lg",
							className: "tracking-[0.14em] uppercase",
							onClick: toggleMute,
							children: muted ? "Sound off" : "Sound on"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "lg",
							className: "tracking-[0.14em] uppercase",
							onClick: toggleShake,
							children: shake ? "Shake on" : "Shake off"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "lg",
							className: "tracking-[0.14em] uppercase",
							onClick: toTitle,
							children: "End watch"
						})
					]
				})
			]
		})
	});
}
function EndCard({ title, kicker, onAgain, onHome }) {
	const score = useGame((s) => s.score);
	const high = useGame((s) => s.highScore);
	const wave = useGame((s) => s.wave);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overlay-panel pointer-events-auto flex h-full items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-modal w-full max-w-sm p-6 text-center sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xs tracking-[0.32em] text-gold uppercase",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl tracking-[0.04em] text-ivory text-balance",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 font-display text-3xl tabular-nums text-gold-soft",
					children: score.toLocaleString()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-2xs tracking-[0.16em] text-muted uppercase",
					children: [
						"Wave ",
						wave,
						" · Best ",
						high.toLocaleString()
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: "tracking-[0.2em] uppercase",
						onClick: onAgain,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Rearm"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "lg",
						className: "tracking-[0.16em] uppercase",
						onClick: onHome,
						children: "Stand down"
					})]
				})
			]
		})
	});
}
function Toasts() {
	const toasts = useGame((s) => s.toasts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute top-1/3 right-3 flex flex-col items-end gap-1.5 sm:right-6",
		children: toasts.slice(-4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("rounded-[var(--radius-sm)] px-3 py-1.5 text-2xs tracking-[0.18em] uppercase", t.tone === "gold" ? "bg-gold/15 text-gold-soft" : "bg-crimson/18 text-crimson"),
			children: t.text
		}, t.id))
	});
}
function Flash() {
	const flash = useGame((s) => s.flash);
	const tone = useGame((s) => s.flashTone);
	if (flash <= .02) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pointer-events-none absolute inset-0", tone === "gold" ? "bg-gold" : "bg-crimson"),
		style: { opacity: flash * (tone === "gold" ? .14 : .2) },
		"aria-hidden": true
	});
}
function Overlay() {
	const phase = useGame((s) => s.phase);
	const rearm = useGame((s) => s.rearm);
	const toTitle = useGame((s) => s.toTitle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flash, {}),
			phase === "title" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {}),
			phase === "briefing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefing, {}),
			(phase === "playing" || phase === "paused") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingHud, {}),
			phase === "playing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toasts, {}),
			phase === "paused" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseModal, {}),
			phase === "defeat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				title: "Shield broken",
				kicker: "Leaker",
				onAgain: rearm,
				onHome: toTitle
			}),
			phase === "victory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndCard, {
				title: "The dome holds",
				kicker: "Raid defeated",
				onAgain: rearm,
				onHome: toTitle
			}),
			(phase === "title" || phase === "briefing") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "pointer-events-none absolute top-5 right-5 hidden size-4 text-muted sm:block" })
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
var GoldDomeScene = (0, import_react.lazy)(() => import("./GoldDomeScene-DhkY0k5e.mjs"));
function Shell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-obsidian text-ivory",
		children
	});
}
function LoadingGlobe() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full w-full flex-col items-center justify-center gap-4 bg-obsidian",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xs tracking-[0.4em] text-gold uppercase",
				children: "Gold Dome"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl tracking-[0.14em] text-ivory",
				children: "GOLD DOME"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Spinning up the constellation"
			})
		]
	});
}
function Home() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const hydrate = useGame((s) => s.hydrate);
	const togglePause = useGame((s) => s.togglePause);
	const toggleAuto = useGame((s) => s.toggleAuto);
	const toggleMute = useGame((s) => s.toggleMute);
	const pulse = useGame((s) => s.pulse);
	const engage = useGame((s) => s.engage);
	const skipBriefing = useGame((s) => s.skipBriefing);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const phase = useGame.getState().phase;
			if (e.code === "Space" || e.code === "ArrowUp" || e.code === "ArrowDown") e.preventDefault();
			if (e.code === "KeyM") toggleMute();
			if (phase === "title" && (e.code === "Enter" || e.code === "Space")) {
				engage();
				return;
			}
			if (phase === "briefing" && (e.code === "Enter" || e.code === "Space")) {
				skipBriefing();
				return;
			}
			if (phase === "playing" || phase === "paused") {
				if (e.code === "Space" || e.code === "Escape" || e.code === "KeyP") togglePause();
				if (e.code === "KeyA") toggleAuto();
				if (e.code === "KeyQ") pulse();
			}
		};
		window.addEventListener("keydown", onKey, { passive: false });
		return () => window.removeEventListener("keydown", onKey);
	}, [
		engage,
		skipBriefing,
		toggleAuto,
		toggleMute,
		togglePause,
		pulse
	]);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingGlobe, {}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingGlobe, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoldDomeScene, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {})] });
}
//#endregion
export { drainVfx as a, DOME_LAT as c, SAT_R as d, latLonToVec as f, US_FILL as g, CONTINENTS as h, useGame as i, DOME_LON as l, CITY_LIGHTS as m, rayDir as n, sim as o, vec as p, rayOrigin as r, DOME_ANGLE as s, routes_exports as t, DOME_R as u };
