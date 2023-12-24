
// // // pythonController.js

// // const { PythonShell } = require('python-shell');

// // const sendDataToPython = async (selectedRoom, inputValue) => {
// //   return new Promise((resolve, reject) => {
// //     const options = {
// //       mode: 'text',
// //       pythonOptions: ['-u'], // unbuffered
// //       scriptPath: './', // path to the python script
// //       args: [selectedRoom, inputValue],
// //     };

// //     PythonShell.run('dataProcessor.py', options, (err, result) => {
// //       if (err) {
// //         reject(err);
// //       } else {
// //         const resultLength = parseInt(result[0]);
// //         resolve(resultLength); // Assuming the Python script returns the array length as a string
// //       }
// //     });
// //   });
// // };

// // module.exports = { sendDataToPython };


// // pythonController.js

// const { PythonShell } = require('python-shell');

// const sendDataToPython = async (selectedRoom, inputValue) => {
//   return new Promise((resolve, reject) => {
//     const options = {
//       mode: 'text',
//       pythonOptions: ['-u'],
//       scriptPath: './',
//       args: [selectedRoom, inputValue],
//     };

//     PythonShell.run('dataProcessor.py', options, (err, result) => {
//       if (err) {
//         console.error('Python script execution error:', err);
//         reject(err);
//       } else {
//         console.log('Python script output:', result);
//         const resultLength = parseInt(result[0]);
//         resolve(resultLength);
//       }
//     });
//   });
// };

// module.exports = { sendDataToPython };

const { PythonShell } = require('python-shell');

const sendDataToPython = async (selectedRoom, inputValue) => {
    console.log("hi from senddata")
  return new Promise((resolve, reject) => {
    console.log("from promise")
    const options = {
      mode: 'text',
      pythonOptions: ['-u'],
      scriptPath: './',
      args: [selectedRoom, inputValue],
    };

    // PythonShell.run('dataProcessor.py', options, function(err, result){
    //     console.log("Hi from shell")
    //   if (err) {
    //     // throw err;
    //     console.error('Python script execution error:', err);
    //     reject(err);
    //   } else {
    //     console.log('Python script output:', result.toString());
    //     resolve(result); // Resolve with the entire result for debugging
    //   }
    // });


    //spawn
    const { spawn } = require('child_process');

    path = 'python/data_processor.py'

    //const pythonProcess = spawn('python3', [path, selectedRoom, inputValue]);
    const pythonProcess = spawn('/Users/anna/opt/anaconda3/bin/python', [path, selectedRoom, inputValue]);
    
    let result = '';
    
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error('Python script error:', data.toString());
      reject(data.toString());
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Python script output:', result.trim());
        resolve(result.trim());
      } else {
        console.error('Python process exited with code:', code);
        reject(`Python process exited with code ${code}`);
      }
    });
    

  });
};

module.exports = { sendDataToPython };
