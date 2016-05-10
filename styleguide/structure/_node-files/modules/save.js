var fs = require('fs'),
    basePath = require('./utils').basePath;



module.exports = function() {
    var stream = fs.createWriteStream(basePath + '/styleguide/assets/scripts/data.json'),
        modulesDirectory = basePath + '/styleguide/modules',
        content = [],
        finalContent,
        list = fs.readdirSync(modulesDirectory);

    list.forEach(function(file) {
        var path = modulesDirectory + '/' + file,
            hasData,
            data,
            stat = fs.statSync(path),
            jsonFile = [];

        if (stat && stat.isDirectory()) {
            hasData = fs.existsSync(path + '/_data.json');


            if (hasData) {
                data = JSON.parse(fs.readFileSync(path + '/_data.json'));
                   // var filePath = path + '/' + file,
                   //      fileContent;
                   //      console.log(fileContent);
             	// jsonFile.push(fileContent);
             	      // if (fs.existsSync(filePath)) {
              
                  		console.log(data);
                        jsonFile.push(data);
                    // }
            }

                if (typeof jsonFile !== 'undefined' && jsonFile.length > 0) content.push(jsonFile.join('\n\n'));
          


        }

    });

  finalContent = content.join('\n\n');
  

  stream.once('open', function() {
    stream.write(finalContent);
    stream.end();
  });

};
