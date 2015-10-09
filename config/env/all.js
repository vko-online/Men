'use strict';
module.exports = {
    app: {
        title: 'branded_lifestyle',
        description: 'branded_lifestyle web server',
        keywords: 'branded_lifestyle, tennis, p2p, peer2peer, match, matchmaking'
    },
    port: process.env.PORT || 3000,
    templateEngine: 'swig',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions'
};
