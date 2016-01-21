var ncp = require('ncp').ncp;

ncp.limit = 16;

module.exports.generate = function (name) {
    generate(name);
    var route = 'app/components/app/route.ts';
    ammendRoutes(name, route);
    var nav = 'app/services/nav_list.ts';
    ammendRoutes(name, nav);
};

function generate(name) {
    var source = 'templates/template1';
    var destination = 'app/components/' + name;

    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        // Renaming files
        var fs = require('fs');
        //html
        var file_html = 'app/components/' + name + '/' + name + '.html';
        fs.rename('app/components/' + name + '/template1.html', file_html, function (err) {
            if (err) console.log('ERROR: ' + err);
            replace(name, file_html);
        });
        //ts
        var file_ts = 'app/components/' + name + '/' + name + '.ts';
        fs.rename('app/components/' + name + '/template1.ts', 'app/components/' + name + '/' + name + '.ts', function (err) {
            if (err) console.log('ERROR: ' + err);
            replace(name, file_ts);
        });
        //e2e
        var file_e2e = 'app/components/' + name + '/' + name + '.e2e.ts';
        fs.rename('app/components/' + name + '/template1.e2e.ts', 'app/components/' + name + '/' + name + '.e2e.ts', function (err) {
            if (err) console.log('ERROR: ' + err);
            replace(name, file_e2e);
        });
        //spec
        var file_spec = 'app/components/' + name + '/' + name + '_spec.ts';
        fs.rename('app/components/' + name + '/template1_spec.ts', 'app/components/' + name + '/' + name + '_spec.ts', function (err) {
            if (err) console.log('ERROR: ' + err);
            replace(name, file_spec);
        });

        console.log('done!');
    });

}

function replace(name, file) {
    var glob = require('glob');
    var fs = require('fs');
    var replace = require('replace');

    // Find file
    glob(file, function (err, files) {
        if (err) throw err;
        files.forEach(function (item, index, array) {
            // Replace string
            replace({
                regex: 'template1',
                replacement: name,
                paths: [item],
                recursive: true,
                silent: true,
            });

            replace({
                regex: 'Template1',
                replacement: firstToUpperCase(name),
                paths: [item],
                recursive: true,
                silent: true,
            });
        });
    });
}

function ammendRoutes(name, file) {
    var glob = require('glob');
    var fs = require('fs');
    var replace = require('replace');

    // Find file
    glob(file, function (err, files) {
        if (err) throw err;
        files.forEach(function (item, index, array) {
            // Replace string
            replace({
                regex: '//<%IMPORT%>',
                replacement: 'import {' + firstToUpperCase(name) + 'Cmp} from "../' + name + '/' + name + '";\n//<%IMPORT%>',
                paths: [item],
                recursive: true,
                silent: true,
            });

            replace({
                regex: '//<%ROUTE%>',
                replacement: '{ path: \'/' + name + '\', component: ' + firstToUpperCase(name) + 'Cmp, as: \'' + firstToUpperCase(name) + '\' },\n//<%ROUTE%>',
                paths: [item],
                recursive: true,
                silent: true,
            });

            replace({
                regex: '//<%ROUTES%>',
                replacement: '\'' + firstToUpperCase(name) + '\',\n//<%ROUTES%>',
                paths: [item],
                recursive: true,
                silent: true,
            });
        });
    });
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
