THREE.ShaderPass=function(e,t){this.textureID=void 0!==t?t:"tDiffuse",this.uniforms=THREE.UniformsUtils.clone(e.uniforms),this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.renderToScreen=!1,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),this.scene=new THREE.Scene,this.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),this.scene.add(this.quad)},THREE.ShaderPass.prototype={render:function(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r),this.quad.material=this.material,this.renderToScreen?e.render(this.scene,this.camera):e.render(this.scene,this.camera,t,this.clear)}},THREE.MaskPass=function(e,t){this.scene=e,this.camera=t,this.enabled=!0,this.clear=!0,this.needsSwap=!1,this.inverse=!1},THREE.MaskPass.prototype={render:function(e,t,r){var i=e.context;i.colorMask(!1,!1,!1,!1),i.depthMask(!1);var s,a;this.inverse?(s=0,a=1):(s=1,a=0),i.enable(i.STENCIL_TEST),i.stencilOp(i.REPLACE,i.REPLACE,i.REPLACE),i.stencilFunc(i.ALWAYS,s,4294967295),i.clearStencil(a),e.render(this.scene,this.camera,r,this.clear),e.render(this.scene,this.camera,t,this.clear),i.colorMask(!0,!0,!0,!0),i.depthMask(!0),i.stencilFunc(i.EQUAL,1,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP)}},THREE.ClearMaskPass=function(){this.enabled=!0},THREE.ClearMaskPass.prototype={render:function(e){var t=e.context;t.disable(t.STENCIL_TEST)}},THREE.CopyShader={uniforms:{tDiffuse:{type:"t",value:null},opacity:{type:"f",value:1}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float opacity;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","vec4 texel = texture2D( tDiffuse, vUv );","gl_FragColor = opacity * texel;","}"].join("\n")},THREE.DigitalGlitch={uniforms:{tDiffuse:{type:"t",value:null},tDisp:{type:"t",value:null},byp:{type:"i",value:0},amount:{type:"f",value:.08},angle:{type:"f",value:.02},seed:{type:"f",value:.02},seed_x:{type:"f",value:.02},seed_y:{type:"f",value:.02},distortion_x:{type:"f",value:.5},distortion_y:{type:"f",value:.6},col_s:{type:"f",value:.05}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform int byp;","uniform sampler2D tDiffuse;","uniform sampler2D tDisp;","uniform float amount;","uniform float angle;","uniform float seed;","uniform float seed_x;","uniform float seed_y;","uniform float distortion_x;","uniform float distortion_y;","uniform float col_s;","varying vec2 vUv;","float rand(vec2 co){","return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);","}","void main() {","if(byp<1) {","vec2 p = vUv;","float xs = floor(gl_FragCoord.x / 0.5);","float ys = floor(gl_FragCoord.y / 0.5);","vec4 normal = texture2D (tDisp, p*seed*seed);","if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {","if(seed_x>0.){","p.y = 1. - (p.y + distortion_y);","}","else {","p.y = distortion_y;","}","}","if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {","if(seed_y>0.){","p.x=distortion_x;","}","else {","p.x = 1. - (p.x + distortion_x);","}","}","p.x+=normal.x*seed_x*(seed/5.);","p.y+=normal.y*seed_y*(seed/5.);","vec2 offset = amount * vec2( cos(angle), sin(angle));","vec4 cr = texture2D(tDiffuse, p + offset);","vec4 cga = texture2D(tDiffuse, p);","vec4 cb = texture2D(tDiffuse, p - offset);","gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);","vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);","gl_FragColor = gl_FragColor+ snow;","}","else {","gl_FragColor=texture2D (tDiffuse, vUv);","}","}"].join("\n")},THREE.RenderPass=function(e,t,r,i,s){this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=void 0!==s?s:1,this.oldClearColor=new THREE.Color,this.oldClearAlpha=1,this.enabled=!0,this.clear=!0,this.needsSwap=!1},THREE.RenderPass.prototype={render:function(e,t,r){this.scene.overrideMaterial=this.overrideMaterial,this.clearColor&&(this.oldClearColor.copy(e.getClearColor()),this.oldClearAlpha=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),e.render(this.scene,this.camera,r,this.clear),this.clearColor&&e.setClearColor(this.oldClearColor,this.oldClearAlpha),this.scene.overrideMaterial=null}},THREE.EffectComposer=function(e,t){if(this.renderer=e,void 0===t){var r=window.innerWidth||1,i=window.innerHeight||1,s={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat,stencilBuffer:!1};t=new THREE.WebGLRenderTarget(r,i,s)}this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.passes=[],void 0===THREE.CopyShader&&console.error("THREE.EffectComposer relies on THREE.CopyShader"),this.copyPass=new THREE.ShaderPass(THREE.CopyShader)},THREE.EffectComposer.prototype={swapBuffers:function(){var e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e},addPass:function(e){this.passes.push(e)},insertPass:function(e,t){this.passes.splice(t,0,e)},render:function(e){this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2;var t,r,i=!1,s=this.passes.length;for(r=0;s>r;r++)if(t=this.passes[r],t.enabled){if(t.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),t.needsSwap){if(i){var a=this.renderer.context;a.stencilFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),a.stencilFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}t instanceof THREE.MaskPass?i=!0:t instanceof THREE.ClearMaskPass&&(i=!1)}},reset:function(e){void 0===e&&(e=this.renderTarget1.clone(),e.width=window.innerWidth,e.height=window.innerHeight),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2},setSize:function(e,t){var r=this.renderTarget1.clone();r.width=e,r.height=t,this.reset(r)}},THREE.GlitchPass=function(e){void 0===THREE.DigitalGlitch&&console.error("THREE.GlitchPass relies on THREE.DigitalGlitch");var t=THREE.DigitalGlitch;this.uniforms=THREE.UniformsUtils.clone(t.uniforms),void 0==e&&(e=64),this.uniforms.tDisp.value=this.generateHeightmap(e),this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),console.log(this.material),this.enabled=!0,this.renderToScreen=!1,this.needsSwap=!0,this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1),this.scene=new THREE.Scene,this.quad=new THREE.Mesh(new THREE.PlaneBufferGeometry(2,2),null),this.scene.add(this.quad),this.goWild=!1,this.curF=0,this.generateTrigger()},THREE.GlitchPass.prototype={render:function(e,t,r){this.uniforms.tDiffuse.value=r,this.uniforms.seed.value=Math.random(),this.uniforms.byp.value=0,this.curF%this.randX==0||1==this.goWild?(this.uniforms.amount.value=Math.random()/30,this.uniforms.angle.value=THREE.Math.randFloat(-Math.PI,Math.PI),this.uniforms.seed_x.value=THREE.Math.randFloat(-1,1),this.uniforms.seed_y.value=THREE.Math.randFloat(-1,1),this.uniforms.distortion_x.value=THREE.Math.randFloat(0,1),this.uniforms.distortion_y.value=THREE.Math.randFloat(0,1),this.curF=0,this.generateTrigger()):this.curF%this.randX<this.randX/5?(this.uniforms.amount.value=Math.random()/90,this.uniforms.angle.value=THREE.Math.randFloat(-Math.PI,Math.PI),this.uniforms.distortion_x.value=THREE.Math.randFloat(0,1),this.uniforms.distortion_y.value=THREE.Math.randFloat(0,1),this.uniforms.seed_x.value=THREE.Math.randFloat(-.3,.3),this.uniforms.seed_y.value=THREE.Math.randFloat(-.3,.3)):0==this.goWild&&(this.uniforms.byp.value=1),this.curF++,this.quad.material=this.material,this.renderToScreen?e.render(this.scene,this.camera):e.render(this.scene,this.camera,t,!1)},generateTrigger:function(){this.randX=THREE.Math.randInt(120,240)},generateHeightmap:function(e){var t=new Float32Array(e*e*3);console.log(e);for(var r=e*e,i=0;r>i;i++){var s=THREE.Math.randFloat(0,1);t[3*i+0]=s,t[3*i+1]=s,t[3*i+2]=s}var a=new THREE.DataTexture(t,e,e,THREE.RGBFormat,THREE.FloatType);return console.log(a),console.log(e),a.minFilter=THREE.NearestFilter,a.magFilter=THREE.NearestFilter,a.needsUpdate=!0,a.flipY=!1,a}},THREE.RGBShiftShader={uniforms:{tDiffuse:{type:"t",value:null},amount:{type:"f",value:.005},angle:{type:"f",value:0}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform sampler2D tDiffuse;","uniform float amount;","uniform float angle;","varying vec2 vUv;","void main() {","vec2 offset = amount * vec2( cos(angle), sin(angle));","vec4 cr = texture2D(tDiffuse, vUv + offset);","vec4 cga = texture2D(tDiffuse, vUv);","vec4 cb = texture2D(tDiffuse, vUv - offset);","gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);","}"].join("\n")};

$(document).ready(function(){
    


var container = $("#draw-this-shit");
var renderer = new THREE.WebGLRenderer({alpha:true});
var distance = 500;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(20,window.innerWidth/window.innerHeight,300,1000);
    var geometry = new THREE.Geometry();
var delta = 0.9;
var shift ;
var particleCount = 90;
var count = 10;
var mouse = new THREE.Vector2(), INTERSECTED;
var raycaster = new THREE.Raycaster();
var random = Math.round(Math.random() * (100 * 3) - 500);
    


renderer.physicallyBasedShading = true;
container.append(renderer.domElement);
scene.fog = new THREE.FogExp2( 0xffffff, 0.090000 );


scene.add(camera);



scene.add( new THREE.AmbientLight( 0xfffff ) );
    
    
    

  
    

var particles = new THREE.Geometry(),
    particlesMaterial = new THREE.ParticleBasicMaterial({
        color:0xFFFFFF,
        size:1,
       blending : THREE.AdditiveBlending,
        transparent: true,
        depthWrite : true,
        opacity:1
    });

 

    
  for (var p = 0; p< particleCount; p++){
    
    var pX = Math.random() * distance * 2 - distance,
        pY = Math.random() * distance * 2 - distance,
        pZ = Math.random() * distance * 2 - distance,
        particle = new THREE.Vector3(pX,pY,pZ);
      particle.velocity = new THREE.Vector3(Math.random(), Math.random(),Math.random());
    particles.vertices.push(particle);
      
      var line = new THREE.Vector3(pX + count  ,pY ,pZ )
      line.velocity = new THREE.Vector3(Math.random(), Math.random(),Math.random());
    
    geometry.vertices.push( line);
    
  
   
    
}

   

var particleSystem = new THREE.ParticleSystem(
    particles,
    particlesMaterial
    
);
    
    
var lineSystem = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color:0xFFFFF,
    transparent:true,
    opacity:0.8,
    
    
    
}))  

