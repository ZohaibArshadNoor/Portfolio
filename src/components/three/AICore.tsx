"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "@/lib/three-manager";

const NODE_COUNT = 48;
const CONNECTION_THRESHOLD = 2.4;

/**
 * Floating AI neural-core: nodes + connections with gentle idle motion
 * and pointer-reactive lighting via parent scene pointer state.
 */
export function AICore({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, connections } = useMemo(() => {
    const rand = createSeededRandom(42);
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 1.2 + rand() * 1.4;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }

    const connections: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (positions[i].distanceTo(positions[j]) < CONNECTION_THRESHOLD) {
          connections.push(i, j);
        }
      }
    }
    return { positions, connections };
  }, []);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array(connections.length * 3);
    connections.forEach((nodeIdx, i) => {
      const p = positions[nodeIdx];
      verts[i * 3] = p.x;
      verts[i * 3 + 1] = p.y;
      verts[i * 3 + 2] = p.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return geo;
  }, [connections, positions]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const basePositions = useMemo(() => positions.map((p) => p.clone()), [positions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const px = pointer.current?.x ?? 0;
      const py = pointer.current?.y ?? 0;
      group.current.rotation.y = t * 0.15 + px * 0.4;
      group.current.rotation.x = Math.sin(t * 0.2) * 0.15 + py * 0.3;
    }

    if (nodesRef.current) {
      basePositions.forEach((base, i) => {
        const pulse = 1 + Math.sin(t * 1.5 + i * 0.4) * 0.08;
        dummy.position.set(
          base.x * pulse,
          base.y * pulse + Math.sin(t + i) * 0.05,
          base.z * pulse
        );
        const s = 0.04 + (i % 5) * 0.008;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Pulse connection opacity via material
    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.25 + Math.sin(t * 2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Core glow sphere */}
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#00E5FF"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.2}
          transparent
          opacity={0.35}
        />
      </mesh>

      <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.8}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#8B5CF6" transparent opacity={0.3} />
      </lineSegments>

      {/* Outer orbital rings */}
      {[1.8, 2.3, 2.8].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + i * 0.4, i * 0.6, 0]}>
          <torusGeometry args={[r, 0.008, 8, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00E5FF" : "#8B5CF6"}
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}
