const Employees = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employees', () => {

    it('should throw an error if no "firstName" arg or no "lastName" arg or no "department" arg', async () => {
        const cases = [
            {}, 
            {firstName: 'John'},
            {lastName: 'Doe'},
            {department: new mongoose.Types.ObjectId()},
            {firstName: 'John', lastName: 'Doe'}
        ];
        for(let employee of cases) {
          const emp = new Employees({ employee });
      
          emp.validateSync(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        });
      
        }
    
    });

    it('should throw an error if "firstName" or "lastName" is not a string', () => {

        const cases = [{}, []];
        for(let employee of cases) {
          const emp = new Employees({ employee });
      
          emp.validateSync(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
          });
      
        }
      
      });

    it('should not throw an error if "firstName" arg and "lastName" arg and "department" arg is correct', async () => {
        const employee = { firstName: 'John', lastName: 'Doe', department: '677ae38082799cf3094112ad' }
        const emp = new Employees({employee});
    
      emp.validateSync(err => {
        expect(err).to.not.exist;
      });
    
    });

    after(() => {
        mongoose.models = {};
      });
  
  });