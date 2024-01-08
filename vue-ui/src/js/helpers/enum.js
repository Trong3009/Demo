const emulationType = {
    /**
     * Định dạng giải thưởng
     * @author nqtrong (15-08-2023)
     */
    object: {
        group: 1,
        personal: 2,
        family: 3,
        personalAndGroup: 4
    }, 
    commendation: {
        nationalLevel: 0,
        provincialLevel: 1,
        districtLevel: 2,
        communalLevel: 3
    },
    movement: {
        regular: 0,
        periodic: 1,
        all: -1
    },
    inactive: {
        inactive: 0,
        active: 1
    }
};

const MEnum = {
    emulationType
};

export default MEnum;
