const makeExpenseDetails = (data) => {
    let foodTotal = 0;
    let travelTotal = 0;
    let marketingAndAdvertismentTotal = 0;
    let miscellaneousTotal = 0;
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        const expense = data[i];
        if (expense.category === 'food') {
            foodTotal += parseInt(expense.amount);
        } else if (expense.category === 'travel') {
            travelTotal += parseInt(expense.amount);
        } else if (expense.category === 'marketingAndAdvertisment') {
            marketingAndAdvertismentTotal += parseInt(expense.amount);
        } else if (expense.category === 'miscellaneous') {
            miscellaneousTotal += parseInt(expense.amount);
        }
        total += parseInt(expense.amount);
    }
    const foodPerc = total === 0?0:(foodTotal / total) * 100;
    const travelPerc = total === 0?0:(travelTotal / total) * 100;
    const marketingAndAdvertismentPerc = total === 0?0:(marketingAndAdvertismentTotal / total) * 100;
    const miscellaneousPerc = total === 0?0:(miscellaneousTotal / total) * 100;
    return [
        {
            name: 'Food',
            value: foodTotal,
            perc: Math.round(foodPerc)
        },
        {
            name: 'Travel',
            value: travelTotal,
            perc: Math.round(travelPerc)
        },
        {
            name: 'Marketing and Advertisment',
            value: marketingAndAdvertismentTotal,
            perc: Math.round(marketingAndAdvertismentPerc)
        },
        {
            name: 'Miscellaneous',
            value: miscellaneousTotal,
            perc: Math.round(miscellaneousPerc)
        }
    ]
}
export default makeExpenseDetails;