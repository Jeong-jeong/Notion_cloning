import DocListPage from './ListComponents/DocListPage.js'
import DocEditPage from './EditComponents/DocEditPage.js'
import { pushRouter } from './router.js'
import { removeItem, setItem } from './storage.js'
import { ACTIVE_SAVE_KEY } from './constants.js'

export default function App({ $target }) {
  const docListPage = new DocListPage({
    $target,
  })

  const docEditPage = new DocEditPage({
    $target,
  })

  this.route = (routeEdit = true) => {
    const { pathname } = window.location
    if (pathname === '/') {
      docEditPage.inVisible()
      docListPage.setState()
    } else if (pathname.indexOf('/documents/') === 0) {
      console.log('app render')
      const [, , documentId] = pathname.split('/')
      docEditPage.visible()
      docListPage.setState()
      if (routeEdit) {
        console.log('edit render')
        // routeEdit이 false면 render 안함
        docEditPage.setState({
          id: parseInt(documentId),
          title: '',
          content: '',
        })
      }
    } else {
      $target.innerHTML = `요청하신 페이지를 찾을 수 없습니다 🥲`
      docEditPage.inVisible()
    }
  }
  this.route()

  pushRouter((routeList) => this.route(routeList))

  window.onpopstate = (e) => {
    // 뒤로가기 라우팅
    const { pathname } = window.location
    const [, , documentId] = pathname.split('/')
    if (documentId !== undefined) {
      setItem(ACTIVE_SAVE_KEY, {
        id: documentId,
      })
    } else {
      removeItem(ACTIVE_SAVE_KEY)
    }
    this.route()
  }
}
