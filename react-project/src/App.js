import "@/styles/index.less"
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import Permission from "./permission"
import store from '@/store'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Permission />
      </Provider>
    </HashRouter >
  );
}

export default App;
// routes.map(ele => {
//   if (ele.children) {
//     return (
//       ele.children.map(ele2 => {
//         return (
//           <Route key={ele.id} path={ele2.path} element={ele2.element} />
//         )
//       })
//     )
//   } else {
//     return (
//       <Route key={ele.id} path={ele.path} element={ele.element} />
//     )
//   }
// })
