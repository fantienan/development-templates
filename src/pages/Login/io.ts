
// @ts-nocheck
import ioContext from '@/utils/http/io-context'

ioContext.create('login', {
    login: {
        url: '/api/login',
        method: "POST"
    },
    outLogin: {
        url: '/api/outLogin',
        method: "POST"
    },
})
export default ioContext.api.login

