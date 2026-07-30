
async function uploadFood() {

    const hotel = document.getElementById("hotel").value;
    const food = document.getElementById("food").value;
    const qty = document.getElementById("qty").value;
    const location = document.getElementById("location").value;

    const data = {
        hotel,
        food,
        quantity: qty,
        location,
        status: "Available"
    };

    const API_URL = "https://food-waste-donation-k8p9.onrender.com";

    try {
        const response = await fetch(`${API_URL}/donate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.message);

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}
