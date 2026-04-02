"use client"

import { useEffect, useRef } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

interface Vector2D {
    x: number
    y: number
}

class Particle {
    pos: Vector2D = { x: 0, y: 0 }
    vel: Vector2D = { x: 0, y: 0 }
    acc: Vector2D = { x: 0, y: 0 }
    target: Vector2D = { x: 0, y: 0 }
    baseTarget: Vector2D = { x: 0, y: 0 }
    randomDir: Vector2D = { x: 0, y: 0 }

    closeEnoughTarget = 50
    maxSpeed = 2.0
    baseMaxSpeed = 2.0
    maxForce = 0.15
    particleSize = 3
    isKilled = false

    startColor = { r: 0, g: 0, b: 0 }
    targetColor = { r: 0, g: 0, b: 0 }
    colorWeight = 0
    colorBlendRate = 0.01

    constructor() {
        this.randomDir = {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1
        };
        const mag = Math.sqrt(this.randomDir.x ** 2 + this.randomDir.y ** 2);
        if (mag > 0) {
            this.randomDir.x /= mag;
            this.randomDir.y /= mag;
        }
    }

    distanceToTarget(): number {
        return Math.sqrt(
            Math.pow(this.pos.x - this.baseTarget.x, 2) +
            Math.pow(this.pos.y - this.baseTarget.y, 2)
        );
    }

    move(scrollAmt: number = 0) {
        let currentTargetX = this.baseTarget.x;
        let currentTargetY = this.baseTarget.y;

        if (this.isKilled) {
            currentTargetX = this.target.x;
            currentTargetY = this.target.y;
        } else if (scrollAmt > 10) {
            const scatterFactor = Math.min((scrollAmt - 10) / 400, 1);
            const time = Date.now() * 0.001;

            const expandDist = scatterFactor * 600;
            currentTargetX += this.randomDir.x * expandDist;
            currentTargetY += this.randomDir.y * expandDist;

            currentTargetX += Math.sin(time + this.randomDir.x * 20) * 150 * scatterFactor;
            currentTargetY += Math.cos(time + this.randomDir.y * 20) * 150 * scatterFactor;

            this.maxSpeed = this.baseMaxSpeed + scatterFactor * 4;
            this.maxForce = (this.baseMaxSpeed * 0.05) + scatterFactor * 0.05;
        } else {
            this.maxSpeed = this.baseMaxSpeed;
            this.maxForce = this.baseMaxSpeed * 0.05;
        }

        let proximityMult = 1
        const distance = Math.sqrt(Math.pow(this.pos.x - currentTargetX, 2) + Math.pow(this.pos.y - currentTargetY, 2))

        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget
        }

        const towardsTarget = {
            x: currentTargetX - this.pos.x,
            y: currentTargetY - this.pos.y,
        }

        const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
        if (magnitude > 0) {
            towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
            towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
        }

        const steer = {
            x: towardsTarget.x - this.vel.x,
            y: towardsTarget.y - this.vel.y,
        }

        const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
        if (steerMagnitude > 0) {
            steer.x = (steer.x / steerMagnitude) * this.maxForce
            steer.y = (steer.y / steerMagnitude) * this.maxForce
        }

        this.acc.x += steer.x
        this.acc.y += steer.y

        this.vel.x += this.acc.x
        this.vel.y += this.acc.y
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.acc.x = 0
        this.acc.y = 0
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.colorWeight < 1.0) {
            this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
        }

        const currentColor = {
            r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
            g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
            b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
        }

        ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.particleSize * 0.5, 0, Math.PI * 2)
        ctx.fill()
    }

    kill(width: number, height: number) {
        if (!this.isKilled) {
            const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
            this.target.x = randomPos.x
            this.target.y = randomPos.y

            this.startColor = {
                r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
                g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
                b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
            }
            this.targetColor = { r: 0, g: 0, b: 0 }
            this.colorWeight = 0

            this.isKilled = true
        }
    }

    private generateRandomPos(x: number, y: number, mag: number): Vector2D {
        const randomX = Math.random() * 1000
        const randomY = Math.random() * 500

        const direction = {
            x: randomX - x,
            y: randomY - y,
        }

        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (magnitude > 0) {
            direction.x = (direction.x / magnitude) * mag
            direction.y = (direction.y / magnitude) * mag
        }

        return {
            x: x + direction.x,
            y: y + direction.y,
        }
    }
}

