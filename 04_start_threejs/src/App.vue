<script setup>
import "./style.css";
// 导入 three.js
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * 创建一个场景
 */
const scene = new THREE.Scene();

/**
 * 创建渲染器 - 实例化一个 WebGL 渲染器对象
 */
const render = new THREE.WebGLRenderer({
    antialias: true, // 设置渲染器锯齿属性
});
// 设置设备像素比，避免画面输出模糊
render.setPixelRatio(window.devicePixelRatio);
// 设置画布背景颜色
render.setClearColor(0x444444, 1);
// 定义 threejs 输出画布的尺寸（单位：像素px）
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

/**
 * 创建相机：
 *      - 透视投影相机 PerspectiveCamera（模拟人眼观察这个世界的规律）
 *      - 正投影相机 OrthographicCamera
 */
const camera = new THREE.PerspectiveCamera(
    45, // 视角
    window.innerWidth / window.innerHeight, // 宽高比
    100, // 近平面
    8000 // 远平面
);
// 设置相机位置
camera.position.set(3000, 3000, 3000);
// 设置相机观察目标
camera.lookAt(1000, 0, 1000);

/**
 * 创建几何体
 */
const geometry = new THREE.BoxGeometry(100, 100, 100);
// SphereGeometry：球体
// const geometry = new THREE.SphereGeometry(50);
// CylinderGeometry：圆柱
// const geometry = new THREE.CylinderGeometry(50, 50, 100);
// PlaneGeometry：矩形平面
// const geometry = new THREE.PlaneGeometry(100, 50);
// CircleGeometry：圆形平面
// const geometry = new THREE.CircleGeometry(50);

/**
 * 光源
 *      - 环境光 AmbientLight
 *      - 点光源 PointLight
 *      - 聚光灯光源 SpotLight
 *      - 平行光 DirectionalLight
 */
const pointLight = new THREE.PointLight("fff", 1);
// 光源随距离衰减
pointLight.decay = 1;
// 光源位置
pointLight.position.set(5000, 5500, 5000);
// 将光源添加到场景中
scene.add(pointLight);

/**
 * 创建并设置材质：
 *        - 不受光照影响
 *                - 基础网格材质 MeshBasicMaterial（默认材质正面可见，可以通过设置 side 属性进行改变）
 *        - 受光照影响
 *                - 漫反射网格材质 MeshLambertMaterial
 *                - 高光网格材质 MeshPhongMaterial
 *                - 物理
 *                        - MeshStandardMaterial
 *                        - MeshPhysicalMaterial
 */
// 基础网格材质
// const material = new THREE.MeshBasicMaterial({
//     color: "0x0000ff", // 设置材质颜色
//     transparent: true, // 开启透明
//     opacity: 0.5, // 设置透明度
//     side: THREE.FrontSide, // THREE.FrontSide - 默认只有正面可见 | THREE.DoubleSide - 两面可见
// });
// 高光网格材质（模拟镜面反射，产生一个高光效果）
// const material = new THREE.MeshPhongMaterial({
//     color: 0x0000ff, // 设置材质颜色
//     shininess: 20, // 高光亮度，可以控制高光反射效果（默认为 30）
//     specular: 0x444444, // 高光颜色属性
// });
// 材质对象 Material
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //设置材质颜色
    transparent: true, //开启透明
    opacity: 0.5, //设置透明度
});
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        // 创建网格模型，表示生活中的物体
        const mesh = new THREE.Mesh(geometry, material);
        // 在XOZ平面上分布
        mesh.position.set(i * 150, 0, j * 150);
        // 将网格添加到场景中
        scene.add(mesh);
    }
}

/**
 * 辅助观察坐标系：表示坐标系坐标轴线段尺寸大小
 */
const axesHelper = new THREE.AxesHelper(5000);
scene.add(axesHelper);

/**
 * 添加轨道控制器
 */
const controls = new OrbitControls(camera, render.domElement);
// 设置带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼数值
controls.dampingFactor = 0.05;
// 设置是否旋转
controls.autoRotate = true;

// 渲染函数
function animation() {
    controls.update();
    requestAnimationFrame(animation);
    // 旋转
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // 渲染器的渲染方法：将三维场景 scene 呈现在 canvas 画布上
    render.render(scene, camera);
}
animation();

// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    render.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
};
</script>

<template>
    <div></div>
</template>

<style scoped></style>
