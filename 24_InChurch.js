let a = [], s = [sa,sd,sf,sg] = [[],[],[],[]], pool=[], d=1, inx=0, mg = null, bf = new Float32Array(1024);;
let ac = null, canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), anl = null, at= 0.1, ag=0.2;

let w = (n) => [
	(new Float32Array(n / 2)).map((v, i) => !i || Math.log2(i)%1 && Math.sqrt(i) % 2 ? 0 : 0.8 / Math.sqrt(i)),
	(new Float32Array(n / 2)).fill(0.2, 1, 2)
]

let co = () => {
	let osc = ac.createOscillator();
	let gain = ac.createGain();
	gain.gain.value=0;
	gain.connect(mg);
	osc.gain = gain.gain;
	osc.connect(gain);
	osc.start(0);
	return osc;
}
let play = (osc, pitch, duration) => {
	osc.setPeriodicWave(ac.createPeriodicWave(...w(inx < 16 ? 16 : inx)));
	osc.frequency.setValueAtTime(pitch, ac.currentTime);
	adsr(osc, duration);
}
let adsr = (osc, duration) => {
	osc.gain.value = 0;
	[[ag, at], [ag / 2, 0.65 * duration], [0,0.75 * duration + 0.2]]
		.forEach(([volume, time])=> osc.gain.linearRampToValueAtTime(volume, ac.currentTime + time))
}
let unpack=(seria, transposition=0) => seria.split(/(?<!-)/).map(pitch => +pitch+ +transposition)

Array.prototype.s = function(seria){ this.push(...unpack(...seria.split(' '))) }

let iId = setInterval(()=>{
	let lsum = 0;
	ctx.clearRect(0,-100, canvas.width, canvas.height * 2)
	a.forEach((l, i) => { s.forEach((ss) => { if(i in ss) { ctx.fillRect(lsum, (ss[i] * 2), l, 2) } }); lsum += l; });
	ctx.fillRect(a.slice(0, inx).reduce((x,y)=>x + y, 0), 0, 1, 100);
	if (!pool.length) { return }
	d--;
	if (!d){
		d = a[inx];
		let dd = a[inx];
		pool.forEach((o,i) => inx in s[i] ? play(o[inx % 2], 16.35 * Math.pow(2, s[i][inx]/12), d): null);
		inx++;
	}
}, 750)
ctx.setTransform(1,0,0,-1,0,100)
canvas.style.width = '800'; canvas.style.height = '400'; document.body.append(canvas);

/*
ac=new AudioContext()
mg=ac.createGain()
mg.connect(ac.destination)
a.s('1111221111314111131421131224')
a.s('1111221111314111131421131224')
sf.s('4444346666646777764344676434 24')
sf.s('4444346666646777764344676434 24')
sg.s('4444447777747777774444775444 19')
sg.s('4444447777747777774444775444 19')
pool=[[co(),co()],[co(),co()],[co(),co()],[co(),co()]]
sa.s('66661644444649999461664-3-1116 10')
sa.s('66661644444649999461664-3-1116 10')
sd.s('4444346666646888864344686434 15')
sd.s('4444346666646888864344686434 15')
a.s('211444')
a.s('211444')
sa.s('888138 8')
sa.s('888138 8')
sd.s('888778 11')
sd.s('888778 11')
sf.s('888988 15')
sf.s('888988 15')
sg.s('888878 20')
sg.s('888878 20')
a.s('444422422444442244889')
sg.s('8764 32')
sf.s('8856 27')
sd.s('8765 23')
sa.s('8765 23')
sa.s('346789 3')
anl=ac.createAnalyser()
mg.connect(anl)
setInterval(()=>{
anl.getFloatTimeDomainData(bf)
ctx.beginPath()
ctx.moveTo(0, bf[0]*1000)
for(var x=2; x<800; x+=2) ctx.lineTo(x,(bf[x]*1000)+20)
ctx.stroke()
}, 50)
sd.s('878973 16')
sf.s('999989 19')
at=0.2;ag=0.03; // whey inx is equal to 68
sg.s('976664 24')
sa.s('9789 2')
sd.s('8944 12')
sg.s('9954 19')
sg.s('9766 12')
sa.s('4579 2')
sg.s('999 2')
sa.s('444')
*/