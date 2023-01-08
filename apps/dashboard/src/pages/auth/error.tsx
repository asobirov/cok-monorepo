import { useRouter } from "next/router"

const AuthErrorPage = () => {
    const { query: { error } } = useRouter()

    return (
        <>
            <h1>Auth Error: {error}</h1>
        </>
    )
}

export default AuthErrorPage