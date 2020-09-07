function getObjectDiff(master, slave, cloneObject, index) {
    index++;
    const masterIsNull = 
       master === undefined 
    || master === null 
    || master.length === 0;

    const MASTER_KEYS_ARRAY = Object.keys(slave);
    const SLAVE_KEYS_ARRAY = Object.keys(slave);
    
    const diff = masterIsNull ? SLAVE_KEYS_ARRAY 
    :   /*
        * find not equal key names
        */
        MASTER_KEYS_ARRAY.reduce((result, key) => {
            if (!slave.hasOwnProperty(key)) {
                result.push(key);
            } else if (_.isEqual(master[key], slave[key])) {
                const resultKeyIndex = result.indexOf(key);
                result.splice(resultKeyIndex, 1);
            }
            return result;
        }, SLAVE_KEYS_ARRAY);

    /*
    * push (difference or undefiend) key names
    */
    diff.map(keyname => cloneObject.push(`${index}.${keyname}`));

    /*
    * if diff array has object call recursive 
    */
    diff.forEach((item) => {
        _.isObject(slave[item]) ?
            getObjectDiff(master[item], slave[item], cloneObject, index)
            : null;
    });

    /*
    * pushed array
    */
    return cloneObject;
}

const master = {
    aasd: 1,
    a: 2,
    test3: 3,
    b: 3
}
const slave = {
    aasd: {
        asd: 'd'
    },
    test: {
        d: 'd'
    },
    c: 'd,',
    asczx: 3,
    dasd: 3
}

/*
* use function
*/
const cloneArray = [];
const con = getObjectDiff(master, slave, cloneArray, 0).sort();