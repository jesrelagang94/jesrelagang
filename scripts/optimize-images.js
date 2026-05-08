/**
 * Image Optimization Script
 *
 * This script analyzes images in the public/img directory and provides
 * recommendations for optimization.
 *
 * Usage:
 *   node scripts/optimize-images.js
 *
 * To actually convert images, install sharp:
 *   npm install --save-dev sharp
 *
 * Then uncomment the conversion code at the bottom of this file.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMG_DIR = path.join(__dirname, '..', 'public', 'img')
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'img', 'optimized')

// Image size thresholds (in KB)
const THRESHOLDS = {
  critical: 200,   // > 200KB needs immediate optimization
  warning: 100,    // > 100KB should be optimized
  info: 50         // > 50KB could be optimized
}

// Analyze images recursively
function analyzeImages(dir, results = { critical: [], warning: [], info: [], total: 0, totalSize: 0 }) {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      analyzeImages(filePath, results)
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      const sizeKB = stat.size / 1024
      const relativePath = path.relative(IMG_DIR, filePath)

      results.total++
      results.totalSize += sizeKB

      const imageInfo = {
        path: relativePath,
        size: sizeKB.toFixed(2) + ' KB',
        sizeBytes: stat.size
      }

      if (sizeKB > THRESHOLDS.critical) {
        results.critical.push(imageInfo)
      } else if (sizeKB > THRESHOLDS.warning) {
        results.warning.push(imageInfo)
      } else if (sizeKB > THRESHOLDS.info) {
        results.info.push(imageInfo)
      }
    }
  })

  return results
}

// Generate report
function generateReport(results) {
  console.log('\n=================================================')
  console.log('         IMAGE OPTIMIZATION ANALYSIS')
  console.log('=================================================\n')

  console.log(`Total Images: ${results.total}`)
  console.log(`Total Size: ${(results.totalSize / 1024).toFixed(2)} MB\n`)

  if (results.critical.length > 0) {
    console.log('🔴 CRITICAL (> 200KB) - IMMEDIATE ACTION REQUIRED')
    console.log('------------------------------------------------')
    results.critical
      .sort((a, b) => b.sizeBytes - a.sizeBytes)
      .forEach(img => {
        console.log(`  ${img.size.padEnd(12)} ${img.path}`)
      })
    console.log(`  Total: ${results.critical.length} images\n`)
  }

  if (results.warning.length > 0) {
    console.log('🟡 WARNING (> 100KB) - SHOULD OPTIMIZE')
    console.log('------------------------------------------------')
    results.warning
      .sort((a, b) => b.sizeBytes - a.sizeBytes)
      .forEach(img => {
        console.log(`  ${img.size.padEnd(12)} ${img.path}`)
      })
    console.log(`  Total: ${results.warning.length} images\n`)
  }

  if (results.info.length > 0) {
    console.log('🟢 INFO (> 50KB) - COULD OPTIMIZE')
    console.log('------------------------------------------------')
    console.log(`  Total: ${results.info.length} images`)
    console.log(`  (Run with --verbose to see all)\n`)
  }

  // Calculate potential savings
  const avgCompressionJPG = 0.30  // 30% reduction with WebP
  const avgCompressionPNG = 0.45  // 45% reduction with WebP

  let potentialSavings = 0
  results.critical.concat(results.warning, results.info).forEach(img => {
    const isJPG = /\.(jpg|jpeg)$/i.test(img.path)
    const compressionRate = isJPG ? avgCompressionJPG : avgCompressionPNG
    potentialSavings += img.sizeBytes * compressionRate
  })

  console.log('=================================================')
  console.log('         OPTIMIZATION RECOMMENDATIONS')
  console.log('=================================================\n')

  console.log('1. Convert to WebP format')
  console.log(`   Expected savings: ${(potentialSavings / 1024 / 1024).toFixed(2)} MB (${((potentialSavings / (results.totalSize * 1024)) * 100).toFixed(1)}%)\n`)

  console.log('2. Implement lazy loading')
  console.log('   Import LazyImage component:')
  console.log('   import LazyImage from "@/components/LazyImage.vue"\n')

  console.log('3. Use responsive images')
  console.log('   Generate multiple sizes: 320w, 640w, 1024w, 1920w\n')

  console.log('4. Priority Actions:')
  results.critical.slice(0, 5).forEach((img, i) => {
    console.log(`   ${i + 1}. Optimize ${img.path} (${img.size})`)
  })

  console.log('\n=================================================\n')
}

// Main execution
console.log('Analyzing images in:', IMG_DIR)
const results = analyzeImages(IMG_DIR)
generateReport(results)

// Optional: Actual conversion with sharp
// Uncomment and install sharp to use: npm install --save-dev sharp
/*
import sharp from 'sharp'

async function convertToWebP(imagePath, outputPath) {
  try {
    await sharp(imagePath)
      .webp({ quality: 85 })
      .toFile(outputPath)
    return true
  } catch (error) {
    console.error(`Error converting ${imagePath}:`, error.message)
    return false
  }
}

async function optimizeImages() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const criticalImages = results.critical.concat(results.warning)

  console.log(`\nConverting ${criticalImages.length} images to WebP...`)

  for (const img of criticalImages) {
    const inputPath = path.join(IMG_DIR, img.path)
    const outputPath = path.join(
      OUTPUT_DIR,
      img.path.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    )

    const outputDirPath = path.dirname(outputPath)
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true })
    }

    const success = await convertToWebP(inputPath, outputPath)
    if (success) {
      const newSize = fs.statSync(outputPath).size / 1024
      const savings = ((img.sizeBytes / 1024 - newSize) / (img.sizeBytes / 1024) * 100).toFixed(1)
      console.log(`✓ ${img.path} → ${newSize.toFixed(2)} KB (${savings}% smaller)`)
    }
  }

  console.log('\nOptimization complete!')
}

// Uncomment to run conversion
// optimizeImages()
*/
