import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 点击元素外边，隐藏元素
 * @param {*} elementRef 
 * @returns 
 */
const useClickOutSide = (elementRef) => {
  const isClickOutSide = ref(false)
  const handler = (e) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target)) {
        isClickOutSide.value = false
      } else {
        isClickOutSide.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutSide
}

export default useClickOutSide