"use client"

import { useState, useRef, useEffect, useMemo, ReactNode } from "react"
import { GripVertical } from "lucide-react"

interface ThemeComparisonProps {
  children: ReactNode
}

export function ThemeComparison({ children }: ThemeComparisonProps) {
  const [dividerPosition, setDividerPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useMemo(
    () => (clientX: number) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = (x / rect.width) * 100
      
      // Clamp between 0 and 100
      setDividerPosition(Math.max(0, Math.min(100, percentage)))
    },
    []
  )

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    handleMove(e.touches[0].clientX)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setDividerPosition((prev) => Math.max(0, prev - 1))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setDividerPosition((prev) => Math.min(100, prev + 1))
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, handleMouseMove])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const clipPathStyle = useMemo(
    () => ({
      clipPath: `inset(0 ${100 - dividerPosition}% 0 0)`,
    }),
    [dividerPosition]
  )

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      role="region"
      aria-label="Theme comparison slider"
    >
      {/* Dark Theme Layer (Bottom) */}
      <div className="absolute inset-0 theme-dark">
        {children}
      </div>

      {/* Light Theme Layer (Top, clipped) */}
      <div
        className="absolute inset-0 theme-light"
        style={clipPathStyle}
      >
        {children}
      </div>

      {/* Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white to-transparent pointer-events-none z-50"
        style={{ left: `${dividerPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          role="slider"
          aria-label="Theme divider handle"
          aria-valuenow={dividerPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
        >
          <GripVertical className="w-6 h-6 text-gray-800" />
        </div>
      </div>
    </div>
  )
}
