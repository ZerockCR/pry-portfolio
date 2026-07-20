import { type Ref, onMounted, onUnmounted } from 'vue'

export function useReveal(
  elements: Ref<HTMLElement[]>,
  options: IntersectionObserverInit = { threshold: 0.15 },
) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    }, options)

    elements.value.forEach((el) => observer?.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
