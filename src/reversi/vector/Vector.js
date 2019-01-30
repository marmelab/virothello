export function create(x, y) {
    return {
        x,
        y,
    };
}

export function add(baseVect, vect) {
    return create(baseVect.x + vect.x, baseVect.y + vect.y);
}

export function* addGenerator(baseVect, vect) {
    let tmpVector = baseVect;
    for (;;) {
        tmpVector = add(tmpVector, vect);
        yield tmpVector;
    }
}

export function getDirectionnalVectors() {
    return [
        create(0, 1),
        create(1, 1),
        create(-1, 1),
        create(0, -1),
        create(1, -1),
        create(-1, -1),
        create(1, 0),
        create(-1, 0),
    ];
}
