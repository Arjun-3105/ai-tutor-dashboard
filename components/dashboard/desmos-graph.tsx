"use client"

import { useEffect, useRef } from "react"

interface DesmosGraphProps {
  equation: string
  height: number
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
}

export function DesmosGraph({ equation, height, xMin = -10, xMax = 10, yMin = -10, yMax = 10 }: DesmosGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<any>(null)

  useEffect(() => {
    // Load Desmos script if it doesn't exist
    if (!window.Desmos) {
      const script = document.createElement("script")
      script.src = "https://www.desmos.com/api/v1.7/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
      script.async = true
      script.onload = initializeCalculator
      document.body.appendChild(script)
    } else {
      initializeCalculator()
    }

    return () => {
      if (calculatorRef.current) {
        calculatorRef.current.destroy()
      }
    }
  }, [equation, xMin, xMax, yMin, yMax])

  const initializeCalculator = () => {
    if (!containerRef.current || !window.Desmos) return

    // Destroy previous calculator if it exists
    if (calculatorRef.current) {
      calculatorRef.current.destroy()
    }

    // Create new calculator
    calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
      expressions: false,
      settingsMenu: false,
      zoomButtons: false,
      lockViewport: true,
      border: false,
      labels: false,
      keypad: false,
    })

    // Set bounds
    calculatorRef.current.setMathBounds({
      left: xMin,
      right: xMax,
      bottom: yMin,
      top: yMax,
    })

    // Add equation
    calculatorRef.current.setExpression({ id: "graph1", latex: equation })
  }

  return (
    <div ref={containerRef} style={{ width: "100%", height: `${height}px` }} className="rounded-md overflow-hidden" />
  )
}

