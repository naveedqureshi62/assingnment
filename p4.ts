
interface Person {
    name: string;
    age: number;
  }
  
  interface worker {
    jobtitle: string;
    salary: number;
    id:number;
  }
  
  type PersonTitle = Person & worker;
  
  const P1: PersonTitle = {
    name: "naveed",
    age: 20,
    id:234,
    jobtitle: "back-end Engineer",
    salary: 30000,
  };
  type PersonTitle2 = Person & worker;
  
  const P2: PersonTitle2 = {
    name: "faizan",
    age: 20,
    id:4,
    jobtitle: "back-end Engineer",
    salary: 30000,
  };
  console.log(P1)
  console.log(P2);
  