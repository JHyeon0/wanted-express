import { Prisma } from '@prisma/client'

export default class RecruitmentDao {
  constructor(database) {
    this.db = database;
  }

  getRecruitments = async(filteringOptions = {}) => {
    const { company, 
            category, 
            subcategory, 
            requiredCareerPeriod = 0,
            orderOption, 
            tags
          } = filteringOptions;

    return await this.db.queryRaw`
      SELECT
        re.id,
        re.name,
        companies.name AS company,
        categories.name AS category,
        subcategories.name AS subcategory,
        re.required_career_period AS requiredCareerPeriod,
        regions.name AS region,
        countries.name AS country,
        re.hire_compensation AS hireCompensation,
        Count(*) AS totalLikes
      FROM
        recruitments re
        JOIN companies ON companies.id=re.company_id
        JOIN companies_tags ct ON companies.id=ct.company_id
        JOIN tags ON tags.id=ct.tag_id
        JOIN subcategories ON subcategories.id=re.subcategory_id
        JOIN categories ON categories.id=subcategories.category_id
        JOIN regions ON regions.id=re.region_id
        JOIN countries ON countries.id=regions.country_id
        JOIN users_likes_recruitments usr ON usr.recruitment_id=re.id
      WHERE
        ${company ? Prisma.sql`companies.name=${company} AND` : Prisma.empty}
        ${category ? Prisma.sql`categories.name=${category} AND` : Prisma.empty}
        ${subcategory ? Prisma.sql`subcategories.name=${subcategory} AND` : Prisma.empty}
        ${requiredCareerPeriod ? Prisma.sql`re.required_career_period >= ${requiredCareerPeriod} AND` : Prisma.empty}
        1=1
      GROUP BY
        re.id
      ORDER BY
        COUNT(*)
      LIMIT
        12
    `;
  };
}