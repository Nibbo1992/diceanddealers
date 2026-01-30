// =============================
// Smooth Scroll for Internal Links
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// =============================
// Collapsible Sections for Painting Guides
// =============================
document.addEventListener('DOMContentLoaded', function() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

// =============================
// Highlight Active Nav Link
// =============================
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    if(link.href.includes(currentLocation)) {
        link.classList.add('active-link');
    }
});

// =============================
// Optional: Scroll to Top Button
// =============================
const scrollBtn = document.createElement('button');
scrollBtn.innerText = '⬆ Top';
scrollBtn.classList.add('btn', 'scroll-top');
document.body.appendChild(scrollBtn);

// Select the scrollable element, prioritizing a class of 'container' if it exists.
const scrollableElement = document.querySelector('.container') || document.body;

scrollableElement.addEventListener('scroll', () => {
    if (scrollableElement.scrollTop > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    scrollableElement.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================
// Optional: Weekly Meeting Countdown
// =============================
document.addEventListener('DOMContentLoaded', () => {
    // Find the WhatsApp link on the homepage
    const whatsappLink = document.querySelector('a[href*="whatsapp.com"]');
    
    if (whatsappLink && (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html'))) {
        const updateCountdown = () => {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const daysUntilWednesday = (3 - dayOfWeek + 7) % 7;
            
            if (daysUntilWednesday === 0 && now.getHours() >= 18) {
                // It's Wednesday evening, show "We're meeting now!"
                whatsappLink.innerText = 'We’re Meeting Tonight!';
            } else if (daysUntilWednesday === 0) {
                // It's Wednesday during the day
                whatsappLink.innerText = 'Meeting Tonight!';
            } else if (daysUntilWednesday === 1) {
                // It's Tuesday, the day before
                whatsappLink.innerText = 'Meeting Tomorrow!';
            } else {
                whatsappLink.innerText = `Join Us in ${daysUntilWednesday} Days!`;
            }
        };

        // Run the function initially and then every minute
        updateCountdown();
        setInterval(updateCountdown, 60000);
    }
});

// =============================
// Optional: "Did You Know?" Fact Ticker
// =============================
document.addEventListener('DOMContentLoaded', () => {
    const facts = [
        "In Warhammer 40,000, the 'grimdark' genre gets its name from the game's tagline: 'In the grim darkness of the far future, there is only war.'",
        "Ork technology works because their collective psychic field, the 'Waaagh!!!,' makes their belief that it works a reality.",
        "The all-female Sisters of Battle were created to bypass a law forbidding the Imperial Faith from having 'men under arms.'",
        "Orks are a fungal species that reproduce by releasing spores from their bodies after death.",
        "The Eldar's decadent lifestyle created the Chaos God Slaanesh, which then shattered their empire.",
        "The last words the Emperor spoke were a command to his Fabricator-General to 'undo' the work of the Golden Throne.",
        "The Black Templars Space Marine chapter has a relic called the 'Holy Orb of Antioch,' a direct nod to Monty Python and the Holy Grail.",
        "The Astra Militarum (Imperial Guard) is so vast its numbers are in the trillions.",
        "The Adeptus Mechanicus doesn't understand its own technology, believing machines have 'spirits' that must be appeased.",
        "A Space Marine's unique organs grow from a 'gene-seed,' allowing new chapters to be created from their genetic material.",
        "Easter Egg: The Necron unit 'Death's Head of Duke Olaks' is a pun on the laxative Dulcolax.",
        "Easter Egg: The secretive code to the Emperor's lab is the tune 'Shave and a Haircut, Two Bits.'",
        "In Warhammer Age of Sigmar, the entire setting was created from the utter destruction of the old Warhammer Fantasy world.",
        "The Mortal Realms are not planets; they are vast, interconnected planes of existence, some of which are alive and eat each other.",
        "The Skaven were instrumental in destroying the old world by crashing a warpstone-infused moon into it.",
        "The cannibalistic Flesh-Eater Courts believe they are noble knights fighting for their king.",
        "The Fyreslayers embed 'Ur-Gold,' the scattered fragments of their dead god Grimnir, into their skin.",
        "The Kharadron Overlords are a society of capitalist steampunk dwarves who are obsessed with profit.",
        "Nagash curses healers who defied death, turning them into tortured spectral beings in his army.",
        "The Idoneth Deepkin, a race of sea elves, must raid the surface to steal souls to survive.",
        "The Bonesplittaz believe that body paint made from bones is more effective armor than metal.",
        "The Orruk god Gorkamorka is so powerful he constantly fights himself, and the Orruks' wars reflect this divine struggle.",
        "Easter Egg: There's a story of an Ogor Tyrant who ate a Kharadron sky-vessel piece by piece, but left the bombs for dessert and exploded, splattering his surprised attendants with gore.",
        "In Dungeons & Dragons, it started as an appendix to Chainmail, a medieval wargame.",
        "The Bulette (Landshark) was inspired by a cheap plastic toy and a Saturday Night Live sketch.",
        "The iconic d20 was popularized by Gary Gygax, who found them while trying to move on from a 'bag of 20 poker chips.'",
        "In the 1980s, D&D was falsely accused of encouraging Satanism, which ironically boosted its popularity.",
        "D&D is a foundational influence on the entire role-playing video game genre.",
        "Famous spells like 'Melf's Minute Meteors' and 'Bigby's Hand' are named after real-life player characters.",
        "The Owlbear was created by Gary Gygax based on another cheap plastic toy from Hong Kong.",
        "The game was born from a collaboration between Gary Gygax and Dave Arneson, who adapted Gygax's rules for a dungeon crawl campaign.",
        "Many early D&D creators were just dedicated fans who sent in their work and were hired.",
        "The Tarrasque is based on a French legend of a terrifying, dragon-like creature that was tamed, not killed.",
        "Easter Egg: One of the most famous D&D novels, Dragonlance, has a character named 'Raistlin Majere,' an anagram for 'A Merlin is a Jester.'",
        "Easter Egg: The material components for some spells are direct puns, such as the spell Feeblemind requiring a handful of marbles."
    ];

    if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
        const factBox = document.createElement('div');
        factBox.classList.add('fact-ticker');
        document.body.appendChild(factBox);

        const factText = document.createElement('p');
        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('fact-ticker-controls');

        const nextFactBtn = document.createElement('button');
        nextFactBtn.innerText = 'Really? do go on.';
        nextFactBtn.classList.add('fact-ticker-next-btn');

        const closeBtn = document.createElement('button');
        closeBtn.innerText = '×';
        closeBtn.classList.add('fact-ticker-close-btn');

        controlsContainer.appendChild(nextFactBtn);
        controlsContainer.appendChild(closeBtn);

        factBox.appendChild(factText);
        factBox.appendChild(controlsContainer);
        
        let factIndex = Math.floor(Math.random() * facts.length);
        
        const updateFact = () => {
            factText.innerText = `Did you know? ${facts[factIndex]}`;
            factIndex = (factIndex + 1) % facts.length;
        };

        updateFact();

        nextFactBtn.addEventListener('click', () => {
            updateFact();
        });

        closeBtn.addEventListener('click', () => {
            factBox.remove();
        });
    }
});

// =============================
// Show/Hide Faction Details
// =============================
document.addEventListener('DOMContentLoaded', function() {
    const factionLinks = document.querySelectorAll('#factions nav ul li a');
    const factionSections = document.querySelectorAll('.faction-section');

    // Initially hide all sections except the first one (Cities of Sigmar)
    factionSections.forEach((section, index) => {
        if (index !== 0) {
            section.style.display = 'none';
        }
    });

    factionLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default anchor link behavior
            event.preventDefault();

            // Hide all faction sections
            factionSections.forEach(section => {
                section.style.display = 'none';
            });

            // Get the ID of the section to show from the link's href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Show the target section if it exists
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
});