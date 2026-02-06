#!/usr/bin/env node
/**
 * Inspect a GLB file and list all node names.
 * Usage: node scripts/inspect-glb.js <path-to-glb>
 * Example: node scripts/inspect-glb.js src/models/accessories/suppressors/suppressors_10_pack.glb
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

function inspect(path) {
  const fullPath = path.startsWith('/') ? path : resolve(projectRoot, path)
  const buffer = readFileSync(fullPath)

  // GLB format: 12-byte header, then chunks
  // Chunk 0 is JSON: 4 bytes length + 4 bytes type (0x4E4F534A = "JSON") + data
  const dataView = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
  const jsonChunkLength = dataView.getUint32(12, true)
  const jsonChunk = new TextDecoder().decode(buffer.subarray(20, 20 + jsonChunkLength))
  const gltf = JSON.parse(jsonChunk)

  console.log('\nNodes (use modelNode with name or index):\n')
  const nodes = gltf.nodes || []
  nodes.forEach((node, i) => {
    console.log(`  ${i}: "${node.name || '(unnamed)'}"`)
  })

  console.log('\nScenes:')
  const scenes = gltf.scenes || []
  scenes.forEach((scene, i) => {
    console.log(`  Scene ${i}: ${scene.name || '(unnamed)'}`)
    if (scene.nodes) {
      scene.nodes.forEach((nodeIdx) => {
        const node = nodes[nodeIdx]
        console.log(`    -> Node ${nodeIdx}: "${node?.name || '(unnamed)'}"`)
      })
    }
  })
}

const path = process.argv[2]
if (!path) {
  console.log('Usage: node scripts/inspect-glb.js <path-to-glb>')
  console.log('Example: node scripts/inspect-glb.js src/models/accessories/suppressors/suppressors_10_pack.glb')
  process.exit(1)
}

try {
  inspect(path)
} catch (err) {
  console.error(err)
  process.exit(1)
}
