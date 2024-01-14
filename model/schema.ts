// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'bus_stops',
            columns: [
                { name: 'common_name', type: 'string' },
                { name: 'five_digit_stop_code', type: 'string' },
                { name: 'latitude', type: 'number' },
                { name: 'longitude', type: 'number' },
            ]
        }),
    ]
})
