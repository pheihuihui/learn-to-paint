import React, { FC, useEffect, useRef } from "react"
import { DashboardLayout } from "../components/_layout/DashboardLayout"
import dotsVert from "../shaders/dots.vert.wgsl"
import redFrag from "../shaders/red.frag.wgsl"

export const DotsPage: FC = () => {
    return (
        <DashboardLayout>
            <Dots />
        </DashboardLayout>
    )
}

const Dots: FC = () => {
    const ref = useRef<HTMLCanvasElement>(null)
    const canvHeight = 900
    const canvWidth = 900
    const uniformBufferSize = 8
    const dotVertSize = 4

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

            const verticesBuffer = device.createBuffer({
                size: dotVertSize,
                usage: GPUBufferUsage.VERTEX,
                mappedAtCreation: true,
            })
            new Float32Array(verticesBuffer.getMappedRange()).set([0.2])
            verticesBuffer.unmap()

            const pipeline = device.createRenderPipeline({
                layout: "auto",
                vertex: {
                    module: device.createShaderModule({
                        code: dotsVert,
                    }),
                    entryPoint: "main",
                    buffers: [
                        {
                            arrayStride: dotVertSize,
                            attributes: [
                                {
                                    shaderLocation: 0,
                                    offset: 0,
                                    format: "float32",
                                },
                            ],
                        },
                    ],
                },
                fragment: {
                    module: device.createShaderModule({
                        code: redFrag,
                    }),
                    entryPoint: "main",
                    targets: [
                        {
                            format: presentationFormat,
                        },
                    ],
                },
                primitive: {
                    topology: "point-list",
                },
            })

            const uniformBuffer = device.createBuffer({
                size: uniformBufferSize,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            })

            const uniformBindGroup = device.createBindGroup({
                layout: pipeline.getBindGroupLayout(0),
                entries: [
                    {
                        binding: 0,
                        resource: {
                            buffer: uniformBuffer,
                        },
                    },
                ],
            })

            function frame() {
                const commandEncoder = device?.createCommandEncoder()
                const textureView = context?.getCurrentTexture().createView()

                if (!(commandEncoder && textureView && device)) {
                    return
                }

                let _x = Math.random() * Math.random() * Math.random()
                let x = Math.random() > 0.5 ? _x : -_x
                let _y = Math.random() * Math.random() * Math.random()
                let y = Math.random() > 0.5 ? _y : -_y

                device.queue.writeBuffer(uniformBuffer, 0, new Float32Array([x, y]))

                const renderPassDescriptor: GPURenderPassDescriptor = {
                    colorAttachments: [
                        {
                            view: textureView,
                            clearValue: { r: 0.9, g: 0.9, b: 0.9, a: 0.9 },
                            loadOp: "clear",
                            storeOp: "store",
                        },
                    ],
                }

                const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
                passEncoder.setPipeline(pipeline)
                passEncoder.setBindGroup(0, uniformBindGroup)
                passEncoder.setVertexBuffer(0, verticesBuffer)
                passEncoder.draw(1)
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
