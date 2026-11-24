
async function getProfile() {

    const token = document.getElementById("token").value;
    const result = document.getElementById("result");

    // Page is loading
    result.innerHTML = "Loading...";

    // Error handling
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        // Success response
        result.innerHTML = `
            <h5 class="text-success">Success!</h5>
            <p>${data.message}</p>
            <p>Name: ${data.user.name}</p>
            <p>Role: ${data.user.role}</p>
        `;

    } catch (error) {

        result.innerHTML = `
            <p class="text-danger">
                Error: ${error.message}
            </p>
        `;
    }
}

// Unauthorized request
async function testUnauthorized() {

    document.getElementById("token").value = "wrong-token";

    await getProfile();
}
