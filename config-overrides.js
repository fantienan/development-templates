const {
    override,
    fixBabelImports,
    addLessLoader,
    addDecoratorsLegacy,
    overrideDevServer,
    addWebpackAlias
} = require('customize-cra')
const path = require('path')

const addProxy = () => (configFunction) => {
    configFunction.proxy = {
        '/api/*': {
            target: 'http://192.168.1.123:8081',
            pathRewrite: { "^/api": "" },
            changeOrigin: true
        },
        '/mock/*': {
            target: 'http://localhost:4000',
            pathRewrite: {
                "^/mock": "",
                ".mock": ".json"
            },
        }
    }
    return configFunction;
}
module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd-design-extend',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1890ff'
            },
        }),
        addDecoratorsLegacy(),
        addWebpackAlias({
            /* eslint-disable */
            '@': path.resolve(__dirname, 'src/'),
            /* eslint-enable */
        })
    ),
    devServer: overrideDevServer(
        addProxy()
    )
}

