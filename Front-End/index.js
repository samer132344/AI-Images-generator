const serverAddress = "http://localhost:3000"

const form = document.getElementById("generate-images");
const input = document.getElementById("input-to-generate");
const displayImage = document.getElementById("image");

form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const prompt = input.value;

    if(prompt) {
        try {
            const res = await fetch(`${serverAddress}/generateImage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({prompt: prompt})
            })
    
            const data = await res.json();
            console.log(data)
            displayImage.src = data.image;
        } catch (error) {
            console.log(error)
            alert("Image wasn't found !")
        }
      
    } 
    
    else {
        alert("Please enter a prompt")
    }
    
})

