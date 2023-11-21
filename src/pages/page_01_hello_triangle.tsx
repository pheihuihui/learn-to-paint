import React, { FC, useEffect, useRef } from "react"
import triangleVertWGSL from "../shaders/triangle.vert.wgsl"
import redFragWGSL from "../shaders/red.frag.wgsl"
import { DashboardLayout } from "../components/_layout/DashboardLayout"

export const HelloTrianglePage: FC = () => {
    return (
        <DashboardLayout>
            <HelloTriangle />
        </DashboardLayout>
    )
}

const HelloTriangle: FC = () => {
    const ref = useRef<HTMLCanvasElement>(null)
    const canvHeight = 900
    const canvWidth = 900

    useEffect(() => {
        const canv = ref.current
        const draw = async () => {
            const adapter = await navigator.gpu.requestAdapter()
            const device = await adapter?.requestDevice()
            const context = canv?.getContext("webgpu")
            const presentationFormat = navigator.gpu.getPreferredCanvasFormat()
            if (!(adapter && device && context && canv)) {
                return
            }
            canv.height = canvHeight
            canv.width = canvWidth
            context.configure({
                device,
                format: presentationFormat,
                alphaMode: "premultiplied",
            })

            const pipeline = device.createRenderPipeline({
                layout: "auto",
                vertex: {
                    module: device.createShaderModule({
                        code: triangleVertWGSL,
                    }),
                    entryPoint: "main",
                },
                fragment: {
                    module: device.createShaderModule({
                        code: redFragWGSL,
                    }),
                    entryPoint: "main",
                    targets: [
                        {
                            format: presentationFormat,
                        },
                    ],
                },
                primitive: {
                    topology: "triangle-list",
                },
            })
            function frame() {
                const commandEncoder = device?.createCommandEncoder()
                const textureView = context?.getCurrentTexture().createView()

                if (!(commandEncoder && textureView && device)) {
                    return
                }

                const renderPassDescriptor: GPURenderPassDescriptor = {
                    colorAttachments: [
                        {
                            view: textureView,
                            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                            loadOp: "clear",
                            storeOp: "store",
                        },
                    ],
                }

                const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
                passEncoder.setPipeline(pipeline)
                passEncoder.draw(3)
                passEncoder.end()

                device.queue.submit([commandEncoder.finish()])
                requestAnimationFrame(frame)
            }
            requestAnimationFrame(frame)
        }
        draw()
    }, [])

    return <canvas ref={ref} className="hello-world-triangle" style={{ height: canvHeight, width: canvWidth }} />
}
