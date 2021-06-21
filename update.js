const express = require('express')
const fs = require('fs');
const linerdr = require('readline');
const chalk = require('chalk');

app = express();

app.get('/', (req, res) => {
    res.send('hi there :)');
});

const pathprov = './editor_data/mapAoC2_v2.txt'
const prefix = chalk.yellow.bold("[ProvinceUpdater]");
var provdata;
var temp = [];

//-

const inputlog = linerdr.createInterface({
    input: process.stdin,
    output: process.stdout
});

function linec(text) {
    var nLines = 0;
    for( var i = 0, n = text.length;  i < n;  ++i ) {
        if( text[i] === '\n' ) {
            ++nLines;
        }
    }
    return nLines + 1;
}

function plog(string) {
    console.log(`${prefix} ${string}`);
}

//-

app.listen(1945, () => {
    plog('Turning on... \n\n')
    console.log(chalk.blueBright(`
///////////////////////  
╔╗─╔╗──────────╔╗
║║─║║──────────║║
║╚═╝╠══╦═╗╔══╦═╝╠══╗
║╔═╗║╔╗║╔╗╣══╣╔╗║╔╗║
║║─║║╚╝║║║╠══║╚╝║╔╗║
╚╝─╚╩══╩╝╚╩══╩══╩╝╚╝
///////////////////////

AOH2 MAP EDITOR PROVINCE UPDATER v1.0.0
    `))

    console.log(chalk.magentaBright(`


    ${chalk.greenBright('[[ Instructions of how to use the tool. ]]')}

    1. Make a backup folder of your map editor folder.

    2. Copy the ${chalk.yellow("'mapAoC2_v2.txt'")} file located at ${chalk.yellow("'<your-map-editor>/editor_data/Provinces'")}
    and paste it inside the ${chalk.yellow("'editor_data'")} folder.
    If there's no folder named ${chalk.yellow("'editor_data'")}, make one and name it ${chalk.yellow("'editor_data'")} and then paste the file in it.

    3. Simply press ${chalk.yellowBright.bold('ENTER')} to start the tool.
    `))

    inputlog.question(`Press 'Enter' if you understand/to start.`, () => {
        inputlog.close();
        if (fs.existsSync(pathprov)) {

            //-
    
            const linerdrs = linerdr.createInterface({
                input: fs.createReadStream(pathprov)
            });

            const temp2 = linerdrs.on('line', (line) => {
                temp.push(line);
            });
    
            //-

            provdata = fs.readFileSync(pathprov, {encoding:'utf8', flag:'r'});
            plog("Checking if the 'updatedProv' folder exist...");
            if (!fs.existsSync('./updatedProv')) {
                fs.mkdir("./updatedProv", function(err) {
                    if (err) {
                      plog(err);
                    } else {
                      plog('Creating updated provinces folder...');
                    }
                  })
            }
            // debug fs.writeFileSync('./updatedProv/test', 'test success');
            plog(`${chalk.green.bold(linec(provdata))} Lines detected from data.`);

            function isOdd(n) {
                return Math.abs(n % 2) == 1;
            }

            //Temp
            var anum = 0;
            var bnum = 0;

            setTimeout(() => {
                if(temp.length = linec(provdata)) temp.forEach((data, i) => { 
                    if (isOdd(i)) {
                        plog(`Getting province number ${chalk.yellow((i + 1) / 2)}...`)
                        //
                        anum++;
                        //if done
                        if ((i+1) == linec(provdata)) {
                            plog(`Finished, ${anum} provinces made.`)
                        }
                    }
                    fs.writeFileSync(`./updatedProv/${anum + 1}`, `${temp[bnum]};${temp[bnum+1]}`)
                    bnum++;
                });
                else plog('Process Failed - Please retry the program.')
                if (fs.existsSync(`./updatedProv/${(linec(provdata) / 2) + 1}`)) fs.unlinkSync(`./updatedProv/${(linec(provdata) / 2) + 1}`); plog(chalk.redBright(`Deleted bugged file, '${(linec(provdata) / 2) + 1}'.`));
                plog(chalk.greenBright.bold('Program done, you now can close the window.'));     
            }, 1000);
        }
        else {
            fs.mkdir("./editor_data", function(err) {
                if (err) {
                  return;
                } else {
                  plog("Creating 'editor_data' folder...");
                }
              })
    
            plog(chalk.redBright("Map Editor Province data can't be found."));
            plog(chalk.green.bold("Copy a text file named 'mapAoC2_v2.txt' from your map editor folder, and paste it inside 'editor_data' folder"));
        }
    });
});