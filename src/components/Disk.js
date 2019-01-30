import React from 'react';
import { Viro3DObject } from 'react-viro';

const Disk = props => (
    <Viro3DObject
        source={require('../assets/disk.obj')}
        resources={[require('../assets/disk.mtl')]}
        highAccuracyEvents={true}
        position={[0, 0, -1]}
        scale={[0.0007, 0.0007, 0.0007]}
        type="OBJ"
        {...props}
    />
);

export default Disk;
