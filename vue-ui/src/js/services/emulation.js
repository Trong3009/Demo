export const getEmulationList = async () => {
    try {
        // get data from url

        // fake api
        const data = {
            "PageData": [
                {
                    "EmulationTitleName": "Lao động tiên tiến",
                    "EmulationTitleCode": "LĐTTCX",
                    "ApplyObject": 2,
                    "CommendationLevel": 3,
                    "MovementType": 0,
                    "Inactive": 0,
                    "EmulationTitleID": 50,
                    "IsSystem": 1
                },
                {
                    "EmulationTitleName": "Chiến sĩ thi đua cơ sở",
                    "EmulationTitleCode": "CSTĐCS",
                    "ApplyObject": 2,
                    "CommendationLevel": 2,
                    "MovementType": 0,
                    "Inactive": 0,
                    "EmulationTitleID": 48,
                    "IsSystem": 1
                },
                {
                    "EmulationTitleName": "Lao động tiên tiến",
                    "EmulationTitleCode": "LĐTTCH",
                    "ApplyObject": 2,
                    "CommendationLevel": 2,
                    "MovementType": 0,
                    "Inactive": 0,
                    "EmulationTitleID": 49,
                    "IsSystem": 1
                },
                {
                    "EmulationTitleName": "Chiến sĩ thi đua cấp bộ",
                    "EmulationTitleCode": "CSTĐCB",
                    "ApplyObject": 2,
                    "CommendationLevel": 1,
                    "MovementType": 0,
                    "Inactive": 0,
                    "EmulationTitleID": 46,
                    "IsSystem": 1
                },
                {
                    "EmulationTitleName": "Tập thể lao động xuất sắc",
                    "EmulationTitleCode": "TTLĐXS",
                    "ApplyObject": 1,
                    "CommendationLevel": 1,
                    "MovementType": 0,
                    "Inactive": 0,
                    "EmulationTitleID": 54,
                    "IsSystem": 1
                },
                {
                    "EmulationTitleName": "Cờ thi đua của Chính phủ",
                    "EmulationTitleCode": "CTĐCP",
                    "ApplyObject": 1,
                    "CommendationLevel": 0,
                    "MovementType": -1,
                    "Inactive": 0,
                    "EmulationTitleID": 51,
                    "IsSystem": 1
                }
            ]
        }

        const res = new Promise(resolve => {
            return setTimeout(() => {
                resolve(data);
            }, 1000);
        });

        return res;

    } catch (error) {
        console.log(error);
    }
}