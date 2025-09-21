const themeToggle = document.querySelector("#theme-toggle");
const htmlElement = document.documentElement;

if (localStorage.theme === "dark" || (
    !localStorage.theme &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    htmlElement.classList.add("dark");
    localStorage.theme = "dark";
} else {
    htmlElement.classList.remove("dark");
    localStorage.theme = "light";
}

themeToggle.addEventListener("click", () => {
    if (htmlElement.classList.contains("dark")) {
        htmlElement.classList.remove("dark");
        localStorage.theme = "light";
    } else {
        htmlElement.classList.add("dark");
        localStorage.theme = "dark";
    }
});
