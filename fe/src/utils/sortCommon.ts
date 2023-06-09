interface SortField {
    field: string;
    orderBy: string;
}

export const sortCommon = function (data: any[], sort: SortField[]) {
    var dataSorted = [...data];

    dataSorted.sort((a, b) => {
        for (const sortField of sort) {
            const { field, orderBy } = sortField;
            var valueA = a[field];
            var valueB = b[field];
            if (field === 'createdAt') {
                var dateA = new Date(a[field]);
                var dateB = new Date(b[field]);
                valueA = dateA.getTime();
                valueB = dateB.getTime();
            }

            // compare
            if (valueA < valueB) {
                return orderBy === 'ASC' ? -1 : 1;
            } else if (valueA > valueB) {
                return orderBy === 'ASC' ? 1 : -1;
            }
        }
        return 0;
    });
    return dataSorted;
};
