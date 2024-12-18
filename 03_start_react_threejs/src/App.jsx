import { useState, useEffect } from 'react'
// 导入 three.js
import * as THREE from "three";
import './App.css'

function App() {

  useEffect(() => {
    // 创建一个场景
    const scene = new THREE.Scene();
    
    /**
     * 创建相机
     */
    const camera = new THREE.PerspectiveCamera(
        45, // 视角
        window.innerWidth / window.innerHeight, // 宽高比
        0.1, // 近平面
        1000 // 远平面
    );
    
    // 创建渲染器
    const render = new THREE.WebGLRenderer();
    render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(render.domElement);
    
    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: "skyblue" });
    // 创建网格
    const cube = new THREE.Mesh(geometry, material);
    
    // 将网格添加到场景中
    scene.add(cube);
    // 设置相机位置
    camera.position.z = 5;
    
    // 渲染函数
    function animation() {
        requestAnimationFrame(animation);
        // 旋转
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // 渲染
        render.render(scene, camera);
    }
    
    animation();
  }, [])

  return (
    <>
    </>
  )
}

export default App
