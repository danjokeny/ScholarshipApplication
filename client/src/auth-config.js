var authConfig = {
    baseUrl: "http://localhost:3300/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/landing'
}

export default authConfig;
