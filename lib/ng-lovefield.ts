'use strict';

declare var angular:any;
declare var lf:any;

(function () {
    angular.module('kutomer.ng-lovefield', [])
        .provider('lovefield', function LovefieldProvider() {
            var schemaBuilder;

            this.create = function (name, version) {
                if (angular.isUndefined(lf)) {
                    throw new Error("lovefield is not defined!");
                }

                return schemaBuilder = lf.schema.create(name, version);
            };

            this.Type = lf.Type;

            this.$get = ['$q', function ($q) {
                return LovefieldFactory(schemaBuilder, $q);
            }];
        });

    function LovefieldFactory(schemaBuilder, $q) {
        var db;
        var dbPromise;

        function getDB() {
            if (angular.isDefined(db)) {
                return $q.resolve(db);
            }

            if (!dbPromise) {
                // TODO: handle connection parameters
                dbPromise = schemaBuilder.connect()
                    .then((connection) => {
                        return db = connection
                    })
                    .catch((err) => {
                        console.error("cannot connect to lovefield DB!")
                    })
            }

            return dbPromise;
        }

        function clearDB() {
            getDB()
                .then(db => {
                    let tables = db.getSchema().tables();
                    tables.forEach((table) => db.delete().from(table).exec());
                });
        }

        return {
            getDB: getDB,
            clearDB: clearDB
        };
    }
})();