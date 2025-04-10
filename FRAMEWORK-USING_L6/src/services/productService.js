const db = require('../db/db');

function validateTourData(data) {
    if (!data.id || !data.name) {
        throw new Error('Недостаточно данных для создания тура');
    }
}

function notFoundTour(tourIndex) {
    if (tourIndex === -1) {
        throw new Error('Тур не найден');
    }
}

function createTour(data) {
    validateTourData(data);
    const tourContent = db.readTours();
    const tourExists = tourContent.tours.some(tour => tour.id === data.id);
    if (tourExists) {
        throw new Error('Тур с таким id уже существует');
    }
    tourContent.tours.push(data);
    db.writeTours(tourContent);
    return tourContent;
}

function updateTour(id, newData) {
    const tourContent = db.readTours();
    const tourIndex = tourContent.tours.findIndex(t => t.id === id);
    notFoundTour(tourIndex);
    Object.assign(tourContent.tours[tourIndex], newData);
    db.writeTours(tourContent);
    return tourContent.tours[tourIndex];
}

function deleteTour(id) {
    const tourContent = db.readTours();
    const tourIndex = tourContent.tours.findIndex(t => t.id === id);
    notFoundTour(tourIndex);
    tourContent.tours.splice(tourIndex, 1);
    db.writeTours(tourContent);
}

module.exports = {
    createTour,
    updateTour,
    deleteTour
};
