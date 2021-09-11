import UserController from './UserController'
import RecruitmentController from './RecruitmentController'

const getControllers = ({ service, middlewares }) => {
  return [
    new UserController({ service }),
    new RecruitmentController({ service })
  ]
}

export {
  getControllers
}