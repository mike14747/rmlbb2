const session = (
    require('cookie-session')(
        {
            maxAge: 2592000000, // 2592000000 equals 30 days
            name: 'rmlbb_session',
            keys: ['key1', 'key2'],
        },
    )
);

module.exports = session;
