let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  console.log('development')
  //如果当前环境为开发环境
  BASE_URL = '/backend/'
} else if (process.env.NODE_ENV === 'production') {
  console.log('production')
  //如果当前环境为生产环境
  BASE_URL = '/backend/'
} else {
  //如果都不是两者
  BASE_URL = 'https://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }
