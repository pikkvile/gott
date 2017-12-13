const env = process.env.GOTT_ENV || 'dev';

const environments = {
    'dev': {
        db: 'localhost/gott-dev',
        port: 3000
    },
    'test': {
        db: 'localhost/gott-test',
        port: 3001
    }
};

module.exports = environments[env];
