const tourService = require('../../services/tourService');
const db = require('../../db/db');

exports.getTours = (req, res, next) => {
    try {
        const tours = db.readTours().tours;
        res.json(tours);
    } catch (error) {
        next(error);
    }
};

exports.getTourById = (req, res, next) => {
    try {
        const tourId = req.params.id;
        const tours = db.readTours().tours;
        const tour = tours.find(t => t.tourId === tourId);
        if (tour) {
            res.json(tour);
        } else {
            res.status(404).json({ error: 'Tour not found' });
        }
    } catch (error) {
        next(error);
    }
};

exports.postTour = (req, res, next) => {
    try {
        if (req.body) {
            const data = JSON.parse(req.body);
            const newTour = tourService.createTour(data);
            res.status(201).json({ message: 'Тур успешно создан', tour: newTour });
        } else {
            res.status(400).json({ error: 'Bad Request', message: 'Тело запроса не может быть пустым' });
        }
    } catch (error) {
        if (error.message === 'Тур с таким id уже существует') {
            res.status(400).json({ error: 'Bad Request', message: error.message });
        } else if (error.message === 'Недостаточно данных для создания тура') {
            res.status(400).json({ error: 'Bad Request', message: error.message });
        } else {
            next(error);
        }
    }
};

exports.putAndPatchTourById = (req, res, next) => {
    try {
        if (req.body) {
            const tourId = req.params.id;
            const newData = JSON.parse(req.body);
            const updatedTour = tourService.updateTour(tourId, newData);
            res.status(200).json({ message: 'Тур успешно обновлён', tour: updatedTour });
        } else {
            res.status(400).json({ error: 'Bad Request', message: 'Тело запроса не может быть пустым' });
        }
    } catch (error) {
        if (error.message === 'Тур не найден') {
            res.status(404).json({ error: 'Not Found', message: error.message });
        } else {
            next(error);
        }
    }
};

exports.deleteTourById = (req, res, next) => {
    try {
        const tourId = req.params.id;
        tourService.deleteTour(tourId);
        res.status(200).json({ message: 'Тур удалён' });
    } catch (error) {
        if (error.message === 'Тур не найден') {
            res.status(404).json({ error: 'Not Found', message: error.message });
        } else {
            next(error);
        }
    }
};
