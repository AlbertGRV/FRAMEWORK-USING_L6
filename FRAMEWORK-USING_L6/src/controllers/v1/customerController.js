const clientService = require('../../services/clientService');
const db = require('../../db/db');

exports.getClients = (req, res, next) => {
    try {
        const clients = db.readClients().clients;
        res.json(clients);
    } catch (error) {
        next(error);
    }
};

exports.getClientById = (req, res, next) => {
    try {
        const clientId = req.params.id;
        const clients = db.readClients().clients;
        const client = clients.find(c => c.clientId === clientId);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ error: 'Клиент не найден' });
        }
    } catch (error) {
        next(error);
    }
};

exports.postClient = (req, res, next) => {
    try {
        if (req.body) {
            const data = JSON.parse(req.body);
            const newClient = clientService.createClient(data);
            res.status(201).json({ message: 'Клиент успешно создан', client: newClient });
        } else {
            res.status(400).json({ error: 'Bad Request', message: 'Тело запроса не может быть пустым' });
        }
    } catch (error) {
        if (error.message === 'Клиент с таким id уже существует') {
            res.status(400).json({ error: 'Bad Request', message: error.message });
        } else if (error.message === 'Недостаточно данных для создания клиента') {
            res.status(400).json({ error: 'Bad Request', message: error.message });
        } else {
            next(error);
        }
    }
};

exports.putAndPatchClientById = (req, res, next) => {
    try {
        if (req.body) {
            const clientId = req.params.id;
            const newData = JSON.parse(req.body);
            const updatedClient = clientService.updateClient(clientId, newData);
            res.status(200).json({ message: 'Клиент успешно обновлён', client: updatedClient });
        } else {
            res.status(400).json({ error: 'Bad Request', message: 'Тело запроса не может быть пустым' });
        }
    } catch (error) {
        if (error.message === 'Клиент не найден') {
            res.status(404).json({ error: 'Not Found', message: error.message });
        } else {
            next(error);
        }
    }
};

exports.deleteClientById = (req, res, next) => {
    try {
        const clientId = req.params.id;
        clientService.deleteClient(clientId);
        res.status(200).json({ message: 'Клиент удалён' });
    } catch (error) {
        if (error.message === 'Клиент не найден') {
            res.status(404).json({ error: 'Not Found', message: error.message });
        } else {
            next(error);
        }
    }
};
