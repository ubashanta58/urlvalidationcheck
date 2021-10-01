const http = require('http'),
        options = {
            method: 'HEAD',
            host: 'www.facebook.com/GorkhaZoneKhukuriHouse/',
            port: 80,
            path:'/',
        },
        req = http.request(options, function(r){
            if(r.statusCode === 200 || r.statusCode === 301) {
                console.log('url exists');
        }
        });

        req.on('error', function(err) {
            console.log(err);
            console.log('this is the error');
        });

        req.end();