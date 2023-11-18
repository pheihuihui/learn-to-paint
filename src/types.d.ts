declare global {
    interface Window {}
}

declare module "*.wgsl" {
    const shader: string
    export default shader
}
