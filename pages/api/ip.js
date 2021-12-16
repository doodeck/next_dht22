// ip.js

const http = require('http')

export default function handler(request, response) {
    const options = {
        hostname: 'ip-api.com',
        path: '/',
        headers: {
            'User-Agent': 'curl/7.68.0',
            'Accept': 'application/json'
        }
      };
    const req = http.get(options, (res) => {
        let json_response = '';
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
    
        if (res.statusCode == 200) {
            res.on('data', (d) => {
            process.stdout.write(d);
            json_response += d;
            });

            res.on('end', () => { // close
                req.end()
                response.status(200).send(json_response)
            })
        }
    })
}
