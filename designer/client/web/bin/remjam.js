var ncp = require('ncp').ncp;
var rimraf = require('rimraf');

ncp.limit = 16;

module.exports.remove = function (name) {
    remove(name);

    var route = 'app/components/app/route.ts';
    removeRoutes(name, route);
    var nav = 'app/services/nav_list.ts';
    removeRoutes(name, nav);
};

function removeRoutes(name, file) {
    var glob = require('glob');
    var fs = require('fs');
    var replace = require('replace');

    // Find file
    glob(file, function (err, files) {
        if (err) throw err;
        files.forEach(function (item, index, array) {
            // Replace string
            console.log('import {' + firstToUpperCase(name) + 'Cmp} from "../' + name + '/' + name + '";');
            replace({
                regex: 'import {' + firstToUpperCase(name) + 'Cmp} from "../' + name + '/' + name + '";',
                replacement: '',
                paths: [item],
                recursive: true,
                silent: true,
            });

            replace({
                regex: '{ path: \'/' + name + '\', component: ' + firstToUpperCase(name) + 'Cmp, as: \'' + firstToUpperCase(name) + '\' },',
                replacement: '',
                paths: [item],
                recursive: true,
                silent: true,
            });

            replace({
                regex: '\'' + firstToUpperCase(name) + '\',',
                replacement: '',
                paths: [item],
                recursive: true,
                silent: false,
            });
        });
    });
}


function remove(name) {
    var destination = 'app/components/' + name;

    rimraf(destination, function (err) {
        if (err) {
            throw err;
        }
        console.log('done!');
    });

}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}
