

function timeFunction (selectDeviceUseDay) {
    const splitDateArray = selectDeviceUseDay.view_date.split("~");
    const trimDateArray = splitDateArray.map(value => {
        return value.trim().split(" ");
    })

    if (trimDateArray?.length > 0) {
        let start_date = trimDateArray[0][0];
        let end_date = trimDateArray[1][0];
        let arrayGetStartTime = trimDateArray[0][1];
        let arrayGetEndTime = trimDateArray[1][1];
        const startTime = arrayGetStartTime.split(":")[0];
        const endTime = arrayGetEndTime.split(":")[0];
        const array = getDatesStartToLast(start_date, end_date)
        return {
            dateList: array,
            startTime: Number(startTime),
            endTime: Number(endTime)
        }
    }

    return false;
}

function getDatesStartToLast(startDate, lastDate) {
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if(!(regex.test(startDate) && regex.test(lastDate))) return "Not Date Format";
    const result = [];
    let curDate = new Date(startDate);
    while(curDate <= new Date(lastDate)) {
        result.push(curDate.toISOString().split("T")[0]);
        curDate.setDate(curDate.getDate() + 1);
    }
    return result;
}
