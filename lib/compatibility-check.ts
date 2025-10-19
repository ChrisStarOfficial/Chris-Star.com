export function checkThreeCompatibility(): boolean {
  if (!window.THREE) return false;
  
  const requiredAPIs = [
    'WebGLRenderer',
    'Scene', 
    'PerspectiveCamera',
    'BoxGeometry',
    'MeshBasicMaterial'
  ];
  
  return requiredAPIs.every(api => api in window.THREE);
}