import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Your WatermelonDB setup code
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './model/schema';
import migrations from './model/migrations';

import BusStop from './model/BusStop';

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    jsi: true,
    onSetUpError: error => {
        console.error("BOO!", error);
    }
});

const database = new Database({
    adapter,
    modelClasses: [
        BusStop,
    ],
});

// Rest of your index.js code
AppRegistry.registerComponent(appName, () => App);