const buildSearchFilter = (baseFilter = {}, searchTerm) => {
    if (!searchTerm) return baseFilter;

    return {
        ...baseFilter,
        $or: [
            { bizName: new RegExp(searchTerm, 'i') },
            { bizDescription: new RegExp(searchTerm, 'i') },
            { bizAddress: new RegExp(searchTerm, 'i') }
        ]
    };
};

module.exports = {
    buildSearchFilter
};