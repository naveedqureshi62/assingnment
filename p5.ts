interface Person {
    name: string;
    age: number;
}

interface Worker {
    jobTitle: string;
    company: string;
    id:string;
}

function combine(person: Person, worker: Worker) {
    
    console.log(`Name: ${person.name}`);
    console.log(`Age: ${person.age}`);
    console.log(`Job Title: ${worker.jobTitle}`);
    console.log(`Company: ${worker.company}`);
    console.log(`id: ${worker.id}`);
}

const s: Person = { name: 'John', age: 30 };
const w: any = { jobTitle: 'Software Developer', company: 'synectiks',id:123};

combine(s, w);