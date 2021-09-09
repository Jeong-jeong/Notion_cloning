import { request } from '../api.js'
import Editor from './Editor.js'
import { getItem, removeItem, setItem } from '../storage.js'
import { isObjectValid } from '../isValid.js'
import { pushUrl } from '../router.js'

export default function DocEditPage({
  $target,
  initialState = {
    id: '',
    title: '',
    content: '',
  },
}) {
  const $docEditPage = document.createElement('div')
  $docEditPage.className = 'doc-edit-page'

  this.state = initialState

  let tempDocSaveKey = `temp-document-${this.state.id}`
  let getStorageValue = getItem(tempDocSaveKey, {
    id: '',
    title: '',
    content: '',
    saveDate: '',
  })

  let timerId
  const editor = new Editor({
    $target: $docEditPage,
    initialState: this.state,
    onEditing: (nextDoc) => {
      if (timerId) clearTimeout(timerId)
      // list 껄떡임 방지
      timerId = setTimeout(async () => {
        setItem(tempDocSaveKey, {
          ...nextDoc,
          saveDate: new Date(),
        })
        await fetchDoc()
      }, 0)
    },
  })

  this.setState = async (nextState) => {
    if (isObjectValid(nextState)) {
      if (this.state.id !== nextState.id) {
        tempDocSaveKey = `temp-document-${nextState.id}`
        this.state = nextState
        await fetchDoc() // render하면 바로 fetch 실행
        return // id가 다를 경우만 fetch 부르고 setState 또 실행 안함
      }
      // li 클릭 시 nextState가 초기화 되기 때문에 값이 있을 때만 바꿔줌
      // if (nextState.title || nextState.content) {
      this.state = nextState
      // }
      editor.setState({
        id: this.state.id,
        title: this.state.title,
        content: this.state.content,
      })
    }

    this.render()
  }

  this.render = () => {
    $target.appendChild($docEditPage)
  }

  this.inVisible = () => {
    $docEditPage.classList.add('hidden')
  }

  this.visible = () => {
    $docEditPage.classList.remove('hidden')
  }

  const fetchDoc = async () => {
    const { id } = this.state
    if (id) {
      const nextDoc = await request(`/documents/${id}`) // 특정 문서 불러오기

      getStorageValue = getItem(tempDocSaveKey, {
        // 스토리지 값 불러오기
        id: '',
        title: '',
        content: '',
        saveDate: '',
      })

      console.log(getStorageValue, nextDoc)

      if (
        getStorageValue.saveDate &&
        getStorageValue.saveDate > nextDoc.updatedAt
        // 스토리지가 더 최신일 경우
      ) {
        await request(`/documents/${id}`, {
          // 문서 수정
          method: 'PUT',
          body: JSON.stringify({
            title: getStorageValue.title,
            content: getStorageValue.content,
          }),
        })
        removeItem(tempDocSaveKey) // 스토리지 삭제
        pushUrl(`/documents/${id}`, false) // false면 edit 렌더 안함
        return
      }

      this.setState(nextDoc) // nextDoc이 더 최신일 경우
    }
  }
}
