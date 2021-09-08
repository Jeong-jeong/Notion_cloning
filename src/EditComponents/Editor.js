import { setCaret } from './positionCaret.js'

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div')
  let isInitialize = false // 렌더링을 한번만

  $editor.className = 'editor-wrap'
  $target.appendChild($editor) // 가장 하위 요소는 바로 render 해줌

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState

    $editor.querySelector('[name=title]').value =
      this.state.title === '제목 없음' ? '' : this.state.title
    // 리스트에서 새 문서를 추가할 땐 제목 없음으로 들어가지만 편집기 제목에는 빈 값으로 넣어주기
    $editor.querySelector('[name=content]').innerHTML = this.state.content
  }

  this.render = () => {
    if (!isInitialize) {
      // 렌더링 초기화
      $editor.innerHTML = `<input class='edit-input'
      name='title' 
      type='text' 
      value='${this.state.title}' 
      placeholder='제목 없음'/>
      <div class='textarea' name='content' contentEditable='true'>${this.state.content}</div>`
      isInitialize = true
      console.log('editor initialize')
    }
  }

  this.render()

  let timerId
  $editor.addEventListener('keyup', (e) => {
    const $textarea = $editor.querySelector('[name=content]')
    const $input = $editor.querySelector('[name=title]')
    console.log($input.value)
    // const selection = window.getSelection().getRangeAt(0)
    // selection.collapse(e.target, 1)

    const nextState = {
      ...this.state,
      title: $input.value, // target으로 할 경우 focus가 사라지면 undefined이 들어감
      content: $textarea.innerHTML,
    }

    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(async () => {
      this.state = nextState
      await onEditing(nextState)
      // await setCaret($target)
    }, 1000)
    // }
  })
}
