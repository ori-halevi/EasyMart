async function getAllCarts() {
    try {
        const response = await fetch('http://localhost:3000/carts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch carts:", error);
        throw error; // לזרוק את השגיאה כדי שיהיה ניתן לטפל בה מחוץ לפונקציה
    }
}

// דןגמא לשימוש בפונקציה
async function check() {
    try {
        const carts = await getAllCarts();
        console.log("Carts data:", carts);
    } catch (error) {
        console.error("Error fetching carts:", error);
    }
}

check()
