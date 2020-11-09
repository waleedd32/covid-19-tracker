export const sortData = (data) => {
    const sortedData = [...data]
    //sort the array in descending order
    sortedData.sort((a, b) => {
        return b.cases - a.cases
    }
    );
    return sortedData;
}
