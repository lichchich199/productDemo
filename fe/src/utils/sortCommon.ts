interface SortField {
    field: string;
    orderBy: string;
    status: boolean;
}

export const sortCommon = function (data: any[], sort: SortField[]) {
    var dataSorted = [...data];
    console.log('sort tại sort common:', sort)
    dataSorted.sort((a, b) => {
        for (const sortField of sort) {
            const { field, orderBy } = sortField;
            let valueA = a[field];
            let valueB = b[field];
            if (field === 'createdAt') {
                const dateA = new Date(a[field]);
                const dateB = new Date(b[field]);
                valueA = dateA.getTime();
                valueB = dateB.getTime();

            }
            if(sortField.status) {
                // compare
                if (valueA < valueB) {
                    return orderBy === 'ASC' ? -1 : 1;
                } else if (valueA > valueB) {
                    return orderBy === 'ASC' ? 1 : -1;
                }
            }

        }
        return 0;
    });
    return dataSorted;
};
