export default class RecruitmentService {
  constructor({ recruitmentDao }) {
    this.recruitmentDao = recruitmentDao;
  }

  getRecruitments = async (filteringOptions) => {
    return await this.recruitmentDao.getRecruitments(filteringOptions);
  }
}