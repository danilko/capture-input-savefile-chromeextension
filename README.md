# capture-input-savefile-chromeextension
This is a Google Chrome Extension experiment to save input field result into an output directory

PLEASE DO NOTE THIS IS EXPERIMENT CODE AND USE ON YOUR OWN RISK

## Overview
This extension will inject javascript method into target page.
The injected javascript will look for `sourceInput` input text field within the page, and updated it with an `input` event listener to listen to text field change. When the change occur, will use the new [FileSystemWritableFileStream API](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write) to write file to local

Note: this will not capture change of that field through javascript, as it depends on `input` event of input field

Also note, the [FileSystemWritableFileStream API](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write) must have user content before can write, so will popup to ask for user permission during first text filed change.

The script also contain small code to switch the file every hour to prevent one big file. During that one hour period, the script use internal memory to store and write everything whenever there is a change in text field to workaround the API currently does not support append.

## Requirements/Tools
1. Google Chrome 87 or above (as the API required)
2. Access to Google Chrome as Developer Mode to install local extensions
3. Access to install `http-server` or someway to host test index html page as a website

## Installation
Please download the code (through git clone or zip)

If zip, please unzip it

Then install the extension through [Google Chrome Extension Developer Mode] (https://developer.chrome.com/docs/extensions/mv3/getstarted/)

1. In Google Chrome, please navigate to `chrome://extensions`
2. Enable the `Developer Mode` slide to enable (should be on the right upper hand side)
3. Once developer mode is enabled, please then click the `Load unpacked` button and go to the above 
```
source code directory/extension
```
folder to install the extension


# Test
## Setup the testing site
Please install [http-server](https://www.npmjs.com/package/http-server) or equivalent to able to serve the `index.html` page as a website

Below will use `http-server` for demo purpose
```
cd sites
http-server -a localhost -p 8080
```

## Capture Experiment
1. Go to the hosted site in Google Chrome browser with the extension installed, below will use localhost example setup above
```
http://localhost:8080
```
2. Once in the site, please then enable the extension by going into the extension tab in Google Chrome -> click the installed extension (google icon) -> Click `Start Capture`
Then it will prompt a file selector directory for saving (please note this is directory, not specific file, as files will be generated in here). A prompt will notify the website session will need to `read` the directory, click allow to confirm
3. Update the text field by modifying the input in browser (not through javascript). A prompt will notify the website session will need to `write` the directory, click allow to confirm
4. Check the target directory, file should be created with timestamp of the hour
5. Continue to do more change to the input field by modifying the input in browser (not through javascript), will notice new content will appear within file. After the current hour passed, new change will be write into new file base on hour

NOTE: There is current no way to clean up the existing site after script injected, the only way to stop record is to close the tab where the site is located