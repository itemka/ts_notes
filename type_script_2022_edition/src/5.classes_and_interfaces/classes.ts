/*
* [ constructor functions & "this" keyword ]
*/
class Department {
  name: string;

  constructor(name: string) {
    this.name = name
  }

  // describe() {
  describe(this: Department) {
    console.log(`${this.constructor.name}. Name: ` + this.name)
  }
}

const dep1 = new Department('Department 1')
dep1.describe()

const dep2 = { describe: dep1.describe }
// dep2.describe()

/*
* [ "private" and "public" access modifiers ]
*/
class DepartmentWithAccessModifiers extends Department {
  // employees: string[] = [];
  private employees: string[] = [];

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployee() {
    console.log(`${this.constructor.name}. Employees (${this.employees.length}): `, this.employees)
  }
}

const dep3 = new DepartmentWithAccessModifiers('Department 2')
dep3.addEmployee('Employee1')
dep3.addEmployee('Employee2')
// dep3.employees[5] = 'New Employee';
dep3.addEmployee('Employee3')
dep3.printEmployee()

/*
* [ shorthand initialization ]
*/
class DepartmentWithShorthandInitialization {
  // private id: string;
  // totalCount: number;
  //
  // constructor(id: string, totalCount: number) {
  //   this.id = id;
  //   this.totalCount = totalCount
  // }
  constructor(private id: string, public totalCount: number) {}

  print() {
    console.log(`${this.constructor.name}. Department "${this.id}" has quantity: ${this.totalCount}`)
  }
}

const dep4 = new DepartmentWithShorthandInitialization('4', 123456789)
// dep4.id
dep4.print()

/*
* [ "readonly" properties ]
*/
class DepartmentWithReadonly {
  constructor(private readonly id: string, public totalCount: number) {}

  print() {
    // this.id = 'sdf';
    console.log(`${this.constructor.name}. Department "${this.id}" has quantity: ${this.totalCount}`)
  }
}

/*
* [ inheritance ]
*/
class ITDepartment extends DepartmentWithReadonly {
  constructor(id: string, public admins: string[]) {
    super(id, 321)
  }
}

// const itDep = new ITDepartment('5', 321)
const itDep = new ITDepartment('5', ['Admin1', 'Admin2'])
itDep.print()
console.log({ itDep })

/*
* [ overriding properties & "protected" modifier ]
*/
class DepartmentSample extends Department {
  // private employees: string[] = [];
  protected employees: string[] = [];

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployee() {
    console.log(`${this.constructor.name}. Employees (${this.employees.length}): `, this.employees)
  }
}

class AccountingDepartment extends DepartmentSample {
  constructor(name: string, protected reports: string[] = []) {
    super(name);
  }

  addReport(report: string) {
    this.reports.push(report)
  }

  addEmployee(employeeName: string) {
    if (employeeName === 'James') {
      return
    }

    this.employees.push(employeeName)
    // super.addEmployee(employeeName)
  }

  printReports() {
    console.log(`${this.constructor.name}. Reports (${this.reports.length}): `, this.reports)
  }
}

const accounting = new AccountingDepartment('Artsem')
accounting.addReport('report1')
accounting.addReport('report2')
accounting.printReports()
accounting.addEmployee('Jack')
accounting.addEmployee('James')
accounting.addEmployee('Henry')
accounting.printEmployee()

/*
* [ getters & setters ]
*/
class AccountingDepartmentWithGetSet extends AccountingDepartment {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }

    throw new Error('No report found')
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('mostRecentReport is not valid')
    }

    this.addReport(value)
  }

  constructor(name: string) {
    super(name);
    this.lastReport = this.reports[0]
  }

  addReport(report: string) {
    super.addReport(report);
    this.lastReport = report
  }

  printMostRecentReport() {
    console.log(`${this.constructor.name}. mostRecentReport: ${this.mostRecentReport}`)
  }
}

const accountingGetSet = new AccountingDepartmentWithGetSet('Artsem')
// console.log(accountingGetSet.mostRecentReport)
accountingGetSet.addReport('report1')
// accountingGetSet.addReport('report2')
console.log(accountingGetSet.mostRecentReport)
accountingGetSet.printReports()

accountingGetSet.printMostRecentReport()
accountingGetSet.mostRecentReport = 'report3'
// accountingGetSet.mostRecentReport = ''
accountingGetSet.printMostRecentReport()
accountingGetSet.printReports()

/*
* [ static methods & properties ]
*/
class DepartmentSampleWithStatic extends DepartmentSample {
  static staticValue = 2022

  constructor(name: string) {
    super(name);
  }

  static createEmployee(name: string) {
    return { name }
  }
}
const { createEmployee, staticValue } = DepartmentSampleWithStatic;
const employee1 = createEmployee('employee1')
const departmentSampleWithStatic = new DepartmentSampleWithStatic('Static department')

departmentSampleWithStatic.addEmployee(employee1.name)
departmentSampleWithStatic.printEmployee()
departmentSampleWithStatic.describe()
console.log('DepartmentSampleWithStatic.staticValue: ' + staticValue)

/*
* [ abstract classes ]
*/
abstract class AbstractDepartment {
  protected abstract employees: string[];

  abstract addEmployee(employee: string): void;

  // abstract describe(this: Department) {}
  abstract describe(this: Department): void
}

class NewITDepartment extends AbstractDepartment {
  // private employees: string[] = []
  protected employees: string[] = []

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  describe() {
    console.log(`${this.constructor.name}. employees: ${this.employees}`)
  }
}

/*
* [ singletons & private constructors ]
* singletons - when you have only one instance of a certain
* A singleton class is configured such that you don't create it with "new"
* but by calling a method which then ensures that only one instance of the class exists at any given time.
*/
class DepartmentWithPrivateConstructor extends DepartmentSample {
  private static instance: DepartmentWithPrivateConstructor

  private constructor(name: string, protected reports: string[] = []) {
    super(name);
  }

  static getInstance(name: string, reports: string[]) {
    if (DepartmentWithPrivateConstructor.instance) {
      return this.instance
    }

    this.instance = new DepartmentWithPrivateConstructor(name, reports)

    return this.instance
  }
}

// const departmentWithPrivateConstructor = new DepartmentWithPrivateConstructor('Test', [])
const departmentWithPrivateConstructor = DepartmentWithPrivateConstructor.getInstance('1', ['1'])
const departmentWithPrivateConstructor2 = DepartmentWithPrivateConstructor.getInstance('2', ['2'])
console.log('singletons', {
  instance1: departmentWithPrivateConstructor,
  instance2: departmentWithPrivateConstructor2,
})


