$(function(){

	var myResizeTimer = null;
	var widthWindow = 0;
	var heightWindow = 0;
	var longerSide = 0;	
	var particleArray = [];
	var canvas = document.getElementById('canvas');
	var ctx = null;

	function init(){

		var minRadiusParticle = 1;
		var maxRadiusParticle = 2;
		var triggerDistance = 0;
		var velocity = 1;
		var density = 0;
		widthWindow = window.innerWidth;
		heightWindow = window.innerHeight;
		longerSide = Math.max(widthWindow, heightWindow);
		particleArray = [];

      	var constColors = [
		   	"#4ABDAC", "#FC4A1A", "#F7B733", "#DFDCE3",
		   	"#BFD8D2", "#FEDCD2", "#DF744A", "#DCB239",
		   	"#C0B283", "#DCD0C0", "#F4F4F4", "#FFFFFF",
		   	"#96858F", "#6D7993", "#9099A2", "#D5D5D5",
		   	"#94618E", "#49274A", "#F4DECB", "#F8EEE7",
		   	"#D7CEC7", "#565656", "#76323F", "#C09F80",
		   	"#DDDDDD", "#30AED8", "#984B43", "#EAC67A",
		   	"#6B7A8F", "#F7882F", "#F7C331", "#DCC7AA"
		];

		if (canvas.getContext) {
			ctx = canvas.getContext('2d');
			canvas.setAttribute('width', widthWindow);
			canvas.setAttribute('height', heightWindow);
			var numParticules = Math.round((((widthWindow*heightWindow)/longerSide)/1000)*density);

			for( var i=0 ; i<numParticules ; i++){
				var x = (Math.random()*(widthWindow-maxRadiusParticle*2))+maxRadiusParticle;
				var y = (Math.random()*(heightWindow-maxRadiusParticle*2))+maxRadiusParticle;
				var dx = (Math.random()-0.5)*velocity;
				var dy = (Math.random()-0.5)*velocity;
				var RandomColor = constColors[ Math.floor(Math.random()*constColors.length) ];
				var randomRadius = Math.floor(Math.random()*(maxRadiusParticle-minRadiusParticle)+minRadiusParticle);
				var particle = new Particle(x, y, dx, dy, randomRadius, RandomColor, triggerDistance);
				particleArray.push(particle);
			}
		}
	}

	function Particle(X, Y, Dx, Dy, Radius, Color, TriggerDistance){
		this.x = X;
		this.y = Y;
		this.dx = Dx;
		this. dy = Dy;
		this.radius = Radius;
		this.originalRadius = Radius;
		this.color = Color;
		this.growing = false;
		this.grown = false;

		this.draw = function(){
			ctx.beginPath();
			ctx.arc(
				this.x,
				this.y, 
				this.radius, 
				0, 
				2*Math.PI
			);
			ctx.fillStyle = this.color;
			ctx.fill();
		}

		this.update = function(){
			if( this.x > widthWindow - this.radius || this.x - this.radius < 0 ){
				this.dx = -this.dx;
			}
			if( this.y > heightWindow - this.radius || this.y - this.radius < 0 ){
				this.dy = -this.dy;
			}
			this.x += this.dx;
			this.y += this.dy;

			//CONNECT DOTS ON PROXIMITY
			for(var i=0 ; i<particleArray.length ; i++){
				if(this === particleArray[i]) continue;
				var valueClose = distance (this.x, this.y, particleArray[i].x, particleArray[i].y);
				if(valueClose<TriggerDistance) {
					var tempOpacity = (TriggerDistance-valueClose)/TriggerDistance;
					var tempObjColor1 = hexToRgb(this.color);
					var tempObjColor2 = hexToRgb(particleArray[i].color);
					var gradient=ctx.createLinearGradient(this.x,this.y, particleArray[i].x,particleArray[i].y);
					gradient.addColorStop("0","rgba("+tempObjColor1.r+","+tempObjColor1.g+","+tempObjColor1.b+","+tempOpacity+")");
					gradient.addColorStop("1","rgba("+tempObjColor2.r+","+tempObjColor2.g+","+tempObjColor2.b+","+tempOpacity+")");

					ctx.beginPath();
					ctx.moveTo(this.x,this.y);
					ctx.lineTo(particleArray[i].x,particleArray[i].y);
					ctx.strokeStyle = gradient;
					ctx.lineWidth=1;
					ctx.stroke();
					ctx.closePath();
				}
			}

			this.draw();
		}
	}

	function distance(x0, y0, x1, y1){
		var distanceX = x1 - x0;
		var distanceY = y1 - y0;

		return Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2))
	}

	function animate(){
		requestAnimationFrame(animate);
		ctx.clearRect(0,0,widthWindow,heightWindow);
		for( var i=0 ; i<particleArray.length ; i++){
			particleArray[i].update();
		}
	}
  
  	//CONVERT HEX TO RGB
    function hexToRgb(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}

	window.onresize = function(){
		if(myResizeTimer != null) clearTimeout(myResizeTimer);
    	myResizeTimer = setTimeout(init, 100);
	}

	init();
	animate();
});