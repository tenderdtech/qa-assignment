# Equipment Status Tracker - QA Engineering Assessment

## 🎯 Overview

You are tasked with testing the **Equipment Status Tracker** application. This assessment evaluates your ability to:
- Assess what QA testing is needed
- Execute manual testing with proper documentation
- Write and run automation tests for both frontend and APIs

## 🏗️ Application Details

**Application Name:** Equipment Status Tracker  
**Frontend URL:** https://qa-assignment-omega.vercel.app  
**API Documentation:** https://qa-assignment-omega.vercel.app/docs  
**Technology Stack:** Next.js, TypeScript, Tailwind CSS

### Core Features
1. **Equipment List** - View all equipment with current status
2. **Equipment adding** - Add a new equipment with an initial statuss
3. **Status Updates** - Change equipment status via dropdown
4. **Status History** - View complete history of status changes
5. **Real-time Updates** - Changes reflect immediately

### Equipment Status Types
- **Active** (Green) - Equipment is currently in use
- **Idle** (Yellow) - Equipment is available but not in use
- **Under Maintenance** (Red) - Equipment is being serviced

## 📋 Assessment Tasks

### 1. Manual Testing (40% of assessment)

#### 1.1 Test Planning & Execution
Create a comprehensive test plan covering the application's functionality. Document your testing approach and execute the tests.

**Required Deliverables:**
- **Test Plan** - Brief overview of what you plan to test
- **Test Cases** - List of manual test cases with results
- **Bug Reports** - Any issues found during testing

#### 1.2 Areas to Test
Focus on these key areas:
- **Equipment List Display** - Data loading, status badges, responsive design
- **Equipment adding** - Adding new equipment
- **Status Update Functionality** - Dropdown changes, real-time updates, validation
- **History Feature** - Modal opening, data display, pagination
- **Error Handling** - Network errors, invalid data, edge cases
- **User Experience** - Navigation, loading states, accessibility

### 2. Frontend Automation (30% of assessment)

#### 2.1 Framework Choice
Choose one automation framework:
- **Playwright** (Recommended)
- **Cypress**
- **Selenium WebDriver**

#### 2.2 Automation Requirements
Create automated tests that cover:
- Equipment list loading and display
- Equipment adding
- Status update functionality
- History modal interactions
- Error scenarios
- Cross-browser compatibility (if using Playwright)

#### 2.3 Code Quality Requirements
- Use Page Object Model (POM) design pattern
- Include proper assertions and validations
- Handle dynamic data and timing issues
- Generate test reports
- Include setup/teardown procedures

### 3. API Automation (30% of assessment)

#### 3.1 Tool Choice
Choose one API testing approach:
- **Postman** (with Newman for CI/CD)
- **Supertest** (Node.js)
- **Pytest** (Python)

#### 3.2 API Testing Requirements
Test all available endpoints using the Swagger documentation at https://qa-assignment-omega.vercel.app/docs:

**Required Endpoints:**
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create new equipment
- `POST /api/equipment/{id}/status` - Update equipment status
- `GET /api/equipment/{id}/history` - Get status history

#### 3.3 API Test Coverage
- **Happy Path Testing** - Valid requests and responses
- **Validation Testing** - Invalid data, missing fields, wrong formats
- **Error Scenarios** - 400, 404, 500 status codes
- **Data Integrity** - Verify response schemas and data consistency
- **Performance** - Response time validation

## 📁 Submission Requirements

### Submission Guidelines

#### Manual Testing Deliverables
- **Minimum 15 test cases** with detailed results
- **Test plan** explaining your approach
- **Bug reports** for any issues found (if applicable)
- **Summary** of testing coverage and findings

#### Frontend Automation Deliverables
- **Complete test suite** covering main functionality
- **Setup instructions** for running tests
- **Test execution results** and reports
- **Code documentation** and comments

#### API Automation Deliverables
- **Complete API test suite** for all endpoints
- **Test execution instructions**
- **Performance test results** (response times)
- **Error scenario coverage**

#### Overall Requirements
- **Professional code quality** and structure
- **Clear documentation** and setup instructions
- **Proper error handling** and reporting
- **README** with project overview and execution steps

## 🎯 Evaluation Criteria

### Manual Testing (40%)
- **Test planning** and approach
- **Test case quality** and coverage
- **Bug identification** and reporting
- **Documentation** quality

### Frontend Automation (30%)
- **Code quality** and structure
- **Test coverage** and reliability
- **Framework usage** best practices
- **Error handling** and reporting

### API Automation (30%)
- **API test coverage** completeness
- **Response validation** accuracy
- **Error scenario** testing
- **Performance** considerations

## 🚀 Getting Started

1. **Access the Application:**
   - Frontend: https://qa-assignment-omega.vercel.app
   - API Documentation: https://qa-assignment-omega.vercel.app/docs

2. **Review the Application:**
   - Explore the frontend functionality
   - Study the API documentation
   - Understand the data flow

3. **Plan Your Testing:**
   - Identify key test scenarios
   - Choose your automation tools
   - Set up your testing environment

4. **Execute Testing:**
   - Start with manual testing
   - Build automation scripts
   - Document your findings

## 📞 Support

- **API Documentation:** Use https://qa-assignment-omega.vercel.app/docs for complete API details
- **Application Issues:** Document any problems you encounter
- **Technical Questions:** Include in your submission notes

## 🎉 Good Luck!

Focus on demonstrating your QA skills:
- **Thorough testing approach**
- **Quality automation code**
- **Professional documentation**
- **Attention to detail**

Show us your best testing practices and problem-solving abilities! 