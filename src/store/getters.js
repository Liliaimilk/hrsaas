const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  name: state => state.user.userInfo.username,
  avatar: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  points: state => state.user.userInfo.roles.points,
  routes: state => state.permission.routes
}
export default getters
