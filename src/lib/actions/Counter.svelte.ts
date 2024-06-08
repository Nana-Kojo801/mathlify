import { wait } from "$lib/utils"

export default function counter(node: HTMLElement, { max, onDone }: { max: number, onDone: () => void }) {
    let count = $state<number>(max + 1)
    const oldText = node.textContent

    const decreaseCount = async () => {
        if (count <= 0) return onDone()
        count -= 1
        await wait(1000)
        decreaseCount()
    }

    $effect(() => {
        node.textContent = `${oldText === "" ? count : `${oldText} ${count}`}`
    })

    decreaseCount()
}