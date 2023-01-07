function getHash(object: string) {
    let hash = 0,
        i,
        chr;
    if (object.length === 0) return hash;
    for (i = 0; i < object.length; i++) {
        chr = object.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export { getHash }
