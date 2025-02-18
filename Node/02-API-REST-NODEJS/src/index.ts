interface User {
    birthYear: number;
  }
  
  function calculateAgeOfUser(user: User): number {
    const currentYear = new Date().getFullYear();
    return currentYear - user.birthYear;
  }
  
  const user = { birthYear: 1990 };
  console.log(calculateAgeOfUser(user));