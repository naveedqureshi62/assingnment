function combine(person, worker) {
    console.log("Name: ".concat(person.name));
    console.log("Age: ".concat(person.age));
    console.log("Job Title: ".concat(worker.jobTitle));
    console.log("Company: ".concat(worker.company));
    console.log("id: ".concat(worker.id));
}
var s = { name: 'John', age: 30 };
var w = { jobTitle: 'Software Developer', company: 'synectiks', id: 123 };
combine(s, w);
