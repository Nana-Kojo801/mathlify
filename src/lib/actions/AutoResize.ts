export default function autoResize(node: HTMLElement, { height=0 }: { height?: number }) {
    const resize = () => {
        node.style.height = `${height === 0 ? "auto" : height}px`
        node.style.height = `${node.scrollHeight}px`
    }

    node.addEventListener("input", resize)

    resize()

    return {
        destroy() {
            node.removeEventListener("input", resize)
        }
    }
}