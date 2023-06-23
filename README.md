날짜형식으로 원하는 기간 만큼 0 ~ 23 시 까지 테이블로 나타내는 function 입니다.

## before refactoring 
```js
  function timeFunction (selectDeviceUseDay) {
      console.log(selectDeviceUseDay)
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
```

표시할 date 가 이런 형식으로 들어올 때
![image](https://github.com/jaeyoung4019/time_table_select_module/assets/135151752/c3036814-d22e-4afc-a15d-f177a050e595)

처리하기 위한 function 입니다 


```js
  const array = getDatesStartToLast(start_date, end_date)
```

의 getDatesStartToLast 는 시작 일 ~ 종료 일 까지의 기간을 산정하는 function 입니다.

```js
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
```

