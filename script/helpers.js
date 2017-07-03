/**
 * Created by tayab on 23.05.2017.
 */
var DEFAULT_SETTINGS = {
    backgroundImageUrl: './images/bricks-sprite.png',
    gameOverImageUrl: './images/game-over.png',
    cellSeize: 33,
    cellSizeUnit: 'px',
    columnsCount: 9,
    rowsCount: 16,
    speed: 850,
    minSpeed: 400
};

Math.randomInRange = function (min, max) {
    max++;
    return Math.floor(min + Math.random() * (max - min));
};

function createTwoDArray(m, n, defaultVal) {
    m = parseInt(m);
    n = parseInt(n);
    defaultVal = defaultVal || 0;
    var arr = new Array(m);

    for (var i = 0; i < arr.length; i++)
        arr[i] = new Array(n).fill(defaultVal);
    return arr;
}

function isArrayEmpty(array) {
    for(var i =0; i<array.length; i++)
        if(array[i])
            return false;

    return true;
}

var BLOCK_SHAPES = [
    //Z-shape
    [
        [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    ],

    //L-shape
    [
        [
            [0, 0, 0, 2],
            [0, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 2, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 2, 2],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 2, 0],
            [0, 0, 0, 0]
        ]
    ],

    //O-shape
    [
        [
            [0, 3, 3, 0],
            [0, 3, 3, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ],

    //S-shape
    [
        [
            [0, 0, 4, 4],
            [0, 4, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 4, 0, 0],
            [0, 4, 4, 0],
            [0, 0, 4, 0],
            [0, 0, 0, 0]
        ]
    ],

    //I-shape
    [
        [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ],
        [
            [5, 5, 5, 5],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ],

    //J-shape
    [
        [
            [6, 0, 0, 0],
            [6, 6, 6, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 6, 6, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [6, 6, 6, 0],
            [0, 0, 6, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 6, 0],
            [0, 0, 6, 0],
            [0, 6, 6, 0],
            [0, 0, 0, 0]
        ]
    ],

    //T-shape
    [
        [
            [0, 7, 0, 0],
            [7, 7, 7, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 7, 0, 0],
            [0, 7, 7, 0],
            [0, 7, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [7, 7, 7, 0],
            [0, 7, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 7, 0],
            [0, 7, 7, 0],
            [0, 0, 7, 0],
            [0, 0, 0, 0]
        ]
    ]
];
