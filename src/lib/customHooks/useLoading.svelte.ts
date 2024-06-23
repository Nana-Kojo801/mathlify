const useLoading = (func: (args: unknown) => Promise<unknown>) => {
    const loading = $state({ value: false })

    const action = async (...args: unknown[]) => {
        loading.value = true
        await func(args)
        loading.value = false
    }

    return {
        loading,
        action
    }
}

/**
 * const { loading, action: logout } = useLoading(async () => {
 *      await fetch("/api/auth/logout")
    })
 */

export default useLoading