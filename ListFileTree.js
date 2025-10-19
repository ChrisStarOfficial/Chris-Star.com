const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Common game development files to highlight
const GAME_EXTENSIONS = new Set([
  '.js', '.ts', '.jsx', '.tsx', '.glsl', '.vert', '.frag',
  '.json', '.html', '.css', '.scss', '.md'
]);

const GAME_FOLDERS = new Set([
  'src', 'components', 'public', 'assets', 'models', 'textures',
  'shaders', 'scenes', 'utils', 'lib', 'hooks'
]);

const IGNORE = new Set([
  'node_modules', '.git', '.next', 'dist', 'build',
  'package-lock.json', 'yarn.lock', '.DS_Store'
]);

// Use ASCII characters for clipboard compatibility
const TREE_CHARS = {
  BRANCH: '├── ',
  LAST_BRANCH: '└── ',
  VERTICAL: '│   ',
  SPACER: '    '
};

function generateTree(dir = '.', prefix = '', isLast = true, depth = 0) {
  const baseName = path.basename(dir);
  
  // Skip ignored files/folders
  if (IGNORE.has(baseName) && depth > 0) return '';
  
  let result = '';
  const isRoot = depth === 0;
  
  if (!isRoot) {
    const isGameFile = GAME_EXTENSIONS.has(path.extname(baseName));
    const isGameFolder = fs.statSync(dir).isDirectory() && GAME_FOLDERS.has(baseName);
    const icon = isGameFile ? '📄' : (isGameFolder ? '📁' : '📂');
    
    result += prefix + (isLast ? TREE_CHARS.LAST_BRANCH : TREE_CHARS.BRANCH) + icon + ' ' + baseName;
    
    // Highlight important game files
    if (baseName.includes('three') || baseName.includes('webgl') || baseName.includes('game')) {
      result += ' 🎮';
    } else if (baseName.includes('shader') || baseName.includes('glsl')) {
      result += ' ⚡';
    } else if (baseName.includes('model') || baseName.includes('mesh')) {
      result += ' 🦖';
    }
    result += '\n';
  } else {
    result += 'Company Portal Website Project Structure\n';
    result += '=========================================\n';
  }

  if (fs.statSync(dir).isDirectory()) {
    const files = fs.readdirSync(dir)
      .filter(file => !IGNORE.has(file))
      .sort((a, b) => {
        // Sort: folders first, then files
        const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });
    
    files.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const isFileLast = index === files.length - 1;
      const newPrefix = prefix + (isLast ? TREE_CHARS.SPACER : TREE_CHARS.VERTICAL);
      result += generateTree(filePath, newPrefix, isFileLast, depth + 1);
    });
  }
  
  return result;
}

// Function to copy to clipboard (cross-platform)
function copyToClipboard(text) {
  const platform = process.platform;
  
  return new Promise((resolve, reject) => {
    if (platform === 'win32') {
      // Windows - use chcp to set UTF-8 encoding
      const proc = exec('chcp 65001 >nul && clip', (error) => {
        if (error) reject(error);
        else resolve();
      });
      proc.stdin.write(text);
      proc.stdin.end();
    } else if (platform === 'darwin') {
      // macOS
      const proc = exec('pbcopy', (error) => {
        if (error) reject(error);
        else resolve();
      });
      proc.stdin.write(text);
      proc.stdin.end();
    } else {
      // Linux and other Unix-like systems
      const proc = exec('xclip -selection clipboard', (error) => {
        if (error) {
          // Try xsel if xclip fails
          const proc2 = exec('xsel --clipboard --input', (error2) => {
            if (error2) reject(error2);
            else resolve();
          });
          proc2.stdin.write(text);
          proc2.stdin.end();
        } else {
          resolve();
        }
      });
      proc.stdin.write(text);
      proc.stdin.end();
    }
  });
}

// Alternative: Use ASCII-only tree for better compatibility
function generateAsciiTree(dir = '.', prefix = '', isLast = true, depth = 0) {
  const baseName = path.basename(dir);
  
  // Skip ignored files/folders
  if (IGNORE.has(baseName) && depth > 0) return '';
  
  let result = '';
  const isRoot = depth === 0;
  
  if (!isRoot) {
    const isGameFile = GAME_EXTENSIONS.has(path.extname(baseName));
    const isGameFolder = fs.statSync(dir).isDirectory() && GAME_FOLDERS.has(baseName);
    const icon = isGameFile ? '[F]' : (isGameFolder ? '[D]' : '[ ]');
    
    result += prefix + (isLast ? '+-- ' : '|-- ') + icon + ' ' + baseName;
    
    // Highlight important game files
    if (baseName.includes('three') || baseName.includes('webgl') || baseName.includes('game')) {
      result += ' [GAME]';
    } else if (baseName.includes('shader') || baseName.includes('glsl')) {
      result += ' [SHADER]';
    } else if (baseName.includes('model') || baseName.includes('mesh')) {
      result += ' [MODEL]';
    }
    result += '\n';
  } else {
    result += 'Company Portal Website Project Structure\n';
    result += '=========================================\n';
  }

  if (fs.statSync(dir).isDirectory()) {
    const files = fs.readdirSync(dir)
      .filter(file => !IGNORE.has(file))
      .sort((a, b) => {
        const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
      });
    
    files.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const isFileLast = index === files.length - 1;
      const newPrefix = prefix + (isLast ? '    ' : '|   ');
      result += generateAsciiTree(filePath, newPrefix, isFileLast, depth + 1);
    });
  }
  
  return result;
}

// Main execution
async function main() {
  try {
    const treeStructure = generateTree();
    const asciiTreeStructure = generateAsciiTree();
    
    // Log to console (with proper unicode)
    console.log(treeStructure);
    
    // Try to copy unicode version first, fallback to ASCII if it fails
    try {
      await copyToClipboard(treeStructure);
      console.log('\n✅ Project structure copied to clipboard! (Unicode version)');
    } catch (error) {
      console.log('\n⚠️  Unicode copy failed, trying ASCII version...');
      await copyToClipboard(asciiTreeStructure);
      console.log('✅ Project structure copied to clipboard! (ASCII version)');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\n⚠️  Could not copy to clipboard, but structure was printed above.');
  }
}

// Run the main function
main();