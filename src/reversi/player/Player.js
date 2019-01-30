export function create(name, cellType, isHuman = true) {
    return {
        name,
        cellType,
        isHuman,
    };
}
