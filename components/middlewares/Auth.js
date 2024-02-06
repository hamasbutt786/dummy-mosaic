import { useRouter } from 'next/router'
const withAuth = (WrappedComponent) => {
    return (props) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== 'undefined') {
            const Router = useRouter()
            const jwt = require('jsonwebtoken');
            const isAuthenticated = localStorage.getItem('Auth')
            let user = null
            let secretKey = 'secretKey'
            if (typeof isAuthenticated === 'string') {
                try {
                    user = jwt.decode(isAuthenticated, secretKey);
                    // 'decoded' now contains the decoded JWT payload
                } catch (error) {
                    console.error('Invalid token:', error);
                }
            }
            // If there is no access token we redirect to "/" page.
            if (!user || user === null) {
                Router.replace('/')
                return null
            }
            // If this is an accessToken we just render the component that was passed with all its props

            return <WrappedComponent {...props} />
        }
        // If we are on server, return null
        return null
        // return <WrappedComponent {...props} />
    }
}

export default withAuth
