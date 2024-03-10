const attributesClause = (fields, model) => {
    const allowedFields = {
        gender: ['id', 'name', 'createdAt', 'updatedAt'],
        book: ['id', 'title', 'pubdate', 'category', 'language', 'description', 'author', 'createdAt', 'updatedAt'],
    };
    
    const selectedFields = fields.split(',');

    const attributes = selectedFields && selectedFields.filter(field => allowedFields[model].includes(field));

    if (attributes.length > 0) {
        return attributes;
    };

    return null;
}

module.exports = { attributesClause };