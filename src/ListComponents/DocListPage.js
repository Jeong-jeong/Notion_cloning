import DocList from './DocLIst.js'
import AddRootDocButton from './AddRootDocButton.js'
import { request } from '../api.js'
import { isArrayValid } from '../isValid.js'
import { pushUrl } from '../router.js'

export default function DocListPage({ $target, initialState = [] }) {
  const $doclistPage = document.createElement('div')
  $doclistPage.className = 'doc-list-page'

  this.state = initialState

  this.setState = async () => {
    const nextState = await fetchDocs()
    this.state = nextState

    isArrayValid(this.state) && docList.setState(this.state)
    // fetch가 실행되면 바로 docList에게 전달
    $target.insertBefore($doclistPage, $target.firstChild)
  }

  const docList = new DocList({
    $target: $doclistPage,
    initialState: [],
    addDoc: async (id) => {
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '제목 없음',
          parent: id,
        }),
      })
      this.setState()
    },
    deleteDoc: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      })
      this.setState()
      pushUrl('/')
    },
  })

  new AddRootDocButton({
    $target: $doclistPage,
    onClick: async () => {
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '제목 없음',
          parent: null,
        }),
      })
      this.setState()
    },
  })

  const fetchDocs = async () => {
    return await request('/documents')
  }
}
