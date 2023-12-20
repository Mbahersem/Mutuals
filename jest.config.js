const config = {
    transform: {
        '^.+\\.jsx?$': ['babel-jest', {presets: ['@babel/preset-modules']}],
    },
};

module.exports = config;