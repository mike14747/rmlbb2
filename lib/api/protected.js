export async function getProtectedData() {
    return new Promise((resolve, reject) => {
        resolve([{ name: 'Kevin', age: 65 }, { name: 'Mary', age: 57 }]);
    });
}
