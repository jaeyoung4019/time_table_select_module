날짜형식으로 원하는 기간 만큼 0 ~ 23 시 까지 테이블로 나타내는 function 입니다.

## before Refactoring 
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


## After Refactoring 

- 고려해야할 상황으로 기능에 대한 분리가 1차적으로 이루어져야한다고 생각합니다. 기능의 분리와 조건문 처리를 변경하는 작업을 진행하면

  ```js
    function timeFunction (selectDeviceUseDay) {
        // 1. Range Date 가 들어왔을 때 동일한 형식으로 start_date , end_date 로 return 하도록 하는 펑션이 필요합니다.
        // 여기부터
        const splitDateArray = selectDeviceUseDay.view_date.split("~");
        const trimDateArray = splitDateArray.map(value => {
            return value.trim().split(" ");
        })
    
        if (trimDateArray?.length > 0) { // 2. 조건문이 여기 존재함으로 템플릿 패턴을 사용하거나 조건문 방식을 변경해야합니다.
            let start_date = trimDateArray[0][0];
            let end_date = trimDateArray[1][0];
            let arrayGetStartTime = trimDateArray[0][1];
            let arrayGetEndTime = trimDateArray[1][1];
            const startTime = arrayGetStartTime.split(":")[0];
            const endTime = arrayGetEndTime.split(":")[0];
        // 여기까지
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

  이렇게 정리가 됩니다. 우선 적으로 기능 분리를 하고 나면
  ```js

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


  ```
  이렇게 보기 좋은 코드가 되고 기능따라 분리되어 모듈처럼 활용할 수 있습니다. 
