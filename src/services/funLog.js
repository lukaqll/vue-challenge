export function doLog() {
    console.log("%c Hey, bro. Whats up?", "font-size: 24px");
    console.log("%c My name is Luka 🧑 I'm a Back-End dev 🧑‍💻", "font-size: 12px");
    console.log("%c this is an example project about my knowledge with VueJS 🧠", "font-size: 12px");
    console.log("%c I didn't have much time to do it, but I hope you like it 😅", "font-size: 12px; color: orange");
    readTextFile()
}

function readTextFile() {
    const rawFile = new XMLHttpRequest();
    rawFile.open("GET", "/others/shrek.txt", true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            const allText = rawFile.responseText;
            console.log(`%c${allText}`, 'color: green');
        }
    }
    rawFile.send();
}
