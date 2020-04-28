
import ioContext from '@/utils/http/io-context';

ioContext.create('example', {
    getEntityList: {
        url: '/forestarui_v0.4/form/getEntityList.do',
        method: "POST",
        formData: true
    },
    pageSelect: {
        url: '/forestarui_v0.4/form/pageSelect.do',
        method: "POST",
        formData: true
    },
    mock: {
        url: '/mock/action.json',
        method: "GET"
    },
})
export default ioContext.api.example

