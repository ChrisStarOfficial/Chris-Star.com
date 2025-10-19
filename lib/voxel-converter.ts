// utils/voxel-converter.ts
export async function convertVoxToGLTF(voxFile: string): Promise<string> {
  // Use MagicaVoxel converter or custom parser
  // Convert .vox to .glb/.gltf for Three.js
  return `/converted-assets/${voxFile.replace('.vox', '.glb')}`;
}