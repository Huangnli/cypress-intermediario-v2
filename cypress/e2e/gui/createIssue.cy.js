import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('CreateIssue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createProject(issue.project)
    })

    it('sucessfully', () => {
        cy.gui_createIssue(issue)

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${issue.project.name}/issues/1`)
        cy.get('.issue-details')
            .should('contain', issue.title)
            .and('contain', issue.description)  
    })
})