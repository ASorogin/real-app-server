const getPaginationParams = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

const getSortParams = (sortQuery) => {
    let sort = { createdAt: -1 }; // default sort
    if (sortQuery) {
        switch (sortQuery) {
            case 'name':
                sort = { bizName: 1 };
                break;
            case 'name_desc':
                sort = { bizName: -1 };
                break;
            case 'date':
                sort = { createdAt: 1 };
                break;
            case 'date_desc':
                sort = { createdAt: -1 };
                break;
        }
    }
    return sort;
};

module.exports = {
    getPaginationParams,
    getSortParams
};