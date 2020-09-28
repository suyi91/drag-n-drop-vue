import { defineComponent, ref } from 'vue'
import $style from './style.module.css'

export default defineComponent({
  name: 'App',
  setup: () => {
    const index = ref(0);
    const list = ref(Array.from({ length: 5 }));
    const isInDrag = ref(false);

    const getDragListeners = itemIndex => {
      const onDragOver = e => {
        e.preventDefault()
      }
      const onDragEnter = e => {
        e.preventDefault()
      }
      const onDragLeave = () => {
      }
      const onDrop = e => {
        e.preventDefault()
        index.value = itemIndex;
      }

      return {
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDrop
      }
    }
    return () => (
      <div>
        <h1>drag and drop</h1>
        <div>
          {
            list.value.map((_, idx) => (
              <div
                class={[$style.box, isInDrag.value && index.value !== idx && $style.boxToDropIn]}
                {...getDragListeners(idx)}
              >
                {idx === index.value && (<div class={[$style.boxFill, isInDrag.value && $style.imgHidden]} draggable={true} onDragStart={() => {
                  setTimeout(() => isInDrag.value = true, 0)
                }} onDragEnd={() => isInDrag.value = false} />)}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
})
