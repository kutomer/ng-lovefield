'use strict';

angular
    .module('ng-lovefield-demo')
    .controller('DemoCtrl', ['lovefield', function(lovefield) {
        var vm = this;

        vm.insert = function() {
            lovefield.getDB().then(function(db) {
                var table = db.getSchema().table('first');

                var row = table.createRow({
                    'str_col': vm.title,
                    'num_col': 2
                });

                db.insertOrReplace().into(table).values([row]).exec()
                    .then(function(response) {
                        console.log(response);
                });
            });
        };

        vm.clear = lovefield.clearDB;
    }]);