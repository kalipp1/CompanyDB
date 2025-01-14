const Employees = require('../employees.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employees', () => {

    before(async () => {

        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
          const testEmpOne = new Employees({ firstName: 'John', lastName: 'Doe', department: '677ae38082799cf3094112ad' });
          await testEmpOne.save();
      
          const testEmpTwo = new Employees({ firstName: 'Amanda', lastName: 'Johnson', department: '677ae38082799cf3094112ad' });
          await testEmpTwo.save();
        });
      
        it('should return all the data with "find" method', async () => {
            const employees = await Employees.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
          });

        it('should return a proper document by various params with findOne method', async () => {
            const employee = await Employees.findOne({ firstName: 'Amanda' });
            const expectedOutput = 'Amanda';
            expect(employee.firstName).to.be.equal(expectedOutput);
            const employee2 = await Employees.findOne({ lastName: 'Doe' });
            const expectedOutput2 = 'Doe';
            expect(employee2.lastName).to.be.equal(expectedOutput2);
          });

        after(async () => {
            await Employees.deleteMany();
          });
      
      });

      describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employees({ firstName: 'John', lastName: 'Doe', department: '677ae38082799cf3094112ad' });
            await employee.save();
            expect(employee.isNew).to.be.false;
          });

        after(async () => {
            await Employees.deleteMany();
          });
      
      });

      describe('Updating data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employees({ firstName: 'John', lastName: 'Doe', department: '677ae38082799cf3094112ad' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employees({ firstName: 'Amanda', lastName: 'Johnson', department: '677ae38082799cf3094112ad' });
            await testEmpTwo.save();
          });

        afterEach(async () => {
            await Employees.deleteMany();
          });

        it('should properly update one document with "updateOne" method', async () => {
            await Employees.updateOne({ firstName: 'Amanda' }, { $set: { lastName: 'Dawnson' }});
            const updatedEmp = await Employees.findOne({ lastName: 'Dawnson' });
            expect(updatedEmp).to.not.be.null;
          });
      
        it('should properly update one document with "save" method', async () => {
            const employee = await Employees.findOne({ firstName: 'John' });
            employee.firstName = 'Johnny';
            await employee.save();
          
            const updatedEmp = await Employees.findOne({ firstName: 'Johnny' });
            expect(updatedEmp).to.not.be.null;
          });
      
        it('should properly update multiple documents with "updateMany" method', async () => {
            await Employees.updateMany({}, { $set: { department: '677ae38882799cf3094112ae' }});
            const employees = await Employees.find();
            expect(employees.length).to.be.equal(2);
        });
      
      });

      describe('Removing data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employees({ firstName: 'John', lastName: 'Doe', department: '677ae38082799cf3094112ad' });
            await testEmpOne.save();
        
            const testEmpTwo = new Employees({ firstName: 'Amanda', lastName: 'Johnson', department: '677ae38082799cf3094112ad' });
            await testEmpTwo.save();
          });
          
          afterEach(async () => {
            await Employees.deleteMany();
          });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employees.deleteOne({ firstName: 'John' });
            const deletedEmp = await Employees.findOne({ firstName: 'John' });
            expect(deletedEmp).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employees.deleteMany();
            const deletedEmployees = await Employees.find();
            expect(deletedEmployees.length).to.be.equal(0);
        });
      
      });

    after(() => {
        mongoose.models = {};
      });
});