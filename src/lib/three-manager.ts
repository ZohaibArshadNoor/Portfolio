import * as THREE from "three";

/**
 * Central helpers for disposing Three.js resources safely on unmount.
 * Prevents GPU memory leaks from geometries, materials, and textures.
 */
export function disposeObject3D(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach((mat) => {
        if (!mat) return;
        Object.values(mat).forEach((value) => {
          if (value instanceof THREE.Texture) value.dispose();
        });
        mat.dispose();
      });
    }
    if (child instanceof THREE.Points) {
      child.geometry?.dispose();
      if (child.material instanceof THREE.Material) child.material.dispose();
    }
    if (child instanceof THREE.Line) {
      child.geometry?.dispose();
      if (child.material instanceof THREE.Material) child.material.dispose();
    }
  });
}

export function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
