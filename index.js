const internalInput = process.argv
// console.log(internalInput)

const path = require('path');
const fs = require('fs');
const { log } = require('console');
const { escape } = require('querystring');
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
    case "readfile": {
        const targetPath = path.join(__dirname, folderName, `${fileName}.txt`);
        const isExitfile = fs.existsSync(targetPath);
        if(isExitfile){
          fs.readFile(targetPath, 'utf-8', (err, data)=>{
            if(err){
               return log('error from read file', err)
            }else{
                log(data)
            }
          })
        }else{
            log('no file exist in this directory')
        }
        break
    }
    case "deleteFolder": {
        const targetPath = path.join(__dirname, folderName);
        const isExitfile = fs.existsSync(targetPath);
        if(isExitfile){
            fs.rm(targetPath, {recursive: true, force: true}, (err)=>{
                if(err){
                    log(`failed to delete foder: ${targetPath}`, err)
                }else{
                    log(`folder deleted successfully: ${targetPath}`)
                }
            })
        }
        break
    }
    case "deleteFile" : {
        const targetPath = path.join(__dirname, folderName, `${fileName}.txt`);
        const isExitfile = fs.existsSync(targetPath);
        if(!isExitfile){
            return log('error from delete file')
        }else{
            fs.unlink(targetPath, (err)=>{
                log('error from delete file', err)
            })
        }
    }
}