// This script copies app/index.html into /dist/index.html
// and adds Raygun error tracking code for use in production
// when useRaygun is set to true below and a raygunToken is provided.

// Allowing console calls below since this is a build file.
/* eslint-disable no-console */

import fs from 'fs';
import { chalkSuccess, chalkError, chalkWarning } from './chalkConfig';
import cheerio from 'cheerio';

const useRaygun = true; // If you choose not to use Raygun, just set this to false and the build warning will go away.
const raygunToken = 'cu/2xo1uNrUlwdyd77yBnA==';

fs.readFile('app/index.html', 'utf8', (readError, markup) => {
    if (readError) {
        return console.log(chalkError(readError));
    }

    const $ = cheerio.load(markup);

    // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
    $('head').append('<link rel="stylesheet" href="/styles.css">');

    if (useRaygun) {
        if (raygunToken) {
            const raygunCode = `<!-- BEGIN RAYGUN Note: This should be the first <script> on the page per https://raygun.com/docs/languages/javascript --><script type="text/javascript">!function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){(a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");</script><script type="text/javascript">rg4js('apiKey', '${raygunToken}');rg4js('enableCrashReporting', true);</script><!-- END RAYGUN -->`;

            $('head').append(raygunCode); // add Raygun tracking code to the bottom of <head>
        } else {
            console.log(chalkWarning('To track JavaScript errors, enter your token in /tools/build.html on line 15.'));
        }
    }

    fs.writeFile('dist/index.html', $.html(), 'utf8', (writeError) => {
        if (writeError) {
            return console.log(chalkError(writeError));
        }
        console.log(chalkSuccess('index.html written to /dist'));

        return writeError;
    });

    return readError;
});
