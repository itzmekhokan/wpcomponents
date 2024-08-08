# AccordionControl

`AccordionControl` is a component used to generate field with dynamic `Accordion` data set with `title` & `content`.

## Usage

```jsx
import { useState } from 'react';
import { AccordionControl } from 'itzmekhokan-wpcomponents';

const MyAccordionControl = () => {
    const [ accordions, setAccordions ] = useState( [] );

    const labels = {
        label: 'FAQ Accordions',
        addBtnText: 'Add new FAQ',
        removeBtnText: 'Remove FAQ',
        moveUpText: 'Move up',
        moveDownText: 'Move down',
        placeholderTitle: '',
        placeholderContent: '',
    }

    return (
        <AccordionControl
            labels={ labels }
            values={ accordions }
            onChange={ ( newData ) => setAccordions( newData ) }
        />
    );
};
```

## Props

Name | Type | Default | Description
--- | --- | --- | ---
`onChange` | Function |  | `Required` The function called when a new date or time has been selected.
`labels` | Object |  | Component field labels object strings.
`className` | String | `ks-accordion-control` | Component field additional classes.
`values` | Array | `[]` | Component field values.