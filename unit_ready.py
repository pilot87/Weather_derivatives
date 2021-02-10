#!/usr/bin/env /usr/bin/python3.8

import sys
import json

usage = '''usage: utin_ready.py [options]
options:

--server | -s
    web server, currently only 'unit' now available

--url | -u
    root of web app url, if it is not domine_name root

Example:
py.py
    do nothing
py.py -s unit -u /forecast
    ready to start by UNIT and app url will be https://domine_name.com/forecast
'''

#parsing options


available_keys = ['-u', '--url', '-s', '--server']

if len(sys.argv) % 2 != 1:
    print(usage)
    exit()

args = sys.argv[1:]

keys = [o for o in args if not o%2]

if [o for o in keys if o not in available_keys]:
    print([o for o in keys if o not in available_keys][0] + ' is missing options')
    print(usage)
    exit()

values = [o for o in args if o%2]

options = {o[0]: o[1] for o in zip(keys, values)}

# changing app.ts for start under UNIT
if ('-s' in options and options['-s'] == 'unit') or ('--server' in options and options['--server'] == 'unit'):
    with open('src/app.ts', encoding = 'utf-8') as f:
        app = f.read()

    unit0 = ['//#start',
        'const {',
        '  createServer,',
        '  IncomingMessage,',
        '  ServerResponse,',
        '} = require(\'unit-http\')',
        '',
        'require(\'http\').ServerResponse = ServerResponse',
        'require(\'http\').IncomingMessage = IncomingMessage'
        '']

    unit1 = ['//#app', '        createServer(app).listen(PORT, () => console.log(`App has been started on port ${PORT}...`))']
    lines = app.split('\n')
    start = lines.index('//#start')
    second = lines.index('//#app')
    new_app = ['#!/usr/bin/env /home/web/.nvm/versions/node/v14.15.4/bin/node', ''] + lines[:start] + unit0 +\
        lines[start + 1:second] + unit1 + lines[second + 2:]

    '\n'.join(new_app)
    with open('src/app.ts', 'w') as f:
        f.write('\n'.join(new_app))

# set root url
if '-u' in options or '--url' in options:
    if '-u' in options:
        url = options['-u']
    else:
        url = options['--url']

    #changing config/production.json file
    with open('config/production.json', encoding = 'utf-8') as f:
        config_str = f.read()

    config = json.loads(config_str)
    config['base'] = url
    config_str = json.dumps(config)
    with open('config/production.json', 'w') as f:
            f.write(config_str)

    #changing client/package.json file
    with open('client/package.json', encoding = 'utf-8') as f:
            config_str = f.read()

    config = json.loads(config_str)
    config['homepage'] = url + '/'
    config_str = json.dumps(config)
    with open('client/package.json', 'w') as f:
            f.write(config_str)

    #changing client/src/index.tsx file
    with open('client/src/index.tsx', encoding = 'utf-8') as f:
        ind = f.read()

    index0 = ['//#start', 'export const base = \'' + url + '\'']
    lines = ind.split('\n')
    start = lines.index('//#start')
    new_ind = lines[:start] + index0 + lines[start + 2:]
    with open('client/src/index.tsx', 'w') as f:
        f.write('\n'.join(new_ind))
