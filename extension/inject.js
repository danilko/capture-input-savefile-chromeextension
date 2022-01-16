
var directoryHandle = null;
var inputReocrds = null;
var previousFile = null;

// Request file access to save to local
var startRecord = async function () {
    // Show file directory for saving files
    // https://blog.merzlabs.com/posts/native-file-system/
    directoryHandle = await window.showDirectoryPicker();

    // modify the input field, so when input occur, will be recorded to output file
    document.getElementById("sourceInput").addEventListener('input', (event) => {
        // If not undefined, or empty
        if (event.target.value && event.target.value != '') {
            writeContent(event.target.value);
        }
    });
}

var writeContent = async function (content) {
    // Handler cannot be null
    if (directoryHandle == null) {
        alert("cannot capture due to directory cannot be opened, please enable capture again");
        return null;
    }

    var result = document.getElementById("sourceInput").value;

    // Use the date as file stamp
    // Create a new file every hour
    var date = new Date();

    // The current wrirable API seem not support append, so use in -memory to store current files, until the filename change, then empty out the in memory setting
    var currentFile = 'Record_' + date.getFullYear() + formatTwoDigits(date.getMonth() + 1)  + formatTwoDigits(date.getDate())  + formatTwoDigits(date.getHours()) + '.txt'

    if(previousFile != currentFile)
    {
        // Set the previous file as current file
        previousFile = currentFile;
        // empty out the internal memory structure
        inputReocrds = [];
    }

    // Append the current record into the inputRecords
    inputReocrds.push(content)

    const newFileHandle = await directoryHandle.getFileHandle(currentFile, { create: true });

    // Keep existing data
    const writable = await newFileHandle.createWritable();
    await writable.write(JSON.stringify(inputReocrds));
    await writable.close();
}

var formatTwoDigits = function(month){
    // Format to double digit
    if(month < 10)
    {
        return '0' + month;
    }
    else
    {
        return '' + month;
    }
    
}

// Call start record to trigger folder selection
startRecord();