export const directionsFromPoint = [
    // top left
    [0, -1, -1],
    // top
    [0, -1, 0],
    // top right
    [0, -1, 1],
    // right
    [0, 0, 1],
    // bottom right
    [0, 1, 1],
    // bottom
    [0, 1, 0],
    // bottom left
    [0, 1, -1],
    // left
    [0, 0, -1],

    // ascending
    [1, 0, 0],
    // descending
    [-1, 0, 0],

    // descending top left
    [-1, -1, -1],
    // descending top
    [-1, -1, 0],
    // descending top, right
    [-1, -1, 1],
    // descending right
    [-1, 0, 1],

    // descending bottom, right
    [-1, 1, 1],
    // descending bottom
    [-1, 1, 0],
    // descending bottom, left
    [-1, 1, -1],
    // descending left
    [-1, 0, -1],

    // ascending top left
    [1, -1, -1],
    // ascending top
    [1, -1, 0],
    // ascending top, right
    [1, -1, 1],
    // ascending right

    [1, 0, 1],
    // ascending bottom, right
    [1, 1, 1],
    // ascending bottom
    [1, 1, 0],
    // ascending bottom, left
    [1, 1, -1],
    // ascending left
    [1, 0, -1]
];
