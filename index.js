const internalInput = process.argv
// console.log(internalInput)

const path = require('path');
const fs = require('fs');
const { log } = require('console');
const [, , command, folderName, fileName, fileValue] = internalInput;
// console.log( command, folderName, fileName, fileValue);

switch(command){
    case "addfolder":{
        const isExitfolder = fs.existsSync(folderName);
        if(isExitfolder){
            log('this file is already exist try another name')
        }else{
            fs.mkdir(folderName, (err)=>{
                if(err){
                    log('error from make directory', err)
                }
            })
        }
       break 
    }
    case "addfile": {
        const ourTargetPath = path.join(__dirname,folderName, `${fileName}.txt`);
        const isExitfile = fs.existsSync(ourTargetPath);
        if(isExitfile){
            return log('this file is already exist try another name')
        }else{
            fs.writeFile(ourTargetPath, fileValue, (err)=>{
                if(err){
                    log('error from error file', err)
                }else{
                    log(`${fileName}.txt created successfully`)
                }
            })
        }
        
    break
    }   

}