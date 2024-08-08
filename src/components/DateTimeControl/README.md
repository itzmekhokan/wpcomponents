# DateTimeControl

`DateTimeControl` is an extended WordPress `DateTimePicker` component used to generate field on click DateTimePicker modal and also has `reset` the `date-time` feature.

## Usage

```jsx
import { useState } from 'react';
import { DateTimeControl } from 'itzmekhokan-wpcomponents';

const MyDateTimeControl = () => {
    const [ date, setDate ] = useState( new Date() );

    return (
        <DateTimeControl
            currentDateTime={ date ? date : null }
            is12Hour={ true }
            onChange={ ( newDate ) => setDate( newDate ) }
        />
    );
};
```

## Props

Name | Type | Default | Description
--- | --- | --- | ---
`currentDateTime` | String | `null` | `Required` The current date and time at initialization.
`onChange` | Function |  | `Required` The function called when a new date or time has been selected.
`label` | String |  | Component field label.
`className` | String | `ks-date-time-control` | Component field additional classes.
`help` | String |  | Component field help text.
`popoverProps` | String | `bottom-start` | How Date-Time modal will open.
`buttonVariant` | String | `secondary` | Component field button style variant.
`buttonPlaceholder` | String |  | `DateTimeControl` button placeholder.
`buttonResetLabel` | String |  | `DateTimeControl` reset button label.
`is12Hour` | Boolean | `false` | Whether we use a 12-hour clock.
`startOfWeek` | Number | `0` | The day that the week should start on. 0 for Sunday, 1 for Monday, etc.