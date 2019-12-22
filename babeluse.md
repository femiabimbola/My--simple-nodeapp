# The use of babel modules

### babel/node
```
This is to use babel for node project
```

### babel/core
```
This is to use babel core functionality
```

### babel/cli
```
This is run babel from commandline for each project
```

### babel/preset-env
```
This is to transpile code from ES2015+ to your build code
```

### babel/runtime @babel/plugin-transform-runtime
```
Transform-runtime is dev while run is production
This is to not messeed babel promise, extend with
the global scope. it put the babel in a sandbox environment
a plugin should be put in the babelrc
```

### babel/register
```
Babel is not a part of node core api, in order to use
babel, use first need to register to your node project
```

#### To kill nodeserver
Taskkill /IM node.exe /F

#### To kill terminal running on postgress
 First 
```
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'TARGET_DB';
```

