async function metImages() {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=cezanne', {mode: 'cors'});
    const artData = await response.json();
    let artIDs = [];
    for (let i = 1; i < 13; i++) {
        artIDs.push(String(artData.objectIDs[i]))
    }
    const objectURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
    let objectSrc = [];
    for (let i = 0; i < artIDs.length; i++) {
        let objectResponse = await fetch((objectURL + artIDs[i]), {mode: 'cors'});
        let objectData = await objectResponse.json();
        let object = {id: i, objectURL: objectData.primaryImageSmall,
                        objectName: objectData.title};
        objectSrc.push(object);
    }
    return objectSrc;
}

export default metImages;