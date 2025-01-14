const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

    it('should throw an error if no "name" arg', async () => {
        const dep = new Department({});
    
      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    
    });

    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
      });

    it('should throw an error if "name" arg is less than 5 letters', async () => {
        const cases = [{}, ['dep', 'afsa', 'depa', '123', 'kasd']];
        for(let name of cases) {
            const dep = new Department({ name });

            dep.validateSync(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should throw an error if "name" arg is more than 20 letters', async () => {
        const cases = [{}, ['depadsadasadasdasda', 'afsaasdasdasdasdasda', 'depadsadasdasdasdasdasdas', 'asdasdasdasdasdasdas']];
        for(let name of cases) {
            const dep = new Department({ name });

            dep.validateSync(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should not throw an error if "name" arg is correct', async () => {
        const name = 'PR Department'
        const dep = new Department({name});
    
      dep.validateSync(err => {
        expect(err).to.not.exist;
      });
    
    });

    after(() => {
        mongoose.models = {};
      });
  
  });