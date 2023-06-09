# Image-Processing-API
Image Processing API project for Udacity.

## Instructions
1. Use `npm run lint` to run linter.
2. Use `npm run build` to build code.
3. Use `npm run test` to run tests.
4. Use `node .\dist\` to start the server.
5. Connect to the server at http://localhost:3000/api/images?filename=test.jpg&height=200&width=200 to view a resized image.
6. Refresh the page to observe caching behavior.
7. Connect to the server at http://localhost:3000/api/images?filename=dne.jpg&height=200&width=200 to view the error returned when an image does not exist.
8. Connect to the server at http://localhost:3000/api/images?filename=invalid.jpg&height=200&width=200 to view the error returned when an image fails to process.

## Rubric
### Setup and Architecture
#### Set up a project structure that promotes scalability ✅
* Source code is kept separate from compiled code. ✅
* All tests should be contained in their own folder. ✅
* Separate modules are created for any processing. ✅
#### Set up an npm project ✅
* Package.json should contain both devDependencies, and dependencies. ✅
* Scripts should be created for testing, linting/prettier, starting the server, and compiling TS. ✅
* Build script should run without error. ✅

### Functionality
#### Add and use Express to a node.js project ✅
* Start script should run without error ✅
* Provided endpoint should open in the browser with status 200 ✅

#### Folow middleware documentation to use middleware to create an API ✅
* Accessing the provided URL with image information should successfully resize an image and save it to disk on first access, then pull from disk on subsequent access attempts. ✅
* An error message should be provided to the user when an image has failed to process or does not exist. ✅

### Code Quality
#### Write relevant unit tests with Jasmine and SuperTest to improve code quality and refactoring ✅
* Test script runs and all tests created pass. ✅
* There is at least 1 test per endpoint and at least one test for image processing. ✅

#### Utilize TypeScript to avoid errors and improve maintainability ✅
* All code in the SRC folder should use the .ts filetype. ✅
* Functions should include typed parameters and return types and not use the any type. ✅
* Import and Export used for modules. ✅
* Build script should successfully compile TS to JS. ✅

#### Write well-formatted linted code ✅
* Prettier and Lint scripts should run without producing any error messages. ✅
