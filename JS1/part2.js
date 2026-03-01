export function usersByCity(users, city) {
  return users.filter((u) => u.city === city);
}

export function averageAge(users, city) {
  const list = city ? users.filter((u) => u.city === city) : users;
  if (list.length === 0) return NaN;
  const sum = list.reduce((acc, u) => acc + u.age, 0);
  return sum / list.length;
}

export function splitByAge(users, ageLimit) {
  const younger = users.filter((u) => u.age < ageLimit);
  const older = users.filter((u) => u.age >= ageLimit);
  return [younger, older];
}

export function oldestUser(users, city) {
  const list = city ? users.filter((u) => u.city === city) : users;
  if (list.length === 0) throw new Error("No users found");
  return list.reduce((max, u) => (u.age > max.age ? u : max));
}

export function findCity(users, name) {
  const user = users.find((u) => u.name === name);
  if (!user) throw new Error("User not found");
  return user.city;
}

export function unique(users, prop, city) {
  if (users.length === 0 || !(prop in users[0])) {
    throw new Error("Property not found");
  }

  const list = city ? users.filter((u) => u.city === city) : users;
  const values = list.map((u) => u[prop]);

  const seen = new Set();
  const result = [];

  for (const v of values) {
    if (!seen.has(v)) {
      seen.add(v);
      result.push(v);
    }
  }

  return result;
}