/**
 * 更改图片尺寸
 * @param {string} imgUrl 图片地址
 * @param {number} size 更改后的大小
 */
export function getSizeImage(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`
}

/**
 * 数量格式化
 * @param {number} count 需要格式化的数据
 */
export function getCount(count) {
  if (count < 0) return count
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor(count / 10000000) / 10 + '亿'
  }
}
