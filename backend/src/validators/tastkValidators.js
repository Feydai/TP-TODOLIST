const TASK_STATUSES = ['todo', 'doing', 'done'];

function validateTask(data, isPatch = false) {

    const allowedFields = [
        'title',
        'description',
        'status',
        'dueDate'
    ];

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return 'Le corps de la requête est invalide';
    }

    const fields = Object.keys(data);

    if (isPatch && fields.length === 0) {
        return 'Aucun champ à modifier';
    }

    for (const field of fields) {
        if (!allowedFields.includes(field)) {
            return `Champ interdit : ${field}`;
        }
    }

    if (!isPatch && data.title === undefined) {
        return 'Le titre est obligatoire';
    }

    if (data.title !== undefined) {
        if (typeof data.title !== 'string') {
            return 'Le titre doit être une chaîne de caractères';
        }

        const title = data.title.trim();

        if (title.length < 1 || title.length > 120) {
            return 'Le titre doit contenir entre 1 et 120 caractères';
        }
    }

    if (data.status !== undefined) {
        if (!TASK_STATUSES.includes(data.status)) {
            return 'Le statut doit être todo, doing ou done';
        }
    }

    if (data.description !== undefined) {
        if (typeof data.description !== 'string') {
            return 'La description doit être une chaîne de caractères';
        }

        if (data.description.length > 1000) {
            return 'La description ne doit pas dépasser 1000 caractères';
        }
    }

    if (data.dueDate !== undefined && data.dueDate !== null) {

        if (
            typeof data.dueDate !== 'string' ||
            !/^\d{4}-\d{2}-\d{2}$/.test(data.dueDate)
        ) {
            return 'La date doit être au format YYYY-MM-DD';
        }

        const date = new Date(`${data.dueDate}T00:00:00Z`);

        if (Number.isNaN(date.getTime())) {
            return 'La date est invalide';
        }
    }

    return null;
}

module.exports = {
    validateTask
};