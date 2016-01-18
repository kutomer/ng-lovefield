# ng-lovefield
This is an angular wrapper for the [lovefield](https://github.com/google/lovefield "lovefield repo") project by GOOGLE.

## How to use - [demo site](http://kutomer.github.io/ng-lovefield/)
### define schema and create DB
```
		.config(['lovefieldProvider',
			function(lovefieldProvider) {
				var schemaBuilder = lovefieldProvider.create('test', 1);

				schemaBuilder.createTable('first').
				addColumn('str_col', lf.Type.STRING).
				addColumn('num_col', lf.Type.NUMBER).
				addPrimaryKey(['str_col']);
			}]
		);
```

### get DB instance
```
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
```
**Do not forget to inject the lovefield factory to your ctrl \ service**

## How to contribute?
1. clone the repo
2. `npm install -g grunt bower`
3. `bower install`
4. `grunt` the default task will compile the module to the "dest" dir
5. `npm start` starts the local server for the demo site

## TODO List:
* wrap tables
* validate tableSchema (must have a pk for instance) 
* connect to more then one database
* publish package as a bower package