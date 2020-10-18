module.exports = {
    mount: {
        'src/client': '/_dist_',
        'src/public': '/',
    },
    testOptions: {
        files: ['src/tests']
    },
    plugins: ["@snowpack/plugin-typescript"],
    installOptions: {
        installTypes: true,
    },
}