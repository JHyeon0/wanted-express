import { UserDao, RecruitmentDao } from '../models';

import UserService from './UserService'
import RecruitmentService from './RecruitmentService'

class Service {
  constructor(db) {
    const userDao = new UserDao(db);
    const recruitmentDao = new RecruitmentDao(db);

    this.userService = new UserService({ userDao });
    this.recruitmentService = new RecruitmentService({ recruitmentDao });
  }
}

export default Service;