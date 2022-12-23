import * as THREE from "three";
import "./style.css";
import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls";
import {RGBELoader} from "./node_modules/three/examples/jsm/loaders/RGBELoader"
import gsap from "gsap";
import {GLTFLoader} from "./node_modules/three/examples/jsm/loaders/GLTFLoader";
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=20
camera.updateProjectionMatrix() 
const renderer=new THREE.WebGLRenderer({
    canvas:document.querySelector(".canvas")
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.render(scene,camera);
renderer.setClearColor("gray")
//orbitcontrols
const controls=new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true;
controls.enableZoom=false;
controls.enablePan=false;
//box
const light =  new THREE.PointLight(0xff0000,30,100);
light.position.set(50,50,50)
scene.add(light)
document.querySelector("nav").style.width=`${window.innerWidth}px`
//hdr
const hdr = new RGBELoader()
hdr.load('./gltf/forest.hdr',(texture)=>{
    texture.mapping=THREE.EquirectangularReflectionMapping
    scene.background=texture
    scene.environment=texture

//})
// const box=new THREE.BoxGeometry(5,5,5)
// const skinColor=new THREE.MeshBasicMaterial({color:"blue"})
// const combine=new THREE.Mesh(box,skinColor)
// const textureLoader=new THREE.TextureLoader
//loaer
 const loader=new GLTFLoader()
 loader.load("./gltf/house.gltf",(gltf)=>{
     scene.add(gltf.scene);
     function animate(){
         requestAnimationFrame(animate);
     
     gltf.scene.position.x=1
     gltf.scene.position.z=5
   gltf.scene.position.y=-1

    
    }
   const tl=gsap.timeline({defaults:{duration:3}})
  tl.fromTo(gltf.scene.scale,{z:0,x:0,y:0},{z:1,y:1,x:1})
   animate()
  })

  
//update screen size
document.body.style.width=`${window.innerWidth}+px`


window.onresize=function(){
    renderer.setSize(window.innerWidth,window.innerHeight)
    camera.updateProjectionMatrix() 
    document.querySelector("nav").style.width=`${window.innerWidth}px`
   

}
//gsap
const tl=gsap.timeline({defaults:{duration:1}})
tl.delay(2)
tl.fromTo("nav",{opacity:0},{opacity:"1"})
tl.fromTo("nav",{y:"-10px"},{y:"10px"})
tl.fromTo(".container h1",{opacity:0},{opacity:"1"})
tl.fromTo(".container h1",{y:"750%"},{y:"500%"})
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera)
    camera.aspect=window.innerWidth/window.innerHeight
    controls.update()
  }
  animate()
