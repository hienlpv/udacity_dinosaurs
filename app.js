
    // Create Dino Constructor
    function Dino(dino) {
        return Object.assign({}, dino, {
            getImgUrl: function () {
                return `images/${this.species.toLowerCase()}.png`
            }
        });
    }

    // Create Human Object
    const human = {
        name: "",
        feet: "",
        inches: "",
        weight: "",
        diet: "",
        imgUrl: "images/human.png",

        getHeight: function () {
            return (parseInt(this.feet) * 12) + parseInt(this.inches);
        },
    }

    // Fetch data and create Dino Objects
    let dinos = [];
    fetch("dino.json").then(res => res.json()).then(data => dinos = data.Dinos.map(dino => Dino(dino)));

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    function compareWeight(human, dino) {
        return human.weight == dino.weight;
    }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareHeight(human, dino) {
        return human.getHeight() == dino.height;
    }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    function compareDiet(human, dino) {
        return human.diet == dino.diet;
    }

    // Generate Dino DOM Elements
    function generateDinoElements() {
        return dinos.map(dino => generateRenderElement(dino.species, dino.getImgUrl(), dino.fact));
    }

    // Generate Human DOM Element
    function generateHumanElement() {
        let form = document.getElementById('dino-compare');
        let formData = Object.fromEntries(new FormData(form).entries());
        Object.assign(human, formData);
        return generateRenderElement(human.name, human.imgUrl, null);
    }

    function generateRenderElement(title, imgUrl, fact) {
        const itemEl = document.createElement('div');
        itemEl.classList.add("grid-item");

        if (title) {
            const titleEl = document.createElement('h3');
            titleEl.innerHTML = title;
            itemEl.appendChild(titleEl);
        }

        if (imgUrl) {
            const imgEl = document.createElement('img');
            imgEl.setAttribute("src", imgUrl);
            itemEl.appendChild(imgEl);
        }

        if (fact) {
            const factEl = document.createElement('p');
            factEl.innerHTML = fact;
            itemEl.appendChild(factEl);
        }

        return itemEl;
    }

    // Random Dino's Fact
    function randormDinoFact() {
        const pigeonIndex = dinos.findIndex(dino => dino.species === "Pigeon");
        const facts = dinos.filter(dino => dino.species !== "Pigeon").map(dino => dino.fact);
        const shuffleFacts = shuffleArray(facts);
        shuffleFacts.splice(pigeonIndex, 0, "All birds are living dinosaurs.");
        shuffleFacts.forEach((fact, index) => dinos[index].fact = fact);

    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Add tiles to DOM
    function displayInfographic() {
        const main = document.getElementById("grid");
        const humanElement = generateHumanElement();
        const dinoElments = generateDinoElements();
        dinoElments.splice(4, 0, humanElement);
        dinoElments.forEach(el => main.appendChild(el));
    }

    // Remove form from screen
    function removeFormCompare() {
        const form = document.getElementById("dino-compare");
        form.style.display = 'none';
    }

    // On button click, prepare and display infographic
    window.addEventListener('load', () => {
        const btn = document.getElementById("btn");
        btn.onclick = () => {
            removeFormCompare();
            randormDinoFact();
            displayInfographic();
        }
    })
