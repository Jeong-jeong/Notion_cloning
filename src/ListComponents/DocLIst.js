import { ACTIVE_SAVE_KEY, TOGGLE_SAVE_KEY } from '../constants.js'
import { pushUrl } from '../router.js'
import { removeItem, setItem, getItem } from '../storage.js'

export default function DocList({
  $target,
  initialState = [],
  addDoc,
  deleteDoc,
}) {
  const $docList = document.createElement('div')
  const paddingDepth = 20

  $target.appendChild($docList)

  this.state = initialState

  this.setState = async (nextState) => {
    this.state = nextState
    await this.render()

    if (getItem(ACTIVE_SAVE_KEY, false)) {
      const { id } = getItem(ACTIVE_SAVE_KEY)
      const scrollTarget = document.querySelector(`li[data-id='${id}']`)
      scrollTarget.scrollIntoView({
        block: 'center', // TODO: safari, IE 호환성 때문에 옵션말고 true 값도 고려할 것
      })
    }
  }

  this.render = () => {
    // $docList.scrollIntoView(getItem(OFFSET_KEY, 0))
    const recursiveDocuments = (documents, depth = 1) =>
      ($docList.innerHTML = `<ul class = 'doc-list'>
      ${documents
        .map(
          ({ id, title, documents }) =>
            `<li data-id=${id} class='doc-list-item ${
              Number(getItem(ACTIVE_SAVE_KEY, '').id) === id ? 'actived' : ''
            }'
            >
              <div class='doc-list-item-wrapper ${
                getItem(TOGGLE_SAVE_KEY(id), false) ? 'toggled' : ''
              }'
                style='padding-left: ${depth * paddingDepth}px'
              >
                <i class ='drop-down-arrow'></i>${title}
                <div class='button-wrapper'>
                  <button type='button' class='delete-button' title='삭제하기'>-</button>
                  <button type='button' class='add-button' title='추가하기'>+</button>
                </div>
              </div>
              ${
                !getItem(TOGGLE_SAVE_KEY(id), false)
                  ? recursiveDocuments(documents, depth + 1)
                  : ''
              }
            </li>
          `
        )
        .join('')}
        </ul>
        `)
    recursiveDocuments(this.state)
  }

  $docList.addEventListener('click', async (e) => {
    // list의 id 전달
    const { target } = e
    const $li = target.closest('li')
    if ($li) {
      const $liInner = $li.querySelector('.doc-list-item-wrapper')
      const { id } = $li.dataset
      const targetTop = target.getBoundingClientRect().top

      switch (target.className) {
        case 'add-button':
          await addDoc(id)
          break
        case 'delete-button':
          await deleteDoc(id)
          break
        case 'doc-list-item-wrapper ':
        case 'doc-list-item-wrapper toggled':
          await pushUrl(`/documents/${id}`) // 여기서 render 이루어짐

          if ($li.querySelector('ul > li')) {
            // 눌렀을 때 자식이 있다면 li의 id를 스토리지에 키로 저장, toggled 클래스 추가
            setItem(TOGGLE_SAVE_KEY(id), true)
            $liInner.classList.add('toggled')
          } else {
            removeItem(TOGGLE_SAVE_KEY(id))
            $liInner.classList.remove('toggled')
          }
          setItem(ACTIVE_SAVE_KEY, {
            id,
          })
          break
        default:
          break
      }
    }
  })
}