lineSystem.sortParticles = true;
scene.add(lineSystem);


particleSystem.sortParticles = true;
scene.add(particleSystem);



camera.position.z = 1000;


renderer.render( scene , camera);
    
    document.addEventListener('mousemove', onMouseMove,false);
    
    
    function onMouseMove(event){
       var mouseX = event.clientX - window.innerWidth/2;
        var mouseY = event.clientY - window.innerHeight/2;
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (mouseY - camera.position.y) * 0.05;
        camera.distance = distance;
        
    
       
     renderer.render( scene , camera);
        camera.lookAt(scene.position);
        
    }
    
    

   
    //postprocessing
    
    
  var  composer = new THREE.EffectComposer( renderer );
    composer.addPass( new THREE.RenderPass( scene, camera ));
    var rgbSplit = new THREE.ShaderPass( THREE.RGBShiftShader);
        rgbSplit.uniforms["amount"].value = 0.0015;
        rgbSplit.renderToScreen = true;
    var glitch = new THREE.GlitchPass();


     
    composer.addPass( rgbSplit);

  
  var stereo = setInterval(function(){
         
         rgbSplit.uniforms["amount"].value  = Math.random() * 0.007 + 0.00001 ;
      
    },random);

    
   
    
    
    





    
  function animate(){

      lineSystem.
    geometry.
    __dirtyVertices = true;

      render();
       requestAnimationFrame( animate);
      
      
  }

    animate();


function render(){
    
    composer.render(scene,camera);
    
    
    
}

});