import { useSelector } from "react-redux"
import Admin from './components/Admin'
import Editor from './components/Editor'

export default () => {
  const identity = {
    admin: Admin,
    editor: Editor,
  }
  let role;
  const { userinfo } = useSelector(state => state.user)
  if (userinfo.roles) {
    role = userinfo.roles[0]
  }

  const Role = role ? identity[role] : () => (null)
  return (
    <div>
      <Role />
    </div>
  )
}