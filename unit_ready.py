#!/usr/bin/env /usr/bin/python3.8

with open("src/app.ts", encoding = 'utf-8') as f:
    app = f.read()
    
unit0 = ['const {',
    '  createServer,',
    '  IncomingMessage,',
    '  ServerResponse,',
    '} = require(\'unit-http\')',
    '',
    'require(\'http\').ServerResponse = ServerResponse',
    'require(\'http\').IncomingMessage = IncomingMessage',
    '']
    
unit1 = ['        createServer(app).listen(PORT, () => console.log(`App has been started on port ${PORT}...`))']

lines = app.split('\r\n')

start = lines.index('//#start')
second = lines.index('//#app')

new_app = lines[:start] + unit0 + lines[start + 2:second] + unit1 + lines[second + 2:]

'\n'.join(new_app)

with open("src/app.ts", 'w') as f:
    f.write('\n'.join(new_app))
