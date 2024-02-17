async function metImages() {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=cezanne', {mode: 'cors'});
    const artData = await response.json();
    let artIDs = artData.objectIDs.slice(1, 21); // Get the first 20 valid IDs after the first one
    const objectURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
    let objectSrc = [];

    for (let id of artIDs) {
        if (objectSrc.length >= 12) break; // Stop if we've added 12 items

        let objectResponse = await fetch(objectURL + id, {mode: 'cors'});
        let objectData = await objectResponse.json();

        // Check if measurements exist and compare height and width
        let measurements = objectData.measurements?.[0]?.elementMeasurements;
        if (measurements && measurements.Height < measurements.Width) {
            let object = {
                id: id,
                objectURL: objectData.primaryImageSmall,
                objectName: objectData.title,
                clickedAlready: false
            };
            objectSrc.push(object);
        }
    }
    return objectSrc;
}
export default metImages;
