import Topbar from "../../components/topbar/Topbar";
// import zerowasteBackground from "../../assets/zerowaste.png";
import { Link } from "react-router-dom";
import React from 'react'

// import React, { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'

import "./home.css";

// function Box() {
//     return (
//         <mesh>
//             <boxBufferGeometry attach="geometry" />
//             <meshLambertMaterial attach="material" color="hotpink"></meshLambertMaterial>
//         </mesh>
//     )
// }

// function Box(props) {
//     // This reference will give us direct access to the THREE.Mesh object
//     const mesh = useRef()
//     // Set up state for the hovered and active state
//     const [hovered, setHover] = useState(false)
//     const [active, setActive] = useState(false)
//     // Subscribe this component to the render-loop, rotate the mesh every frame
//     useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
//     // Return the view, these are regular Threejs elements expressed in JSX
//     return (
//       <mesh
//         {...props}
//         ref={mesh}
//         scale={active ? 1.5 : 1}
//         onClick={(event) => setActive(!active)}
//         onPointerOver={(event) => setHover(true)}
//         onPointerOut={(event) => setHover(false)}>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//       </mesh>
//     )
//   }

export default function Home() {
  document.documentElement.style.setProperty('--main-color', '#FFFFFF');
  return (
        // <div>
            // {/* <Canvas> */}
            // {/* <Box /> */}
            // {/* </Canvas>, */}
            <div className="home" style={{ backgroundImage: '#028C6A' }}>
            {/* <div className="home" style={{ backgroundColor: '#028C6A' }}> */}
                <Topbar />
                <div className="category">
                <div className="home_space"></div>
                <div className="zerowaste">
                    <Link to="/zerowaste" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <span>Zero Waste</span>
                    </Link>
                </div>
                <div className="carbonfootprint">
                    <Link to="/carbonfootprint" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <span>Carbon Footprint</span>
                    </Link>
                </div>
                <div className="food">
                    <Link to="/food" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <span>Food</span>
                    </Link>
                </div>
                <div className="others">
                    <Link to="/others" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <span>Others</span>
                    </Link>
                </div>
                <div className="home_space"></div>
                </div>
            </div>
        // </div >
    )
}