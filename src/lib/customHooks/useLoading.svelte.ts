const useLoading = (func: () => Promise<unknown>) => {
    const loading = $state({ value: false })

    const action = async () => {
        loading.value = true
        await func()
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