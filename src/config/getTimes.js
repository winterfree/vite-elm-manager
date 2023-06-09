import { dayjs } from 'element-plus'

let dateTimes = [{
  id: 1,
  name: '本周',
  start_time: dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
  end_time: dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD'),
},
{
  id: 2,
  name: '上周',
  start_time: dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD'),
  end_time: dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD'),
},
{
  id: 3,
  name: '本月',
  start_time: dayjs().startOf('month').format('YYYY-MM-DD'),
  end_time: dayjs().endOf('month').format('YYYY-MM-DD'),
},
{
  id: 4,
  name: '上月',
  start_time: dayjs().add(-1, 'month').startOf('month').format('YYYY-MM-DD'),
  end_time: dayjs().add(-1, 'month').endOf('month').format('YYYY-MM-DD'),
},
]

let curMonth = dayjs().month() + 1
if (curMonth < 3) {
  dateTimes.push({
    id: 5,
    name: '本季度',
    start_time: dayjs().month(0).format('YYYY-MM-DD'),
    end_time: dayjs().month(2).endOf('month').format('YYYY-MM-DD'),
  }, {
    id: 6,
    name: '上季度',
    start_time: dayjs().add(-1, 'year').month(9).format('YYYY-MM-DD'),
    end_time: dayjs().add(-1, 'year').month(11).endOf('month').format('YYYY-MM-DD'),
  }, )
  } else if (curMonth < 6) {
  dateTimes.push({
    id: 5,
    name: '本季度',
    start_time: dayjs().month(3).format('YYYY-MM-DD'),
    end_time: dayjs().month(5).endOf('month').format('YYYY-MM-DD'),
  }, {
    id: 6,
    name: '上季度',
    start_time: dayjs().month(0).format('YYYY-MM-DD'),
    end_time: dayjs().month(2).endOf('month').format('YYYY-MM-DD'),
  }, )
  } else if (curMonth < 9) {
  dateTimes.push({
    id: 5,
    name: '本季度',
    start_time: dayjs().month(6).format('YYYY-MM-DD'),
    end_time: dayjs().month(8).endOf('month').format('YYYY-MM-DD'),
  }, {
    id: 6,
    name: '上季度',
    start_time: dayjs().month(3).format('YYYY-MM-DD'),
    end_time: dayjs().month(5).endOf('month').format('YYYY-MM-DD'),
  }, )
  } else if (curMonth < 12) {
  dateTimes.push({
    id: 5,
    name: '本季度',
    start_time: dayjs().month(9).format('YYYY-MM-DD'),
    end_time: dayjs().month(11).endOf('month').format('YYYY-MM-DD'),
  }, {
    id: 6,
    name: '上季度',
    start_time: dayjs().month(6).format('YYYY-MM-DD'),
    end_time: dayjs().month(8).endOf('month').format('YYYY-MM-DD'),
  }, )
}