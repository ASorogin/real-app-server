const buildSearchQuery = (queryParams) => {
    const query = {};
    
    // Full-text search
    if (queryParams.q) {
        query.$text = { $search: queryParams.q };
    }

    // Address filter
    if (queryParams.address) {
        query.bizAddress = new RegExp(queryParams.address, 'i');
    }

    // Phone filter
    if (queryParams.phone) {
        query.bizPhone = queryParams.phone;
    }

    // Date range filter
    if (queryParams.fromDate || queryParams.toDate) {
        query.createdAt = {};
        if (queryParams.fromDate) {
            query.createdAt.$gte = new Date(queryParams.fromDate);
        }
        if (queryParams.toDate) {
            query.createdAt.$lte = new Date(queryParams.toDate);
        }
    }

    return query;
};

const buildSortOptions = (sortParam) => {
    switch (sortParam) {
        case 'name':
            return { bizName: 1 };
        case 'name_desc':
            return { bizName: -1 };
        case 'date':
            return { createdAt: 1 };
        case 'date_desc':
            return { createdAt: -1 };
        case 'relevance':
            return { score: { $meta: "textScore" } };
        default:
            return { createdAt: -1 };
    }
};

module.exports = {
    buildSearchQuery,
    buildSortOptions
};