interface ParticleTextEffectProps {
    words?: string[]
}

const DEFAULT_WORDS = ["LimbRise", "Move Better - Feel Better", "_LOGO_"]

export function ParticleTextEffect({ words = DEFAULT_WORDS }: ParticleTextEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const textCanvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)
    const particlesRef = useRef<Particle[]>([])
    const frameCountRef = useRef(0)
    const wordIndexRef = useRef(0)
    const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })
    // Track how settled the particles are (0 = flying, 1 = fully settled)
    const settledRef = useRef(0)
    // Track when a word transition started
    const transitionStartRef = useRef(0)
    const currentWordRef = useRef("")
    const isLogoRef = useRef(false)

    const { scrollY } = useScroll()
    const scrollAmtRef = useRef(0)

    useMotionValueEvent(scrollY, "change", (latest) => {
        scrollAmtRef.current = latest
    })

    const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
        const randomX = Math.random() * 1000
        const randomY = Math.random() * 500

        const direction = {
            x: randomX - x,
            y: randomY - y,
        }

        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (magnitude > 0) {
            direction.x = (direction.x / magnitude) * mag
            direction.y = (direction.y / magnitude) * mag
        }

        return {
            x: x + direction.x,
            y: y + direction.y,
        }
    }

    /**
     * Render the clean, crisp text (or logo) onto the text overlay canvas.
     * This is what fades in once particles settle.
     */
    const renderCleanText = (word: string, canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext("2d")!
        const dpr = window.devicePixelRatio || 1
        
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.scale(dpr, dpr)

        const logicalW = canvas.width / dpr
        const logicalH = canvas.height / dpr

        if (word === "_LOGO_") {
            const cx = logicalW / 2;
            const cy = logicalH / 2;
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth < 1024;
            const scale = isMobile ? 0.6 : (isTablet ? 1 : 1.5);

            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = 15 * scale;
            ctx.strokeStyle = "#14b8a6";

            // Heart shape
            ctx.beginPath();
            ctx.moveTo(cx, cy - 30 * scale);
            ctx.bezierCurveTo(
                cx - 80 * scale, cy - 90 * scale,
                cx - 140 * scale, cy + 10 * scale,
                cx, cy + 110 * scale
            );
            ctx.bezierCurveTo(
                cx + 140 * scale, cy + 10 * scale,
                cx + 80 * scale, cy - 90 * scale,
                cx, cy - 30 * scale
            );
            ctx.stroke();

            // Plus sign
            const plusX = cx + 80 * scale;
            const plusY = cy - 50 * scale;
            ctx.beginPath();
            ctx.moveTo(plusX - 30 * scale, plusY);
            ctx.lineTo(plusX + 30 * scale, plusY);
            ctx.moveTo(plusX, plusY - 30 * scale);
            ctx.lineTo(plusX, plusY + 30 * scale);
            ctx.stroke();
        } else {
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth < 1024;

            let fontSize = word.length > 15 ? 50 : 100;
            if (isMobile) {
                fontSize = word.length > 15 ? 24 : 42;
            } else if (isTablet) {
                fontSize = word.length > 15 ? 36 : 70;
            }

            // Use the primary teal/white color for the clean text
            ctx.fillStyle = "#14b8a6"
            ctx.font = `bold ${fontSize}px Inter, sans-serif`
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            // Text shadow for glow
            ctx.shadowColor = "rgba(20, 184, 166, 0.4)"
            ctx.shadowBlur = 30
            ctx.fillText(word, logicalW / 2, logicalH / 2)

            // Second pass for sharper text on top
            ctx.shadowColor = "transparent"
            ctx.shadowBlur = 0
            ctx.fillStyle = "white"
            ctx.fillText(word, logicalW / 2, logicalH / 2)
        }

        ctx.restore()
    }

    const nextWord = (word: string, canvas: HTMLCanvasElement) => {
        // Reset settled state for new word transition
        settledRef.current = 0
        transitionStartRef.current = Date.now()
        currentWordRef.current = word
        isLogoRef.current = word === "_LOGO_"

        // Render crisp text to overlay canvas
        if (textCanvasRef.current) {
            renderCleanText(word, textCanvasRef.current)
        }

        // Create off-screen canvas for particle sampling
        const offscreenCanvas = document.createElement("canvas")
        offscreenCanvas.width = canvas.width
        offscreenCanvas.height = canvas.height
        const offscreenCtx = offscreenCanvas.getContext("2d")!

        if (word === "_LOGO_") {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth < 1024;
            const scale = isMobile ? 0.6 : (isTablet ? 1 : 1.5);

            offscreenCtx.lineCap = "round";
            offscreenCtx.lineJoin = "round";
            offscreenCtx.lineWidth = 15 * scale;
            offscreenCtx.strokeStyle = "white";

            offscreenCtx.beginPath();
            offscreenCtx.moveTo(cx, cy - 30 * scale);
            offscreenCtx.bezierCurveTo(
                cx - 80 * scale, cy - 90 * scale,
                cx - 140 * scale, cy + 10 * scale,
                cx, cy + 110 * scale
            );
            offscreenCtx.bezierCurveTo(
                cx + 140 * scale, cy + 10 * scale,
                cx + 80 * scale, cy - 90 * scale,
                cx, cy - 30 * scale
            );
            offscreenCtx.stroke();

            const plusX = cx + 80 * scale;
            const plusY = cy - 50 * scale;
            offscreenCtx.beginPath();
            offscreenCtx.moveTo(plusX - 30 * scale, plusY);
            offscreenCtx.lineTo(plusX + 30 * scale, plusY);
            offscreenCtx.moveTo(plusX, plusY - 30 * scale);
            offscreenCtx.lineTo(plusX, plusY + 30 * scale);
            offscreenCtx.stroke();
        } else {
            offscreenCtx.fillStyle = "white"

            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth < 1024;

            let fontSize = word.length > 15 ? 50 : 100;
            if (isMobile) {
                fontSize = word.length > 15 ? 24 : 42;
            } else if (isTablet) {
                fontSize = word.length > 15 ? 36 : 70;
            }

            offscreenCtx.font = `bold ${fontSize}px Inter, sans-serif`
            offscreenCtx.textAlign = "center"
            offscreenCtx.textBaseline = "middle"
            offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2)
        }

        const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data

        const colors = [
            { r: 20, g: 184, b: 166 },  // Teal
            { r: 20, g: 184, b: 166 },  // Teal (weighted)
            { r: 229, g: 231, b: 235 }, // Light Gray
            { r: 255, g: 255, b: 255 }  // Pure White
        ];
        const newColor = colors[Math.floor(Math.random() * colors.length)];

        const particles = particlesRef.current
        let particleIndex = 0

        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;
        // Dense sampling for smooth look
        const currentPixelSteps = isMobile ? 2 : (isTablet ? 2 : 2);

        const coordsIndexes: number[] = []
        for (let y = 0; y < canvas.height; y += currentPixelSteps) {
            for (let x = 0; x < canvas.width; x += currentPixelSteps) {
                coordsIndexes.push((y * canvas.width + x) * 4)
            }
        }

        // Shuffle for fluid animation
        for (let i = coordsIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
        }

        for (const coordIndex of coordsIndexes) {
            const pixelIndex = coordIndex
            const alpha = pixels[pixelIndex + 3]

            if (alpha > 0) {
                const x = (pixelIndex / 4) % canvas.width
                const y = Math.floor(pixelIndex / 4 / canvas.width)

                let particle: Particle

                if (particleIndex < particles.length) {
                    particle = particles[particleIndex]
                    particle.isKilled = false
                    particleIndex++
                } else {
                    particle = new Particle()

                    const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
                    particle.pos.x = randomPos.x
                    particle.pos.y = randomPos.y

                    particle.maxSpeed = Math.random() * 4 + 6
                    particle.baseMaxSpeed = particle.maxSpeed
                    particle.maxForce = particle.maxSpeed * 0.08
                    // Small, refined particles
                    particle.particleSize = Math.random() * 1.5 + (currentPixelSteps * 0.8)
                    particle.colorBlendRate = Math.random() * 0.04 + 0.005

                    particles.push(particle)
                }

                particle.startColor = {
                    r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
                    g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
                    b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
                }
                particle.targetColor = newColor
                particle.colorWeight = 0

                particle.target.x = x
                particle.target.y = y
                particle.baseTarget.x = x
                particle.baseTarget.y = y
            }
        }

        // Kill remaining particles
        for (let i = particleIndex; i < particles.length; i++) {
            particles[i].kill(canvas.width, canvas.height)
        }
    }

    const animate = () => {
        const canvas = canvasRef.current
        const textCanvas = textCanvasRef.current
        if (!canvas || !textCanvas) return

        const ctx = canvas.getContext("2d")!
        const particles = particlesRef.current

        // Clean clear each frame — no ghosting/trailing for sharp particles
        ctx.clearRect(0, 0, canvas.width, canvas.height)


        const scrollAmt = scrollAmtRef.current;

        // Pure time-based crossfade: particles fly in, then clean text takes over
        const timeSinceTransition = Date.now() - transitionStartRef.current
        // Start fading to clean text after 1.5s, fully clean by 2.5s
        let targetSettled = Math.max(0, Math.min(1, (timeSinceTransition - 1500) / 1000))

        // If scrolled down, show particles only (scattered)
        if (scrollAmt > 20) {
            targetSettled = 0
        }

        // Smooth transition
        settledRef.current += (targetSettled - settledRef.current) * 0.08

        // Particle layer: fade out as clean text fades in
        const particleOpacity = Math.max(0, 1 - settledRef.current)
        
        if (particleOpacity > 0.01) {
            ctx.globalAlpha = particleOpacity
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i]
                particle.move(scrollAmt)
                particle.draw(ctx)

                if (particle.isKilled) {
                    if (
                        particle.pos.x < 0 ||
                        particle.pos.x > canvas.width ||
                        particle.pos.y < 0 ||
                        particle.pos.y > canvas.height
                    ) {
                        particles.splice(i, 1)
                    }
                }
            }
            ctx.globalAlpha = 1
        } else {
            // Still move particles so they're ready if we scroll
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].move(scrollAmt)
                if (particles[i].isKilled) {
                    if (
                        particles[i].pos.x < 0 ||
                        particles[i].pos.x > canvas.width ||
                        particles[i].pos.y < 0 ||
                        particles[i].pos.y > canvas.height
                    ) {
                        particles.splice(i, 1)
                    }
                }
            }
            // Clear particle canvas when fully settled
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        // Clean text overlay opacity
        textCanvas.style.opacity = String(settledRef.current)

        // Handle mouse interaction
        if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
            particles.forEach((particle) => {
                const distance = Math.sqrt(
                    Math.pow(particle.pos.x - mouseRef.current.x, 2) + Math.pow(particle.pos.y - mouseRef.current.y, 2),
                )
                if (distance < 50) {
                    particle.kill(canvas.width, canvas.height)
                }
            })
        }

        // Auto-advance words
        if (scrollAmtRef.current < 50) {
            frameCountRef.current++
            if (frameCountRef.current % 450 === 0) {
                wordIndexRef.current = (wordIndexRef.current + 1) % words.length
                nextWord(words[wordIndexRef.current], canvas)
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const textCanvas = textCanvasRef.current
        if (!canvas || !textCanvas) return

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1

            // Particle canvas (1:1 pixel ratio for performance)
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Text canvas (high DPI for crisp text)
            textCanvas.width = window.innerWidth * dpr;
            textCanvas.height = window.innerHeight * dpr;
            textCanvas.style.width = window.innerWidth + "px";
            textCanvas.style.height = window.innerHeight + "px";

            // Re-render current word
            nextWord(words[wordIndexRef.current], canvas);
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        nextWord(words[0], canvas)
        animate()

        const handleMouseDown = (e: MouseEvent) => {
            mouseRef.current.isPressed = true
            mouseRef.current.isRightClick = e.button === 2
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }

        const handleMouseUp = () => {
            mouseRef.current.isPressed = false
            mouseRef.current.isRightClick = false
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
        }

        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("mouseup", handleMouseUp)
        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("contextmenu", handleContextMenu)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener("mousedown", handleMouseDown)
            canvas.removeEventListener("mouseup", handleMouseUp)
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("contextmenu", handleContextMenu)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full h-full absolute inset-0 bg-transparent overflow-hidden pointer-events-none">
            {/* Particle animation canvas */}
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover pointer-events-auto absolute inset-0"
            />
            {/* Clean text overlay canvas — fades in as particles settle */}
            <canvas
                ref={textCanvasRef}
                className="block absolute inset-0 pointer-events-none"
                style={{ opacity: 0, transition: "opacity 0.1s ease" }}
            />
        </div>
    )
}
