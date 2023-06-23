
function timeFunction (selectDeviceUseDay) {
    const result = transDateFunction(selectDeviceUseDay.view_date);

    if (!result){
        throw new Error("알맞지 않은 데이트 형식 입니다.")
    }
    const array = getDatesStartToLast(result.start_date, result.end_date)
    return {
        dateList: array,
        startTime: Number(result.startTime),
        endTime: Number(result.endTime)
    }
}

function transDateFunction(targetTransDate) {
    const splitDateArray = targetTransDate.split("~");
    const trimDateArray = splitDateArray.map(value => {
        return value.trim().split(" ");
    })

    if (trimDateArray?.length > 1){
        const start_date = trimDateArray[0][0];
        const end_date = trimDateArray[1][0];
        const arrayGetStartTime = trimDateArray[0][1];
        const arrayGetEndTime = trimDateArray[1][1];
        const startTime = arrayGetStartTime.split(":")[0];
        const endTime = arrayGetEndTime.split(":")[0];
        return {
            start_date: start_date,
            end_date: end_date,
            startTime: Number(startTime),
            endTime: Number(endTime)
        }
    }
    return  false;
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
