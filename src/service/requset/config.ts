let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  //如果当前环境为开发环境
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'production') {
  //如果当前环境为生产环境
  BASE_URL = 'http://152.136.185.210:5000'
} else {
  //如果都不是两者
  BASE_URL = 'http://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }
