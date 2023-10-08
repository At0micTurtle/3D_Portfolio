/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
	Decal,
	Float,
	OrbitControls,
	Preload,
	useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader";

const Ball = (props) => {
	const [decal] = useTexture([props.imgUrl]);

	return (
		<Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
			<ambientLight intensity={0.55} />
			<directionalLight position={[0, 0, 0.05]} />
			<mesh castShadow receiveShadow scale={2.75}>
				<icosahedronGeometry args={[1, 1]} />
				<meshStandardMaterial
					color="#fff8eb"
					polygonOffset
					polygonOffsetFactor={-5}
					flatShading
				/>
				<Decal
					position={[0, 0, 1]}
					rotation={[2 * Math.PI, 0, 6.25]}
					scale={1}
					map={decal}
					flatShading
				/>
			</mesh>
		</Float>
	);
};

export default function BallCanvas({ icon }) {
	const [isManipulated, setIsManipulated] = useState(false);
	const controlsRef = useRef();
	const resetPosition = () => {
		if (controlsRef.current) {
			controlsRef.current.reset();
		}
	};

	useEffect(() => {
		if (isManipulated) {
			const timer = setTimeout(() => {
				resetPosition();
				setIsManipulated(false);
			}, 1000);

			return () => clearTimeout(timer);
		}
	}, [isManipulated]);

	return (
		<Canvas
			frameloop="always"
			dpr={[1, 2]}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					enableZoom={false}
					ref={controlsRef}
					onChange={() => setIsManipulated(true)}
				/>
				<Ball imgUrl={icon} />
			</Suspense>

			<Preload all />
		</Canvas>
	);
}
