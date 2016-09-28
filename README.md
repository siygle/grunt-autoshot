# grunt-autoshot [![Build Status](https://travis-ci.org/Ferrari/grunt-autoshot.png?branch=master)](https://travis-ci.org/Ferrari/grunt-autoshot)

Create a quick screenshot for your site which could help for document or testing. 
Inspired by [Testing your responsive design with PhantomJS](http://daker.me/2013/07/testing-your-responsive-design-with-phantomjs.html), also suport different resolution base on your viewport, it's useful to responsive design.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-autoshot --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-autoshot');
```

Final and the most important thing, please make sure [**phantomjs**](http://phantomjs.org/) are in your PATH, if your windows users, please download the phantomjs zip file and decompress it and don't forget to set the environment variable as phantomjs.exe's path. Cause this plugin use phantomjs to generate screenshot, so remember [install](http://phantomjs.org/download.html) it first.

## The "autoshot" task

### Overview
In your project's Gruntfile, add a section named `autoshot` to the data object passed into `grunt.initConfig()`.

**Make a big change of config format from 0.1.0**, thanks @danielhusar and @ryanfitzer opinions, in order to support multiple sources and screenshots and follow the [standard format](http://gruntjs.com/configuring-tasks#files) of grunt.

After 0.1.0, filename and screenshot type all define using grunt file format. So please use those format that phantomjs [support](https://github.com/ariya/phantomjs/wiki/Screen-Capture).

There is a [example](https://github.com/Ferrari/grunt-autoshot/blob/master/Gruntfile.js#L32) of new Gruntfile format.

```js
grunt.initConfig({
  autoshot: {
    default_options: {
      options: {
        // necessary config
        path: SCREENSHOT_DIRECTORY_PATH,
        // optional config, must set either remote or local
        remote: {
          files: [
            { src: REMOTE_SITE_URL, dest: FILENAME(INCLUDE FILE TYPE), delay: DELAY_MILLISECOND }
          ]
        },
        local: {
          path: LOCAL_FILE_PATH,
          port: LOCAL_SERVER_PORT,
          files: [
            { src: LOCAL_FILENAME, dest: FILENAME(INCLUDE FILE TYPE), delay: DELAY_MILLISECOND }
          ]
        },
        viewport: [] 
      },
    },
  },
})
```

### Options

#### options.path
Type: `String`

Path to the directory which screenshots will be saved.

#### options.remote
Type: String

New format after 0.1.0, now you have to assign the source url and your screenshot file, include it's format, like following. After **0.2.0**, it support `delay`. Let it wait a given time(millisecond) before take a screenshot:

```js
remote: {
  files: [
    { src: "http://www.google.com", dest: "google.png", delay: 3000 },
  ]
}
```


#### options.local
Type: String

Start a local http server to host your webpage then get the screenshot. 

Just like options.remote, you need to assign your local filename and screenshot filename, including it's format.
```js
local: {
  path: './dist', // path to directory of the webpage
  port: 8080      // port of startup http server
  files: [        // local filename and screenshot filename
    { src: "index.html", dest: "screenshot.jpg", delay: 3000 }
  ]
}
```

#### options.viewport
Type: Array

Autoshot could create the screenshot base on given viewport, it's helpful if you want to test responsive webpage.
```
ex: ['1024x768', '1920x1080']
```
You could add any resolution you want, just follow the same format.

### emitter.setMaxListeners

Upgrade all dependencies when it upgrade to 0.2.0. When [node-phantom-simple](https://github.com/baudehlo/node-phantom-simple) upgrade to latest(1.0.16), it will have [setMaxListeners](http://nodejs.org/api/events.html#events_emitter_setmaxlisteners_n) issue cause it listen [uncaughtException](https://github.com/baudehlo/node-phantom-simple/blob/master/node-phantom-simple.js#L84). When user take a lot of screenshot it will over the limit.

I [disable](https://github.com/Ferrari/grunt-autoshot/blob/master/tasks/autoshot.js#L17) the warn cause it should be ok. But please make sure you did not run autoshot in some special cases.

### options.phantomParams

Command-line parameters to ass to Phantom JS (Leave out the "--" prefix).

```
ex: phantomParams : {
  'local-to-remote-url-access': true, //translates to local-to-remote-url-access=true
  'web-security': false //translates to --web-security=false
},
```

**At time of writing, available options from http://phantomjs.org/api/command-line.html were:**

Command-line Options

Supported command-line options are:

```
  --help or -h lists all possible command-line options. Halts immediately, will not run a script passed as argument.
  --version or -v prints out the version of PhantomJS. Halts immediately, will not run a script passed as argument.
  --cookies-file=/path/to/cookies.txt specifies the file name to store the persistent Cookies.
  --disk-cache=[true|false] enables disk cache (at desktop services cache storage location, default is false). Also accepted: [yes|no].
  --ignore-ssl-errors=[true|false] ignores SSL errors, such as expired or self-signed certificate errors (default is false). Also accepted: [yes|no].
  --load-images=[true|false] load all inlined images (default is true). Also accepted: [yes|no].
  --local-storage-path=/some/path path to save LocalStorage content and WebSQL content.
  --local-storage-quota=number maximum size to allow for data.
  --local-to-remote-url-access=[true|false] allows local content to access remote URL (default is false). Also accepted: [yes|no].
  --max-disk-cache-size=size limits the size of disk cache (in KB).
  --output-encoding=encoding sets the encoding used for terminal output (default is utf8).
  --remote-debugger-port starts the script in a debug harness and listens on the specified port
  --remote-debugger-autorun runs the script in the debugger immediately: 'yes' or 'no' (default)
  --proxy=address:port specifies the proxy server to use (e.g. --proxy=192.168.1.42:8080).
  --proxy-type=[http|socks5|none] specifies the type of the proxy server (default is http).
  --proxy-auth specifies the authentication information for the proxy, e.g. --proxy-auth=username:password).
  --script-encoding=encoding sets the encoding used for the starting script (default is utf8).
  --ssl-protocol=[sslv3|sslv2|tlsv1|any'] sets the SSL protocol for secure connections (default is SSLv3).
  --ssl-certificates-path=<val> Sets the location for custom CA certificates (if none set, uses system default).
  --web-security=[true|false] enables web security and forbids cross-domain XHR (default is true). Also accepted: [yes|no].
  --webdriver starts in 'Remote WebDriver mode' (embedded GhostDriver): '[[:]]' (default '127.0.0.1:8910')
  --webdriver-selenium-grid-hub URL to the Selenium Grid HUB: 'URLTOHUB' (default 'none') (NOTE: works only together with '--webdriver')
              
```


## License
Copyright (c) 2013 Ferrari Lee. Licensed under the MIT license.
