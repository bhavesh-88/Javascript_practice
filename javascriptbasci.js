async function getNumTransactions(username) {
    // API endpoint: https://jsonmock.hackerrank.com/api/article_users?username=<username>
    // API endpoint: https://jsonmock.hackerrank.com/api/transactions?&userId=<userId>


    try {
        // Step 1: Make a GET request to the users API
        const usersUrl = `https://jsonmock.hackerrank.com/api/article_users?username=${username}`;
        const usersResponse = await fetch(usersUrl);
        const usersData = await usersResponse.json();

        // Check if the username is not found
        if (usersResponse.status !== 200 || usersData.data.length === 0) {
            return "Username Not Found";
        }

        const userId = usersData.data[0].id;

        // Step 2: Make a GET request to the transactions API using the user id
        const transactionsUrl = `https://jsonmock.hackerrank.com/api/transactions?userId=${userId}`;
        const transactionsResponse = await fetch(transactionsUrl);
        const transactionsData = await transactionsResponse.json();

        // Check if the transactions data is not found
        if (transactionsResponse.status !== 200 || transactionsData.data.length === 0) {
            return 0;
        }

        // Return the total number of transactions
        return transactionsData.total;
    } catch (error) {
        console.error("Error:", error.message);
        return "Error occurred while fetching data";
    }
}

// Example usage:
const username = "epaga";
getNumTransactions(username)
    .then(result => console.log(result))
    .catch(error => console.error(error));


// async function main() {
//         const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
//         const username = readLine().trim();
//         const result = await getNumTransactions(username);
//         ws.write(result.toString());
// }    