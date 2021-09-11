import { Router } from 'express'

export default class RecruitmentController {
  #service

  constructor({ service, middlewares }){
    this.path = '/recruitment'
    this.#service = service;
  }

  get router() {
    const router = Router();
    router.get('/', this.#getRecruitments)
    return router
  }

  #getRecruitments = async (req, res) => {
    try {
      const recruitments = await this.#service.recruitmentService.getRecruitments(req.query)
      res.status(201).json({ data: recruitments })
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || "INTERNAL SERVER ERROR" });
    }
  }
}